"use client";

import { Home, Sparkles, Users, User, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { PaywallPopupHost } from "./paywall-popup";
import { PremiumMiniBanner } from "./premium-mini-banner";

const items: { key: string; label: string; icon: typeof Home; special?: boolean }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "tools", label: "Tools", icon: LayoutGrid },
  { key: "ai", label: "Anacan.AI", icon: Sparkles, special: true },
  { key: "community", label: "Community", icon: Users },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomNav({
  defaultActive = "home",
  upsell = true,
}: {
  defaultActive?: string;
  upsell?: boolean;
}) {
  const [active, setActive] = useState<string>(defaultActive);

  return (
    <>
      <div className="a-nav-wrap">
        {upsell && <PremiumMiniBanner />}
        <nav className="a-nav" aria-label="Primary">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          if (item.special) {
            return (
              <button
                key={item.key}
                type="button"
                className={`a-nav-item${isActive ? " active" : ""}`}
                onClick={() => setActive(item.key)}
              >
                <span className="a-nav-ai-icon">
                  <Icon size={15} strokeWidth={2.4} />
                </span>
                {item.label}
              </button>
            );
          }
          return (
            <button
              key={item.key}
              type="button"
              className={`a-nav-item${isActive ? " active" : ""}`}
              onClick={() => setActive(item.key)}
            >
              <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
              {item.label}
            </button>
          );
        })}
        </nav>
      </div>
      <PaywallPopupHost />
    </>
  );
}
