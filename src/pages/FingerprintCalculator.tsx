"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";
import * as XLSX from "xlsx"; // Import the xlsx library

interface FingerprintRecord {
  [key: string]: any; // Flexible interface for Excel data
}

const FingerprintCalculator = () => {
  const [flexibleTimeMinutes, setFlexibleTimeMinutes] = useState<number>(60);
  const [entryExitTime, setEntryExitTime] = useState<string>("09:00");
  const [holidays, setHolidays] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<FingerprintRecord[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          try {
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json<FingerprintRecord>(worksheet);
            setExcelData(json);
            showSuccess(`Excel file "${file.name}" loaded successfully.`);
          } catch (error) {
            showError("Error reading Excel file. Please ensure it's a valid .xlsx file.");
            console.error("Excel read error:", error);
            setExcelData(null);
            setFileName(null);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setExcelData(null);
      setFileName(null);
    }
  };

  const handleCalculate = () => {
    // Basic validation
    if (!entryExitTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      showError("Please enter a valid entry/exit time (HH:MM).");
      setCalculationResult(null);
      return;
    }
    if (flexibleTimeMinutes < 0) {
      showError("Flexible time duration cannot be negative.");
      setCalculationResult(null);
      return;
    }

    const holidayList = holidays
      .split(",")
      .map((date) => date.trim())
      .filter(Boolean);

    let resultMessage = `Calculation parameters:
      - Flexible Time: ${flexibleTimeMinutes} minutes
      - Standard Entry/Exit: ${entryExitTime}
      - Holidays: ${holidayList.length > 0 ? holidayList.join(", ") : "None"}`;

    if (excelData && excelData.length > 0) {
      resultMessage += `\n\nProcessing data from Excel file: "${fileName}"`;
      resultMessage += `\nTotal records: ${excelData.length}`;
      resultMessage += `\n\n--- Simulated Attendance Report ---`;

      // --- Placeholder for actual attendance calculation logic ---
      // You will need to adapt this based on your Excel file's column names
      // For example, if your Excel has columns like 'EmployeeID', 'Timestamp':
      const attendanceSummary: { [employeeId: string]: { [date: string]: string[] } } = {};

      excelData.forEach((record) => {
        // Assuming 'EmployeeID' and 'Timestamp' are column names in your Excel
        const employeeId = record["EmployeeID"] || record["Employee ID"] || "Unknown Employee";
        const timestampStr = record["Timestamp"] || record["Time"] || record["Date/Time"]; // Adjust column name as per your Excel

        if (employeeId && timestampStr) {
          const timestamp = new Date(timestampStr); // Attempt to parse timestamp
          if (!isNaN(timestamp.getTime())) {
            const dateKey = timestamp.toISOString().split('T')[0]; // YYYY-MM-DD
            if (!attendanceSummary[employeeId]) {
              attendanceSummary[employeeId] = {};
            }
            if (!attendanceSummary[employeeId][dateKey]) {
              attendanceSummary[employeeId][dateKey] = [];
            }
            attendanceSummary[employeeId][dateKey].push(timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
          }
        }
      });

      for (const empId in attendanceSummary) {
        resultMessage += `\n\nEmployee: ${empId}`;
        for (const date in attendanceSummary[empId]) {
          const punches = attendanceSummary[empId][date].sort();
          const firstPunch = punches[0];
          const lastPunch = punches[punches.length - 1];

          // Simple simulation: check if first punch is after standard entry time + flexible time
          const [stdHour, stdMinute] = entryExitTime.split(':').map(Number);
          const stdEntryDate = new Date(`${date}T${entryExitTime}:00`);
          const flexibleEntryLimit = new Date(stdEntryDate.getTime() + flexibleTimeMinutes * 60 * 1000);

          let status = "Present";
          if (new Date(`${date}T${firstPunch}:00`) > flexibleEntryLimit) {
            status = "Late";
          }
          // More complex logic for early exit, missing punches, etc., would go here.

          resultMessage += `\n  Date: ${date}, Punches: ${punches.join(', ')}, Status: ${status}`;
        }
      }
      // --- End of placeholder logic ---

      resultMessage += "\n\nNote: The attendance calculation above is a simplified simulation. You need to implement the precise logic based on your ZKTeco data format and company policies (e.g., specific columns for employee ID, timestamp, shift rules, etc.).";
    } else {
      resultMessage += "\n\nNo Excel data loaded. Calculation based on manual parameters only.";
    }

    setCalculationResult(resultMessage);
    showSuccess("Calculation parameters received. Result displayed below.");
  };

  const handleClear = () => {
    setFlexibleTimeMinutes(60);
    setEntryExitTime("09:00");
    setHolidays("");
    setCalculationResult(null);
    setExcelData(null);
    setFileName(null);
    showSuccess("Form cleared.");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Fingerprint Attendance Calculator</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Configure parameters and upload ZKTeco fingerprint data for attendance calculation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="flexibleTime" className="text-gray-700 dark:text-gray-300">Flexible Time Duration (in minutes)</Label>
            <Input
              id="flexibleTime"
              type="number"
              value={flexibleTimeMinutes}
              onChange={(e) => setFlexibleTimeMinutes(Number(e.target.value))}
              placeholder="e.g., 60"
              min="0"
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              The duration (in minutes) an employee can be late or leave early without penalty.
            </p>
          </div>

          <div>
            <Label htmlFor="entryExitTime" className="text-gray-700 dark:text-gray-300">Standard Entry or Exit Time (HH:MM)</Label>
            <Input
              id="entryExitTime"
              type="text"
              value={entryExitTime}
              onChange={(e) => setEntryExitTime(e.target.value)}
              placeholder="e.g., 09:00"
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              The standard time for entry or exit (e.g., 09:00 for morning entry).
            </p>
          </div>

          <div>
            <Label htmlFor="holidays" className="text-gray-700 dark:text-gray-300">Annual and Weekly Holidays (YYYY-MM-DD, comma-separated)</Label>
            <Textarea
              id="holidays"
              value={holidays}
              onChange={(e) => setHolidays(e.target.value)}
              placeholder="e.g., 2023-12-25, 2024-01-01"
              rows={4}
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              A list of all annual and weekly holidays, separated by commas.
            </p>
          </div>

          <div>
            <Label htmlFor="excelFile" className="text-gray-700 dark:text-gray-300">Upload ZKTeco Fingerprint Data (Excel .xlsx)</Label>
            <Input
              id="excelFile"
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 file:text-gray-900 dark:file:text-gray-100 file:bg-gray-200 dark:file:bg-gray-600 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md"
            />
            {fileName && (
              <p className="text-sm text-muted-foreground mt-1">
                Loaded file: <span className="font-medium">{fileName}</span> ({excelData?.length || 0} records)
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Upload an Excel file containing employee fingerprint records (e.g., EmployeeID, Timestamp columns).
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleCalculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Calculate Attendance
            </Button>
            <Button onClick={handleClear} variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Clear Form
            </Button>
          </div>

          {calculationResult && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              <h3 className="font-semibold text-lg mb-2">Calculation Result (Simulation):</h3>
              <p>{calculationResult}</p>
            </div>
          )}

          <p className="text-sm text-red-500 dark:text-red-400 mt-4">
            Note: Direct integration with ZKTeco fingerprint devices and raw biometric data processing requires a backend service. This interface allows you to configure parameters and simulate attendance calculation based on uploaded Excel data. You will need to adjust the attendance calculation logic within the code to match the exact column names and rules from your ZKTeco Excel export.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FingerprintCalculator;