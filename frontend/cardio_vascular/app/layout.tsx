import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CardioGuard | AI Cardiovascular Risk Assessment",
  description: "Medical-grade cardiovascular disease risk prediction using advanced machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased h-full flex flex-col bg-background text-foreground`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
