"use client";

import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { getProfile, saveProfile, subscribeAnacanStore } from "../../../_lib/demo-auth";
import { PlanSelect } from "../../_components/plan-select";

const getMomName = () => getProfile()?.momName ?? "";
const getServerMomName = () => "";

export function PremiumExperience() {
  const router = useRouter();
  const momName = useSyncExternalStore(subscribeAnacanStore, getMomName, getServerMomName);
  const [done, setDone] = useState<"yearly" | "monthly" | null>(null);

  if (done) {
    return (
      <>
        <div className="f-scroll">
          <div className="f-success-hero">
            <div className="f-confetti" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <span className="f-success-icon">
              <Check size={42} strokeWidth={3} />
            </span>
            <h1 className="f-title a-heading">
              {done === "yearly" ? "Pulsuz sınaq başladı! 👑" : "Premium aktivdir! 👑"}
            </h1>
            <p className="f-sub" style={{ marginBottom: 0 }}>
              {done === "yearly"
                ? "7 gün ərzində bütün funksiyalar açıqdır. 5-ci gündə xatırlatma göndərəcəyik."
                : "Bütün Premium funksiyalar indi açıqdır. Xoş gəldiniz!"}
            </p>
          </div>
        </div>
        <footer className="f-footer">
          <button type="button" className="f-btn f-btn-primary" onClick={() => router.replace("/anacan")}>
            Anacan-a qayıt
          </button>
        </footer>
      </>
    );
  }

  return (
    <>
      <div className="f-topbar">
        <Link href="/anacan" className="f-back" aria-label="Geri qayıt">
          <ChevronLeft size={19} strokeWidth={2.2} />
        </Link>
      </div>
      <PlanSelect
        name={momName || undefined}
        skipLabel="Bəlkə sonra"
        onSubscribe={(plan) => {
          saveProfile({
            premium: true,
            premiumPlan: plan,
            trialStartedAt: plan === "yearly" ? new Date().toISOString() : undefined,
          });
          setDone(plan);
        }}
        onSkip={() => router.push("/anacan")}
      />
    </>
  );
}
