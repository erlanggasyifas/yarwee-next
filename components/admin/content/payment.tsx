"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentPages() {
  // ======== DATA DINAMIS MULTI USER ========
  const users = [
    {
      id: 1,
      name: "Burch Khan",
      avatar: "https://github.com/shadcn.png",
      total: 80000,
      spendings: [
        { name: "Spending 1", qty: 1, price: 45000 },
        { name: "Spending 2", qty: 1, price: 45000 },
        { name: "Spending 3", qty: 1, price: 45000 },
        { name: "Spending 4", qty: 1, price: 45000 },
        { name: "Spending 5", qty: 1, price: 45000 },
      ],
    },

    {
      id: 2,
      name: "Naya Azura",
      avatar: "https://github.com/vercel.png",
      total: 42000,
      spendings: [
        { name: "Air Mineral", qty: 1, price: 4000 },
        { name: "Roti Coklat", qty: 1, price: 8000 },
      ],
    },

    {
      id: 3,
      name: "Rama Putra",
      avatar: "https://github.com/nextjs.png",
      total: 150000,
      spendings: [
        { name: "Ayam Geprek", qty: 1, price: 25000 },
        { name: "Jus Alpukat", qty: 1, price: 15000 },
        { name: "Camilan", qty: 1, price: 10000 },
        { name: "Parkir", qty: 1, price: 2000 },
        { name: "Rice Bowl", qty: 1, price: 30000 },
      ],
    },
  ];

  // STATE untuk tiap user
  const [openDetail, setOpenDetail] = useState<{ [key: number]: boolean }>({});

  // Refs untuk auto-height animation
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleDetail = (userId: number) => {
    setOpenDetail((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <img src="/assets/yarwee-logo.png" alt="" className="w-1/2" />

      <div>
        <p className="text-2xl font-bold">Jalan Ke Matahari</p>
        <p className="text-md font-extralight">
          Sep 4 - 14, 2025 <span>.</span>08:36 AM
        </p>
      </div>

      <div className="w-full space-y-4 p-2">
        {/* LOOP SEMUA USER */}
        {users.map((user) => {
          const firstThree = user.spendings.slice(0, 3);
          const remaining = user.spendings.slice(3);
          const show = openDetail[user.id];

          return (
            <div key={user.id} className="w-full shadow-2xl p-4 rounded-lg">
              {/* USER HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <p className="text-md font-semibold">{user.name}</p>
                </div>

                <p className="text-md font-medium">
                  Rp{user.total.toLocaleString("id-ID")},00
                </p>
              </div>

              <Separator className="my-4" />

              {/* TIGA SPENDING */}
              {firstThree.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <p className="text-md font-medium mb-2">{item.name}</p>
                  <p className="text-md font-medium mb-2">
                    {item.qty}x{" "}
                    <span className="ms-4">
                      Rp{item.price.toLocaleString("id-ID")},00
                    </span>
                  </p>
                </div>
              ))}

              {/* SPENDING TERSEMBUNYI — SMOOTH AUTO HEIGHT */}
              <div
                ref={(el) => (contentRefs.current[user.id] = el)}
                style={{
                  height: show
                    ? contentRefs.current[user.id]?.scrollHeight + "px"
                    : "0px",
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div>
                  {remaining.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <p className="text-md font-medium mb-2">{item.name}</p>
                      <p className="text-md font-medium mb-2">
                        {item.qty}x{" "}
                        <span className="ms-4">
                          Rp{item.price.toLocaleString("id-ID")},00
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOMBOL DETAIL */}
              {remaining.length > 0 && (
                <div
                  className="flex justify-between cursor-pointer mt-2"
                  onClick={() => toggleDetail(user.id)}
                >
                  <p className="text-md font-medium text-orange-500">
                    {show ? "Tutup Detail" : "Detail Tagihan"}
                  </p>

                  <div
                    className={`transition-transform duration-300 ${
                      show ? "rotate-360" : ""
                    }`}
                  >
                    {show ? (
                      <ChevronUp className="text-orange-500" />
                    ) : (
                      <ChevronDown className="text-orange-500" />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col w-full space-y-4">
        <Button
          type="submit"
          className="py-8 text-xl rounded-full bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
        >
          Salin Link
        </Button>
        <Button
          type="submit"
          className="py-8 text-xl rounded-full bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
        >
          Unduh Pembayaran
        </Button>
      </div>
      <Separator className="my-4" />
      <img src="/assets/yarwee-logo.png" alt="" className="w-1/2" />
    </div>
  );
}
