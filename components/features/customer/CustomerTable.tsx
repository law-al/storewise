import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import GenerateTableHeader from "../../ui/customs/table/GenerateTableHeader";
import { Customers } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import {
  Copy,
  DeleteIcon,
  EyeIcon,
  MoreVertical,
  Pen,
  Share,
} from "lucide-react";

const tableHeadings = [
  "ID",
  "customer name",
  "phone number",
  "Address",
  "Date joined",
  "total spent",
  "action",
];

export default function CustomerTable({
  currentItems,
}: {
  currentItems: Customers[];
}) {
  function generateTableRow() {
    return (
      <>
        {currentItems.map((customer) => (
          <TableRow key={customer.id} className="">
            <TableCell className="uppercase">{customer.id}</TableCell>
            <TableCell className="flex items-center gap-2 w-[250px] md:w-full">
              <Image
                src={customer.image}
                alt="customer image images"
                width={60}
                height={60}
                className="rounded-full object-cover w-[60px] h-[60px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[70px] xl:h-[70px]"
              />

              <div className="">
                <p className="font-medium text-[16px]">{customer.name}</p>
                <span className="text-xs">{customer.email}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <p>{customer.phone}</p>
            </TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>{customer.dateJoined.toLocaleDateString()}</TableCell>
            <TableCell>${customer.totalSpends.toLocaleString()}</TableCell>
            <TableCell className="">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center w-full cursor-pointer">
                  <MoreVertical size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  onSelect={(e) => e.preventDefault()}
                  sideOffset={2}
                  align="end"
                  alignOffset={50}
                  side="bottom"
                  className=""
                >
                  <DropdownMenuItem className="flex items-center gap-3 font-medium">
                    <Pen />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 font-medium">
                    <Share />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="">
                    <EyeIcon />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-3 font-medium">
                    <Copy />
                    Copy ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-3 font-medium text-red-400">
                    <DeleteIcon className="text-red-400" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
      <Table>
        <GenerateTableHeader headings={tableHeadings} />
        <TableBody className="text-[12px] md:text-[16px]">
          {generateTableRow()}
        </TableBody>
      </Table>
    </>
  );
}
