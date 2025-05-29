"use client";

import React from "react";
import DatePicker from "../../ui/customs/DatePicker";
import ExportButton from "../../ui/customs/ExportButton";
import PaginationComponent from "../../PaginationComponent";
import { Customers, sampleCustomers } from "@/lib/data";
import CustomerTable from "./CustomerTable";

export default function CustomerSection() {
  return (
    <div>
      <div className="p-2 m-2 bg-white rounded-sm md:px-0 md:py-2 md:m-0 md:bg-none">
        <div className="flex items-start justify-between mb-4 md:flex-row md:items-center flex-wrap md:flex-nowrap gap-2">
          <p className="">Info</p>
          <div className="md:ml-auto order-3 w-full md:order-2 md:w-fit">
            <DatePicker />
          </div>

          <div className="order-2 md:order-3">
            <ExportButton />
          </div>
        </div>

        <div className="">
          <PaginationComponent<Customers>
            items={sampleCustomers}
            enableIsAvailable={false}
          >
            {({ currentItems }) => (
              <div className="mb-6 md:mb-4">
                <CustomerTable currentItems={currentItems} />
              </div>
            )}
          </PaginationComponent>
        </div>
      </div>
    </div>
  );
}
