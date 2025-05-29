"use client";

import DatePicker from "@/components/ui/customs/DatePicker";
import ExportButton from "@/components/ui/customs/ExportButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationComponent from "@/components/PaginationComponent";
import { Orders } from "@/lib/data";
import OrderTable from "./OrderTable";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const options = ["all", "unpaid", "packed", "delivery", "completed", "cancel"];

export default function OrderSection({ orders }: { orders: Orders[] }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedOption = searchParams.get("status") || "all";

  const createURLWithStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    return `/orders?${params.toString()}`;
  };

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);
    router.push(`/orders?${params.toString()}`);
  };

  return (
    <div className="p-2 m-2 bg-white rounded-sm md:px-0 md:py-2 md:m-0 md:bg-none">
      <div className="flex items-start justify-between mb-4 md:flex-row md:items-center flex-wrap md:flex-nowrap gap-2">
        {!isMobile ? (
          <div className="flex items-center px-0.5 py-0.5 bg-gray-300/30 rounded-full w-fit overflow-hidden">
            {options.map((option) => (
              <Link
                href={createURLWithStatus(option)}
                key={option}
                className={`${
                  selectedOption === option
                    ? "bg-themeOrange-300 text-white font-medium rounded-full shadow-md"
                    : " text-black font-medium"
                } px-3 py-2 capitalize cursor-pointer transition-all duration-100 ease-in-out`}
              >
                {option}
              </Link>
            ))}
          </div>
        ) : (
          <Select
            name="status"
            value={selectedOption as string}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-[100px] rounded-full">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="md:ml-auto order-3 w-full md:order-2 md:w-fit">
          <DatePicker />
        </div>

        <div className="order-2 md:order-3">
          <ExportButton />
        </div>
      </div>

      <div className="">
        <PaginationComponent<Orders> items={orders} enableIsAvailable={false}>
          {({ currentItems }) => (
            <div className="mb-6 md:mb-4">
              <OrderTable currentItems={currentItems} />
            </div>
          )}
        </PaginationComponent>
      </div>
    </div>
  );
}
