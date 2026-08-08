"use client";

import { Activity, Droplets, Pill, Plus, Smile } from "lucide-react";
import { useState } from "react";

const GOAL = 10;

const pills = [
  { key: "vitamin", label: "Vitamin", icon: Pill, bg: "var(--a-grad-pink)", color: "#a3355f" },
  { key: "workout", label: "Workout", icon: Activity, bg: "var(--a-grad-green)", color: "#1c7a4d" },
  { key: "mood", label: "Mood", icon: Smile, bg: "var(--a-grad-yellow)", color: "#7a5200" },
] as const;

export function QuickLog() {
  const [water, setWater] = useState(0);
  const [logged, setLogged] = useState<string[]>([]);

  function toggle(key: string) {
    setLogged((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  return (
    <div className="a-card a-fade-in">
      <div className="a-list-row" style={{ padding: "2px 0 16px" }}>
        <span className="a-list-icon" style={{ background: "var(--a-grad-blue)", color: "#1c5a80" }}>
          <Droplets size={17} strokeWidth={2} />
        </span>
        <div>
          <p className="a-list-title">Water</p>
          <p className="a-list-sub">
            {water} / {GOAL} glasses today
          </p>
        </div>
        <button
          type="button"
          className="a-list-trail"
          aria-label="Log a glass of water"
          onClick={() => setWater((v) => Math.min(GOAL, v + 1))}
          style={{
            display: "grid",
            placeItems: "center",
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "var(--a-ink)",
            color: "var(--a-bg)",
          }}
        >
          <Plus size={16} strokeWidth={2.6} />
        </button>
      </div>

      <div className="a-trio">
        {pills.map((p) => {
          const active = logged.includes(p.key);
          return (
            <button
              key={p.key}
              type="button"
              className="a-trio-item"
              style={active ? { background: p.bg, borderColor: "transparent" } : undefined}
              onClick={() => toggle(p.key)}
            >
              <span
                className="a-trio-icon"
                style={{ background: active ? "rgba(255,255,255,0.55)" : "var(--a-surface-soft)", color: active ? p.color : "var(--a-ink-soft)" }}
              >
                <p.icon size={17} strokeWidth={2} />
              </span>
              <p className="a-trio-label" style={active ? { color: p.color } : undefined}>
                {active ? "Logged" : p.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
