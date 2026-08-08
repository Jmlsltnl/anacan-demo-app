import type { Metadata } from "next";
import { HomeApp } from "./_components/home-app";

export const metadata: Metadata = {
  title: "Bu gün",
  description: "Anacan Noir — gündəlik planınız, skorunuz və izləmələriniz bir ekranda.",
};

export default function NoirHomePage() {
  return <HomeApp />;
}
