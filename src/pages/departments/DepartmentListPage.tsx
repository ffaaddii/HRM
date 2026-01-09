"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDepartments } from '@/context/DepartmentContext';
import { PlusCircle, Edit, Trash2, Building2 } from 'lucide-react'; // Added Building2 icon
import { showError, showSuccess } from '@/utils/toast';

const DepartmentListPage = () => {
  const { departments, deleteDepartment } = useDepartments();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteDepartment(id);
      showSuccess("Department deleted successfully.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Departments</h2>
        <Link to="/departments/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Department
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department List</CardTitle>
        </CardHeader>
        <CardContent>
          {departments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">No departments found.</p>
              <p className="text-sm">Add a new department to get started!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.description || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/departments/edit/${department.id}`} className="inline-block mr-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(department.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
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

export default DepartmentListPage;