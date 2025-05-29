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
    <div className="flex items-center p-0.5 rounded-full bg-gray-300/30 md:w-fit">
      {options.map((option, i) => (
        <div
          key={i}
          className={cn(
            "px-4 md:px-5 py-2.5 md:py-3 rounded-full cursor-pointer transition-all duration-100 ease-out",
            activeTab === i && "bg-themeOrange-300 text-white shadow-md"
          )}
          onClick={() => onSetActiveTab(i)}
        >
          <span className={cn("text-sm font-semibold capitalize")}>
            {option}
          </span>
        </div>
      ))}
    </div>
  );
}
