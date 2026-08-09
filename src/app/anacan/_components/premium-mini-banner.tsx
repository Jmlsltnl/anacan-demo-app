"use client";

import { ChevronRight, Crown } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getProfile, subscribeAnacanStore } from "../_lib/demo-auth";
import { openPaywallPopup } from "../_lib/paywall-popup-store";

const getIsPremium = () => getProfile()?.premium === true;
const getServerIsPremium = () => false;

/**
 * Sticky upsell strip that sits right above the bottom nav on dashboards.
 * Opens the shared paywall sheet; hidden automatically for premium members.
 */
export function PremiumMiniBanner() {
  const isPremium = useSyncExternalStore(subscribeAnacanStore, getIsPremium, getServerIsPremium);

  if (isPremium) return null;

  return (
    <button type="button" className="a-premium-mini a-fade-in" onClick={openPaywallPopup}>
      <span className="a-premium-mini-crown">
        <Crown size={15} strokeWidth={2.4} />
      </span>
      <span className="a-premium-mini-body" style={{ textAlign: "left" }}>
        <span className="a-premium-mini-title">Premium-a keçin</span>
        <span className="a-premium-mini-sub">7 gün pulsuz · bütün funksiyalar açıq</span>
      </span>
      <span className="a-premium-mini-cta">
        Başlat <ChevronRight size={12} strokeWidth={3} />
      </span>
    </button>
  );
}
