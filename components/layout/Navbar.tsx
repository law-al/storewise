"use client";

import { Plus } from "lucide-react";
import SideSheetBar from "./SideSheetBar";
import { useSidebar } from "../ui/sidebar";

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
        {!isMobile ? <SideSheetBar sheetType="add-product" /> : <p>Profile</p>}
      </div>
    </nav>
  );
}
