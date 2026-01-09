"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

const FingerprintCalculator = () => {
  const [flexibleTimeMinutes, setFlexibleTimeMinutes] = useState<number>(60); // Default 60 minutes
  const [entryExitTime, setEntryExitTime] = useState<string>("09:00"); // Default entry time
  const [holidays, setHolidays] = useState<string>(""); // Comma-separated dates

  const handleCalculate = () => {
    // In a real application, this would involve sending data to a backend
    // for processing ZKTeco fingerprint logs, flexible time, and holidays.
    // For this client-side example, we'll just simulate a calculation.

    console.log("Flexible Time (minutes):", flexibleTimeMinutes);
    console.log("Entry/Exit Time:", entryExitTime);
    console.log("Holidays:", holidays);

    // Basic validation
    if (!entryExitTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      showError("Please enter a valid entry/exit time (HH:MM).");
      return;
    }
    if (flexibleTimeMinutes < 0) {
      showError("Flexible time duration cannot be negative.");
      return;
    }

    // Simulate calculation logic
    const holidayList = holidays
      .split(",")
      .map((date) => date.trim())
      .filter(Boolean);

    let resultMessage = `Calculation initiated with:
      - Flexible Time: ${flexibleTimeMinutes} minutes
      - Standard Entry/Exit: ${entryExitTime}
      - Holidays: ${holidayList.length > 0 ? holidayList.join(", ") : "None"}`;

    // Placeholder for actual ZKTeco data processing and attendance calculation
    resultMessage += "\n\nNote: Actual ZKTeco fingerprint data processing requires a backend service.";

    showSuccess("Calculation parameters received. Check console for details.");
    alert(resultMessage); // Using alert for immediate feedback, could be a state update to display on page
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Fingerprint Attendance Calculator</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Configure parameters for attendance calculation based on ZKTeco data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="flexibleTime" className="text-gray-700 dark:text-gray-300">مدة الوقت المرن (بالدقائق)</Label>
            <Input
              id="flexibleTime"
              type="number"
              value={flexibleTimeMinutes}
              onChange={(e) => setFlexibleTimeMinutes(Number(e.target.value))}
              placeholder="مثال: 60"
              min="0"
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              المدة (بالدقائق) التي يمكن للموظف أن يتأخر فيها أو يغادر مبكرًا دون عقوبة.
            </p>
          </div>

          <div>
            <Label htmlFor="entryExitTime" className="text-gray-700 dark:text-gray-300">ساعة الدخول أو الخروج القياسية (HH:MM)</Label>
            <Input
              id="entryExitTime"
              type="text"
              value={entryExitTime}
              onChange={(e) => setEntryExitTime(e.target.value)}
              placeholder="مثال: 09:00"
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              الوقت القياسي للدخول أو الخروج (مثال: 09:00 لدخول الصباح).
            </p>
          </div>

          <div>
            <Label htmlFor="holidays" className="text-gray-700 dark:text-gray-300">أيام العطل السنوية والأسبوعية (YYYY-MM-DD، مفصولة بفاصلة)</Label>
            <Textarea
              id="holidays"
              value={holidays}
              onChange={(e) => setHolidays(e.target.value)}
              placeholder="مثال: 2023-12-25, 2024-01-01"
              rows={4}
              className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-sm text-muted-foreground mt-1">
              قائمة بجميع العطل السنوية والأسبوعية، مفصولة بفاصلات.
            </p>
          </div>

          <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            حساب الحضور
          </Button>

          <p className="text-sm text-red-500 dark:text-red-400 mt-4">
            ملاحظة: يتطلب التكامل المباشر مع أجهزة بصمات الأصابع ZKTeco ومعالجة البيانات البيومترية الأولية خدمة خلفية (backend). تسمح لك هذه الواجهة بتكوين المعلمات لنظام افتراضي لحساب الحضور.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FingerprintCalculator;