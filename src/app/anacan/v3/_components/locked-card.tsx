"use client";

import { Crown, Lock } from "lucide-react";

/**
 * Curiosity-gap gate: renders the real content underneath and fades it
 * into an unlock CTA. Interactions are blocked while locked.
 */
export function PremiumGate({
  locked,
  label,
  sub,
  fadeFrom = 30,
  onUnlock,
  children,
}: {
  locked: boolean;
  label: string;
  sub?: string;
  /** where the white fade starts, in % of card height */
  fadeFrom?: number;
  onUnlock: () => void;
  children: React.ReactNode;
}) {
  if (!locked) return <>{children}</>;

  return (
    <div className="v3-gate">
      {children}
      <div
        className="v3-gate-overlay"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0) ${fadeFrom}%, rgba(255,255,255,0.9) ${Math.min(
            fadeFrom + 34,
            96
          )}%, #ffffff 96%)`,
        }}
      >
        <p className="v3-gate-label">
          <Crown size={14} strokeWidth={2.4} style={{ color: "var(--a-peach-2)" }} /> {label}
        </p>
        {sub && <p className="v3-gate-sub">{sub}</p>}
        <button type="button" className="v3-gate-btn" onClick={onUnlock}>
          <Lock size={13} strokeWidth={2.6} /> Premium ilə aç
        </button>
      </div>
    </div>
  );
}
