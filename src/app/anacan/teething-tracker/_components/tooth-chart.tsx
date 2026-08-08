"use client";

import { useMemo, useState } from "react";

const UPPER = [
  "Yuxarı Sağ İkinci Azı Dişi",
  "Yuxarı Sağ Birinci Azı Dişi",
  "Yuxarı Sağ Köpək Dişi",
  "Yuxarı Sağ Yan Kəsici",
  "Yuxarı Sağ Mərkəzi Kəsici",
  "Yuxarı Sol Mərkəzi Kəsici",
  "Yuxarı Sol Yan Kəsici",
  "Yuxarı Sol Köpək Dişi",
  "Yuxarı Sol Birinci Azı Dişi",
  "Yuxarı Sol İkinci Azı Dişi",
];

const LOWER = [
  "Aşağı Sağ İkinci Azı Dişi",
  "Aşağı Sağ Birinci Azı Dişi",
  "Aşağı Sağ Köpək Dişi",
  "Aşağı Sağ Yan Kəsici",
  "Aşağı Sağ Mərkəzi Kəsici",
  "Aşağı Sol Mərkəzi Kəsici",
  "Aşağı Sol Yan Kəsici",
  "Aşağı Sol Köpək Dişi",
  "Aşağı Sol Birinci Azı Dişi",
  "Aşağı Sol İkinci Azı Dişi",
];

const DEFAULT_ERUPTED = ["Aşağı Sağ Mərkəzi Kəsici", "Aşağı Sol Mərkəzi Kəsici"];

export function ToothChart() {
  const [erupted, setErupted] = useState<string[]>(DEFAULT_ERUPTED);
  const [selected, setSelected] = useState<string | null>(null);

  const total = UPPER.length + LOWER.length;
  const pct = Math.round((erupted.length / total) * 100);

  function toggle(name: string) {
    setSelected(name);
    setErupted((prev) => (prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]));
  }

  const isErupted = useMemo(() => (name: string) => erupted.includes(name), [erupted]);

  return (
    <>
      <div className="a-card a-fade-in">
        <div className="a-card-head" style={{ marginBottom: 10 }}>
          <h3 className="a-card-title a-heading">Çıxan dişlər</h3>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--a-ink-soft)" }}>{erupted.length} / {total}</span>
        </div>
        <div className="a-ring-hero">
          <div className="a-ring" style={{ "--pct": pct } as React.CSSProperties}>
            <div className="a-ring-inner">
              <b>{pct}%</b>
              <span>tamamlandı</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "var(--a-ink-soft)", flex: 1 }}>
            Atlas hələlik <strong style={{ color: "var(--a-ink)" }}>{erupted.length} diş</strong> çıxarıb. Növbəti
            dişlərin çıxmasını izləmək üçün diaqramdan istifadə edin.
          </p>
        </div>
      </div>

      <div className="a-card a-fade-in" style={{ marginTop: 12 }}>
        <div className="a-card-head" style={{ marginBottom: 4 }}>
          <h3 className="a-card-title a-heading">Diş diaqramı</h3>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 11.5, color: "var(--a-ink-soft)" }}>Dişə toxunaraq qeyd edin</p>

        <p className="a-tooth-jaw-label">Yuxarı çənə</p>
        <div className="a-tooth-grid">
          {UPPER.map((name) => (
            <button
              key={name}
              type="button"
              aria-label={name}
              className={`a-tooth-btn${isErupted(name) ? " erupted" : ""}${selected === name ? " selected" : ""}`}
              onClick={() => toggle(name)}
            >
              🦷
            </button>
          ))}
        </div>

        <div className="a-tooth-divider">
          <span>Diş əti xətti</span>
        </div>

        <div className="a-tooth-grid">
          {LOWER.map((name) => (
            <button
              key={name}
              type="button"
              aria-label={name}
              className={`a-tooth-btn${isErupted(name) ? " erupted" : ""}${selected === name ? " selected" : ""}`}
              onClick={() => toggle(name)}
            >
              🦷
            </button>
          ))}
        </div>
        <p className="a-tooth-jaw-label" style={{ marginTop: 10, marginBottom: 0 }}>
          Aşağı çənə
        </p>

        {selected && (
          <p className="a-tooth-detail">
            {selected} — {isErupted(selected) ? "Çıxıb ✓" : "Çıxmayıb"}
          </p>
        )}

        <div className="a-tooth-legend">
          <span className="a-legend-item">
            <span className="a-legend-dot" style={{ background: "var(--a-grad-yellow)" }} /> Çıxıb
          </span>
          <span className="a-legend-item">
            <span className="a-legend-dot" style={{ background: "var(--a-surface-soft)", border: "1.5px solid var(--a-line)" }} /> Çıxmayıb
          </span>
        </div>
      </div>
    </>
  );
}
