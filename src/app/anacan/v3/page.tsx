import type { Metadata } from "next";
import { HomeExperience } from "./_components/home-experience";

export const metadata: Metadata = {
  title: "Anacan v3 | Premium home",
  description: "Anacan home with the premium conversion layer — trial, offer countdown and gated insights.",
};

export default function AnacanV3Page() {
  return <HomeExperience />;
}
