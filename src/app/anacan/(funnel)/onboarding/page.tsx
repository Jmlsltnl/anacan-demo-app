import type { Metadata } from "next";
import { OnboardingFlow } from "./_components/onboarding-flow";

export const metadata: Metadata = {
  title: "Planınızı quraq — Anacan",
  description: "Bir neçə sual — sizə tam uyğun Anacan planı.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
