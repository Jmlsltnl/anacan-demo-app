"use client";

import { Ruler, Scale, TrendingUp } from "lucide-react";
import { useState } from "react";

const datasets = {
  weight: { values: [3.3, 4.6, 5.7, 6.5, 7.1, 7.6, 8.0, 8.3, 8.6, 8.9], unit: "kg", current: "8.9" },
  height: { values: [50, 55, 59, 63, 66, 68, 70, 72, 73, 74], unit: "cm", current: "74" },
} as const;

type MetricKey = keyof typeof datasets;

function buildPath(values: readonly number[], width: number, height: number, pad: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (v - min) / span);
    return [x, y] as const;
  });
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const area = `${d} L${last[0].toFixed(1)},${height - pad} L${points[0][0].toFixed(1)},${height - pad} Z`;
  return { d, area, last };
}

export function GrowthCard() {
  const [metric, setMetric] = useState<MetricKey>("weight");
  const data = datasets[metric];
  const width = 300;
  const height = 116;
  const pad = 10;
  const { d, area, last } = buildPath(data.values, width, height, pad);

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Development tracker</h3>
        <div className="a-tabs">
          <button type="button" className={`a-tab${metric === "weight" ? " active" : ""}`} onClick={() => setMetric("weight")}>
            Weight
          </button>
          <button type="button" className={`a-tab${metric === "height" ? " active" : ""}`} onClick={() => setMetric("height")}>
            Height
          </button>
        </div>
      </div>

      <div className="a-chart-wrap">
        <span
          className="a-chart-tooltip"
          style={{ left: `${(last[0] / width) * 100}%` }}
        >
          {data.current} {data.unit}
        </span>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`fade-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--a-chart-line)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--a-chart-line)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={width}
              y1={height * f}
              y2={height * f}
              stroke="var(--a-line)"
              strokeDasharray="3 5"
              strokeWidth="1"
            />
          ))}
          <path d={area} fill={`url(#fade-${metric})`} />
          <path d={d} fill="none" stroke="var(--a-chart-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={last[0]} cy={last[1]} r="4.5" fill="var(--a-bg)" stroke="var(--a-chart-line)" strokeWidth="2.5" />
        </svg>
      </div>
      <div className="a-chart-axis">
        <span>Birth</span>
        <span>3 mo</span>
        <span>6 mo</span>
        <span>9 mo</span>
      </div>

      <div className="a-grid-2">
        <div className="a-stat-tile">
          <span className="a-stat-tile-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
            <Scale size={14} />
          </span>
          <div>
            <p className="a-stat-tile-label">Current weight</p>
            <p className="a-stat-tile-value">8.9 kg</p>
          </div>
        </div>
        <div className="a-stat-tile">
          <span className="a-stat-tile-icon" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
            <Ruler size={14} />
          </span>
          <div>
            <p className="a-stat-tile-label">Current height</p>
            <p className="a-stat-tile-value">74 cm</p>
          </div>
        </div>
      </div>

      <div className="a-teaser" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <TrendingUp size={14} style={{ color: "#d96c2b", flexShrink: 0 }} />
        <span>
          Tracking in the <strong>65th percentile</strong> — a healthy, steady growth curve for 9 months.
        </span>
      </div>
    </div>
  );
}
