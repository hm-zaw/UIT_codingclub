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
import { Users, BookOpen, Calendar, MessageSquare, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ["latin"], weight: ['500']})

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loading />
        <pre className="mt-4 text-sm text-gray-300">
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
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Active Courses",
      value: "12",
      icon: BookOpen,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Upcoming Events",
      value: "4",
      icon: Calendar,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      title: "New Messages",
      value: "18",
      icon: MessageSquare,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200/50 dark:border-gray-700/50 space-x-2">
            <div className="bg-white/20 dark:bg-transparent p-1 rounded-lg">
              <Image src={'/uit_logo.png'} width={40} height={40} alt={'uit_logo'} />
            </div>
            <div>
              <h1 className={`${montserrat.className} my-auto text-lg font-semibold text-slate-950 dark:text-white mt-1`}>UIT Coding Club</h1>
            </div>
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
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className={`relative overflow-hidden border ${stat.borderColor} bg-white/70 dark:bg-slate-800/70 transition-all duration-300 hover:scale-105`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-50`}></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 dark:text-green-400">+12% from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Card className="col-span-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
              <CardTitle className="px-6 text-foreground dark:text-foreground flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardContent className="px-6">
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">New student registration</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Course completion</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Event scheduled</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
              <CardTitle className="px-6 text-foreground dark:text-foreground">Quick Actions</CardTitle>
              <CardContent className="px-6">
                <div className="space-y-4">
                  <Button className="w-full bg-slate-200 text-slate-950 shadow-sm hover:bg-slate-300 transition-all duration-300">
                    Add New User
                  </Button>
                  <Button className="w-full bg-slate-200 text-slate-950 shadow-sm hover:bg-slate-300 transition-all duration-300">
                    Create Course
                  </Button>
                  <Button className="w-full bg-slate-200 text-slate-950 shadow-sm hover:bg-slate-300 transition-all duration-300">
                    Schedule Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Details Table */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center my-auto">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Student Details
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Major</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student ID</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {studentList.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {student.major}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Year {student.yearLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-mono">
                        {student.studentId}
                      </td>
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
