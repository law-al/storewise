"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = ["all", "unpaid", "packed", "delivered", "completed", "cancel"];

export default function OrderTabbedComponent() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div>
      {isMobile ? (
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="flex items-center p-1 rounded-full bg-gray-300/20 md:w-fit">
          {options.map((option) => (
            <div
              onClick={() => setActiveTab(option)}
              key={option}
              className={`${
                activeTab === option
                  ? "bg-themeOrange-300 shadow-sm text-white"
                  : "text-black"
              } px-4 md:px-5 py-2.5 md:py-3 rounded-full cursor-pointer transition-all duration-100 ease-out capitalize `}
            >
              <span className="text-sm font-semibold"> {option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
