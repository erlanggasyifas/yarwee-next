import {
  NewestMember,
  NewestActivity,
  SummaryCards,
} from "@/components/admin/content/dashboard-content";

// Tidak perlu import AppLayout
// Nama function BISA APA SAJA, tapi `export default` itu wajib
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SummaryCards />
      </div>
      <div>
        <NewestActivity />
      </div>
      <div>
        <NewestMember />
      </div>
    </div>
  );
}

// <-- HAPUS SEMUA bagian (Dashboard as any).layout = ... DARI SINI