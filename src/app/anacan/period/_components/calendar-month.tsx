"use client";

import { useMemo, useState } from "react";

const YEAR = 2026;
const MONTH = 7; // August (0-indexed)
const OVULATION_DAYS = [17, 18];
const FERTILE_DAYS = [13, 14, 15, 16, 17, 18, 19];
const TODAY = 7;

export function CalendarMonth() {
  const [periodDays, setPeriodDays] = useState<number[]>([4]);

  const cells = useMemo(() => {
    const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
    const firstDow = new Date(YEAR, MONTH, 1).getDay();
    const arr: (number | null)[] = Array.from({ length: firstDow }, () => null);
    for (let d = 1; d <= daysInMonth; d += 1) arr.push(d);
    return arr;
  }, []);

  function toggleDay(day: number) {
    setPeriodDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  }

  return (
    <div className="a-card a-fade-in">
      <div className="a-card-head">
        <h3 className="a-card-title a-heading">Period calendar</h3>
        <span className="a-section-link">August {YEAR}</span>
      </div>
      <p style={{ margin: "0 0 14px", fontSize: 11.5, color: "var(--a-ink-soft)" }}>
        Enter the period days by touching the day
      </p>

      <div className="a-month-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="a-month-dow">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={i} />;
          const isPeriod = periodDays.includes(day);
          const isOvulation = OVULATION_DAYS.includes(day);
          const isFertile = FERTILE_DAYS.includes(day) && !isOvulation;
          const isToday = day === TODAY;
          return (
            <button
              key={i}
              type="button"
              className={`a-month-day${isPeriod ? " period" : ""}${isToday && !isPeriod ? " today" : ""}${isOvulation ? " ovulation" : ""}`}
              style={isFertile && !isPeriod ? { background: "var(--a-pink-1)" } : undefined}
              onClick={() => toggleDay(day)}
            >
              {isOvulation ? "🌸" : day}
            </button>
          );
        })}
      </div>

      <div className="a-legend-row">
        <span className="a-legend-item">
          <span className="a-legend-dot" style={{ background: "var(--a-grad-pink)" }} /> Noted
        </span>
        <span className="a-legend-item">
          <span className="a-legend-dot" style={{ border: "1.5px dashed var(--a-pink-2)", background: "transparent" }} /> Forecast
        </span>
        <span className="a-legend-item">
          <span className="a-legend-dot" style={{ background: "var(--a-pink-1)" }} /> Productive
        </span>
        <span className="a-legend-item">🌸 Ovulation</span>
      </div>
    </div>
  );
}
