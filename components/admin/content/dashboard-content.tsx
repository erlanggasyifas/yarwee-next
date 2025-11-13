import { DataTableDemo } from "@/components/admin/content/table-member";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { DataTableActivity } from "./table-activity";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anggota Baru</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            192
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Naik bulan ini <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pengunjung selama 6 bulan terakhir
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anggota Aktif</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1.234
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Turun 20% pada periode ini <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Akuisisi perlu perhatian</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anggota Premium</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45.678
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Retensi pengguna kuat <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Keterlibatan melampaui target
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anggota Berhenti Berlangganan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5.678
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Kinerja meningkat stabil <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Sesuai proyeksi pertumbuhan
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function NewestActivity() {
  return (
    <div>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Recently Activity</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total dari 1.500 aktivitas selama 3 bulan terakhir
            </span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <DataTableActivity variant="compact" limit={5} />
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
          <CardTitle>Anggota Terbaru</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total selama 3 bulan terakhir
            </span>
            <span className="@[540px]/card:hidden">3 bulan terakhir</span>
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
