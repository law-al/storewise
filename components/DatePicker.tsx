"use client";
import { startOfWeek, endOfWeek, format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Calendar1 } from "lucide-react";

function getWeeklyRange(date: Date = new Date()): string {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(date, { weekStartsOn: 6 }); // Sunday

  const startFormatted = format(start, "dd EEE"); // 12 Mon
  const endFormatted = format(end, "d EEE yyyy"); // 17 Fri 2025

  return `${startFormatted} - ${endFormatted}`;
}

export default function DatePicker() {
  const [options, setOptions] = useState("light");
  const currentDate = Date.now();
  console.log(
    new Date(currentDate).toLocaleDateString("en-US", {
      day: "2-digit",
      weekday: "long",
    })
  );

  console.log(options);

  return (
    <div className="flex items-center justify-between w-full md:w-[300px] border border-gray-300 px-4 py-1 rounded-full">
      <div className="flex items-center gap-1">
        <Calendar1 size={20} />
        <p className="text-sm">{getWeeklyRange()}</p>
      </div>
      <Select value={options} onValueChange={setOptions}>
        <SelectTrigger className="border-transparent ring-transparent">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Weekly</SelectItem>
          <SelectItem value="dark">Daily</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
