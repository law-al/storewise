"use client";

import OrderTabbedComponent from "@/components/OrderTabbedComponent";
import PaginationComponent from "@/components/PaginationComponent";
import OrderTable from "@/components/tables/OrderTable";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import DatePicker from "@/components/utils/DatePicker";
import ExportButton from "@/components/utils/ExportButton";
import GenerateTableHeader from "@/components/utils/GenerateTableHeader";
import ProductDropdown from "@/components/utils/ProductDropdown";
import { orders } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <section>
      <div className="m-2 p-2 md:px-0 md:py-2 md:m-0 bg-white md:bg-none rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="font-semibold text-[16px] m-2 md:m-0">
            <OrderTabbedComponent />
          </div>
          <div className="flex flex-wrap md:w-fit items-center justify-between md:justify-start gap-2">
            <div className="order-3 md:order-2 w-full md:w-fit">
              <DatePicker />
            </div>

            <div className="order-2 md:order-3">
              <ExportButton />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <PaginationComponent items={orders}>
          {({ currentItems }) => (
            <>
              <OrderTable currentItems={currentItems} />
            </>
          )}
        </PaginationComponent>
      </div>
    </section>
  );
}
