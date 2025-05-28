"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftOpen, PanelRightOpen, X } from "lucide-react";

export function CustomTrigger({
  isCollapsed,
  isMobile = false,
}: {
  isCollapsed?: boolean;
  isMobile?: boolean;
}) {
  const { toggleSidebar } = useSidebar();

  return !isMobile ? (
    <button onClick={toggleSidebar}>
      {isCollapsed ? <PanelLeftOpen /> : <PanelRightOpen />}
    </button>
  ) : (
    <button onClick={toggleSidebar}>
      <X size={15} />
    </button>
  );
}
