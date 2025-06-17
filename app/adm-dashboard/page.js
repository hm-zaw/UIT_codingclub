'use client';
import React, { useState, useEffect } from 'react'
import Loading from '@/components/Loading';
import { Montserrat } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const monstserrat = Montserrat({ subsets: ['latin'], weight: ['500'] });

export default function AdminDashboard() {
  const { currentUser, userDataObj, loading } = useAuth();
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [debug, setDebug] = useState(''); // Add debug state
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setDebug(prev => prev + '\nChecking auth state...');
        
        if (!user) {
          setDebug(prev => prev + '\nNo user found, redirecting to login');
          router.push('/login');
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

        // If role is not admin (teacher or mentor), redirect to appropriate dashboard
        if (userData.role === 'student') {
          setDebug(prev => prev + '\nStudent role detected, redirecting to user dashboard');
          router.push('/user-dashboard');
          return;
        } else if (!['teacher', 'mentor', 'admin'].includes(userData.role)) {
          setDebug(prev => prev + '\nInvalid role, redirecting to setup');
          router.push('/setup');
          return;
        }

        // If we get here, user is authorized
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
  
  // Handle redirect after loading is complete
  useEffect(() => {
    if (!showLoading && !currentUser) {
      router.push('/Login'); // Use router.push for client-side navigation
    }
  }, [showLoading, currentUser, router]);

  if (showLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loading />
        <pre className="mt-4 text-sm text-gray-600">
          {debug}
        </pre>
      </div>
    );
  }

  console.log('Current user in dashboard:', currentUser);

  return (
    <div className="flex flex-col text-3xl flex-1 gap-4 sm:gap-6 md:gap-8 max-w-[1350px] mx-10 sm:mx-auto md:mx-auto">
      This is admin dashboard
    </div>
  )
}
