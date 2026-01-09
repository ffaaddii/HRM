"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarDays } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late' | 'Early Leave';
}

const mockAttendance: AttendanceRecord[] = [
  { id: '1', employeeName: 'Alice Smith', date: '2024-07-29', checkIn: '08:55 AM', checkOut: '05:05 PM', status: 'Present' },
  { id: '2', employeeName: 'Bob Johnson', date: '2024-07-29', checkIn: '09:15 AM', checkOut: '05:00 PM', status: 'Late' },
  { id: '3', employeeName: 'Charlie Brown', date: '2024-07-29', checkIn: '08:58 AM', checkOut: '04:45 PM', status: 'Early Leave' },
  { id: '4', employeeName: 'Diana Prince', date: '2024-07-29', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present' },
  { id: '5', employeeName: 'Eve Adams', date: '2024-07-29', checkIn: '-', checkOut: '-', status: 'Absent' },
  { id: '6', employeeName: 'Alice Smith', date: '2024-07-28', checkIn: '08:50 AM', checkOut: '05:10 PM', status: 'Present' },
  { id: '7', employeeName: 'Bob Johnson', date: '2024-07-28', checkIn: '09:05 AM', checkOut: '05:02 PM', status: 'Present' },
];

const AttendancePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" /> Daily Attendance Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockAttendance.length === 0 ? (
            <p className="text-center text-muted-foreground">No attendance records found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employeeName}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          record.status === 'Late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          record.status === 'Early Leave' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;