"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const days = [
  { d: "S", n: 17 },
  { d: "M", n: 18 },
  { d: "T", n: 19 },
  { d: "W", n: 20, selected: true },
  { d: "T", n: 21 },
  { d: "F", n: 22 },
  { d: "S", n: 23 },
];

const allTags = ["Drooling", "Fussy", "Low fever", "Biting", "Chewing"];

export function TeethingCard() {
  const [range, setRange] = useState<"week" | "month">("week");
  const [active, setActive] = useState<string[]>(["Drooling", "Chewing"]);

  function toggle(tag: string) {
    setActive((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Teething tracker</h3>
        <div className="a-tabs">
          <button type="button" className={`a-tab${range === "week" ? " active" : ""}`} onClick={() => setRange("week")}>
            Week
          </button>
          <button type="button" className={`a-tab${range === "month" ? " active" : ""}`} onClick={() => setRange("month")}>
            Month
          </button>
        </div>
      </div>

      <div className="a-cal-row">
        {days.map((day) => (
          <div key={day.n} className="a-cal-day">
            <span className="dow">{day.d}</span>
            <span className={`a-cal-day-circle${day.selected ? " selected" : day.n <= 19 ? " marked" : ""}`}>{day.n}</span>
          </div>
        ))}
      </div>

      <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "var(--a-ink-soft)" }}>
        <strong style={{ color: "var(--a-ink)" }}>2 of 20</strong> teeth erupted · normal development for 9 months
      </p>

      <div className="a-tag-row">
        {allTags.map((tag) => (
          <button key={tag} type="button" className={`a-tag${active.includes(tag) ? " on" : ""}`} onClick={() => toggle(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <div className="a-teaser" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>
          Next expected: <strong>Lateral incisors</strong> · 9–16 mo
        </span>
        <ChevronRight size={15} style={{ color: "var(--a-ink-faint)", flexShrink: 0 }} />
      </div>
    </div>
  );
}
