"use client";

import { Droplets, Plus } from "lucide-react";
import { useState } from "react";

const WATER_GOAL = 8;
const CYCLE_DAY = 4;
const CYCLE_LENGTH = 28;

export function PeriodStatus() {
  const [started, setStarted] = useState(false);
  const [water, setWater] = useState(0);
  const pct = Math.round((CYCLE_DAY / CYCLE_LENGTH) * 100);

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Currently</h3>
        <span className="a-tag" style={{ background: "var(--a-grad-green)", color: "#1c7a4d", border: "none" }}>
          🌱 Follicular Phase
        </span>
      </div>

      <div className="a-ring-hero">
        <div className="a-ring" style={{ "--pct": pct } as React.CSSProperties}>
          <div className="a-ring-inner">
            <b>{CYCLE_DAY}</b>
            <span>cycle day</span>
          </div>
        </div>
        <div className="a-trio" style={{ gridTemplateColumns: "repeat(3, 1fr)", flex: 1 }}>
          <div className="a-trio-item" style={{ padding: "10px 4px", border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{CYCLE_LENGTH - CYCLE_DAY}</p>
            <p className="a-trio-label">days left</p>
          </div>
          <div className="a-trio-item" style={{ padding: "10px 4px", border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{CYCLE_LENGTH}</p>
            <p className="a-trio-label">day cycle</p>
          </div>
          <div className="a-trio-item" style={{ padding: "10px 4px", border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">1</p>
            <p className="a-trio-label">day period</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="a-cta-btn"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 16,
          background: started ? "var(--a-grad-pink)" : "var(--a-ink)",
          color: started ? "#7a1f34" : "var(--a-bg)",
        }}
        onClick={() => setStarted((v) => !v)}
      >
        {started ? "🌸 Period logged for today" : "My period has started"}
      </button>

      <div className="a-list-row" style={{ padding: "16px 0 0", borderTop: "1px dashed var(--a-line-strong)", marginTop: 16 }}>
        <span className="a-list-icon" style={{ background: "var(--a-grad-blue)", color: "#1c5a80" }}>
          <Droplets size={17} strokeWidth={2} />
        </span>
        <div>
          <p className="a-list-title">Water</p>
          <p className="a-list-sub">
            {water} / {WATER_GOAL} glasses today
          </p>
        </div>
        <button
          type="button"
          className="a-list-trail"
          aria-label="Log a glass of water"
          onClick={() => setWater((v) => Math.min(WATER_GOAL, v + 1))}
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
    </div>
  );
}
