import DatePicker from "@/components/DatePicker";
import StatCard from "@/components/StatCard";
import React from "react";
import { ArrowRightIcon, ShoppingBag, User, Users2 } from "lucide-react";
import RevenueComponent from "@/components/RevenueComponent";
import ProfitBreakdownComponent from "@/components/ProfitBreakDownComponent";
import StatusProductComponent from "@/components/StatusProductComponent";
import Link from "next/link";
import ActivityComponent from "@/components/ActivityComponent";

export default function HomePage() {
  return (
    <section className="grid m-2 md:m-0 rounded-md md:rounded-none p-6 md:p-0 grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 bg-white">
      {/* GRID 1 */}
      <div className=" py-2">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="font-semibold text-[16px] m-1 md:m-0">
            Overview Performance
          </div>
          <DatePicker />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg gap-0.5 border-2 border-gray-300 overflow-hidden">
          <StatCard title="Total Revenue" value="$17,987" />
          <StatCard
            // borderBottom
            title="Total Order"
            value="1,987"
            Icon={ShoppingBag}
            iconBgColor="bg-black"
          />
          <StatCard
            title="Total Visitor"
            value="987"
            Icon={User}
            iconBgColor="bg-blue-400"
          />
          <StatCard
            title="Total Customer"
            value="17,187"
            Icon={Users2}
            iconBgColor=" bg-themeGreen-300"
          />
        </div>

        {/* Revenue */}
        <div className="mt-4">
          <RevenueComponent />
        </div>
      </div>

      {/* GRID 2 */}
      <div className="">
        <div className="mb-4">
          <ProfitBreakdownComponent />
        </div>

        <div className="mb-4">
          <StatusProductComponent />
        </div>

        <div className="">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-[16px]">Recent Activities</p>
            <Link href="/" className="flex items-center gap-2 text-sm">
              See All
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="">
            <ActivityComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
