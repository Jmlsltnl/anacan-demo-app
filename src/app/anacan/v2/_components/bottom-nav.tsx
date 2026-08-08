"use client";

import { Home, LayoutGrid, Sparkles, User, Users } from "lucide-react";
import { useState } from "react";

const items = [
  { key: "home", label: "Home", icon: Home },
  { key: "tools", label: "Tools", icon: LayoutGrid },
  { key: "ai", label: "AI", icon: Sparkles },
  { key: "community", label: "Community", icon: Users },
  { key: "profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <div className="w-nav-wrap">
      <nav className="w-nav" aria-label="Primary">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`w-nav-item${isActive ? " active" : ""}`}
              onClick={() => setActive(item.key)}
              aria-label={item.label}
            >
              <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
