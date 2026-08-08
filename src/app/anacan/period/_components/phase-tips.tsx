"use client";

import { useState } from "react";

const tabs = ["All of them", "Nutrition", "Exercise", "Self Care", "Mood"] as const;

const tips = [
  { emoji: "⚡", title: "Energy Rising", tag: "General", text: "Estrogen is rising! This is a great time to start new projects and tackle challenging tasks." },
  { emoji: "🏋️", title: "Try New Workouts", tag: "Exercise", text: "Your body can handle more intense exercise now. Try HIIT, running, or weight training." },
  { emoji: "🍗", title: "Protein Power", tag: "Nutrition", text: "Support muscle building with lean proteins like chicken, fish, eggs, and legumes." },
  { emoji: "🎉", title: "Social Energy", tag: "Mood", text: "You may feel more outgoing and communicative. Great time for social activities and networking." },
  { emoji: "🎨", title: "Creativity Peak", tag: "General", text: "Brain function is enhanced. Use this time for brainstorming, learning, and creative work." },
];

export function PhaseTips() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All of them");
  const visible = tab === "All of them" ? tips : tips.filter((t) => t.tag === tab || (tab === "Self Care" && t.tag === "General"));

  return (
    <div className="a-section">
      <div className="a-section-head">
        <h2 className="a-section-title a-heading">Tips for this phase</h2>
        <span className="a-tag" style={{ background: "var(--a-grad-green)", color: "#1c7a4d", border: "none" }}>
          🌱 Follicular
        </span>
      </div>

      <div className="a-tabs" style={{ display: "flex", overflowX: "auto", width: "100%", marginBottom: 14 }}>
        {tabs.map((t) => (
          <button key={t} type="button" className={`a-tab${tab === t ? " active" : ""}`} style={{ whiteSpace: "nowrap" }} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((tip) => (
          <div key={tip.title} className="a-card">
            <div className="a-list-row" style={{ padding: 0 }}>
              <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 18 }}>
                {tip.emoji}
              </span>
              <div>
                <p className="a-list-title">{tip.title}</p>
                <span className="a-list-value" style={{ color: "var(--a-peach-2)" }}>{tip.tag}</span>
              </div>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--a-ink-soft)" }}>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
