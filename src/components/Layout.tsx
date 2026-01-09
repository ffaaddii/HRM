"use client";

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import { MadeWithDyad } from './made-with-dyad';
import { ThemeToggle } from './ThemeToggle';
import MobileSidebar from './MobileSidebar'; // Import MobileSidebar
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile

// Define a mapping for route paths to titles
const routeTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employees',
  '/employees/add': 'Add Employee',
  '/employees/edit': 'Edit Employee', // Base for dynamic ID
  '/departments': 'Departments',
  '/departments/add': 'Add Department',
  '/departments/edit': 'Edit Department', // Base for dynamic ID
  '/attendance': 'Attendance',
  '/payroll': 'Payroll', // Add Payroll page title
};

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile(); // Use the hook
  const currentPath = location.pathname;

  // Determine the title based on the current path
  let pageTitle = 'HRM System'; // Default title
  for (const path in routeTitles) {
    if (currentPath.startsWith(path)) {
      pageTitle = routeTitles[path];
      break;
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-sidebar-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary">
              <span className="text-lg">HRM System</span>
            </a>
          </div>
          <div className="flex-1">
            <SidebarNav />
          </div>
          <div className="mt-auto p-4">
            <MadeWithDyad />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 shadow-sm">
          {isMobile && <MobileSidebar />} {/* Render MobileSidebar only on mobile */}
          <h1 className="text-xl font-semibold flex-1">
            {pageTitle}
          </h1>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;