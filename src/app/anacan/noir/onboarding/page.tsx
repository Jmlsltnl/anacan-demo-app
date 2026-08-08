import type { Metadata } from "next";
import { OnboardingEngine } from "./_components/onboarding-engine";

export const metadata: Metadata = {
  title: "Qiymətləndirmə",
  description: "18 addımlıq sağlamlıq qiymətləndirməsi — Anacan Skorunuz və 90 günlük planınız.",
};

export default function NoirOnboardingPage() {
  return <OnboardingEngine />;
}
