"use client";

import "../(funnel)/funnel.css";

import { Check } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { getProfile, saveProfile, subscribeAnacanStore } from "../_lib/demo-auth";
import {
  closePaywallPopup,
  getPaywallPopupOpen,
  getServerPaywallPopupOpen,
  subscribePaywallPopup,
} from "../_lib/paywall-popup-store";
import { PlanSelect } from "../(funnel)/_components/plan-select";

const getMomName = () => getProfile()?.momName ?? "";
const getServerMomName = () => "";

/**
 * Shared paywall bottom-sheet. Hosted once per screen (inside BottomNav),
 * opened from any premium surface via openPaywallPopup().
 */
export function PaywallPopupHost() {
  const isOpen = useSyncExternalStore(subscribePaywallPopup, getPaywallPopupOpen, getServerPaywallPopupOpen);
  const momName = useSyncExternalStore(subscribeAnacanStore, getMomName, getServerMomName);
  const [done, setDone] = useState<"yearly" | "monthly" | null>(null);

  if (!isOpen) return null;

  const close = () => {
    closePaywallPopup();
    setDone(null);
  };

  return (
    <>
      <button type="button" className="a-paysheet-backdrop" onClick={close} aria-label="Bağla" />
      <div className="a-paysheet" role="dialog" aria-modal="true" aria-label="Anacan Premium">
        <div className="a-paysheet-grip" />
        {done ? (
          <>
            <div className="f-scroll">
              <div className="f-success-hero" style={{ paddingTop: 30 }}>
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
              <button type="button" className="f-btn f-btn-primary" onClick={close}>
                Davam et
              </button>
            </footer>
          </>
        ) : (
          <PlanSelect
            name={momName || undefined}
            skipLabel="İndi yox"
            onSubscribe={(plan) => {
              saveProfile({
                premium: true,
                premiumPlan: plan,
                trialStartedAt: plan === "yearly" ? new Date().toISOString() : undefined,
              });
              setDone(plan);
            }}
            onSkip={close}
          />
        )}
      </div>
    </>
  );
}
