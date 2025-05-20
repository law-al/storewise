"use client";

import DatePicker from "@/components/utils/DatePicker";
import ExportButton from "@/components/utils/ExportButton";
import StatCard from "@/components/utils/StatCard";
import TabbedComponent from "@/components/utils/TabbedComponent";
import { LayoutGrid, List, ShoppingBag, Users2 } from "lucide-react";
import { useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import ProductTable from "@/components/tables/ProductTable";
import ProductGrid from "@/components/ProductGrid";
import { Products } from "@/lib/data";

const options = [<List key={1} size={18} />, <LayoutGrid key={2} size={18} />];

const products: Products[] = [
  {
    productId: "#001",
    available: true,
    item: {
      name: "Nike Air Max 270",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 150,
    },
    status: "published",
    sales: 80,
    revenue: 12000,
  },
  {
    productId: "#002",
    available: false,
    item: {
      name: "Adidas Ultraboost",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 180,
    },
    status: "sold out",
    sales: 50,
    revenue: 9000,
  },
  {
    productId: "#003",
    available: true,
    item: {
      name: "Puma RS-X",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 120,
    },
    status: "published",
    sales: 100,
    revenue: 12000,
  },
  {
    productId: "#004",
    available: true,
    item: {
      name: "New Balance 990v5",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 175,
    },
    status: "draft",
    sales: 20,
    revenue: 3500,
  },
  {
    productId: "#005",
    available: false,
    item: {
      name: "Reebok Classic Leather",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 90,
    },
    status: "published",
    sales: 60,
    revenue: 5400,
  },
  {
    productId: "#006",
    available: true,
    item: {
      name: "Asics Gel-Kayano",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 160,
    },
    status: "published",
    sales: 45,
    revenue: 7200,
  },
  {
    productId: "#007",
    available: true,
    item: {
      name: "Under Armour HOVR",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 130,
    },
    status: "published",
    sales: 70,
    revenue: 9100,
  },
  {
    productId: "#008",
    available: false,
    item: {
      name: "Vans Old Skool",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 70,
    },
    status: "sold out",
    sales: 200,
    revenue: 14000,
  },
  {
    productId: "#009",
    available: true,
    item: {
      name: "Converse Chuck Taylor",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 60,
    },
    status: "published",
    sales: 150,
    revenue: 9000,
  },
  {
    productId: "#010",
    available: true,
    item: {
      name: "Salomon XT-6",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 200,
    },
    status: "published",
    sales: 30,
    revenue: 6000,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleActive(i: number) {
    setActiveTab(i);
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
          <PaginationComponent items={products}>
            {({ currentItems, handleAvailable }) => (
              <>
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
              </>
            )}
          </PaginationComponent>
        </div>
      </div>
    </section>
  );
}
