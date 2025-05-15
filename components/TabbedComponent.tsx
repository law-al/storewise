"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
type Options = string | ReactNode;

export default function TabbedComponent({
  options = [],
  activeTab,
  onSetActiveTab,
}: {
  options: Options[];
  activeTab: number;
  onSetActiveTab: (i: number) => void;
}) {
  return (
    <div className="flex items-center p-0.5 gap-2 rounded-full bg-gray-300/30">
      {options.map((option, i) => (
        <div
          key={i}
          className={cn(
            "px-3 md:px-4 py-1 md:py-2 rounded-full cursor-pointer transition-all duration-100",
            activeTab === i && "bg-themeOrange-300 text-white shadow-md"
          )}
          onClick={() => onSetActiveTab(i)}
        >
          <span className={cn("text-sm font-semibold")}>{option}</span>
        </div>
      ))}
    </div>
  );
}
