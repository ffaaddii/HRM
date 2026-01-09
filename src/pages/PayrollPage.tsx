"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign } from 'lucide-react';

interface PayrollRecord {
  id: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
}

const mockPayroll: PayrollRecord[] = [
  { id: '1', employeeName: 'Alice Smith', month: 'July 2024', baseSalary: 5000, bonuses: 500, deductions: 200, netSalary: 5300 },
  { id: '2', employeeName: 'Bob Johnson', month: 'July 2024', baseSalary: 6000, bonuses: 700, deductions: 300, netSalary: 6400 },
  { id: '3', employeeName: 'Charlie Brown', month: 'July 2024', baseSalary: 4500, bonuses: 200, deductions: 150, netSalary: 4550 },
  { id: '4', employeeName: 'Diana Prince', month: 'July 2024', baseSalary: 7000, bonuses: 1000, deductions: 400, netSalary: 7600 },
  { id: '5', employeeName: 'Eve Adams', month: 'July 2024', baseSalary: 5200, bonuses: 300, deductions: 250, netSalary: 5250 },
];

const PayrollPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Payroll</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" /> Monthly Payroll Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockPayroll.length === 0 ? (
            <p className="text-center text-muted-foreground">No payroll records found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Bonuses</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayroll.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employeeName}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>${record.baseSalary.toFixed(2)}</TableCell>
                    <TableCell>${record.bonuses.toFixed(2)}</TableCell>
                    <TableCell>${record.deductions.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">${record.netSalary.toFixed(2)}</TableCell>
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

export default PayrollPage;