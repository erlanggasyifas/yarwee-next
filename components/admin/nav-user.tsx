"use client";

import { useRouter } from "next/navigation"; // ⬅️ BERUBAH
import axios from "axios";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type PropUser = {
  name: string;
  email: string;
  avatar: string;
};

export function NavUser({ user: propUser }: { user?: PropUser }) {
  const { isMobile } = useSidebar();
  const router = useRouter(); // ⬅️ BERUBAH
  const [user, setUser] = React.useState<PropUser>(() => {
    // default sementara (akan dioverride di useEffect)
    return (
      propUser ?? {
        name: "Guest",
        email: "-",
        avatar: "/avatars/shadcn.jpg",
      }
    );
  });

  // Map object dari API login -> shape komponen
  function mapApiUserToPropUser(apiUser: any): PropUser {
    const name =
      apiUser?.fullName ||
      apiUser?.username ||
      apiUser?.name ||
      apiUser?.email?.split("@")[0] ||
      "User";
    const email = apiUser?.email || "-";
    const avatar =
      apiUser?.profilePicture || apiUser?.avatar || "/avatars/shadcn.jpg";
    return { name, email, avatar };
  }

  React.useEffect(() => {
    // Ambil user dari localStorage (diset saat login)
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_user")
          : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(mapApiUserToPropUser(parsed));
      } else if (propUser) {
        // fallback ke prop bila ada
        setUser(propUser);
      }
    } catch {
      if (propUser) setUser(propUser);
    }
  }, [propUser]);

  const initials = React.useMemo(() => {
    const parts = String(user?.name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2);
    if (!parts.length) return "CN";
    return parts.map((p) => p[0]?.toUpperCase() || "").join("");
  }, [user?.name]);

  const handleLogout = React.useCallback(() => {
    try {
      // hapus token & user
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      // bersihkan default Authorization untuk axios
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      router.push("/login"); // ⬅️ BERUBAH
    }
  }, [router]); // ⬅️ BERUBAH

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout: hapus token & redirect */}
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}