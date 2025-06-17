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
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          router.push('/login');
          return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          router.push('/setup');
          return;
        }

        const userData = userSnap.data();

        // If role is not admin (teacher or mentor), redirect to appropriate dashboard
        if (userData.role === 'student') {
          router.push('/user-dashboard');
          return;
        } else if (!['teacher', 'mentor'].includes(userData.role)) {
          router.push('/setup');
          return;
        }

        // If we get here, user is authorized
        setShowLoading(false);

      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/user-dashboard');
      }
    });

    // Cleanup subscription
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
    return <Loading />;
  }

  console.log('Current user in dashboard:', currentUser);

  return (
    <div className="flex flex-col text-3xl flex-1 gap-4 sm:gap-6 md:gap-8 max-w-[1350px] mx-10 sm:mx-auto md:mx-auto">
      This is admin dashboard
    </div>
  )
}
