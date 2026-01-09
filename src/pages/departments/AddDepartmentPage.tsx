"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDepartments } from '@/context/DepartmentContext';
import { showSuccess, showError } from '@/utils/toast';

const AddDepartmentPage = () => {
  const navigate = useNavigate();
  const { addDepartment } = useDepartments();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      showError("Department name is required.");
      return;
    }
    addDepartment({ name, description });
    showSuccess("Department added successfully!");
    navigate('/departments');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Add New Department</h2>
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Department Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/departments')}>Cancel</Button>
              <Button type="submit">Add Department</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDepartmentPage;