'use client';

import { usePathname } from 'next/navigation';
import Logout from "@/components/Logout";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function GlobalLayout({ children }) {
  const pathname = usePathname();
  const isAdminDashboard = pathname?.startsWith('/adm-dashboard');

  const header = !isAdminDashboard && (
    <header className="flex items-center justify-between gap-4 p-4 sm:p-8">
      <div className="flex items-center gap-3">
        <Image src={'/uit_logo.png'} width={70} height={70} alt={'uit_logo'} />
        <h1 className={`text-lg sm:text-xl md:text-2xl text-gradient-dark-bg-3`}>UIT Coding Club</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );

  const footer = !isAdminDashboard && (
    <footer className="p-4 sm:p-8">
      <p className={`text-center mx-auto text-gray-600 dark:text-gray-400`}>Created by HMZ</p>
    </footer>
  );

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
} 