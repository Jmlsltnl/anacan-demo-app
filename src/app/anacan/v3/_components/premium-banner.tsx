"use client";

import { Crown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ensureOfferStarted,
  formatCountdown,
  resetPremium,
  trialDaysLeft,
  usePremium,
} from "../_lib/premium-store";

/**
 * State-aware monetization banner under the hero:
 * none → intro offer with live 24h countdown
 * trial → days-left status
 * premium → membership chip
 */
export function PremiumBanner({ onOpen }: { onOpen: () => void }) {
  const premium = usePremium();
  const [now, setNow] = useState(() => Date.now());

  /* start the 24h intro offer once (external store write, not setState) */
  useEffect(() => {
    ensureOfferStarted();
  }, []);

  useEffect(() => {
    if (premium.status !== "none") return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [premium.status]);

  if (premium.status === "premium") {
    return (
      <div className="v3-banner premium a-fade-in">
        <span className="v3-banner-crown">
          <Crown size={19} strokeWidth={2.2} />
        </span>
        <div>
          <p className="v3-banner-title">Premium aktivdir 👑</p>
          <p className="v3-banner-sub">
            {premium.plan === "monthly" ? "Aylıq plan" : "İllik plan"} · bütün funksiyalar açıqdır
          </p>
        </div>
        <button type="button" className="v3-demo-reset" onClick={resetPremium}>
          sıfırla (demo)
        </button>
      </div>
    );
  }

  if (premium.status === "trial") {
    const daysLeft = trialDaysLeft(premium);
    return (
      <div className="v3-banner trial a-fade-in">
        <span className="v3-banner-crown">
          <Crown size={19} strokeWidth={2.2} />
        </span>
        <div>
          <p className="v3-banner-title">Pulsuz sınaq aktivdir ✨</p>
          <p className="v3-banner-sub">{daysLeft} gün qaldı · sonra ildə 59.99 ₼ · istənilən vaxt ləğv</p>
        </div>
        <button type="button" className="v3-demo-reset" onClick={resetPremium}>
          sıfırla (demo)
        </button>
      </div>
    );
  }

  const offerLeft = premium.offerEndsAt ? Math.max(0, premium.offerEndsAt - now) : 0;

  return (
    <button type="button" className="v3-banner a-fade-in" onClick={onOpen}>
      <span className="v3-banner-crown">
        <Crown size={19} strokeWidth={2.2} />
      </span>
      <div style={{ minWidth: 0 }}>
        <p className="v3-banner-title">Atlas üçün tam giriş — 7 gün pulsuz</p>
        <p className="v3-banner-sub" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          Analiz, tərcüməçi, bütün məqalələr
          {offerLeft > 0 && (
            <span className="v3-countdown">
              <Zap size={10} strokeWidth={2.8} /> {formatCountdown(offerLeft)}
            </span>
          )}
        </p>
      </div>
      <span className="v3-banner-cta">Başlat</span>
    </button>
  );
}
