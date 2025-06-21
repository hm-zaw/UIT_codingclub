import { DashboardNav } from '@/components/ui/dashboard-nav';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from "next/image";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"], weight: ['500']});

export const metadata = {
  title: "UIT Coding Club - Admin Dashboard",
};

export default function AdminDashboardLayout({ children }) {
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
        {children}
      </div>
    </div>
  );
} 