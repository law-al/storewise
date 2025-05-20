import DatePicker from "@/components/utils/DatePicker";
import StatCard from "@/components/utils/StatCard";
import { ArrowRightIcon, ShoppingBag, User, Users2 } from "lucide-react";
import RevenueComponent from "@/components/RevenueComponent";
import ProfitBreakdownComponent from "@/components/ProfitBreakDownComponent";
import StatusProductComponent from "@/components/StatusProductComponent";
import Link from "next/link";
import ActivityComponent from "@/components/ActivityComponent";

// Define stat data for maintainability
const stats = [
  { title: "Total Revenue", value: "$17,987", icon: null, iconBgColor: null },
  {
    title: "Total Order",
    value: "1,987",
    Icon: ShoppingBag,
    iconBgColor: "bg-black",
  },
  {
    title: "Total Visitor",
    value: "987",
    Icon: User,
    iconBgColor: "bg-blue-400",
  },
  {
    title: "Total Customer",
    value: "17,187",
    Icon: Users2,
    iconBgColor: "bg-green-300",
  },
];

export default async function HomePage() {
  // Example: Fetch data server-side (uncomment if using API)
  // const statsData = await fetchStats(); // Replace with actual API call
  // const activities = await fetchActivities();

  return (
    <section className="mx-auto max-w-7xl p-4 md:p-0 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 bg-white md:bg-transparent">
      {/* GRID 1: Overview and Revenue */}
      <div className="py-2">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <h2 className="font-semibold text-base m-2 md:m-0">
            Overview Performance
          </h2>
          <DatePicker aria-label="Select date range" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 border-2 border-gray-300 rounded-lg overflow-hidden">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              Icon={stat.Icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

        <div className="mt-4">
          <RevenueComponent />
        </div>
      </div>

      {/* GRID 2: Profit, Status, and Activities */}
      <div>
        <div className="mb-4">
          <ProfitBreakdownComponent />
        </div>

        <div className="mb-4">
          <StatusProductComponent />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-base">Recent Activities</h2>
            <Link
              href="/activities"
              className="flex items-center gap-2 text-sm hover:underline"
              aria-label="View all recent activities"
            >
              See All
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <ActivityComponent />
        </div>
      </div>
    </section>
  );
}
