"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDepartments } from '@/context/DepartmentContext';
import { showSuccess, showError } from '@/utils/toast';

const EditDepartmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { departments, updateDepartment } = useDepartments();
  const [department, setDepartment] = useState({
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    const departmentToEdit = departments.find((dept) => dept.id === id);
    if (departmentToEdit) {
      setDepartment(departmentToEdit);
    } else {
      showError("Department not found.");
      navigate('/departments');
    }
  }, [id, departments, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setDepartment((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!department.name) {
      showError("Department name is required.");
      return;
    }
    updateDepartment(department);
    showSuccess("Department updated successfully!");
    navigate('/departments');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Edit Department</h2>
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Department Name</Label>
              <Input id="name" value={department.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" value={department.description || ''} onChange={handleChange} rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/departments')}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDepartmentPage;