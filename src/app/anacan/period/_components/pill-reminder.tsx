"use client";

import { Pill } from "lucide-react";
import { useState } from "react";

export function PillReminder() {
  const [on, setOn] = useState(true);

  return (
    <div className="a-card a-fade-in">
      <div className="a-list-row" style={{ padding: 0 }}>
        <span className="a-list-icon" style={{ background: "var(--a-grad-lav)", color: "#4b2f8a" }}>
          <Pill size={17} strokeWidth={2} />
        </span>
        <div>
          <p className="a-list-title">Take your pill</p>
          <p className="a-list-sub">Every day · 09:00</p>
        </div>
        <button
          type="button"
          className={`a-switch${on ? " on" : ""}`}
          role="switch"
          aria-checked={on}
          aria-label="Toggle pill reminder"
          onClick={() => setOn((v) => !v)}
        >
          <span className="a-switch-knob" />
        </button>
      </div>
    </div>
  );
}
