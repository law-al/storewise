"use client";

import { Plus } from "lucide-react";
import SideSheetBar from "./SideSheetBar";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export default function Navbar() {
  const { isMobile } = useSidebar();
  return (
    <nav className="md:w-full flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="hidden md:block heading-sm">
        <p>Hi Fajaar👋, Welcome Back</p>
      </div>
      <div className="order-first md:order-last flex items-center gap-2">
        <SideSheetBar />
        <SideSheetBar sheetType="notification" />
        {!isMobile ? (
          <Button className="flex items-center !p-5 gap-1 bg-themeOrange-400 text-white rounded-full shadow-md">
            <Plus size={10} />
            <p>Add Product</p>
          </Button>
        ) : (
          <p>Profile</p>
        )}
      </div>
    </nav>
  );
}
