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

// Helper: format angka ke Rupiah
const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader className="flex justify-between pb-2">
          <div className="space-y-2">
            <CardDescription>Anggota Baru</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              192
            </CardTitle>
          </div>
          <Badge variant="outline">262 Member <IconTrendingUp /></Badge>
        </CardHeader>

        {/* FOOTER → KONTEN */}
        <CardContent className="pt-0 text-sm">
          <div className="text-muted-foreground">
            Data Dalam 1 Bulan Terakhir
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex justify-between pb-2">
          <div className="space-y-2">
            <CardDescription>Anggota Free</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              542
            </CardTitle>
          </div>
          <Badge variant="outline">125 Member <IconTrendingDown /></Badge>
        </CardHeader>

        <CardContent className="pt-0 text-sm">
          <div className="text-muted-foreground">
            Data Dalam Keseluruhan Sistem
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex justify-between pb-2">
          <div className="space-y-2">
            <CardDescription>Anggota Premium</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              2.294
            </CardTitle>
          </div>
          <Badge variant="outline">1.002 Member <IconTrendingDown /></Badge>
        </CardHeader>

        <CardContent className="pt-0 text-sm">
          <div className="text-muted-foreground">
            Data Dalam Keseluruhan Sistem
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card ">
        <CardHeader className="flex justify-between pb-2">
          <div className="space-y-2">
            <CardDescription>Anggota Berhenti Berlangganan</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              6.158
            </CardTitle>
          </div>
          <Badge variant="outline">11 Member <IconTrendingUp /></Badge>
        </CardHeader>

        <CardContent className="pt-0 text-sm">
          <div className="text-muted-foreground">
            Data Dalam Keseluruhan Sistem
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/** ========== Informasi Rupiah (simple, 3–4 metric) ========== */
export function RevenueSummaryCards() {
  // TODO: ganti angka dummy ini dengan data dari API
  const totalRevenue = 125000000; // total pendapatan keseluruhan
  const avgMonthlyRevenue = 10500000; // rata-rata per bulan
  const currentMonthRevenue = 8500000; // pendapatan bulan ini

  return (
    <div className="grid grid-cols-1 gap-6 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      {/* Total Pendapatan Keseluruhan */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pendapatan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalRevenue)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground">
          Akumulasi sejak sistem berjalan
        </CardFooter>
      </Card>

      {/* Rata-rata Pendapatan per Bulan */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rata-rata per Bulan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(avgMonthlyRevenue)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground">
          Dari keseluruhan periode tercatat
        </CardFooter>
      </Card>

      {/* Pendapatan Bulan Ini */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pendapatan Bulan Ini</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(currentMonthRevenue)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground">
          Update khusus bulan berjalan
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
          <DataTableDemo variant="compact" filterRole="User" limit={5} />
        </CardContent>
      </Card>
    </div>
  );
}
