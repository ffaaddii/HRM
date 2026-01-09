"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, UserPlus, CalendarDays, DollarSign, Building2 } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarNavProps {
  onLinkClick?: () => void; // New prop for handling link clicks
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/employees/add', label: 'Add Employee', icon: UserPlus },
  { href: '/departments', label: 'Departments', icon: Building2 },
  { href: '/attendance', label: 'Attendance', icon: CalendarDays }, // Added Attendance link
  // { href: '/payroll', label: 'Payroll', icon: DollarSign }, // Future feature
];

const SidebarNav = ({ onLinkClick }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={onLinkClick} // Call onLinkClick when a link is clicked
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