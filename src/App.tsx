import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EmployeeListPage from "./pages/employees/EmployeeListPage";
import AddEmployeePage from "./pages/employees/AddEmployeePage";
import EditEmployeePage from "./pages/employees/EditEmployeePage";
import AttendancePage from "./pages/AttendancePage";
import DepartmentListPage from "./pages/departments/DepartmentListPage"; // Import new department pages
import AddDepartmentPage from "./pages/departments/AddDepartmentPage";
import EditDepartmentPage from "./pages/departments/EditDepartmentPage";
import { EmployeeProvider } from "./context/EmployeeContext";
import { DepartmentProvider } from "./context/DepartmentContext"; // Import DepartmentProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DepartmentProvider> {/* Wrap EmployeeProvider with DepartmentProvider */}
          <EmployeeProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="employees" element={<EmployeeListPage />} />
                <Route path="employees/add" element={<AddEmployeePage />} />
                <Route path="employees/edit/:id" element={<EditEmployeePage />} />
                <Route path="departments" element={<DepartmentListPage />} /> {/* New Department routes */}
                <Route path="departments/add" element={<AddDepartmentPage />} />
                <Route path="departments/edit/:id" element={<EditDepartmentPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EmployeeProvider>
        </DepartmentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;