"use client";

import { ChevronRight, Droplets, Moon, Sandwich } from "lucide-react";
import { useState } from "react";

const GOAL = 12;

export function TodayHub() {
  const [water, setWater] = useState(2);
  const [sleep, setSleep] = useState(0);
  const [feeding, setFeeding] = useState(0);
  const [diaper, setDiaper] = useState(0);

  const total = water + sleep * 2 + feeding * 2 + diaper * 2;
  const pct = Math.min(100, Math.round((total / GOAL) * 100));

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Log today</h3>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--a-ink-soft)" }}>Tap to add</span>
      </div>

      <div className="a-ring-hero">
        <div className="a-ring" style={{ "--pct": pct } as React.CSSProperties}>
          <div className="a-ring-inner">
            <b>{pct}%</b>
            <span>today&apos;s goal</span>
          </div>
        </div>
        <div className="a-quick-dots">
          <button
            type="button"
            className="a-quick-dot"
            style={{ background: "var(--a-grad-peach)" }}
            onClick={() => setWater((v) => Math.min(GOAL, v + 1))}
            aria-label="Log water"
          >
            <Droplets size={19} color="var(--a-accent-ink)" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="a-quick-dot"
            style={{ background: "var(--a-grad-peach)" }}
            onClick={() => setSleep((v) => v + 1)}
            aria-label="Log sleep"
          >
            <Moon size={19} color="var(--a-accent-ink)" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="a-quick-dot"
            style={{ background: "var(--a-grad-peach)" }}
            onClick={() => setFeeding((v) => v + 1)}
            aria-label="Log feeding"
          >
            <Sandwich size={19} color="var(--a-accent-ink)" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="a-quick-dot"
            style={{ background: "var(--a-grad-peach)" }}
            onClick={() => setDiaper((v) => v + 1)}
            aria-label="Log diaper change"
          >
            <span style={{ fontSize: 17 }}>🧷</span>
          </button>
        </div>
      </div>

      <p className="a-tip">
        Water: <strong>{water}/{GOAL}</strong> glasses today. Consistent logging helps you and your doctor spot patterns early.
      </p>

      <div className="a-list-card" style={{ marginTop: 14, border: "1px solid var(--a-line)" }}>
        <div className="a-list-row">
          <span className="a-list-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
            <Moon size={17} strokeWidth={2} />
          </span>
          <div>
            <p className="a-list-title">Sleep summary</p>
            <p className="a-list-sub">{sleep > 0 ? `${sleep} session${sleep > 1 ? "s" : ""} recorded` : "0 sessions recorded"}</p>
          </div>
          <span className="a-list-trail">
            <ChevronRight size={15} className="a-list-chevron" />
          </span>
        </div>
        <div className="a-list-row">
          <span className="a-list-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
            <Sandwich size={17} strokeWidth={2} />
          </span>
          <div>
            <p className="a-list-title">Feeding summary</p>
            <p className="a-list-sub">{feeding > 0 ? `${feeding} times today` : "No records"}</p>
          </div>
          <span className="a-list-trail">
            <ChevronRight size={15} className="a-list-chevron" />
          </span>
        </div>
        <div className="a-list-row">
          <span className="a-list-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
            <Droplets size={17} strokeWidth={2} />
          </span>
          <div>
            <p className="a-list-title">Diaper change</p>
            <p className="a-list-sub">💧 0 · 💩 0 · combo {diaper}</p>
          </div>
          <span className="a-list-trail">
            <ChevronRight size={15} className="a-list-chevron" />
          </span>
        </div>
      </div>
    </div>
  );
}
