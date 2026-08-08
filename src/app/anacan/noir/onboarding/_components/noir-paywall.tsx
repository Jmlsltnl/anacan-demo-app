"use client";

import { Check, ChevronDown, Crown, Minus, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

export type NoirPlan = "monthly" | "yearly" | "lifetime";

const COMPARE: { label: string; free: boolean }[] = [
  { label: "Anacan Skoru və gündəlik plan", free: true },
  { label: "Sikl / hamiləlik / körpə izləmə", free: true },
  { label: "Süni intellekt köməkçisi — limitsiz", free: false },
  { label: "500+ ekspert məqaləsinin hamısı", free: false },
  { label: "Dərin analitika və proqnozlar", free: false },
  { label: "Fərdi 90 günlük yol xəritəsi", free: false },
  { label: "Reklamsız təcrübə", free: false },
];

const FAQ = [
  {
    q: "Sınaq müddətində ödəniş olacaq?",
    a: "Xeyr. İlk 7 gün tamamilə pulsuzdur — kart yalnız sınaq bitəndən sonra, xəbərdarlıq göndərildikdən sonra çəkilir. 5-ci gündə xatırlatma alacaqsınız.",
  },
  {
    q: "İstənilən vaxt ləğv edə bilərəm?",
    a: "Bəli, tək toxunuşla — Profil → Üzvlük bölməsindən. Ləğv etdikdə sınağın sonuna qədər Premium açıq qalır, sonra pulsuz plana keçirsiniz.",
  },
  {
    q: "Ömürlük plan nəyi əhatə edir?",
    a: "Birdəfəlik ödənişlə bütün mövcud və gələcək Premium funksiyalara ömürlük giriş — abunə yoxdur, yenilənmə yoxdur.",
  },
  {
    q: "Məlumatlarım kimlə paylaşılır?",
    a: "Heç kimlə. Sağlamlıq cavablarınız yalnız planınızı qurmaq üçün istifadə olunur və üçüncü tərəflərə satılmır.",
  },
];

export function NoirPaywall({
  name,
  onSubscribe,
  onSkip,
}: {
  name?: string;
  onSubscribe: (plan: NoirPlan) => void;
  onSkip: () => void;
}) {
  const [plan, setPlan] = useState<NoirPlan>("yearly");
  const [showClose, setShowClose] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowClose(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  const subscribe = () => {
    setSubmitting(true);
    window.setTimeout(() => onSubscribe(plan), 1000);
  };

  const cta =
    plan === "yearly"
      ? "7 günlük pulsuz sınağı başlat"
      : plan === "monthly"
        ? "Premium-a keç"
        : "Ömürlük girişi əldə et";

  const note =
    plan === "yearly"
      ? "Bu gün 0 ₼ · sınaqdan sonra ildə 59.99 ₼ · istənilən vaxt ləğv"
      : plan === "monthly"
        ? "Ayda 11.99 ₼ · öhdəlik yoxdur · istənilən vaxt ləğv"
        : "Birdəfəlik 149.99 ₼ · abunə yoxdur · ömürlük";

  return (
    <>
      <div className="n-scroll" style={{ position: "relative" }}>
        <button
          type="button"
          className={`n-close-x${showClose ? " show" : ""}`}
          onClick={onSkip}
          aria-label="Premium təklifini keç"
          tabIndex={showClose ? 0 : -1}
        >
          <X size={17} strokeWidth={2.2} />
        </button>

        <div style={{ textAlign: "center", padding: "34px 22px 8px" }}>
          <span className="n-crown">
            <Crown size={28} strokeWidth={2} />
          </span>
          <p className="n-kicker" style={{ justifyContent: "center", display: "flex" }}>
            Anacan Premium
          </p>
          <h1 className="n-title n-display" style={{ marginBottom: 6 }}>
            Xəritəniz hazırdır — <em>tam gücü</em> ilə açın
          </h1>
          <p className="n-sub" style={{ marginBottom: 0 }}>
            {name ? `${name}, ilk` : "İlk"} 7 gün bizdən hədiyyə. Bu gün heç nə ödəmirsiniz.
          </p>
        </div>

        <div className="n-shell">
          <div className="n-plans n-rise-in">
            <button
              type="button"
              className={`n-plan${plan === "yearly" ? " selected" : ""}`}
              onClick={() => setPlan("yearly")}
              aria-pressed={plan === "yearly"}
            >
              <span className="n-plan-flag">58% qənaət</span>
              <span className="n-plan-radio" />
              <span>
                <p className="n-plan-name">İllik</p>
                <p className="n-plan-meta">7 gün pulsuz sınaq · ildə 59.99 ₼</p>
              </span>
              <p className="n-plan-price">
                4.99 ₼<small>/ay</small>
              </p>
            </button>

            <button
              type="button"
              className={`n-plan${plan === "monthly" ? " selected" : ""}`}
              onClick={() => setPlan("monthly")}
              aria-pressed={plan === "monthly"}
            >
              <span className="n-plan-radio" />
              <span>
                <p className="n-plan-name">Aylıq</p>
                <p className="n-plan-meta">Öhdəliksiz, çevik</p>
              </span>
              <p className="n-plan-price">
                11.99 ₼<small>/ay</small>
              </p>
            </button>

            <button
              type="button"
              className={`n-plan${plan === "lifetime" ? " selected" : ""}`}
              onClick={() => setPlan("lifetime")}
              aria-pressed={plan === "lifetime"}
            >
              <span className="n-plan-flag" style={{ background: "var(--n-surface-2)", color: "var(--n-gold)", border: "1px solid var(--n-line-strong)" }}>
                Bir dəfə ödə
              </span>
              <span className="n-plan-radio" />
              <span>
                <p className="n-plan-name">Ömürlük</p>
                <p className="n-plan-meta">Abunəsiz, həmişəlik</p>
              </span>
              <p className="n-plan-price">
                149.99 ₼<small>birdəfəlik</small>
              </p>
            </button>
          </div>

          <div className="n-section-head">
            <h2 className="n-section-title n-display">Nə daxildir</h2>
          </div>
          <div className="n-compare n-rise-in n-d1">
            <div className="n-compare-row head">
              <span>Funksiya</span>
              <span className="n-compare-cell">Pulsuz</span>
              <span className="n-compare-cell premium">Premium</span>
            </div>
            {COMPARE.map((row) => (
              <div key={row.label} className="n-compare-row">
                <span>{row.label}</span>
                <span className={`n-compare-cell${row.free ? " yes" : ""}`}>
                  {row.free ? <Check size={14} strokeWidth={3} /> : <Minus size={14} strokeWidth={2.4} />}
                </span>
                <span className="n-compare-cell yes">
                  <Check size={14} strokeWidth={3} />
                </span>
              </div>
            ))}
          </div>

          <div className="n-guarantee">
            <ShieldCheck size={18} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            5-ci gündə xatırlatma göndəririk — gözlənilməz ödəniş olmur. Ləğv tək toxunuşladır.
          </div>

          <div className="n-section-head">
            <h2 className="n-section-title n-display">Tez-tez soruşulanlar</h2>
          </div>
          <div className="n-faq n-rise-in n-d2">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <ChevronDown size={15} strokeWidth={2.4} />
                </summary>
                <p className="n-faq-body">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="n-legal-links" style={{ display: "flex", justifyContent: "center", gap: 18, padding: "16px 0 8px" }}>
            <button type="button" className="n-btn-quiet" style={{ fontSize: 11.5, textDecoration: "underline", color: "var(--n-soft)" }}>
              Alışı bərpa et
            </button>
            <button type="button" className="n-btn-quiet" style={{ fontSize: 11.5, textDecoration: "underline", color: "var(--n-soft)" }}>
              Şərtlər
            </button>
            <button type="button" className="n-btn-quiet" style={{ fontSize: 11.5, textDecoration: "underline", color: "var(--n-soft)" }}>
              Məxfilik
            </button>
          </div>
        </div>
      </div>

      <footer className="n-footer">
        <button type="button" className="n-btn n-btn-gold" onClick={subscribe} disabled={submitting}>
          {submitting ? <span className="n-spin" /> : <Crown size={16} strokeWidth={2.2} />}
          {submitting ? "Aktivləşdirilir…" : cta}
        </button>
        <p className="n-footer-note">{note}</p>
      </footer>
    </>
  );
}
