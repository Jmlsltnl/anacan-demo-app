"use client";

import { Check, Crown, ShieldCheck, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

type Plan = "yearly" | "monthly";

const FEATURES = [
  "Fərdi gündəlik plan və tövsiyələr",
  "Anacan.AI — limitsiz sual-cavab",
  "Ağlama tərcüməçisi və ağ səs-küy",
  "500+ ekspert məqaləsinin hamısı",
  "Bütün izləmə alətləri və proqnozlar",
  "Reklamsız, sakit təcrübə",
];

const TIMELINE = [
  {
    emoji: "🔓",
    bg: "var(--a-grad-peach)",
    title: "Bu gün",
    sub: "Tam giriş açılır — bütün Premium funksiyalardan istifadə edin.",
  },
  {
    emoji: "🔔",
    bg: "var(--a-grad-lav)",
    title: "5-ci gün",
    sub: "Sınağın bitməsinə 2 gün qalmış xatırlatma göndəririk. Sürpriz yoxdur.",
  },
  {
    emoji: "💳",
    bg: "var(--a-grad-green)",
    title: "7-ci gün",
    sub: "Üzvlük başlayır. Ondan əvvəl istənilən vaxt ləğv edə bilərsiniz.",
  },
];

export function Paywall({
  momName,
  onSubscribe,
  onSkip,
}: {
  momName?: string;
  onSubscribe: (plan: Plan) => void;
  onSkip: () => void;
}) {
  const [plan, setPlan] = useState<Plan>("yearly");
  const [showClose, setShowClose] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowClose(true), 2800);
    return () => window.clearTimeout(t);
  }, []);

  const handleSubscribe = () => {
    setSubmitting(true);
    window.setTimeout(() => onSubscribe(plan), 1000);
  };

  return (
    <>
      <div className="f-scroll" style={{ position: "relative" }}>
        <button
          type="button"
          className={`f-close-x${showClose ? " show" : ""}`}
          onClick={onSkip}
          aria-label="Premium təklifini keç"
          tabIndex={showClose ? 0 : -1}
        >
          <X size={17} strokeWidth={2.2} />
        </button>

        <div className="f-pw-hero">
          <span className="f-crown">
            <Crown size={28} strokeWidth={2} />
          </span>
          <p className="f-pw-badge">
            <Star size={11} fill="currentColor" strokeWidth={0} /> Anacan Premium
          </p>
          <h1 className="f-title a-heading" style={{ marginBottom: 6 }}>
            İlk 7 gün — bizdən <em>hədiyyə</em>
          </h1>
          <p className="f-sub" style={{ marginBottom: 0 }}>
            {momName ? `${momName}, planınız` : "Planınız"} hazırdır. Premium ilə onu tam gücü ilə açın.
          </p>
        </div>

        <div className="f-shell">
          <div className="f-timeline f-rise">
            {TIMELINE.map((item) => (
              <div key={item.title} className="f-tl-item">
                <span className="f-tl-icon" style={{ background: item.bg }}>
                  {item.emoji}
                </span>
                <div className="f-tl-body">
                  <p className="f-tl-title">{item.title}</p>
                  <p className="f-tl-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="f-plans f-rise f-d1">
            <button
              type="button"
              className={`f-plan${plan === "yearly" ? " selected" : ""}`}
              onClick={() => setPlan("yearly")}
              aria-pressed={plan === "yearly"}
            >
              <span className="f-plan-badge">58% qənaət</span>
              <p className="f-plan-name">İllik</p>
              <p className="f-plan-price">
                4.99 ₼<small>/ay</small>
              </p>
              <p className="f-plan-meta">
                <span className="f-plan-strike">143.88 ₼</span> → İldə 59.99 ₼
                <br />7 gün pulsuz sınaq
              </p>
            </button>
            <button
              type="button"
              className={`f-plan${plan === "monthly" ? " selected" : ""}`}
              onClick={() => setPlan("monthly")}
              aria-pressed={plan === "monthly"}
            >
              <p className="f-plan-name">Aylıq</p>
              <p className="f-plan-price">
                11.99 ₼<small>/ay</small>
              </p>
              <p className="f-plan-meta">
                Öhdəliksiz
                <br />
                istənilən vaxt ləğv edin
              </p>
            </button>
          </div>

          <div className="f-features f-rise f-d2" style={{ marginTop: 14 }}>
            {FEATURES.map((feature) => (
              <div key={feature} className="f-feat">
                <span className="f-feat-icon">
                  <Check size={14} strokeWidth={3} />
                </span>
                {feature}
              </div>
            ))}
          </div>

          <div className="f-quote f-rise f-d3" style={{ marginTop: 14 }}>
            <span className="f-quote-avatar" style={{ background: "var(--a-grad-pink)" }}>
              👩
            </span>
            <div className="f-quote-body">
              <div className="f-quote-stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="f-quote-text">
                “Gecə saat 3-də körpəmin niyə ağladığını Anacan-dan öyrəndim. Premium-a keçmək verdiyim ən yaxşı
                qərar idi.”
              </p>
              <p className="f-quote-name">Aysel · 6 aylıq körpənin anası</p>
            </div>
          </div>

          <div className="f-guarantee">
            <ShieldCheck size={18} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            İstənilən vaxt, tək toxunuşla ləğv edin — heç bir sual verilmir.
          </div>

          <div className="f-legal-links">
            <button type="button">Alışı bərpa et</button>
            <button type="button">Şərtlər</button>
            <button type="button">Məxfilik</button>
          </div>
        </div>
      </div>

      <footer className="f-footer">
        <button type="button" className="f-btn f-btn-premium" onClick={handleSubscribe} disabled={submitting}>
          {submitting ? <span className="f-spin" /> : null}
          {submitting
            ? "Aktivləşdirilir…"
            : plan === "yearly"
              ? "7 günlük pulsuz sınağı başlat"
              : "Premium-a keç"}
        </button>
        <p className="f-footer-note">
          {plan === "yearly"
            ? "Bu gün 0 ₼ · sınaqdan sonra ildə 59.99 ₼ · istənilən vaxt ləğv edin"
            : "Ayda 11.99 ₼ · öhdəlik yoxdur · istənilən vaxt ləğv edin"}
        </p>
      </footer>
    </>
  );
}
