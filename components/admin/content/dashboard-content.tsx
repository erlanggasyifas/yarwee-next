import { DataTableDemo } from "@/components/admin/content/table-member";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { DataTableStatus } from "./table-status";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6  *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Member</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            192
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Member</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Premium Member</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Unsubscribe Member</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function StatusCards() {
  return (
    <div>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Recently Activity</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total from top 1.400 activity in the system
            </span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <DataTableStatus variant="compact" limit={5} />
        </CardContent>
      </Card>
    </div>
  );
}

export function NewestMember() {
  return (
    <div>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Newest Member</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total from 3.500 members
            </span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <DataTableDemo
            variant="compact"
            limit={5} /* params={{ sortBy:'id', order:'desc' }} */
          />
        </CardContent>
      </Card>
    </div>
  );
}
