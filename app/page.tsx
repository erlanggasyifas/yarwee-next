"use client";
import React, { useState, useEffect } from "react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Facebook, Youtube, Instagram } from "lucide-react";

const featuresData = [
  {
    id: "tracking",
    title: "Pelacakan Patungan Cerdas",
    description:
      "Otomatis mencatat dan mengelompokkan semua biaya bersama, sehingga setiap orang tahu ke mana uang mereka pergi—tanpa input rumit.",
    imageSrc: "/assets/fitur1.png",
  },
  {
    id: "realtime",
    title: "Status Patungan Real-time",
    description:
      "Pantau siapa yang sudah bayar dan siapa yang belum, lengkap dengan pengingat instan agar tagihan cepat beres.",
    imageSrc: "/assets/fitur2.png",
  },
  {
    id: "reminder",
    title: "Pengingat Otomatis & Ringkasan",
    description:
      "Dapatkan notifikasi saat ada tagihan yang belum lunas dan lihat ringkasan patungan dalam tampilan yang rapi, sehingga semua tetap transparan dan terkendali.",
    imageSrc: "/assets/fitur3.png",
  },
  {
    id: "security",
    title: "Keamanan Level Bank",
    description:
      "Data dienkripsi ujung ke ujung dan dilindungi standar keamanan tingkat tinggi—privasi dan keamanan Anda selalu diutamakan.",
    imageSrc: "/assets/fitur4.png",
  },
];

export default function YarweeHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// HEADER
const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <img src="/assets/yarwee-logo.png" className="w-20" alt="" />

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

        <Button
          asChild
          className="text-white shadow-md py-6 hover:bg-orange-600"
        >
          <a href="#">Unduh Aplikasi</a>
        </Button>
      </nav>
    </header>
  );
};

// HERO
const Hero: React.FC = () => {
  return (
    <section className="relative h-180 lg:min-h-screen flex items-center overflow-hidden">
      <div
        className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 py-16 md:py-0"
      >
        <div className="w-full flex flex-col gap-6 md:w-2/3 text-center md:text-left">
          <p className="rounded-full py-2 px-4 bg-orange-200 w-fit text-orange-400 font-semibold mx-auto md:mx-0">
            Selamat Datang di Yarwee
          </p>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Bagi Biaya Tanpa Drama, Mulai Sekarang
            </h1>
            <p className="text-lg text-gray-400">
              Transparansi real-time, laporan ringkas, dan pengalaman bebas
              ribet
            </p>
          </div>

          <div className="space-x-4 pt-4">
            <Button
              asChild
              size="lg"
              className="text-white py-6 shadow-lg text-lg hover:bg-orange-600"
            >
              <a href="#">Unduh</a>
            </Button>
          </div>
        </div>
      </div>

      <div
        className="absolute lg:inset-y-0 -right-11 bottom-0 lg:right-0 w-[140%] md:w-[55%] pointer-events-none"
      >
        <img
          src="/assets/phone-mockup.png"
          alt="Phone Mockup"
          className="w-full h-full object-contain object-right"
        />
      </div>
    </section>
  );
};

// STATS
const Stats: React.FC = () => {
  const items = [
    { angka: "158+", label: "Total Mitra" },
    { angka: "85K", label: "Total Pengguna" },
    { angka: "4.9/5.0", label: "Ulasan Pengguna" },
    { angka: "10K", label: "Total Unduhan" },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <div className="flex flex-col gap-4 col-span-2">
            <p className="rounded-full py-2 px-4 bg-orange-200 w-fit text-orange-400 font-semibold">
              Tentang Kami
            </p>
            <h3 className="font-medium text-4xl">Apa yang kami lakukan</h3>
          </div>
          <div className="col-span-3">
            <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Kami membantu orang membagi tagihan dengan alat modern.
              Bergabunglah dengan ribuan pengguna yang mempercayai kami untuk
              patungan adil dan rapi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:justify-between gap-8 text-center">
          {items.map((item, index) => (
            <div key={index}>
              <span className="text-6xl font-medium text-orange-500">
                {item.angka}
              </span>
              <p className="text-gray-400 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FEATURES
const Features: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mx-auto mb-16">
          <h2 className="text-4xl font-medium text-gray-900 mb-2">
            Fitur yang Menempatkan Kenyamanan Anda
          </h2>
          <p className="text-md text-gray-400 max-w-4xl mx-auto">
            Dari pembiayaan hingga koloborasi secara langsung, aplikasi kami
            dibuat untuk mengatur payungan anda dengan kepercayaan, kejelasan
            dan kemudahan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* GAMBAR */}
          <div
            className="rounded-lg flex justify-center items-center"
            style={{ minHeight: "350px" }}
          >
            <img
              key={activeIndex}
              src={featuresData[activeIndex].imageSrc}
              alt={featuresData[activeIndex].title}
              className="w-full object-contain bg-transparent"
            />
          </div>

          {/* TEKS */}
          <div
            className="flex flex-col space-y-6"
          >
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`p-6 border-l-4 ${
                  index === activeIndex
                    ? "border-orange-500"
                    : "border-transparent"
                } transition-colors duration-300 cursor-pointer`}
              >
                <h4
                  className={`text-xl font-bold mb-1 ${
                    index === activeIndex ? "text-gray-900" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  {feature.title}
                </h4>
                <p
                  className={
                    index === activeIndex ? "text-gray-600" : "text-gray-500"
                  }
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// PRICING
const Pricing: React.FC = () => {
  const CheckIcon = () => (
    <svg
      className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
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
        <div className="text-center mx-auto mb-16">
          <h2 className="text-4xl font-medium text-gray-900 mb-2">
            Langganan Simpel, Nilai Nyata
          </h2>
          <p className="text-md text-gray-400 max-w-4xl mx-auto">
            Pilih paket langganan yang sesuai dengan tujuan Anda. Tanpa ada
            biaya tersembunyi, tingkatan yang kompleks, hanya alat untukmembantu
            patungan Anda
          </p>
        </div>

        <div className="flex flex-col w-full lg:flex-row justify-center items-stretch gap-8">
          {/* FREE */}
          <Card className="w-full shadow-lg">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <p>Free</p>
              </div>
              <h3 className="text-4xl font-medium mb-2 text-orange-500">
                Gratis
              </h3>
              <Separator className="mt-2 mb-4" />

              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>3 Aktivitas aktif/ bulan</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Penambah Pengeluaran</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Akses bagi via web</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Bantuan Pengguna Dasar</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PREMIUM */}
          <Card
            className="w-full border-2 border-orange-500 shadow-2xl relative"
          >
            <Badge className="absolute -top-4 border-2 border-orange-500 right-6 bg-orange-100 text-orange-600 px-4 py-1 font-semibold text-sm hover:bg-orange-100">
              Paling Populer
            </Badge>
            <CardContent>
              <div className="text-gray-400 mb-4">
                <p>Premium</p>
              </div>

              <h3 className="text-4xl font-medium mb-2 text-orange-500">
                Rp10.000,00
                <span className="text-sm text-black ms-1">/ bulan</span>
              </h3>

              <Separator className="mt-2 mb-4" />

              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Semua fitur versi dasar</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Aktivitas tanpa batas</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Penyimpan target anggaran</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Bantuan Prioritas</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// CTA
const CTA: React.FC = () => {
  return (
    <section className="pt-8 pb-24">
      <div className="container mx-auto px-6">
        <div
          className="bg-gradient-to-r from-orange-500 from-20% via-orange-300 via-40% to-orange-500 to-90% rounded-xl shadow-xl p-12 lg:p-16"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-white text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-3">
                Tunggu apa lagi? <br />
                Berlangganan Sekarang
              </h2>
            </div>

            <div className="max-w-lg">
              <p className="text-md font-extralight text-white mb-4">
                Dengan satu solusi terpadu, Anda dapat mengelola semua patungan,
                membagi tagihan, dan memantau siapa yang sudah bayar dalam satu
                tempat. Aman, cepat, dan dibuat untuk kebutuhan nyata—seperti
                Anda dan teman-teman Anda.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-white text-orange-500 shadow-lg font-bold text-lg hover:bg-gray-100 px-8 py-4 h-auto"
              >
                <a href="#">Unduh Sekarang</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FOOTER
const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gray-100 border-t border-gray-100 mt-auto"
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <img src="/assets/yarwee-logo.png" className="lg:w-64" alt="" />
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-4">Produk</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Harga
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-4">Lainnya</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-gray-900"
                >
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="bg-gray-900 w-fit p-2 rounded-full cursor-pointer hover:bg-gray-800">
                <Facebook color="#fff" />
              </div>
              <div className="bg-gray-900 w-fit p-2 rounded-full cursor-pointer hover:bg-gray-800">
                <Youtube color="#fff" />
              </div>
              <div className="bg-gray-900 w-fit p-2 rounded-full cursor-pointer hover:bg-gray-800">
                <Instagram color="#fff" />
              </div>
            </div>

            <p className="text-sm">
              These tools are for personal finance management, not legal advice.
            </p>
            <p className="text-sm text-gray-400">© 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
