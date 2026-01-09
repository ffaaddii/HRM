"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity } from 'lucide-react';

interface ActivityRecord {
  id: string;
  employeeName: string;
  action: string;
  time: string;
  avatarUrl?: string;
}

const mockActivities: ActivityRecord[] = [
  { id: '1', employeeName: 'Alice Smith', action: 'added a new employee', time: '2 hours ago', avatarUrl: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice' },
  { id: '2', employeeName: 'Bob Johnson', action: 'updated department details for Engineering', time: '5 hours ago', avatarUrl: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob' },
  { id: '3', employeeName: 'Charlie Brown', action: 'marked attendance for July 29th', time: '1 day ago', avatarUrl: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie' },
  { id: '4', employeeName: 'Diana Prince', action: 'deleted an employee record', time: '2 days ago', avatarUrl: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Diana' },
  { id: '5', employeeName: 'Eve Adams', action: 'added a new department', time: '3 days ago', avatarUrl: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve' },
];

const RecentActivities = () => {
  return (
    <div className="space-y-4">
      {mockActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Activity className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium mb-2">No recent activities.</p>
          <p className="text-sm">Check back later for updates!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={activity.avatarUrl} alt={activity.employeeName} />
                <AvatarFallback>{activity.employeeName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{activity.employeeName}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivities;