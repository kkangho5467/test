import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="max-w-4xl mx-auto w-full flex-1 p-6">{children}</main>
          <footer className="border-t py-4 text-center text-gray-400">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
