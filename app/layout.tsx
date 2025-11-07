import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner'; // <-- 1. IMPORT TOASTER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yarwee Admin',
  description: 'Admin Dashboard Yarwee',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        
        {/* 2. TAMBAHKAN KOMPONEN INI DI SINI */}
        <Toaster richColors position="top-right" /> 
        
      </body>
    </html>
  );
}