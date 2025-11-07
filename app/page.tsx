import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Selamat Datang
        </h1>
        <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
          Silakan masuk atau mendaftar untuk melanjutkan.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 px-6 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 sm:w-auto"
          >
            Daftar
          </Link>
        </div>
      </div>
    </main>
  );
}