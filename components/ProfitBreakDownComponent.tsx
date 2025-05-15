"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
const chartData = [{ product1: 1260, product2: 500, product3: 2000 }];

const chartConfig = {
  product1: {
    label: "Nike air Jordan",
    color: "hsl(var(--chart-1))",
  },
  product2: {
    label: "Adidas Samba",
    color: "hsl(var(--chart-2))",
  },
  product3: {
    label: "New Balance 530",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ProfitBreakdownComponent() {
  const isMobile = useIsMobile();
  const totalProfit = Math.ceil(
    chartData[0].product1 + chartData[0].product2 + chartData[0].product3
  );

  console.log(chartConfig.product1.label);

  function getPercent(value: number): number {
    const result = ((value / totalProfit) * 100).toFixed(2);
    const percent = parseFloat(result);
    return percent;
  }

  return (
    <Card className="flex flex-col bg-themeOrange-100/20">
      <CardHeader className="items-center pb-0">
        <CardTitle className="">Profit Breakdown</CardTitle>
      </CardHeader>
      <div className="min-h-[200px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[150px] w-[300px] flex items-center justify-center"
        >
          <RadialBarChart
            width={100}
            height={100}
            cy={120} // small height
            innerRadius={isMobile ? 110 : 100}
            outerRadius={isMobile ? 160 : 180}
            data={chartData}
            startAngle={0}
            endAngle={180}
            barCategoryGap={4}
          >
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 25}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalProfit.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-muted-foreground"
                        >
                          Total Profit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="product1"
              stackId="a"
              cornerRadius={10}
              fill="var(--themeGreen-400)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="product2"
              fill="var(--themeInfo-500)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="product3"
              fill="var(--themeOrange-400)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="px-6">
          {/* 1 */}
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-themeGreen-300"></div>
              <p>{chartConfig.product1.label}</p>
              <span>({getPercent(chartData[0].product1)}%)</span>
            </div>

            <p className="font-semibold">
              ${chartData[0].product1.toLocaleString()}
            </p>
          </div>

          {/* 2 */}
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-themeInfo-300"></div>
              <p>{chartConfig.product2.label}</p>
              <span>({getPercent(chartData[0].product2)}%)</span>
            </div>

            <p className="font-semibold">
              ${chartData[0].product2.toLocaleString()}
            </p>
          </div>

          {/* 3 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-themeOrange-300"></div>
              <p>{chartConfig.product3.label}</p>
              <span>({getPercent(chartData[0].product3)}%)</span>
            </div>

            <p className="font-semibold">
              ${chartData[0].product3.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
