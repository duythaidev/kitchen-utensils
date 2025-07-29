import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/shadcn/card";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

const fakeData = {
  revenue: { totalRevenue: 0, percent: 0 },
  users: { totalUsers: 4, percent: 0 },
  orders: { totalOrders: 0, percent: 0 },
  cancledOrders: { totalCancledOrders: 0, percent: 0 },
};

interface IProps {
  revenue: { totalRevenue: number; percent: number };
  users: { totalUsers: number; percent: number };
  orders: { totalOrders: number; percent: number };
  cancledOrders: { totalCancledOrders: number; percent: number };
}

const TrendBadge = ({ percent }: { percent: number }) => {
  const isUp = percent > 0;
  const isDown = percent < 0;
  const isNeutral = percent === 0;

  const color = isUp
    ? "text-green-600"
    : isDown
    ? "text-red-600"
    : "text-muted-foreground";

  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

  return (
    <Badge variant="outline" className={color}>
      <Icon className="mr-1 size-4" />
      {percent}%
    </Badge>
  );
};

const getTrendText = (
  percent: number,
  upText: string,
  downText: string,
  sameText: string
) => {
  if (percent > 0) return upText;
  if (percent < 0) return downText;
  return sameText;
};

export function SectionCards({ data = fakeData }: { data?: IProps }) {
  const { revenue, users, orders, cancledOrders } = data;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs">

      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue?.totalRevenue}
          </CardTitle>
          <CardAction>
            <TrendBadge percent={revenue?.percent} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {getTrendText(
              revenue?.percent,
              "Trending up this month",
              "Decreased this month",
              "No change"
            )}
          </div>
          <div className="text-muted-foreground">Compared to last 30 days</div>
        </CardFooter>
      </Card>

      {/* Total Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orders?.totalOrders}
          </CardTitle>
          <CardAction>
            <TrendBadge percent={orders?.percent} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {getTrendText(
              orders?.percent,
              "More orders this month",
              "Dropped slightly",
              "No change"
            )}
          </div>
          <div className="text-muted-foreground">Orders this month</div>
        </CardFooter>
      </Card>

      {/* Total Customers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {users?.totalUsers}
          </CardTitle>
          <CardAction>
            <TrendBadge percent={users?.percent} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {getTrendText(
              users?.percent,
              "Strong acquisition",
              "Lost some users",
              "No change"
            )}
          </div>
          <div className="text-muted-foreground">New vs returning users</div>
        </CardFooter>
      </Card>

      {/* Canceled Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Canceled Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {cancledOrders?.totalCancledOrders}
          </CardTitle>
          <CardAction>
            <TrendBadge percent={cancledOrders?.percent} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {getTrendText(
              cancledOrders?.percent,
              "Increased cancellations",
              "Fewer cancellations",
              "No change"
            )}
          </div>
          <div className="text-muted-foreground">Compared to last month</div>
        </CardFooter>
      </Card>
    </div>
  );
}
