"use client";

import DatePicker from "@/components/utils/DatePicker";
import ExportButton from "@/components/utils/ExportButton";
import StatCard from "@/components/utils/StatCard";
import TabbedComponent from "@/components/utils/TabbedComponent";
import { LayoutGrid, List, ShoppingBag, Users2 } from "lucide-react";
import { useCallback, useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import ProductTable from "@/components/tables/ProductTable";
import { products, Products } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

const options = [<List key={1} size={18} />, <LayoutGrid key={2} size={18} />];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const [currentItems, setCurrentItems] = useState<Products[]>([]);

  function handleActive(i: number) {
    setActiveTab(i);
  }

  console.log(activeTab);

  // Goes to the pagination component
  const handleSetCurrentItem = useCallback((items: Products[]) => {
    setCurrentItems(items);
  }, []); // works like caching
  //without useCallback, Every time the parent re-renders, a new version of handleSetCurrentItem is created.
  // The child element thinks it is a new props which re activates the useEffect via the dependancies and this cause useEffect to run always.

  // Goes to the producttable component
  function handleAvailable(available: boolean, id: string) {
    setCurrentItems((prev) =>
      prev.map((product) =>
        product.productId === id
          ? { ...product, available: !available }
          : product
      )
    );
  }

  return (
    <section>
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
          <StatCard title="Total Revenue" value="$17,987" />
          <StatCard
            // borderBottom
            title="Total Sales"
            value="1,987"
            Icon={ShoppingBag}
            iconBgColor="bg-black"
          />
          <StatCard
            title="Total Product"
            value="17,187"
            Icon={Users2}
            iconBgColor=" bg-themeInfo-300"
          />
        </div>

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

        <div className="">
          <PaginationComponent
            items={products}
            handleSetCurrentItem={handleSetCurrentItem}
          />
        </div>
      </div>
    </section>
  );
}
