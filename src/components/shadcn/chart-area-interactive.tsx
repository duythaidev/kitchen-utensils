'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn/toggle-group"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select"
import { useState, useEffect } from "react"

const chartData = [
  { date: "2024-04-01", revenue: 0 },
  { date: "2024-05-02", revenue: 1200 },
  { date: "2024-05-03", revenue: 1200 },
  { date: "2024-05-04", revenue: 1200 },
  { date: "2024-06-01", revenue: 1200 },
  { date: "2024-06-02", revenue: 1350 },
  { date: "2024-06-03", revenue: 980 },
  { date: "2024-06-04", revenue: 1600 },
  { date: "2024-06-05", revenue: 1420 },
  { date: "2024-06-06", revenue: 1700 },
  { date: "2024-06-07", revenue: 1100 },
  { date: "2024-06-08", revenue: 1750 },
  { date: "2024-06-09", revenue: 1600 },
  { date: "2024-06-10", revenue: 1900 },
  { date: "2024-06-11", revenue: 1650 },
  { date: "2024-06-12", revenue: 1400 },
  { date: "2024-06-13", revenue: 1850 },
  { date: "2024-06-14", revenue: 2100 },
  { date: "2024-06-15", revenue: 1800 },
  { date: "2024-06-16", revenue: 2000 },
  { date: "2024-06-17", revenue: 1700 },
  { date: "2024-06-18", revenue: 1500 },
  { date: "2024-06-19", revenue: 1600 },
  { date: "2024-06-20", revenue: 1950 },
  { date: "2024-06-21", revenue: 1450 },
  { date: "2024-06-22", revenue: 2200 },
  { date: "2024-06-23", revenue: 2000 },
  { date: "2024-06-24", revenue: 1900 },
  { date: "2024-06-25", revenue: 1650 },
  { date: "2024-06-26", revenue: 2100 },
  { date: "2024-06-27", revenue: 1750 },
  { date: "2024-06-28", revenue: 1800 },
  { date: "2024-06-29", revenue: 2300 },
  { date: "2024-06-30", revenue: 2500 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export const ChartAreaInteractive = () => {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date) // date of the item

    const reference = new Date("2024-06-30") // last date of the chart

    const start = new Date(reference) // start date of the chart

    if (timeRange === "90d") start.setDate(reference.getDate() - 90)
    else if (timeRange === "30d") start.setDate(reference.getDate() - 30)
    else start.setDate(reference.getDate() - 7)
    return date >= start // check if the date is greater than the start date
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Revenue by Month</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Overview of sales performance</span>
          <span className="@[540px]/card:hidden">Last {timeRange}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 @[767px]/card:hidden">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
