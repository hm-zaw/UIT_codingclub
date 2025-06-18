'use client';
import React, { useState, useEffect } from 'react'
import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DashboardNav } from '@/components/ui/dashboard-nav';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function AdminDashboard() {
  const { currentUser, userDataObj, loading } = useAuth();
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [debug, setDebug] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const fetchUserCount = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);
      console.log('Student user count:', querySnapshot.size);
      querySnapshot.forEach(doc => console.log(doc.id, doc.data()));
      setUserCount(querySnapshot.size);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchStudentList = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);
      const students = [];
      querySnapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() });
      });
      setStudentList(students);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setDebug(prev => prev + '\nChecking auth state...');
        
        if (!user) {
          setDebug(prev => prev + '\nNo user found, redirecting to login');
          router.push('/Login');
          return;
        }

        setDebug(prev => prev + `\nUser found: ${user.email}`);

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setDebug(prev => prev + '\nNo user data found, redirecting to setup');
          router.push('/setup');
          return;
        }

        const userData = userSnap.data();
        setDebug(prev => prev + `\nUser role: ${userData.role}`);

        if (userData.role === 'student') {
          setDebug(prev => prev + '\nStudent role detected, redirecting to user dashboard');
          router.push('/user-dashboard');
          return;
        } else if (!['teacher', 'mentor', 'admin'].includes(userData.role)) {
          setDebug(prev => prev + '\nInvalid role, redirecting to setup');
          router.push('/setup');
          return;
        }

        setDebug(prev => prev + '\nUser authorized, showing dashboard');
        setShowLoading(false);

      } catch (error) {
        console.error('Error checking admin access:', error);
        setDebug(prev => prev + `\nError: ${error.message}`);
        router.push('/user-dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userDataObj && JSON.stringify(userDataObj) !== JSON.stringify(data)) {
      setData(userDataObj);
    }
  }, [userDataObj]);
  
  useEffect(() => {
    if (!showLoading && !currentUser) {
      router.push('/Login');
    }
  }, [showLoading, currentUser, router]);

  useEffect(() => {
    if (!showLoading) {
      fetchUserCount();
      fetchStudentList();
    }
  }, [showLoading]);

  if (showLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loading />
        <pre className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {debug}
        </pre>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: userCount.toString(),
      icon: Users,
      color: "text-violet-500"
    },
    {
      title: "Active Courses",
      value: "12",
      icon: BookOpen,
      color: "text-pink-700"
    },
    {
      title: "Upcoming Events",
      value: "4",
      icon: Calendar,
      color: "text-orange-700"
    },
    {
      title: "New Messages",
      value: "18",
      icon: MessageSquare,
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-background dark:bg-background">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b dark:border-gray-800 space-x-2">
        
            <Image src={'/uit_logo.png'} width={40} height={40} alt={'uit_logo'} />
            <h1 className="text-lg font-semibold text-foreground dark:text-foreground">UIT Coding Club</h1>
          </div>
          <ScrollArea className="flex-1">
            <DashboardNav />
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <DashboardHeader />
        
        <main className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground dark:text-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground dark:text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-foreground dark:text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Activity feed will be displayed here...
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-foreground dark:text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Add New User
                  </Button>
                  <Button className="w-full" variant="outline">
                    Create Course
                  </Button>
                  <Button className="w-full" variant="outline">
                    Schedule Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Student Details</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-background dark:bg-background border border-gray-200 dark:border-gray-800">
                <thead>
                    <tr>
                    <th className="px-4 py-2 border-b text-center">#</th>
                    <th className="px-4 py-2 border-b text-center">Name</th>
                    <th className="px-4 py-2 border-b text-center">Email</th>
                    <th className="px-4 py-2 border-b text-center">Major</th>
                    <th className="px-4 py-2 border-b text-center">Year</th>
                    <th className="px-4 py-2 border-b text-center">Student ID</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student, index) => (
                    <tr key={student.id}>
                        <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                        <td className="px-4 py-2 border-b text-center">{student.name}</td>
                        <td className="px-4 py-2 border-b text-center">{student.email}</td>
                        <td className="px-4 py-2 border-b text-center">{student.major}</td>
                        <td className="px-4 py-2 border-b text-center">{student.yearLevel}</td>
                        <td className="px-4 py-2 border-b text-center">{student.studentId}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}
