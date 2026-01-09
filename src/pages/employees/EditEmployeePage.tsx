"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEmployees } from '@/context/EmployeeContext';
import { showSuccess, showError } from '@/utils/toast';

const EditEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { employees, updateEmployee } = useEmployees();
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '',
  });

  useEffect(() => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      showError("Employee not found.");
      navigate('/employees');
    }
  }, [id, employees, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee.name || !employee.email || !employee.position || !employee.department) {
      showError("Please fill in all fields.");
      return;
    }
    updateEmployee(employee);
    showSuccess("Employee updated successfully!");
    navigate('/employees');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Edit Employee</h2>
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={employee.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={employee.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={employee.position} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={employee.department} onChange={handleChange} required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/employees')}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEmployeePage;