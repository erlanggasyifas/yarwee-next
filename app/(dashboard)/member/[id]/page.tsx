"use client";

import * as React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ⬅️ 1. Impor Ditambahkan
import { Button } from "@/components/ui/button"; // ⬅️ 1. Impor Ditambahkan
import { toast } from "sonner"; // ⬅️ 1. Impor Ditambahkan
import { Label } from "@/components/ui/label"; // ⬅️ 1. Impor Ditambahkan

// Definisikan base URL API Anda
const API_USERS_URL = "http://210.79.190.9:7456/api/admin/users";

// Tipe data berdasarkan JSON detail yang Anda berikan
type UserDetail = {
  id: string; // UUID
  fullName: string;
  username: string;
  profilePicture: string | null;
  email: string;
  phoneNumber: string | null;
  gender: string;
  dateOfBirth: string | null;
  isPremium: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  province: {
    id: number;
    name: string;
  } | null;
};

// Fungsi helper untuk mendapatkan inisial nama
function getInitials(name: string) {
  const parts = name.split(" ");
  return parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = React.useState<UserDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const memberId = params.id;

  // --- State Baru untuk Manajemen Role ---
  const [selectedRole, setSelectedRole] = React.useState<string>(""); // ⬅️ 2. State Baru
  const [isUpdatingRole, setIsUpdatingRole] = React.useState(false); // ⬅️ 2. State Baru

  // 1. (WAJIB) Pasang header Authorization, sama seperti di file tabel Anda
  React.useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && !axios.defaults.headers.common["Authorization"]) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // 2. Ambil data detail user berdasarkan ID dari URL
  React.useEffect(() => {
    if (!memberId) return;

    const fetchUserDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_USERS_URL}/${memberId}`, {
          headers: { Accept: "application/json" },
        });
        if (res.data?.data?.user) {
          const fetchedUser = res.data.data.user as UserDetail;
          setUser(fetchedUser);
          setSelectedRole(fetchedUser.role); // ⬅️ 3. Atur state dropdown
        } else {
          throw new Error("User data not found in API response.");
        }
      } catch (err: any) {
        console.error("Failed to fetch user detail:", err);
        setError(
          err.response?.data?.message || err.message || "An error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [memberId]);

  // 4. --- Fungsi Baru untuk Update Role ---
  const handleUpdateRole = async () => {
    if (!memberId || !user || selectedRole === user.role) {
      return; // Tidak ada perubahan
    }

    setIsUpdatingRole(true);
    try {
      // Kirim payload { "role": "..." }
      const res = await axios.put(`${API_USERS_URL}/${memberId}`, {
        role: selectedRole,
      });

      if (res.data?.data?.user) {
        // --- INI PERBAIKANNYA ---
        // API mungkin mengembalikan data lama (stale) meskipun sukses.
        // Kita "memaksa" state lokal untuk mencerminkan perubahan yang BARU SAJA kita kirim.
        const updatedUserFromApi = res.data.data.user as UserDetail;
        
        const finalUpdatedUser = {
          ...updatedUserFromApi,
          role: selectedRole, // <-- Gunakan role dari state, BUKAN dari response API
        };

        // Update state lokal agar UI sinkron
        setUser(finalUpdatedUser);
        setSelectedRole(finalUpdatedUser.role); // (sekarang sudah pasti 'selectedRole')
        toast.success("Role pengguna berhasil diperbarui!");
        // --- AKHIR PERBAIKAN ---

      } else {
        throw new Error("API did not return updated user data.");
      }
    } catch (err: any) {
      console.error("Failed to update role:", err);
      toast.error(
        "Gagal memperbarui role: " +
          (err.response?.data?.message || err.message)
      );
      // Kembalikan dropdown ke role asli jika gagal
      setSelectedRole(user.role);
    } finally {
      setIsUpdatingRole(false);
    }
  };

  // === Render State Loading ===
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // === Render State Error ===
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Gagal Mengambil Data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // === Render State Sukses ===
  if (!user) {
    // ... (state user tidak ditemukan, tetap sama)
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Data Tidak Ditemukan</AlertTitle>
        <AlertDescription>
          Data untuk member dengan ID {memberId} tidak ditemukan.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        {/* ... (Header Avatar dan Nama, tetap sama) ... */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={user.profilePicture || ""} alt={user.fullName} />
            <AvatarFallback className="text-xl">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <CardTitle className="text-2xl">{user.fullName}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant={user.isPremium ? "default" : "secondary"}>
                {user.isPremium ? "Premium User" : "Free User"}
              </Badge>
              {/* Badge ini akan auto-update karena state 'user' berubah */}
              <Badge variant="outline">Role: {user.role}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {" "}
        {/* Tambah space-y-6 */}
        <h3 className="font-semibold">Informasi Kontak</h3>
        {/* ... (Info Kontak, tetap sama) ... */}
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user.email || "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone Number</p>
            <p className="font-medium">{user.phoneNumber || "-"}</p>
          </div>
        </div>
        <h3 className="font-semibold">Informasi Pribadi</h3>
        {/* ... (Info Pribadi, tetap sama) ... */}
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Gender</p>
            <p className="font-medium capitalize">{user.gender || "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date of Birth</p>
            <p className="font-medium">{user.dateOfBirth || "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Province</p>
            <p className="font-medium">{user.province?.name || "-"}</p>
          </div>
        </div>
        <h3 className="font-semibold">Informasi Akun</h3>
        {/* ... (Info Akun, tetap sama) ... */}
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Bergabung Sejak</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">User ID</p>
            <p className="font-mono text-xs">{user.id}</p>
          </div>
        </div>
        {/* 5. --- UI Baru untuk Manajemen Role --- */}
        <div>
          <h3 className="font-semibold">Manajemen Role</h3>
          <div className="mt-2 flex w-full max-w-sm items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="role-select" className="text-xs">
                Ubah Role
              </Label>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                disabled={isUpdatingRole}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role baru" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleUpdateRole}
              disabled={isUpdatingRole || selectedRole === user.role}
            >
              {isUpdatingRole && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isUpdatingRole ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}