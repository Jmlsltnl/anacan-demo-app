"use client";

import { ChevronLeft, ChevronRight, HandHeart, MessageCircleHeart, Soup } from "lucide-react";
import { useState } from "react";

const items = [
  { icon: Soup, title: "Solid foods", text: "Gradually introduce new flavors — small amounts of soft, well-cooked whole grains and pasta." },
  { icon: HandHeart, title: "Tummy time play", text: "Short, frequent floor sessions strengthen the core muscles needed for crawling and standing." },
  { icon: MessageCircleHeart, title: "Language bath", text: "Narrate your day out loud — repetition of simple words builds the foundation for first words." },
];

export function RecommendationTeaser() {
  const [i, setI] = useState(0);
  const item = items[i];
  const Icon = item.icon;

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Development recommendations</h3>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--a-ink-soft)" }}>9–12 mo</span>
      </div>

      <div className="a-list-row" style={{ padding: "2px 0 0" }}>
        <span className="a-list-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
          <Icon size={18} strokeWidth={2} />
        </span>
        <div>
          <p className="a-list-title">{item.title}</p>
          <p className="a-list-sub" style={{ whiteSpace: "normal" }}>{item.text}</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
        <button
          type="button"
          className="a-icon-btn"
          style={{ width: 30, height: 30 }}
          disabled={i === 0}
          onClick={() => setI((v) => Math.max(0, v - 1))}
          aria-label="Previous"
        >
          <ChevronLeft size={15} />
        </button>
        <div style={{ display: "flex", gap: 5 }}>
          {items.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: idx === i ? 16 : 6,
                height: 6,
                borderRadius: 999,
                background: idx === i ? "var(--a-peach-2)" : "var(--a-line-strong)",
                transition: "all 150ms ease",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="a-icon-btn"
          style={{ width: 30, height: 30 }}
          disabled={i === items.length - 1}
          onClick={() => setI((v) => Math.min(items.length - 1, v + 1))}
          aria-label="Next"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
