import type { Metadata } from "next";
import { PremiumExperience } from "./_components/premium-experience";

export const metadata: Metadata = {
  title: "Anacan Premium — Planınızı seçin",
  description: "İllik planla 7 gün pulsuz sınaq və ya öhdəliksiz aylıq plan.",
};

export default function PremiumPage() {
  return <PremiumExperience />;
}
