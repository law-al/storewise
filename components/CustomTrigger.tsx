"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

export function CustomTrigger({ isCollapsed }: { isCollapsed: boolean }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      {isCollapsed ? <PanelLeftOpen /> : <PanelRightOpen />}
    </button>
  );
}
