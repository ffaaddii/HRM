"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEmployees } from '@/context/EmployeeContext';

const Dashboard = () => {
  const { employees } = useEmployees();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently managed employees
            </p>
          </CardContent>
        </Card>
        {/* Add more dashboard cards here for other metrics */}
      </div>
      {/* Add more dashboard content here */}
    </div>
  );
};

// Import Users icon
import { Users } from 'lucide-react';

export default Dashboard;