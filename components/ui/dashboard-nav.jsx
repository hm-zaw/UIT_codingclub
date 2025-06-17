'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Settings,
  BookOpen,
  Calendar,
  MessageSquare,
  LogOut
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/adm-dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Users',
    icon: Users,
    href: '/adm-dashboard/users',
    color: "text-violet-500",
  },
  {
    label: 'Courses',
    icon: BookOpen,
    color: "text-pink-700",
    href: '/adm-dashboard/courses',
  },
  {
    label: 'Schedule',
    icon: Calendar,
    color: "text-orange-700",
    href: '/adm-dashboard/schedule',
  },
  {
    label: 'Messages',
    icon: MessageSquare,
    color: "text-emerald-500",
    href: '/adm-dashboard/messages',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/adm-dashboard/settings',
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 