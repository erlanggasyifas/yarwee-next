"use client"; // Wajib karena menggunakan hook

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ⬅️ Hook penting
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// Fungsi helper untuk mengubah 'activity' menjadi 'Activity'
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function DynamicBreadcrumb() {
  const pathname = usePathname(); // e.g., "/dashboard/member"
  const segments = pathname.split("/").filter(Boolean); // e.g., ["dashboard", "member"]

  // Jika di root dashboard, tampilkan "Dashboard" saja
  if (segments.length === 1 && segments[0] === "dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/"); // e.g., "/dashboard", lalu "/dashboard/member"

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{capitalize(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}