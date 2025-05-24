import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import GenerateTableHeader from "../utils/GenerateTableHeader";
import { cn } from "@/lib/utils";
import { OrderPhase, Orders, PaymentStatus } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Copy,
  DeleteIcon,
  LucideEye,
  MoreVertical,
  Pen,
  Share,
  ShoppingBag,
  X,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import OrderProgress from "../OrderProgress";

const tableHeadings = [
  "id",
  "product name",
  "status",
  "price",
  "item",
  "total",
  "action",
];

const orderDetailsTableHeadings = ["product name", "price"];

function generateOrderDetails(order: Orders) {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-xl">Detail Orders {order.id}</DialogTitle>
        <DialogClose className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>
      <Separator className="my-2 border border-gray-300/40" />
      <OrderProgress currentStatus={order.deliveryStatus} />
      <Separator className="my-2 border border-gray-300/40" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-themeOrange-300">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div className="">
            <h2 className="text-[18px] font-medium">Fajaar&apos;s order</h2>
            <p className="text-xs">{order.totalItems} items</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              getOrderStatus(order.status).color
            )}
          ></div>
          <p className="capitalize text-[14px]">{order.status}</p>
          <span
            className={cn(
              "px-2 py-0.5 text-sm rounded-full font-medium",
              getPaymentStatus(order.paymentStatus).background
            )}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>
      <Separator className="my-2 border border-gray-300/40" />
      <div className="">
        <Table>
          <GenerateTableHeader headings={orderDetailsTableHeadings} />
          <TableBody className="text-[12px] md:text-[16px]">
            <TableRow>
              <TableCell className="flex items-center gap-1 text-sm font-medium">
                <Image
                  src={order.product.image}
                  alt={order.product.name}
                  width={50}
                  height={50}
                />
                {order.product.name}
              </TableCell>
              <TableCell>${order.product.price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="p-4 rounded-lg bg-gray-300/30">
        <div className="flex flex-col gap-2 h-[100px] overflow-y-scroll">
          <div className="flex items-center justify-between">
            <p className="text-sm">Payment</p>
            <span className="text-sm capitalize">{order.paymentType}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Sub Total</p>
            <span className="text-sm capitalize">
              ${order.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Tax({order.taxPercent}%)</p>
            <span className="text-sm capitalize">
              ${order.taxAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Discount</p>
            <span className="text-sm text-red-400 capitaliz">
              -${order.discount.toLocaleString()}
            </span>
          </div>
        </div>
        <Separator className="my-2 border border-gray-300/40" />
        <div className="">
          <div className="flex items-center justify-between font-semibold">
            <p className="text">Total</p>
            <span className="capitalize text">
              ${order.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <DialogFooter className="flex items-center justify-between">
        <Button className="w-full rounded-full bg-themeOrange-300">
          Mark as shipped
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function getPaymentStatus(status: PaymentStatus) {
  switch (status) {
    case "pending":
      return {
        background: "bg-blue-300/30 text-blue-500",
      };
    case "paid":
      return {
        background: "bg-themeGreen-300/30 text-themeGreen-500",
      };
    case "failed":
      return {
        background: "bg-themeError-300/30 text-themeError-500",
      };
    default:
      return {
        background: "bg-themeOrange-300/30 text-themeOrange-500",
      };
  }
}

function getOrderStatus(status: OrderPhase) {
  switch (status) {
    case "processing":
      return {
        color: "bg-blue-300",
        background: "bg-blue-300/30 text-blue-500",
      };
    case "pending":
      return {
        color: "bg-gray-300",
        background: "bg-gray-300/30 text-gray-500",
      };
    case "shipped":
      return {
        color: "bg-themeOrange-300",
        background: "bg-themeOrange-300/30 text-themeOrange-500",
      };
    case "cancelled":
      return {
        color: "bg-themeError-300",
        background: "bg-themeError-300/30 text-themeError-500",
      };
    case "delivered":
      return {
        color: "bg-themeGreen-300",
        background: "bg-themeGreen-300/30 text-themeGreen-500",
      };
    default:
      return {
        color: "bg-themeError-300",
        background: "bg-themeError-300/30 text-themeError-500",
      };
  }
}

export default function OrderTable({
  currentItems,
}: {
  currentItems: Orders[];
}) {
  function generateTableRow() {
    return (
      <>
        {currentItems.map((order) => (
          <TableRow key={order.id} className="">
            <TableCell>{order.id}</TableCell>
            <TableCell className="flex items-center gap-2 w-[250px] md:w-full">
              <Image
                src={order.product.image}
                alt="product images"
                width={60}
                height={60}
                className="rounded-sm"
              />

              <p className="">{order.product.name}</p>
            </TableCell>
            <TableCell className="text-center">
              <p
                className={cn(
                  "px-3 py-1 w-fit block capitalize rounded-full font-medium",
                  getOrderStatus(order.status as OrderPhase).background
                )}
              >
                {order.status}
              </p>
            </TableCell>
            <TableCell>${order.product.price.toLocaleString()}</TableCell>
            <TableCell>${order.totalItems}</TableCell>
            <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
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
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className=""
                  >
                    <Dialog>
                      <DialogTrigger>
                        <div className="flex items-center gap-3 font-medium">
                          <LucideEye />
                          Preview
                        </div>
                      </DialogTrigger>
                      {generateOrderDetails(order)}
                    </Dialog>
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
