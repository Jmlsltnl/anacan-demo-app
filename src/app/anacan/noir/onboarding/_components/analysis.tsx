"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ScoreRing } from "../../_components/score-ring";

const PHASES = [
  { at: 18, label: "Yuxu və enerji profiliniz təhlil olunur" },
  { at: 42, label: "Emosional sağlamlıq xəritəsi qurulur" },
  { at: 64, label: "Anacan Skorunuz hesablanır" },
  { at: 84, label: "90 günlük planınız tərtib edilir" },
  { at: 97, label: "Məzmun kitabxanası uyğunlaşdırılır" },
];

export function Analysis({ name, onDone }: { name?: string; onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((v) => (v >= 100 ? 100 : v + 1));
    }, 42);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = window.setTimeout(onDone, 650);
    return () => window.clearTimeout(t);
  }, [progress, onDone]);

  return (
    <div className="n-step" style={{ paddingTop: 26 }}>
      <div style={{ textAlign: "center" }}>
        <p className="n-kicker">Analiz</p>
        <h1 className="n-title n-display" style={{ marginBottom: 6 }}>
          Bir anlıq{name ? `, ${name}` : ""}…
        </h1>
        <p className="n-sub" style={{ marginBottom: 8 }}>
          20 cavabınız 4 sağlamlıq oxunda emal olunur
        </p>
      </div>

      <div style={{ display: "grid", placeItems: "center", padding: "18px 0 22px" }}>
        <ScoreRing value={progress} size={168} stroke={10}>
          <p className="n-ring-value n-display">
            {progress}
            <small style={{ fontSize: 19 }}>%</small>
          </p>
          <p className="n-ring-label">emal olunur</p>
        </ScoreRing>
      </div>

      <div className="n-phases">
        {PHASES.map((phase) => {
          const done = progress >= phase.at;
          const live = !done && (PHASES.find((p) => progress < p.at)?.at ?? 0) === phase.at;
          return (
            <div key={phase.label} className={`n-phase${done ? " done" : ""}${live ? " live" : ""}`}>
              <span className="n-phase-dot">{done ? <Check size={13} strokeWidth={3.2} /> : null}</span>
              {phase.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
