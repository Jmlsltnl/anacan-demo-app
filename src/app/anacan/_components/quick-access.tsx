"use client";

import { BookOpen, Camera, Crown, MessageCircle, Volume2 } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getProfile, subscribeAnacanStore } from "../_lib/demo-auth";
import { openPaywallPopup } from "../_lib/paywall-popup-store";

const TOOLS = [
  { icon: MessageCircle, label: "Cry Translator", premium: true },
  { icon: Camera, label: "Baby Photoshoot", premium: false },
  { icon: BookOpen, label: "Fairy Tales", premium: true },
  { icon: Volume2, label: "White Noise", premium: false },
];

const getIsPremium = () => getProfile()?.premium === true;
const getServerIsPremium = () => false;

/**
 * Quick access grid with premium-gated tools: tapping a crowned tool
 * opens the shared paywall sheet.
 */
export function QuickAccess() {
  const isPremium = useSyncExternalStore(subscribeAnacanStore, getIsPremium, getServerIsPremium);

  return (
    <section className="a-section">
      <div className="a-section-head">
        <h2 className="a-section-title a-heading">Quick access</h2>
      </div>
      <div className="a-trio" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {TOOLS.map((tool) => {
          const gated = tool.premium && !isPremium;
          return (
            <button
              key={tool.label}
              type="button"
              className="a-trio-item"
              style={{ position: "relative" }}
              onClick={gated ? openPaywallPopup : undefined}
              aria-label={gated ? `${tool.label} — Premium` : tool.label}
            >
              {gated && (
                <span className="a-crown-chip">
                  <Crown size={11} strokeWidth={2.6} />
                </span>
              )}
              <span className="a-trio-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
                <tool.icon size={17} strokeWidth={2} />
              </span>
              <p className="a-trio-label">{tool.label}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
