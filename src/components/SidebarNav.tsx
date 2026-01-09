"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, UserPlus, CalendarDays, DollarSign } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/employees/add', label: 'Add Employee', icon: UserPlus },
  // { href: '/attendance', label: 'Attendance', icon: CalendarDays }, // Future feature
  // { href: '/payroll', label: 'Payroll', icon: DollarSign }, // Future feature
];

const SidebarNav = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary',
            location.pathname === link.href && 'bg-sidebar-accent text-sidebar-primary'
          )}
        >
          <link.icon className="h-5 w-5" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;