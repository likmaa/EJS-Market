import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

// Lazy load les composants pour améliorer les performances
const Header = dynamic(() => import("@/components/Header").then(mod => ({ default: mod.Header })), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
  ssr: false,
});

const CookieConsentModal = dynamic(() => import("@/components/CookieConsentModal").then(mod => ({ default: mod.CookieConsentModal })), {
  ssr: false,
});

const ServiceWorkerRegistration = dynamic(() => import("@/components/ServiceWorkerRegistration").then(mod => ({ default: mod.ServiceWorkerRegistration })), {
  ssr: false,
});

// Code splitting : Charger les composants mobile uniquement sur mobile
const MobileHeader = dynamic(() => import("@/components/mobile").then(mod => ({ default: mod.MobileHeader })), {
  ssr: false,
});

const MobileBottomNav = dynamic(() => import("@/components/mobile").then(mod => ({ default: mod.MobileBottomNav })), {
  ssr: false,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Electrónica & Jardín Store Europe",
  description: "Plateforme E-commerce multi-produits pour l'Europe",
  manifest: "/manifest.json",
  themeColor: "#7C3AED",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "eJS MARKET",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${plusJakarta.variable} font-sans`}>
        <ErrorBoundary>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <ClientLayout>
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              <ErrorBoundary>
                <MobileHeader />
              </ErrorBoundary>
              <ErrorBoundary>
                <main className="min-h-screen bg-off-white pb-16 lg:pb-0">{children}</main>
              </ErrorBoundary>
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
              <ErrorBoundary>
                <MobileBottomNav />
              </ErrorBoundary>
              <ErrorBoundary>
                <CookieConsentModal />
              </ErrorBoundary>
              <ServiceWorkerRegistration />
                </ClientLayout>
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

