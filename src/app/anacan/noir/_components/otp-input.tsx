"use client";

import { useRef, useState } from "react";

/**
 * 6-digit one-time-code input: auto-advance, backspace navigation,
 * full-code paste support. Calls onComplete when all boxes are filled.
 * To reset it, remount with a new `key` from the parent.
 */
export function OtpInput({
  status = "idle",
  onComplete,
}: {
  status?: "idle" | "ok" | "bad";
  onComplete: (code: string) => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string[]) => {
    setDigits(next);
    if (next.every((d) => d !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleChange = (index: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (!clean) return;
    const next = [...digits];
    // support pasting a full code into any box
    if (clean.length > 1) {
      const chars = clean.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) next[i] = chars[i] ?? next[i];
      commit(next);
      refs.current[Math.min(chars.length, 5)]?.focus();
      return;
    }
    next[index] = clean;
    commit(next);
    if (index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        next[index - 1] = "";
        setDigits(next);
        refs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
  };

  return (
    <div className={`n-otp${status === "ok" ? " ok" : status === "bad" ? " bad" : ""}`}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={6}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`Kod rəqəmi ${i + 1}`}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}
