"use client";

import { Bell, BellOff, Bookmark } from "lucide-react";
import { useState } from "react";

export function HeroActions() {
  const [muted, setMuted] = useState(false);
  const [saved, setSaved] = useState(true);

  return (
    <div className="w-hero-actions">
      <button
        type="button"
        className={`w-hero-icon-btn${muted ? " active" : ""}`}
        onClick={() => setMuted((v) => !v)}
        aria-label="Toggle notifications"
      >
        {muted ? <BellOff size={14} strokeWidth={2.3} /> : <Bell size={14} strokeWidth={2.3} />}
      </button>
      <button
        type="button"
        className={`w-hero-icon-btn${saved ? " active" : ""}`}
        onClick={() => setSaved((v) => !v)}
        aria-label="Save today"
      >
        <Bookmark size={14} strokeWidth={2.3} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
