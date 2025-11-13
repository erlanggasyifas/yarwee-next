import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTableActivity } from "@/components/admin/content/table-activity";

export default function ActivityPage() {
  return (
    <div className="grid gap-4">
      {/* === Card Intro === */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>
            Halaman ini menampilkan seluruh aktivitas terbaru...
          </CardDescription>
        </CardHeader>
      </Card>

      {/* === Card Tabel Activity Full === */}
      <Card className="@container/card p-4 pt-8">
        <DataTableActivity variant="full" />
      </Card>
    </div>
  );
}
// <-- HAPUS SEMUA BLOK KODE (Dashboard as any).layout = ... DARI SINI
// Kode ini tidak ada efeknya di App Router.