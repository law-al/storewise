import React from "react";
import { Button } from "../button";
import { Download } from "lucide-react";

export default function ExportButton() {
  return (
    <Button
      size="pill"
      variant="normal"
      className="flex items-center gap-2 md:gap-1 text-xs md:text-[14px] py-3"
    >
      <Download />
      Export
    </Button>
  );
}
