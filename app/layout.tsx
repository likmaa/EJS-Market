import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCart } from "@/components/StickyCart";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Electrónica & Jardín Store Europe",
  description: "Plateforme E-commerce multi-produits pour l'Europe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${plusJakarta.variable} font-sans`}>
        <Header />
        <main className="min-h-screen bg-off-white">{children}</main>
        <Footer />
        <StickyCart />
      </body>
    </html>
  );
}

