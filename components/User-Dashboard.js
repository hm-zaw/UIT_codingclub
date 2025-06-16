'use client';
import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';

const monstserrat = Montserrat({ subsets: ['latin'], weight: ['500'] });

export default function User_Dashboard() {
  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-6 md:gap-8 max-w-[1350px] mx-10 sm:mx-auto md:mx-auto">
      This is the user dashboard
    </div>
  );
}
