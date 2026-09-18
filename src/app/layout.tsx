import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ayubazaar.com"),
  title: "AyuBazaar | Traditional Wellness. Everyday Care.",
  description:
    "Discover carefully selected Ayurvedic and herbal wellness products inspired by India's ancient traditions. Featuring Yameny Khalta with Sidr Honey, Lava 31 Gold, and Shivshakti Churna.",
  keywords: [
    "AyuBazaar",
    "Ayurveda",
    "Traditional Wellness",
    "Yameny Khalta",
    "Lava 31 Gold",
    "Shivshakti Churna",
    "Herbal Medicine",
    "Natural Health",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body
        className="bg-[#F8F5EC] text-[#252A26] font-sans antialiased min-h-screen flex flex-col selection:bg-[#D6A83F]/30 selection:text-[#174A3A]"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
