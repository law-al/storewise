"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon, Search } from "lucide-react";
import { Input } from "./ui/input";
import SearchDashboard from "./SearchDashboard";
import NotificationDashboard from "./NotificationDashboard";

export default function SideSheetBar({
  sheetType = "search",
}: {
  sheetType?: "search" | "notification";
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          {sheetType === "search" ? (
            <div className="sm-button md:pl-2 md:py-0.5 md:w-[250px] md:rounded-full md:flex md:items-center md:gap-0.5 md:bg-gray-300/20 md:shadow-xs">
              <Search size={20} className="text-gray-500" />
              <Input
                placeholder="Search"
                className="hidden md:block flex-1 !border-0 !ring-0 active:!border-0 active:!ring-0"
              />
            </div>
          ) : (
            <div className="sm-button">
              <BellIcon size={20} className="text-gray-500" />
            </div>
          )}
        </SheetTrigger>
        <SheetContent side="custom-right" className="max-w-xl">
          {sheetType === "search" ? (
            <>
              <SearchDashboard />
            </>
          ) : (
            <NotificationDashboard />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
