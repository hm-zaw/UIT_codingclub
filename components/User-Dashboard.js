'use client';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Login from './Login';
import { Montserrat } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';

const monstserrat = Montserrat({ subsets: ['latin'], weight: ['500'] });

export default function User_Dashboard() {
  const { currentUser, userDataObj, loading } = useAuth();
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Introduce a delay to ensure smooth loading transition
      const timer = setTimeout(() => setShowLoading(false), 300); // Adjust time as needed
      return () => clearTimeout(timer);
    } else {
      setShowLoading(true);
    }
  }, [loading]);

  useEffect(() => {
    if (userDataObj && JSON.stringify(userDataObj) !== JSON.stringify(data)) {
      setData(userDataObj);
    }
  }, [userDataObj]);

  if (showLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  console.log('Current user in dashboard:', currentUser);

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-6 md:gap-8 max-w-[1350px] mx-10 sm:mx-auto md:mx-auto">
      This is the user dashboard
    </div>
  );
}
