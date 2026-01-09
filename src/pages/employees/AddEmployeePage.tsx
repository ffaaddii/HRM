"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import { useEmployees } from '@/context/EmployeeContext';
import { useDepartments } from '@/context/DepartmentContext'; // Import useDepartments
import { showSuccess, showError } from '@/utils/toast';

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();
  const { departments } = useDepartments(); // Get departments
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [departmentId, setDepartmentId] = useState(''); // State for selected department ID

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !position || !departmentId) { // Validate departmentId
      showError("Please fill in all fields.");
      return;
    }
    const selectedDepartment = departments.find(d => d.id === departmentId);
    if (!selectedDepartment) {
      showError("Invalid department selected.");
      return;
    }
    addEmployee({ name, email, position, department: selectedDepartment.name }); // Use department name
    showSuccess("Employee added successfully!");
    navigate('/employees');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Add New Employee</h2>
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={setDepartmentId} value={departmentId} required>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/employees')}>Cancel</Button>
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployeePage;