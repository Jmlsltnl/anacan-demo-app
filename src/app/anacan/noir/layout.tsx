import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./noir.css";

const display = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-noir-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noir-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anacan Noir",
    template: "%s — Anacan Noir",
  },
  description: "Analıq üçün premium sağlamlıq yoldaşı — gecə qədər sakit, mütəxəssis qədər dəqiq.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0e0b16",
};

export default function NoirLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${body.variable} n-stage`}>
      <span className="n-orb one" aria-hidden />
      <span className="n-orb two" aria-hidden />
      <span className="n-orb three" aria-hidden />
      <div className="n-screen">{children}</div>
    </div>
  );
}
