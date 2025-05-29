import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import GenerateTableHeader from "../../ui/customs/table/GenerateTableHeader";
import { Switch } from "../../ui/switch";
import { cn } from "@/lib/utils";
import { Products } from "@/lib/data";
import ProductDropdown from "./ProductDropdown";

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

export default function ProductTable({
  currentItems,
  handleAvailable,
}: {
  currentItems: Products[];
  handleAvailable?: (available: boolean, id: string) => void;
}) {
  function generateTableRow() {
    return (
      <>
        {currentItems.map((product) => (
          <TableRow key={product.productId} className="">
            <TableCell>{product.productId}</TableCell>
            <TableCell>
              <Switch
                onClick={() =>
                  handleAvailable(product.available, product.productId)
                }
                checked={product.available}
                id={product.productId}
                className={
                  product.available ? "!bg-themeOrange-300" : "!bg-gray-300"
                }
              />
            </TableCell>
            <TableCell className="flex items-center gap-2 w-[250px] md:w-full">
              <Image
                src={product.item.image}
                alt="product images"
                width={60}
                height={60}
                className="rounded-sm"
              />

              <p className="">{product.item.name}</p>
            </TableCell>
            <TableCell className="text-center">
              <p
                className={cn(
                  "px-3 py-1 w-fit block capitalize rounded-full font-medium",
                  product.status === "published" &&
                    "bg-themeGreen-300/30 text-themeGreen-500",
                  product.status === "sold out" &&
                    "bg-themeOrange-300/30 text-themeOrange-500",
                  product.status === "draft" &&
                    "bg-themeError-300/30 text-themeError-500"
                )}
              >
                {product.status}
              </p>
            </TableCell>
            <TableCell>${product.item.price.toLocaleString()}</TableCell>
            <TableCell>${product.sales}</TableCell>
            <TableCell>${product.revenue.toLocaleString()}</TableCell>
            <TableCell className="">
              <ProductDropdown
                product={product}
                handleAvailable={handleAvailable}
              />
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
