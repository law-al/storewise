"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import SearchDashboard from "../features/dashboard/SearchDashboard";
import NotificationDashboard from "../features/dashboard/NotificationDashboard";
import CreateProductFormSheet from "../features/products/CreateProductFormSheet";

export default function SideSheetBar({
  sheetType = "search",
}: {
  sheetType?: "search" | "notification" | "add-product";
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          {sheetType === "search" && (
            <div className="sm-button md:pl-2 md:py-0.5 md:w-[250px] md:rounded-full md:flex md:items-center md:gap-0.5 md:bg-gray-300/20 md:shadow-xs">
              <Search size={20} className="text-gray-500" />
              <Input
                placeholder="Search"
                className="hidden md:block flex-1 !border-0 !ring-0 active:!border-0 active:!ring-0"
              />
            </div>
          )}

          {sheetType === "notification" && (
            <div className="sm-button">
              <BellIcon size={20} className="text-gray-500" />
            </div>
          )}

          {sheetType === "add-product" && (
            <div className="flex items-center gap-1 px-4 py-3 text-sm text-white rounded-full shadow-md cursor-pointer bg-themeOrange-400">
              <Plus size={10} />
              <p>Add Product</p>
            </div>
          )}
        </SheetTrigger>
        <SheetContent side="custom-right" className="max-w-xl">
          {sheetType === "search" && <SearchDashboard />}

          {sheetType === "notification" && <NotificationDashboard />}

          {sheetType === "add-product" && <CreateProductFormSheet />}
        </SheetContent>
      </Sheet>
    </>
  );
}
