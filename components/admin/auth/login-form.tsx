"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- DIUBAH (2)
import axios from 'axios';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    // FieldSeparator, // <-- DIUBAH (3): Dihapus karena tidak terpakai
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const API_URL = 'http://210.79.190.9:7456/api/login';

// === Persist axios Authorization dari localStorage saat reload ===
const savedToken =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
if (savedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}

type ApiValidationErr = { key: string; error_message: string };

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        try {
            const res = await axios.post(
                API_URL,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );

            console.log('API response:', res.data);
            console.log('message:', res?.data?.message);

            // === AMBIL & SIMPAN TOKEN ===
            const token = res?.data?.data?.token as string | undefined;
            if (token) {
                localStorage.setItem('auth_token', token);
                const user = res?.data?.data?.user;
                if (user)
                    localStorage.setItem('auth_user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] =
                    `Bearer ${token}`;
            } else {
                console.warn('Token tidak ditemukan di response login.');
            }

            toast.success(res?.data?.message ?? 'Login berhasil.');

            // ⬇️ langsung pindah ke dashboard, token tetap tersimpan & header axios sudah di-set
            router.push('/dashboard');
        } catch (err: unknown) { // <-- DIUBAH (1): 'any' menjadi 'unknown'
            if (axios.isAxiosError(err) && err.response) {
                const code = err.response.status;
                const payload = err.response.data as {
                    message?: string;
                    errors?: ApiValidationErr[];
                };

                console.error('API error:', payload);
                console.error('status:', code);

                if (code === 401) {
                    toast.error(payload?.message ?? 'Kredensial tidak valid.');
                } else if (code === 422) {
                    const items = payload?.errors ?? [];
                    toast.error(payload?.message ?? 'Validasi gagal.', {
                        description: items.length ? (
                            <ul className="list-disc space-y-1 pl-5">
                                {items.map((e) => (
                                    <li key={e.key}>
                                        <strong>{e.key}</strong>:{' '}
                                        {e.error_message}
                                    </li>
                                ))}
                            </ul>
                        ) : undefined,
                    });
                } else {
                    toast.error(
                        payload?.message ?? 'Terjadi kesalahan tak terduga.',
                    );
                }
            } else {
                console.error('Network/Unknown error:', err);
                toast.error('Tidak dapat terhubung ke server. Coba lagi.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
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
                            Belum punya akun? <a href="/register">Daftar</a>
                        </FieldDescription>
                    </div>

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
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Sedang masuk...' : 'Masuk'}
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
                                aria-hidden
                            >
                                <path
                                    d="M21.35 11.1h-8.9v2.9h5.12c-.22 1.48-1.72 4.35-5.12 4.35-3.09 0-5.61-2.55-5.61-5.7s2.52-5.7 5.61-5.7c1.76 0 2.94.74 3.62 1.37l2.47-2.39C17.38 4.28 15.56 3.5 13.31 3.5 8.44 3.5 4.5 7.47 4.5 12.35S8.44 21.2 13.31 21.2c4.01 0 6.69-2.77 7.38-6.67.12-.62.16-1.28.16-1.94 0-.52-.03-1.04-.1-1.49z"
                                    fill="currentColor"
                                />
                            </svg>
                            Lanjutkan dengan Google
                        </Button>
                    </Field> */}
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                Dengan mengklik <em>Lanjutkan</em>, Anda menyetujui{' '}
                <a href="#">Ketentuan Layanan</a> dan{' '}
                <a href="#">Kebijakan Privasi</a> kami.
            </FieldDescription>
        </div>
    );
}