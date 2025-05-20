import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

const GenerateTableHeader = ({ headings }: { headings: string[] }) => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-300">
        {headings.map((heading) => (
          <TableHead
            key={heading}
            className={`${
              heading === "action" ? "text-center" : ""
            } capitalize text-[12px] md:text-[16px] h-8`}
          >
            {heading}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default React.memo(GenerateTableHeader);
