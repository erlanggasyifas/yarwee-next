"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-orange-50 dark:from-gray-950 dark:to-gray-900">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="/yarwee-logo.png"
              alt="Yarwee Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="text-xl">yarwee</span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700 dark:text-gray-200">
            <Link href="#beranda" className="hover:text-orange-500 transition-colors">
              Beranda
            </Link>
            <Link href="#tentang" className="hover:text-orange-500 transition-colors">
              Tentang Kami
            </Link>
            <Link href="#fitur" className="hover:text-orange-500 transition-colors">
              Fitur
            </Link>
            <Link href="#harga" className="hover:text-orange-500 transition-colors">
              Harga
            </Link>
          </nav>

          {/* Tombol Unduh */}
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">
            Unduh Aplikasi
          </Button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 py-20 md:py-28 min-h-screen">
        {/* Konten Kiri */}
        <div className="z-10 max-w-xl">
          <div className="inline-block rounded-full bg-orange-100 text-orange-700 px-4 py-1 text-sm font-medium mb-4">
            Selamat Datang di yarwee
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Bagi Biaya Tanpa Drama, <br /> Mulai Sekarang
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Transparansi real-time, laporan ringkas, dan pengalaman bebas ribet
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-8 py-6 text-lg">
            Unduh
          </Button>
        </div>

        {/* Background Mockup (tetap seperti sebelumnya) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-[50%] h-full overflow-hidden pointer-events-none">
          <Image
            src="/assets/phone-mockup.png"
            alt="Phone Mockup"
            fill
            className="object-contain object-right"
            priority
          />
        </div>
      </section>
    </main>
  );
}
