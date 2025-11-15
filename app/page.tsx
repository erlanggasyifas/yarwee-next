import React from "react";

// Impor komponen shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Komponen Header ---
const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <img src="/assets/yarwee-logo.png" alt="" />

        <div className="hidden lg:flex items-center space-x-8">
          <a href="#" className="text-gray-900 font-semibold">
            Beranda
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Tentang Kami
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Fitur
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Harga
          </a>
        </div>

        {/* Menggunakan <Button> shadcn dengan prop asChild untuk menjadikannya link */}
        <Button
          asChild
          className="bg-orange-500 text-white shadow-md hover:bg-orange-600 px-5 py-2.5"
        >
          <a href="#">Unduh Aplikasi</a>
        </Button>
      </nav>
    </header>
  );
};

// --- Komponen Hero ---
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 py-16 md:py-0">
        <div className="w-full flex flex-col gap-6 md:w-2/3 text-center md:text-left">
          <div>
            <p className="rounded-full py-2 px-4 bg-orange-200 w-fit text-orange-400 font-semibold mx-auto md:mx-0">
              Selamat Datang di Yarwee
            </p>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Bagi Biaya Tanpa Drama, Mulai Sekarang
            </h1>
            <p className="text-lg text-gray-600">
              Transparansi real-time, laporan ringkas, dan pengalaman bebas
              ribet
            </p>
          </div>
          <div className="space-x-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 text-white px-8 py-3.5 shadow-lg text-lg hover:bg-orange-600"
            >
              <a href="#">Unduh Sekarang</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 w-full md:w-[55%] pointer-events-none">
        <img
          src="/assets/phone-mockup.png" // Path diubah untuk folder public
          alt="Phone Mockup"
          className="w-full h-full object-contain object-right"
        />
      </div>
    </section>
  );
};

// --- Komponen Stats ---
const Stats: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <p className="rounded-full py-2 px-4 bg-orange-200 w-fit text-orange-400 font-semibold mx-auto md:mx-0">
              Tentang Kami
            </p>
            <h3 className="font-medium text-4xl">
              Apa yang kami lakukan
            </h3>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Kami membantu orang membagi tagihan dengan alat modern.
              Bergabunglah dengan ribuan pengguna yang mempercayai kami untuk
              patungan adil dan rapi.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-5xl font-extrabold text-orange-500">
              158+
            </span>
            <p className="text-gray-500 mt-2">Total Mitra</p>
          </div>
          <div>
            <span className="text-5xl font-extrabold text-orange-500">85K</span>
            <p className="text-gray-500 mt-2">Total Pengguna</p>
          </div>
          <div>
            <span className="text-5xl font-extrabold text-orange-500">
              4.9/5.0
            </span>
            <p className="text-gray-500 mt-2">Ulasan Pengguna</p>
          </div>
          <div>
            <span className="text-5xl font-extrabold text-orange-500">10K</span>
            <p className="text-gray-500 mt-2">Total Unduhan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Komponen Features ---
const Features: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Fitur yang Menempatkan Kenyamanan Anda
          </h2>
          <p className="text-lg text-gray-600">
            Fitur pintar yang dirancang untuk membuat hidup Anda lebih mudah.
            Tanpa biaya tersembunyi, tanpa drama.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="p-8 rounded-lg shadow-xl flex justify-center items-center">
            <img
              src="/assets/fitur1.png"
              alt="Feature Icon"
              className="max-w-full h-auto"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-gray-900 mb-1">
                Pelacakan Patungan Cerdas
              </h4>
              <p className="text-gray-600">
                Lihat siapa yang sudah bayar dan siapa yang belum dalam satu
                dasbor.
              </p>
            </div>
            <div className="p-6 border-l-4 border-transparent">
              <h4 className="text-xl font-bold text-gray-500 mb-1">
                Status Patungan Real-time
              </h4>
              <p className="text-gray-500">
                Dapatkan notifikasi instan saat teman Anda mengirim pembayaran.
              </p>
            </div>
            <div className="p-6 border-l-4 border-transparent">
              <h4 className="text-xl font-bold text-gray-500 mb-1">
                Pengingat Otomatis & Ringkasan
              </h4>
              <p className="text-gray-500">
                Kirim pengingat sopan secara otomatis ke yang belum bayar.
              </p>
            </div>
            <div className="p-6 border-l-4 border-transparent">
              <h4 className="text-xl font-bold text-gray-500 mb-1">
                Keamanan Level Bank
              </h4>
              <p className="text-gray-500">
                Data Anda dienkripsi dan aman bersama kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Komponen Pricing ---
const Pricing: React.FC = () => {
  // SVG Check Icon sebagai komponen React
  const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Langganan Simpel, Nilai Nyata
          </h2>
          <p className="text-lg text-gray-600">
            Pilih paket yang paling sesuai dengan kebutuhan Anda. Tanpa ada
            biaya tersembunyi, jaminan uang kembali.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {/* Menggunakan <Card> dari shadcn */}
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-extrabold">Free</CardTitle>
              <CardDescription className="text-base pt-2">
                Untuk kebutuhan personal dan grup kecil.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Hingga 5 Grup Patungan</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Ekspor Laporan Dasar</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Bantuan Pengguna Dasar</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Menggunakan <Card> dan <Badge> dari shadcn */}
          <Card className="w-full max-w-md border-2 border-orange-500 shadow-2xl relative">
            <Badge className="absolute -top-3.5 right-6 bg-orange-100 text-orange-600 px-4 py-1 font-semibold text-sm hover:bg-orange-100">
              Paling Populer
            </Badge>
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-extrabold">
                Rp10K{" "}
                <span className="text-lg font-normal text-gray-500">
                  / bulan
                </span>
              </CardTitle>
              <CardDescription className="text-base pt-2">
                Untuk grup besar dan kebutuhan lebih lanjut.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Grup Patungan Tanpa Batas</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Lampirkan Bukti Bayar</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Dukungan Prioritas</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Akses Fitur Beta</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// // --- Komponen Call to Action (CTA) ---
// const CTA: React.FC = () => {
//   return (
//     <section className="py-24">
//       <div className="container mx-auto px-6">
//         <div className="bg-orange-500 rounded-xl shadow-xl p-12 lg:p-16">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//             <div className="text-white text-center lg:text-left">
//               <h2 className="text-4xl font-extrabold mb-3">
//                 Tunggu apa lagi? <br />
//                 Berlangganan Sekarang
//               </h2>
//               <p className="text-lg text-orange-100">
//                 Mulai sekarang dan rasakan kemudahan mengelola tagihan bersama.
//               </p>
//             </div>
//             <div>
//               {/* Menggunakan varian 'secondary' atau styling manual untuk tombol putih */}
//               <Button
//                 asChild
//                 size="lg"
//                 className="bg-white text-gray-900 shadow-lg font-bold text-lg hover:bg-gray-100 px-8 py-4 h-auto"
//               >
//                 <a href="#">Mulai Sekarang</a>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- Komponen Footer ---
// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white border-t border-gray-100 mt-auto">
//       <div className="container mx-auto px-6 py-16">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
//           <div className="col-span-2 lg:col-span-2">
//             <a href="#" className="text-3xl font-bold text-orange-500">
//               yarwee
//             </a>
//             <p className="text-gray-500 mt-4 max-w-xs">
//               Solusi modern untuk mengelola tagihan bersama tanpa drama.
//             </p>
//           </div>
//           <div>
//             <h5 className="font-bold text-gray-900 mb-4">Produk</h5>
//             <ul className="space-y-3">
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Fitur
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Harga
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Keamanan
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="font-bold text-gray-900 mb-4">Perusahaan</h5>
//             <ul className="space-y-3">
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Tentang Kami
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Karir
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="font-bold text-gray-900 mb-4">Bantuan</h5>
//             <ul className="space-y-3">
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Pusat Bantuan
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Kontak Kami
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-500 hover:text-gray-900">
//                   Privasi
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             &copy; 2025 Yarwee. Semua hak cipta dilindungi.
//           </p>
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             {/* Atribut SVG telah dikonversi ke camelCase (misal: fillRule) */}
//             <a href="#" className="text-gray-400 hover:text-gray-600">
//               <svg
//                 className="w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path d="M8.29 20.251C7.547 20.5 6.78 20.5 6 20.5C2.687 20.5 0 17.813 0 14.5C0 11.802 1.678 9.533 4.02 8.583C4.09 7.16 4.54 5.86 5.3 4.84C6.107 3.73 7.23 3 8.5 3C10.5 3 12.33 4.5 12.8 6.5C13.2 6.3 13.7 6.1 14.2 6C14.1 5.3 14 4.6 14 4C14 2.9 14.4 1.9 15.2 1.1C16 0.3 17 0 18 0C19.1 0 20 0.4 20.8 1.1C21.6 1.9 22 2.9 22 4C22 4.6 21.9 5.3 21.8 6C22.3 6.1 22.8 6.3 23.2 6.5C23.7 8.5 24 10.5 24 12.5C24 16.8 20.4 20.5 16 20.5C15.2 20.5 14.5 20.4 13.7 20.2C12.9 21.1 11.8 21.7 10.5 21.7C9.2 21.7 8.1 21.1 7.3 20.2C7.7 20.2 8 20.2 8.3 20.2C8.3 20.2 8.3 20.2 8.3 20.2C8.3 20.2 8.3 20.2 8.29 20.251Z"></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-600">
//               <svg
//                 className="w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm-1 15.93c-2.746 0-5.088-1.87-5.83-4.454c.386.062.78.094 1.18.094c.71 0 1.396-.13 2.02-.37c-.666-.13-1.23-.55-1.61-1.1c-.38-.55-.5-1.21-.44-1.89c.21.12.45.19.7.2A2.3 2.3 0 0 1 6.1 11c0-.68.18-1.3.5-1.82c.74 1.05 1.7 1.86 2.8 2.45c.18-.03.36-.05.55-.05c1.8 0 3.26-1.79 3.26-4c0-.02 0-.04 0-.06c.18-.15.35-.32.5-.5c-.17.08-.34.14-.52.19c.19-.12.33-.27.46-.46c-.19.09-.38.16-.58.2a4.3 4.3 0 0 0-3.1-1.3c-.3 0-.6.04-.9.11c-.26.07-.5.18-.73.32c-.23.14-.44.31-.63.5c-.19.19-.36.4-.5.63c-.14.23-.25.47-.32.73c-.07.3-.11.6-.11.9c0 .28.03.55.08.81c-.05-.02-.1-.04-.15-.06c-.05-.02-.1-.04-.15-.06c-1.4 0-2.67-.5-3.66-1.3c-.99-.8-1.63-1.9-1.8-3.2c.42.23.88.38 1.37.44C4.1 6.2 3.5 5.2 3.5 4c0-.4.07-.8.2-1.15C4.8 4.2 6.2 5.5 8 6.4c-.04-.3-.06-.6-.06-.9c0-1.8 1.46-3.26 3.26-3.26c.9 0 1.7.38 2.3.99c.7-.14 1.37-.38 1.95-.74c-.23.7-.7 1.3-1.3 1.68c.6-.07 1.2-.23 1.7-.46c-.4.6-.9 1.1-1.5 1.5c.02.16.03.33.03.5c0 3.27-2.5 7-7 7c-1.4 0-2.7-.4-3.8-1.1c.4.05.8.07 1.2.07c1.1 0 2.2-.4 3.1-1.1c-.8 0-1.5-.5-1.8-1.2c.15.02.3.04.45.04c.15 0 .3-.02.45-.06c-.9-.18-1.5-1-1.5-1.9v-.02c.25.14.55.23.85.25c-.5-.35-.85-.9-.85-1.5c0-.3.08-.6.23-.88c1 .8 2.2 1.4 3.5 1.7c-.06-.3-.09-.6-.09-.9z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-600">
//               <svg
//                 className="w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zM8.2 18.2C8.6 18.2 9 18.6 9 19s-0.4 0.8-0.8 0.8S7.4 19.4 7.4 19s0.4-0.8 0.8-0.8zM9 8.2C9 7.4 8.6 7 8.2 7S7.4 7.4 7.4 8.2v7.6C7.4 16.6 8 17 8.8 17s0.8-0.4 0.8-0.8V8.2zM12 18.2c-0.4 0-0.8-0.4-0.8-0.8v-2.4c0-0.4 0.4-0.8 0.8-0.8s0.8 0.4 0.8 0.8v2.4c0 0.4-0.4 0.8-0.8 0.8zM15.8 18.2c-0.4 0-0.8-0.4-0.8-0.8v-7.6c0-0.4 0.4-0.8 0.8-0.8s0.8 0.4 0.8 0.8v7.6c0 0.4-0.4 0.8-0.8 0.8z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// --- Komponen Halaman Utama (Main Page) ---
// Komponen ini menggabungkan semua bagian menjadi satu halaman.
const YarweeHomePage: React.FC = () => {
  // Kita hilangkan tag <head> dan <body> karena itu diatur oleh framework (misal: Next.js)
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        {/* <CTA /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default YarweeHomePage;
