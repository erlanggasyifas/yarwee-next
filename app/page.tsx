import Link from "next/link";
import Image from "next/image";
import {
  Database,
  BarChart3,
  Users2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="/assets/yarwee-logo.png" // Pastikan path ini benar
              alt="Logo Yarwee"
              width={32} // Ukuran lebih kecil untuk navbar
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl">Yarwee Admin</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Daftar Sekarang
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-grow">
        {/* 2a. Hero Section (Deskripsi) */}
        <section className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden py-20 text-center md:py-32">
          {/* Efek Gradien Latar Belakang */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
            style={{
              width: "100%",
              maxWidth: "1200px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(66, 153, 225, 0.2), transparent 70%)",
            }}
          />

          <div className="container z-10 mx-auto max-w-4xl px-6">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Solusi Admin Panel Modern untuk Bisnis Anda
            </h1>
            <p className="mb-10 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              Yarwee Admin memberikan semua alat yang Anda butuhkan untuk
              mengelola data, menganalisis performa, dan mengatur pengguna dalam
              satu platform yang intuitif dan cepat.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Mulai Uji Coba Gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#fitur"
                className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 px-8 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
              >
                Lihat Fitur
              </Link>
            </div>

            {/* Placeholder untuk Gambar/Mockup Aplikasi */}
            <div className="relative mx-auto mt-20 w-full max-w-3xl">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl"></div>
              <div className="relative h-auto w-full rounded-xl border border-gray-200 bg-white/50 p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900/50">
                <Image
                  src="/assets/yarwee-logo.png"
                  alt="Logo Yarwee"
                  width={24}
                  height={24}
                  className="h-6 w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2b. Features Section (Fitur) */}
        <section
          id="fitur"
          className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32"
        >
          <div className="container mx-auto max-w-7xl px-6">
            <div className="max-w-3xl text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Fitur Unggulan Kami
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Dapatkan kendali penuh atas operasi bisnis Anda dengan
                fitur-fitur canggih yang kami sediakan.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Fitur 1 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Manajemen Data</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kelola, edit, dan hapus data bisnis Anda dengan mudah melalui
                  antarmuka yang responsif dan aman.
                </p>
              </div>
              {/* Fitur 2 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Analitik Real-time</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Pantau performa bisnis Anda secara langsung dengan dashboard
                  analitik yang interaktif dan mudah dipahami.
                </p>
              </div>
              {/* Fitur 3 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  <Users2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Kelola Akses Pengguna
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Atur hak akses (roles & permissions) untuk setiap anggota tim
                  Anda dengan sistem manajemen pengguna yang fleksibel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2c. Pricing Section (Harga) */}
        <section id="harga" className="py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Pilih Paket yang Tepat
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Harga transparan dan fleksibel, sesuaikan dengan kebutuhan bisnis
              Anda. Mulai gratis, tingkatkan kapan saja.
            </p>

            <div className="mt-16 grid max-w-sm mx-auto gap-8 md:max-w-none md:grid-cols-3">
              {/* Paket 1: Basic */}
              <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-lg font-semibold">Basic</h3>
                <p className="mt-4 text-4xl font-extrabold">
                  Gratis
                  <span className="text-base font-normal text-gray-500">
                    /selamanya
                  </span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Untuk tim kecil atau proyek pribadi.
                </p>
                <ul className="mt-8 flex-grow space-y-4 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Hingga 3 Pengguna</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Dashboard Analitik Dasar</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>1.000 Entri Data</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-10 flex h-11 w-full items-center justify-center rounded-full border border-gray-300 px-6 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Mulai Gratis
                </Link>
              </div>

              {/* Paket 2: Pro (Populer) */}
              <div className="relative flex scale-105 flex-col rounded-xl border-2 border-blue-600 bg-white p-8 shadow-2xl dark:border-blue-500 dark:bg-gray-900">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                  Populer
                </div>
                <h3 className="text-lg font-semibold">Pro</h3>
                <p className="mt-4 text-4xl font-extrabold">
                  Rp 150K
                  <span className="text-base font-normal text-gray-500">
                    /bln
                  </span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Untuk bisnis yang sedang berkembang.
                </p>
                <ul className="mt-8 flex-grow space-y-4 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Hingga 50 Pengguna</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Analitik & Laporan Lengkap</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Entri Data Tanpa Batas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Dukungan Prioritas</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-10 flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-base font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Mulai Uji Coba Pro
                </Link>
              </div>

              {/* Paket 3: Enterprise */}
              <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-lg font-semibold">Enterprise</h3>
                <p className="mt-4 text-4xl font-extrabold">Kustom</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Untuk perusahaan besar dengan kebutuhan khusus.
                </p>
                <ul className="mt-8 flex-grow space-y-4 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Pengguna Tanpa Batas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Single Sign-On (SSO)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Dedicated Support Manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>Fitur & Keamanan Kustom</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between p-8 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/yarwee-logo.png"
              alt="Logo Yarwee"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-semibold">Yarwee Admin</span>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
            © {new Date().getFullYear()} Yarwee. Semua Hak Dilindungi.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:underline dark:text-gray-400"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:underline dark:text-gray-400"
            >
              Ketentuan Layanan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
