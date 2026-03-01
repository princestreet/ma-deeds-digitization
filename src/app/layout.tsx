import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Massachusetts Has Spent $152 Million Digitizing Its Deed Records",
  description:
    "An investigative data analysis of Massachusetts' registry of deeds digitization program (FY2005-2026), examining $151.9M in spending across two dedicated technology funds.",
  openGraph: {
    title: "Massachusetts Has Spent $152 Million Digitizing Its Deed Records",
    description:
      "A cost analysis of MA's $152M registry of deeds digitization program, FY2005-2026.",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lora.variable} ${inter.variable} antialiased bg-white text-slate-800`}
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        {children}
      </body>
    </html>
  );
}
