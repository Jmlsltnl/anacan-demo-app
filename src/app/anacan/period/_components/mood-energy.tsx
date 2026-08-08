"use client";

import { Smile, Zap } from "lucide-react";
import { useState } from "react";

const moods = ["😔", "😐", "🙂", "😄"];
const energies = ["Low", "Medium", "High"];

export function MoodEnergy() {
  const [moodIndex, setMoodIndex] = useState<number | null>(null);
  const [energyIndex, setEnergyIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState(0);

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head" style={{ marginBottom: 4 }}>
        <h3 className="a-card-title a-heading">Daily note</h3>
        <span className="a-section-link">7 August, Friday</span>
      </div>

      <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, color: "var(--a-ink-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Mood chart · Last 14 days
      </p>

      <div className="a-trio">
        <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
          <p className="a-trio-value">{moodIndex === null ? "–" : moods[moodIndex]}</p>
          <p className="a-trio-label">Average mood</p>
        </div>
        <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
          <p className="a-trio-value">{energyIndex === null ? "–" : energies[energyIndex]}</p>
          <p className="a-trio-label">Energy</p>
        </div>
        <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
          <p className="a-trio-value">{notes}</p>
          <p className="a-trio-label">Notes</p>
        </div>
      </div>

      <p style={{ margin: "16px 0 10px", fontSize: 12, fontWeight: 700 }}>Add mood notes</p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          className="a-cta-btn"
          style={{ flex: 1, justifyContent: "center", background: "var(--a-surface-soft)", color: "var(--a-ink)" }}
          onClick={() => {
            setMoodIndex((v) => ((v ?? -1) + 1) % moods.length);
            setNotes((n) => n + 1);
          }}
        >
          <Smile size={14} /> Mood
        </button>
        <button
          type="button"
          className="a-cta-btn"
          style={{ flex: 1, justifyContent: "center", background: "var(--a-surface-soft)", color: "var(--a-ink)" }}
          onClick={() => {
            setEnergyIndex((v) => ((v ?? -1) + 1) % energies.length);
            setNotes((n) => n + 1);
          }}
        >
          <Zap size={14} /> Energy
        </button>
      </div>
    </div>
  );
}
