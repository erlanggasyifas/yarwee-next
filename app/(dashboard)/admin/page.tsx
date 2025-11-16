"use client";

import * as React from "react";
import axios from "axios";
import { DataTableDemo } from "@/components/admin/content/table-member";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_REGISTER = "http://210.79.190.9:7456/api/register";

export default function AdminPage() {
  // === STATE FORM REGISTER ADMIN ===
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Password dan confirmation harus sama!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(API_REGISTER, {
        username,
        email,
        password,
        passwordConfirmation,
        role: "Admin", // ← OTOMATIS JADI ADMIN
      });

      toast.success("Admin berhasil ditambahkan!");
      resetForm();
      setOpen(false);

      // Reload halaman setelah menambahkan admin
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Gagal menambahkan admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      {/* === Card 1: Context === */}
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin</CardTitle>
              <CardDescription>
                Halaman ini menampilkan seluruh data admin...
              </CardDescription>
            </div>

            {/* === BUTTON TAMBAH ADMIN === */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white border border-black text-black hover:bg-black hover:text-white cursor-pointer">Tambah Admin</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Admin Baru</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* Password Confirmation */}
                  <div className="space-y-2">
                    <Label>Password Confirmation</Label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Batal
                  </Button>

                  <Button disabled={loading} onClick={handleRegister}>
                    {loading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Tambah Admin
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* === Card 2: Tabel Admin === */}
      <Card className="@container/card p-4 pt-8">
        <DataTableDemo variant="full" filterRole="Admin" />
      </Card>
    </div>
  );
}
