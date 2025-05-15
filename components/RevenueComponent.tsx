"use client";

import React, { useState } from "react";
import TabbedComponent from "./TabbedComponent";
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
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const options = ["Yearly", "Monthly", "Weekly"];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RevenueComponent() {
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleActive(i: number) {
    setActiveTab(i);
  }

  const selected: TimeRange = options[activeTab].toLowerCase() as TimeRange;
  const data = graphData[selected] || [];

  return (
    <div className="border-2 border-gray-300 p-4 rounded-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:justify-start min-w-[200px]">
        <div className="mb-2">
          <h2 className="font-semibold text-[16px]">Total Revenue</h2>
          <span className="text-sm text-gray-400">
            Here&apos;s the summary of the overall data
          </span>
        </div>
        {/* Tabbed component */}
        <div className="flex items-center w-full md:w-[340px] ml-auto justify-between md:justify-start gap-2 md:gap-4">
          <TabbedComponent
            options={options}
            activeTab={activeTab}
            onSetActiveTab={handleActive}
          />
          <Button
            asChild
            className="h-[30px] w-[60px] md:h-[40px] border border-black bg-white flex items-center justify-center rounded-full hover:bg-gray-300/30"
          >
            <Link href="/">
              <Image src="/top-right.png" alt="" width={13} height={13} />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-5 min-h-[250px] md:min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-[250px] md:h-[300px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: -10,
                right: -10,
                top: 8,
                bottom: 8,
              }}
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
                tickFormatter={(value) => {
                  // Format to $Xk for thousands
                  return value >= 1000
                    ? `$${Math.round(value / 1000)}k`
                    : `$${value}`;
                }}
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
    </div>
  );
}
