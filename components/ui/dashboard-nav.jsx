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
  CalendarDays,
  Calendar,
  MessageSquare,
  LogOut,
  Library
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/adm-dashboard',
    color: "text-primary"
  },
  {
    label: 'Users',
    icon: Users,
    href: '/adm-dashboard/users',
    color: "text-primary",
  },
  {
    label: 'Workshops',
    icon: BookOpen,
    color: "text-primary",
    href: '/adm-dashboard/workshops',
  },
  {
    label: 'Events',
    icon: CalendarDays,
    color: "text-primary",
    href: '/adm-dashboard/events',
  },
  {
    label: 'Resources',
    icon: Library,
    color: "text-primary",
    href: '/adm-dashboard/resources',
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
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary rounded-lg transition",
                pathname === route.href ? "text-primary bg-teal-50 dark:bg-slate-800/70" : "text-muted-foreground",
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