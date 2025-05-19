"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bar, BarChart, YAxis, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { ChartLine } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const isPositive = true;

const chartData = [
  { date: "2024-07-15", running: 450, swimming: 700, jogging: 200 },
];

const chartConfig = {
  running: {
    label: "Running",
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function StatusProductComponent() {
  const isMobile = useIsMobile();
  // console.log(isMobile);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-300">
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-semibold"> Status Product</h3>

          <HoverCard>
            <HoverCardTrigger>&#9432;</HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="flex items-center gap-1">
          <p className="font-medium text-[18px]">170</p>
          <p className="text-sm  text-gray-500">Product</p>
          <div
            className={`flex items-center justify-center text-xs gap-0.5 rounded-full ${
              isPositive
                ? "bg-green-200/50 text-green-500"
                : "bg-red-200/50 text-red-500"
            } px-4 py-1 font-light`}
          >
            <ChartLine
              size={15}
              className={isPositive ? "rotate-0" : "rotate-180"}
            />
            12%
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4">
        <ChartContainer
          config={chartConfig}
          className={`aspect-square ${
            isMobile ? "h-[80px]" : "h-[100px]"
          }  w-full`}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            barSize={45} // This makes the bars thinner
            barCategoryGap={16}
            style={{ stroke: "#fff", strokeWidth: 8 }}
            cy={20}
          >
            <YAxis
              hide
              dataKey=""
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#6b7280" }}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickCount={3}
              tick={{ fill: "#6b7280" }}
              width={100}
              domain={["dataMin", "dataMax"]}
            />
            <Bar
              dataKey="running"
              stackId="a"
              fill="var(--themeOrange-300)" // Indigo color
              radius={[20, 20, 20, 20]}
              name="running"
            />
            <Bar
              dataKey="swimming"
              stackId="a"
              fill="var(--themeGreen-300)" // Teal color
              radius={[20, 20, 20, 20]}
              name="swimming"
            />
            <Bar
              dataKey="jogging"
              stackId="a"
              fill="var(--themeInfo-300)"
              radius={[20, 20, 20, 20]}
              name="jogging"
            />
            {/* <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={1}
            /> */}
          </BarChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-xs bg-themeOrange-300"></div>
            <p className="text-sm font-medium">Active Listings</p>
          </div>

          <p className="text-sm">80 products</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-xs bg-themeGreen-300"></div>
            <p className="text-sm font-medium">Sold Outs</p>
          </div>

          <p className="text-sm">20 products</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-xs bg-themeInfo-300"></div>
            <p className="text-sm font-medium">Testing</p>
          </div>

          <p className="text-sm">7 products</p>
        </div>
      </div>
    </div>
  );
}
