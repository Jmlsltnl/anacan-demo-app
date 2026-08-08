"use client";

import { ChevronDown, Lightbulb } from "lucide-react";
import { useState } from "react";

export function TodayInfoDisclosure({ full }: { full: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" className="w-disclosure" onClick={() => setOpen((v) => !v)}>
        <span className="w-disclosure-icon">
          <Lightbulb size={16} strokeWidth={2} color="var(--w-blue)" />
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="w-disclosure-title">Today&apos;s info</p>
          <p className="w-disclosure-sub">Active development phase</p>
        </div>
        <span className="w-disclosure-trail">
          <ChevronDown size={16} className={`w-chevron${open ? " open" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="w-disclosure-body">
          {full} <strong>Set safe boundaries at home during this stage.</strong>
        </div>
      )}
    </div>
  );
}
