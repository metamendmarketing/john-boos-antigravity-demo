import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";

export const metadata: Metadata = {
  title: "John Boos & Co. | Commercial Equipment Intelligent Specifier",
  description: "Official concept demonstration for intelligent product specification, sizing, and decision support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fbfaf8] text-[#1f1f1f] min-h-screen flex flex-col antialiased selection:bg-[#a91b1b] selection:text-white">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
