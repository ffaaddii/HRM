"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Department {
  id: string;
  name: string;
  description?: string;
}

interface DepartmentContextType {
  departments: Department[];
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (department: Department) => void;
  deleteDepartment: (id: string) => void;
}

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

export const DepartmentProvider = ({ children }: { ReactNode }) => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Human Resources', description: 'Manages HR functions' },
    { id: '2', name: 'Engineering', description: 'Develops and maintains software' },
    { id: '3', name: 'Marketing', description: 'Handles marketing and promotions' },
  ]);

  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment: Department = { ...department, id: Date.now().toString() };
    setDepartments((prev) => [...prev, newDepartment]);
  };

  const updateDepartment = (updatedDepartment: Department) => {
    setDepartments((prev) =>
      prev.map((dept) => (dept.id === updatedDepartment.id ? updatedDepartment : dept))
    );
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  return (
    <DepartmentContext.Provider value={{ departments, addDepartment, updateDepartment, deleteDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartments = () => {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error('useDepartments must be used within a DepartmentProvider');
  }
  return context;
};