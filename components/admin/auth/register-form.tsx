"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; // <-- DIUBAH (2)
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator, // <-- DIUBAH (3): Dihapus karena tidak terpakai
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { toast } from "sonner"; // Sonner toast

const API_URL = "http://210.79.190.9:7456/api/register";

type ApiValidationErr = { key: string; error_message: string };

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (password !== passwordConfirmation) {
      toast.error("Validasi gagal.", {
        description: "Konfirmasi password tidak sama.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        API_URL,
        { username, email, password, passwordConfirmation },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API response:", res.data);
      console.log("message:", res?.data?.message);

      toast.success(res?.data?.message ?? "Registrasi berhasil");

      // ⬇️ langsung pindah ke /login
      router.push("/login");
    } catch (err: unknown) { // <-- DIUBAH (1): 'any' menjadi 'unknown'
      if (axios.isAxiosError(err) && err.response) {
        const code = err.response.status;
        const payload = err.response.data as {
          message?: string;
          errors?: ApiValidationErr[];
        };

        console.error("API error:", payload);
        console.error("status:", code);

        if (code === 422) {
          const items = payload?.errors ?? [];
          toast.error(payload?.message ?? "Validasi gagal", {
            description: items.length ? ( // <-- DIUBAH (5): Format list
              <ul className="list-disc space-y-1 pl-5">
                {items.map((e) => (
                  <li key={e.key}>
                    <strong>{e.key}</strong>: {e.error_message}
                  </li>
                ))}
              </ul>
            ) : undefined,
          });
        } else {
          toast.error(payload?.message ?? "Terjadi kesalahan tak terduga.");
        }
      } else {
        console.error("Network/Unknown error:", err);
        toast.error("Tidak dapat terhubung ke server. Coba lagi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              {/* DIUBAH (4): Menggunakan next/image */}
              <Image
                src="/assets/yarwee-logo.png"
                alt="Logo Yarwee"
                width={70} // <-- Sesuaikan dengan lebar gambar Anda
                height={50} // <-- Sesuaikan dengan tinggi gambar Anda
              />
            </a>
            <h1 className="text-xl font-bold">
              Selamat datang di Yarwee Admin
            </h1>
            <FieldDescription>
              Sudah punya akun? <a href="/login">Masuk</a>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="username">Nama Pengguna</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="kata sandi"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="passwordConfirmation">
              Konfirmasi Kata Sandi
            </FieldLabel>
            <Input
              id="passwordConfirmation"
              type="password"
              placeholder="konfirmasi kata sandi"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Field>

          <Field>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sedang mendaftar..." : "Daftar"}
            </Button>
          </Field>

          {/* <FieldSeparator>Atau</FieldSeparator>

                    <Field className="grid gap-4 sm:grid-cols-2">
                        <Button
                            variant="outline"
                            type="button"
                            aria-label="Lanjutkan dengan Apple"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                    fill="currentColor"
                                />
                            </svg>
                            Lanjutkan dengan Apple
                        </Button>

                        <Button
                            variant="outline"
                            type="button"
                            aria-label="Lanjutkan dengan Google"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Lanjutkan dengan Google
                        </Button>
                    </Field> */}
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        Dengan mengklik <em>Lanjutkan</em>, Anda menyetujui{" "}
        <a href="#">Ketentuan Layanan</a> dan <a href="#">Kebijakan Privasi</a>{" "}
        kami.
      </FieldDescription>
    </div>
  );
}