import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Typsnitt från Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata används automatiskt av Next.js <head>
export const metadata: Metadata = {
  title: "Cleopatra Pizzeria – Pizza i Bosvedjan, Sundsvall",
  description:
    "Välkommen till Cleopatra Pizzeria i Bosvedjan, Sundsvall. Äkta pizza tillagad i vanlig ugn med kärlek och passion för Italien.",
  keywords: ["Bosvedjan", "pizzeria", "pizza", "Sundsvall", "mat"],
  authors: [{ name: "Cleopatra Pizzeria" }],
  metadataBase: new URL("https://www.cleopatra.nu"), // ✅ Viktigt för delningskort!
  openGraph: {
    title: "Cleopatra Pizzeria – Pizza i Bosvedjan, Sundsvall",
    description:
      "Välkommen till Cleopatra Pizzeria i Bosvedjan, Sundsvall. Äkta pizza tillagad i vanlig ugn med kärlek och passion för Italien.",
    url: "https://www.cleopatra.nu",
    siteName: "Cleopatra Pizzeria",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "https://www.cleopatra.nu/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cleopatra Pizzeria - Pizza i Bosvedjan, Sundsvall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleopatra Pizzeria – Pizza i Bosvedjan, Sundsvall",
    description:
      "Välkommen till Cleopatra Pizzeria i Bosvedjan, Sundsvall. Äkta pizza tillagad i vanlig ugn med kärlek och passion för Italien.",
    images: ["https://www.cleopatra.nu/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.cleopatra.nu",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
