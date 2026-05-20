import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold">내 블로그</span>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="transition hover:text-gray-300">
                홈
              </Link>
              <Link href="/posts" className="transition hover:text-gray-300">
                블로그
              </Link>
              <Link href="/posts/new" className="transition hover:text-gray-300">
                새 글 쓰기
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto w-full flex-1 p-6">{children}</main>
        <footer className="border-t py-4 text-center text-gray-400">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
