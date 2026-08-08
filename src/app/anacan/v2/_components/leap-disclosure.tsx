"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

const leaps = [
  { title: "The World of Sequences", meta: "Week 46 · 4 weeks away", tag: "Medium", color: "#f6a623" },
  { title: "The World of Programs", meta: "Week 55 · 13 weeks away", tag: "Intensive", color: "#ef4d6c" },
];

export function LeapDisclosure() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button type="button" className="w-disclosure" onClick={() => setOpen((v) => !v)}>
        <span className="w-disclosure-icon">
          <Calendar size={16} strokeWidth={2} color="var(--w-blue)" />
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="w-disclosure-title">Next 8 weeks</p>
          <p className="w-disclosure-sub">2 developmental leaps ahead</p>
        </div>
        <span className="w-disclosure-trail">
          <span className="w-disclosure-stat">Wk 46</span>
          <ChevronDown size={16} className={`w-chevron${open ? " open" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="w-disclosure-body" style={{ paddingTop: 4 }}>
          {leaps.map((leap) => (
            <div key={leap.title} className="w-leap-row">
              <span className="w-leap-dot" style={{ background: leap.color }} />
              <div style={{ minWidth: 0 }}>
                <p className="w-leap-title">{leap.title}</p>
                <p className="w-leap-sub">{leap.meta}</p>
              </div>
              <span
                className="w-leap-tag"
                style={{ background: `${leap.color}22`, color: leap.color }}
              >
                {leap.tag}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
