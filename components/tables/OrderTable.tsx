import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import GenerateTableHeader from "../utils/GenerateTableHeader";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Orders, Products } from "@/lib/data";
import ProductDropdown from "../utils/ProductDropdown";
import React from "react";

const tableHeadings = [
  "id",
  "availability",
  "product name",
  "status",
  "price",
  "sales",
  "revenue",
  "action",
];

const OrderTable = ({
  currentItems,
  handleAvailable,
}: {
  currentItems: Orders[];
  handleAvailable?: (available: boolean, id: string) => void;
}) => {
  function generateTableRow() {
    return (
      <>
        {currentItems.map((product) => (
          <TableRow key={product.id} className="">
            <TableCell>{product.id}</TableCell>
            <TableCell className="flex items-center gap-2 w-[250px] md:w-full">
              <Image
                src={product.product.image}
                alt="product images"
                width={60}
                height={60}
                className="rounded-sm"
              />

              <p className="">{product.product.name}</p>
            </TableCell>
            <TableCell className="text-center">
              <p
                className={cn(
                  "px-3 py-1 w-fit block capitalize rounded-full font-medium",
                  product.status === "completed" &&
                    "bg-themeGreen-300/30 text-themeGreen-500",
                  product.status === "pending" &&
                    "bg-themeOrange-300/30 text-themeOrange-500",
                  product.status === "shipped" &&
                    "bg-themeError-300/30 text-themeError-500"
                )}
              >
                {product.status}
              </p>
            </TableCell>
            <TableCell>${product.product.price.toLocaleString()}</TableCell>
            <TableCell>${product.totalItems}</TableCell>
            <TableCell>${product.totalPrice.toLocaleString()}</TableCell>
            {/* <TableCell className="">
              <ProductDropdown
                product={product}
                handleAvailable={handleAvailable}
              />
            </TableCell> */}
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
};

export default React.memo(OrderTable);
