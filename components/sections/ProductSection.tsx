"use client";

import DatePicker from "@/components/utils/DatePicker";
import ExportButton from "@/components/utils/ExportButton";
import TabbedComponent from "@/components/utils/TabbedComponent";
import { LayoutGrid, List } from "lucide-react";
import React, { useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import ProductTable from "@/components/tables/ProductTable";
import { Products } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

const options = [<List key={1} size={18} />, <LayoutGrid key={2} size={18} />];

export default function ProductSection({
  products,
  children,
}: {
  products: Products[];
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleActive(i: number) {
    setActiveTab(i);
  }
  return (
    <div className="m-2 p-2 md:px-0 md:py-2 md:m-0 bg-white md:bg-none rounded-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="font-semibold text-[16px] m-2 md:m-0">
          Overview Performance
        </div>
        <div className="flex flex-wrap md:w-fit items-center justify-between md:justify-start gap-2">
          <div className="w-fit">
            <TabbedComponent
              options={options}
              activeTab={activeTab}
              onSetActiveTab={handleActive}
            />
          </div>

          <div className="order-3 md:order-2 w-full md:w-fit">
            <DatePicker />
          </div>

          <div className="order-2 md:order-3">
            <ExportButton />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-gray-300 rounded-lg overflow-hidden mb-3">
        {children}
      </div>

      <div className="">
        <PaginationComponent<Products>
          items={products}
          enableIsAvailable={true}
        >
          {({ currentItems, handleAvailable }) => (
            <div className="mb-6 md:mb-4">
              {activeTab === 0 && (
                <ProductTable
                  currentItems={currentItems}
                  handleAvailable={handleAvailable}
                />
              )}

              {activeTab === 1 && (
                <ProductGrid
                  currentItems={currentItems}
                  handleAvailable={handleAvailable}
                />
              )}
            </div>
          )}
        </PaginationComponent>
      </div>
    </div>
  );
}
