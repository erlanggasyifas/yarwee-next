// resources/js/pages/dashboard.tsx (SEKARANG: app/(dashboard)/dashboard/page.tsx)
import * as React from 'react'
import { DataTableDemo } from '@/components/admin/content/table-member'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

// Tidak perlu import AppLayout
export default function MemberPage() { // Ganti nama agar lebih jelas
  return (
    <div className="grid gap-4">
      {/* === Card 1: Context/Intro === */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>
            Halaman ini menampilkan seluruh data akun user...
          </CardDescription>
        </CardHeader>
      </Card>

      {/* === Card 2: Tabel Member === */}
      <Card className="@container/card p-4 pt-8">
          <DataTableDemo variant="full" filterRole="User" />
      </Card>
    </div>
  )
}

// <-- HAPUS SEMUA BLOK KODE (Dashboard as any).layout = ... DARI SINI
// Kode ini tidak ada efeknya di App Router.