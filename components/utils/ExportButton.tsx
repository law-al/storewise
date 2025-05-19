import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function ExportButton() {
  return (
    <Button className="flex items-center gap-2 md:gap-1 !py-5 !px-5 !rounded-full text-xs md:text-[14px]">
      <Download />
      Export
    </Button>
  );
}
