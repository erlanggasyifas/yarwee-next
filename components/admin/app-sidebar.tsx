import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link"; // ⬅️ BERUBAH
import { ShieldUser, ClipboardList, User2 } from "lucide-react";

const items = [
  {
    title: "User",
    url: "/user",
    icon: User2,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: ClipboardList,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: ShieldUser,
  },
];
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar() {
  return (
    <Sidebar className="p-4 bg-sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* Ini otomatis pakai Link dari next/link */}
              <Link href="/dashboard" className="flex gap-2">
                <span className="flex items-center gap-2 text-base font-semibold">
                  <img
                    src="/assets/yarwee-logo.png"
                    alt="Yarwee"
                    className="h-6 w-auto shrink-0 object-contain align-middle" // ~24px, pas dg line-height text-base
                    loading="lazy"
                  />
                  Admin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* ⬇️ BERUBAH DARI <a> */}
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
