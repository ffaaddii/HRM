"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SidebarNav from './SidebarNav';
import { MadeWithDyad } from './made-with-dyad';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col bg-sidebar-background p-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary" onClick={() => setIsOpen(false)}>
            <span className="text-lg">HRM System</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav onLinkClick={() => setIsOpen(false)} />
        </div>
        <div className="mt-auto p-4">
          <MadeWithDyad />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;