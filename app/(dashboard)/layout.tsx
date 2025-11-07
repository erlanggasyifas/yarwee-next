"use client";

import * as React from "react";
// Hapus 'Link' dan 'Breadcrumb' jika tidak dipakai lagi di sini
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { AppSidebar } from "@/components/admin/app-sidebar";
import { DynamicBreadcrumb } from "@/components/admin/dynamic-breadcrumb"; // ⬅️ 1. Import

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          {/* ⬅️ 2. Ganti Breadcrumb statis... */}
          {/* <Breadcrumb> ... </Breadcrumb> */}

          {/* ⬅️ ...dengan yang dinamis */}
          <DynamicBreadcrumb />

          <div className="ml-auto" />
        </header>

        <div className="p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}