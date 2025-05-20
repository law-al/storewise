"use client";

import React, { useState, useMemo, useCallback } from "react";
import TabbedComponent from "./utils/TabbedComponent";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { graphData, TimeRange } from "@/lib/data";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Define options and chart config for maintainability
const options: string[] = ["Yearly", "Monthly", "Weekly"];

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--themeOrange-400)",
  },
} satisfies ChartConfig;

export default function RevenueComponent() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleActive = useCallback((i: number) => {
    setActiveTab(i);
  }, []);

  const selected: TimeRange = options[activeTab].toLowerCase() as TimeRange;
  const data = useMemo(() => graphData[selected] || [], [selected]);

  return (
    <div className="border-2 border-gray-300 p-4 rounded-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="mb-2">
          <h2 className="font-semibold text-base" id="revenue-chart-title">
            Total Revenue
          </h2>
          <span className="text-sm text-gray-400">
            Here's the summary of the overall data
          </span>
        </div>
        <div className="flex items-center w-full md:w-auto ml-auto gap-4">
          <TabbedComponent
            options={options}
            activeTab={activeTab}
            onSetActiveTab={handleActive}
            aria-label="Select time range for revenue chart"
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            aria-label="View revenue details"
          >
            <Link href="/revenue-details">
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="mt-5 h-[250px] md:h-[300px] flex items-center justify-center text-gray-500">
          No data available for {options[activeTab]} view
        </div>
      ) : (
        <div className="mt-5 h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
              aria-describedby="revenue-chart-title"
            >
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{ left: -10, right: -10, top: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="value"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value?.slice(0, 3) || ""}
                />
                <YAxis
                  className="font-semibold text-black"
                  dataKey="revenue"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `$${Math.round(value / 1000)}k`
                      : `$${value}`
                  }
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--themeOrange-200)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--themeOrange-200)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#colorRevenue)"
                  fillOpacity={1}
                  stroke="var(--themeOrange-400)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
