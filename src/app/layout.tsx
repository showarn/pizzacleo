import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cleopatra Pizzeria – Pizza i Bosvedjan, Sundsvall",
  description:
    "Välkommen till Cleopatra Pizzeria i Bosvedjan, Sundsvall. Äkta pizza tillagad i vanlig ugn med kärlek och passion för Italien.",
  keywords: ["Bosvedjan", "pizzeria", "pizza", "Sundsvall", "mat"],
  authors: [{ name: "Cleopatra Pizzeria" }],
  openGraph: {
    title: "Cleopatra Pizzeria – Pizza i Bosvedjan, Sundsvall",
    description:
      "Välkommen till Cleopatra Pizzeria i Bosvedjan, Sundsvall. Äkta pizza tillagad i vanlig ugn med kärlek och passion för Italien.",
    url: "https://pizzacleo.vercel.app",
    siteName: "Cleopatra Pizzeria",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "https://pizzacleo.vercel.app/og-image.png",
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
    site: "@cleopatrapizzeria",    // Ändra eller ta bort om ni inte har twitter
    creator: "@cleopatrapizzeria", // Ändra eller ta bort om ni inte har twitter
    images: ["https://pizzacleo.vercel.app/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pizzacleo.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#e60000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#faf5eb]`}
      >
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
