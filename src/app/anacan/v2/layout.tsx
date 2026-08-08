import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "Anacan v2 | Baby tracking",
  description: "Pregnancy, baby and menstruation tracking — weather-app inspired concept.",
};

export default function AnacanV2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
