import { cn } from "@/lib/utils"; // Make sure this import exists
import { BadgeDollarSignIcon, ChartLine } from "lucide-react"; // Import needed icons
import Image from "next/image";

export default function StatCard({
  borderRight = false,
  borderLeft = false,
  borderBottom = false,
  title = "Total revenue",
  value = "$17,000",
  percentage = "12.3%",
  isPositive = true,
  Icon = BadgeDollarSignIcon,
  iconBgColor = "bg-themeOrange-400",
}) {
  return (
    <div
      className={cn(
        "p-4 min-h-[200px] flex flex-col justify-between outline-2 outline-gray-300", // Changed py-3 to p-4 for consistent padding
        // The border logic was incorrect - don't use "border-none" as fallback
        borderBottom && "border-b-2 border-b-gray-300",
        borderRight && "border-r-2 border-r-gray-300",
        borderLeft && "border-l-2 border-l-gray-300"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 md:gap-2">
          <div
            className={`w-[40px] h-[40px] rounded-full ${iconBgColor} flex items-center justify-center`}
          >
            <Icon className="text-white" size={20} />
          </div>
          <p className="text-sm md:text-[16px] font-semibold text-gray-500">
            {title}
          </p>
        </div>
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300/30">
          <Image src="/top-right.png" alt="" width={13} height={13} />
        </div>
      </div>

      <div className="mb-3">
        <span className="font-bold text-2xl">{value}</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        <div
          className={`flex items-center justify-center gap-0.5 rounded-full ${
            isPositive
              ? "bg-green-200/50 text-green-500"
              : "bg-red-200/50 text-red-500"
          } px-2 py-1 font-light`}
        >
          <ChartLine
            size={15}
            className={isPositive ? "rotate-0" : "rotate-180"}
          />
          {percentage}
        </div>
        <span className="text-gray-500">than last month</span>
      </div>
    </div>
  );
}
