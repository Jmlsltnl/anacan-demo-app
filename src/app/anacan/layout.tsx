import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./anacan.css";

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anacan | Baby tracking",
  description: "Pregnancy, baby and menstruation tracking, reimagined for Anacan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f8c0ab",
};

export default function AnacanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={body.variable}>
      <body className="anacan-body">{children}</body>
    </html>
  );
}
