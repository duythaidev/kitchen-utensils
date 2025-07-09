'use client'

import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
const fakeData = {
  revenue: {
    totalRevenue: 0,
    percent: 0
  },
  users: {
    totalUsers: 4,
    percent: 0
  },
  orders: {
    totalOrders: 0,
    percent: 0
  },
  cancledOrders: {
    totalCancledOrders: 0,
    percent: 0
  }
}

interface IProps {
  revenue: {
    totalRevenue: number;
    percent: number;
  };
  users: {
    totalUsers: number;
    percent: number;
  };
  orders: {
    totalOrders: number;
    percent: number;
  };
  cancledOrders: {
    totalCancledOrders: number;
    percent: number;
  };
}
export function SectionCards({ data = fakeData }: { data?: IProps }) {
  const { revenue, users, orders, cancledOrders } = data
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs">

      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue.totalRevenue}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600">
              <IconTrendingUp className="mr-1" />
              {revenue.percent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Compared to last 30 days</div>
        </CardFooter>
      </Card>

      {/* Total Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orders.totalOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-600">
              <IconTrendingDown className="mr-1" />
              {orders.percent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Dropped slightly <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Orders this month</div>
        </CardFooter>
      </Card>

      {/* Total Customers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {users.totalUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600">
              <IconTrendingUp className="mr-1" />
              {users.percent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Strong acquisition <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">New vs returning users</div>
        </CardFooter>
      </Card>

      {/* Canceled Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Canceled Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {cancledOrders.totalCancledOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-600">
              <IconTrendingUp className="mr-1" />
              {cancledOrders.percent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Needs attention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Higher than last month</div>
        </CardFooter>
      </Card>

    </div>
  );
}
