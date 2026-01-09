"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import { useEmployees } from '@/context/EmployeeContext';
import { useDepartments } from '@/context/DepartmentContext'; // Import useDepartments
import { showSuccess, showError } from '@/utils/toast';

const EditEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { employees, updateEmployee } = useEmployees();
  const { departments } = useDepartments(); // Get departments
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '', // This will store the department name
  });
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(''); // State for selected department ID

  useEffect(() => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
      // Find the ID of the department based on the employee's department name
      const currentDepartment = departments.find(d => d.name === employeeToEdit.department);
      if (currentDepartment) {
        setSelectedDepartmentId(currentDepartment.id);
      }
    } else {
      showError("Employee not found.");
      navigate('/employees');
    }
  }, [id, employees, navigate, departments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({ ...prev, [id]: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartmentId(value);
    const dept = departments.find(d => d.id === value);
    if (dept) {
      setEmployee((prev) => ({ ...prev, department: dept.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee.name || !employee.email || !employee.position || !employee.department) { // Validate department
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
              <Select onValueChange={handleDepartmentChange} value={selectedDepartmentId} required>
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
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEmployeePage;