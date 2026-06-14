import type { Metadata } from "next";
import { Inter, Source_Serif_4, Urbanist } from "next/font/google";
import { publicPageMetadata } from "@/shared/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-sourceSerif",
  subsets: ["latin"],
});

export const metadata: Metadata = publicPageMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${urbanist.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
