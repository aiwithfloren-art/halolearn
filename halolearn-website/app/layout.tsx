import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "./components/WhatsAppWidget";
import NavProgressBar from "./components/NavProgressBar";
import { SessionProvider } from "./components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halolearn — Platform Karir #1 Indonesia | CV ATS, LinkedIn, Konsultasi",
  description: "10.000+ kandidat sudah buktikan. 95% berhasil dapat kerja dalam 3-6 bulan. CV ATS mulai Rp195.000. Optimasi LinkedIn, simulasi interview, konsultasi karir.",
  keywords: "cv ats indonesia, optimasi linkedin, konsultasi karir, cv maker indonesia, halolearn",
  openGraph: {
    title: "Halolearn — Dapatkan Pekerjaan Impianmu Lebih Cepat",
    description: "10.000+ kandidat. 95% berhasil. CV ATS mulai Rp195.000.",
    url: "https://halolearnid.com",
    siteName: "Halolearn",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halolearn",
    description: "Platform Karir #1 Indonesia"
  },
  alternates: {
    canonical: "https://halolearnid.com"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <NavProgressBar />
          {children}
          <WhatsAppWidget />
        </SessionProvider>
      </body>
    </html>
  );
}
