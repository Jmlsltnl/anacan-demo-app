"use client";

import { Check, Crown, ShieldCheck } from "lucide-react";
import { useState } from "react";

const BENEFITS = [
  "Anacan.AI — limitsiz sual-cavab",
  "Ağlama tərcüməçisi və ağ səs-küy",
  "Fərdi inkişaf analizi və proqnozlar",
  "500+ ekspert məqaləsinin hamısı",
];

const TRIAL_TIMELINE = [
  { emoji: "🔓", title: "Bu gün", sub: "Tam giriş dərhal açılır — heç nə ödəmirsiniz." },
  { emoji: "🔔", title: "5-ci gün", sub: "Sınağın bitməsinə 2 gün qalmış xəbərdarlıq göndəririk." },
  { emoji: "💳", title: "7-ci gün", sub: "İllik üzvlük başlayır. Ona qədər istənilən an ləğv edin." },
];

/**
 * Direct, conversion-focused plan picker.
 * Copy is plan-aware: trial messaging exists ONLY while yearly is selected —
 * switching to monthly removes every free-trial mention.
 */
export function PlanSelect({
  name,
  onSubscribe,
  onSkip,
  skipLabel = "İndi yox",
}: {
  name?: string;
  onSubscribe: (plan: "yearly" | "monthly") => void;
  onSkip: () => void;
  skipLabel?: string;
}) {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const [processing, setProcessing] = useState(false);
  const isYearly = plan === "yearly";

  const purchase = () => {
    setProcessing(true);
    window.setTimeout(() => onSubscribe(plan), 900);
  };

  return (
    <>
      <div className="f-scroll">
        <div className="f-shell" style={{ paddingTop: 6, paddingBottom: 24 }}>
          <div className="f-step">
            <p className="f-kicker">
              <Crown size={12} strokeWidth={2.4} /> Anacan Premium
            </p>
            <h1 className="f-title a-heading">Planınızı seçin</h1>
            <p className="f-sub">
              {isYearly
                ? `${name ? `${name}, ilk` : "İlk"} 7 gün bizdən hədiyyə — bəyənməsəniz, tək toxunuşla ləğv edin.`
                : `${name ? `${name}, ilk` : "İlk"} gündən tam giriş — öhdəliksiz, istənilən vaxt ləğv edin.`}
            </p>

            {/* What you get */}
            <div className="f-features" style={{ marginBottom: 18 }}>
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="f-feat">
                  <span className="f-feat-icon">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>

            {/* Plans */}
            <div className="f-plans">
              <button
                type="button"
                className={`f-plan${isYearly ? " selected" : ""}`}
                onClick={() => setPlan("yearly")}
                aria-pressed={isYearly}
              >
                <span className="f-plan-badge">7 gün pulsuz</span>
                <p className="f-plan-name">İllik</p>
                <p className="f-plan-price">
                  4.99 ₼<small>/ay</small>
                </p>
                <p className="f-plan-meta">
                  İldə 59.99 ₼
                  <br />
                  <strong>58% qənaət</strong>
                </p>
              </button>
              <button
                type="button"
                className={`f-plan${!isYearly ? " selected" : ""}`}
                onClick={() => setPlan("monthly")}
                aria-pressed={!isYearly}
              >
                <p className="f-plan-name">Aylıq</p>
                <p className="f-plan-price">
                  11.99 ₼<small>/ay</small>
                </p>
                <p className="f-plan-meta">
                  Öhdəliksiz
                  <br />
                  istənilən vaxt ləğv
                </p>
              </button>
            </div>

            {/* Plan-aware reassurance */}
            {isYearly ? (
              <div className="f-timeline" style={{ marginTop: 18 }}>
                {TRIAL_TIMELINE.map((item) => (
                  <div key={item.title} className="f-tl-item">
                    <span className="f-tl-icon">{item.emoji}</span>
                    <div className="f-tl-body">
                      <p className="f-tl-title">{item.title}</p>
                      <p className="f-tl-sub">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="f-rules" style={{ marginTop: 16 }}>
                {["Dərhal tam giriş", "Öhdəlik yoxdur", "Tək toxunuşla ləğv"].map((label) => (
                  <span key={label} className="f-rule ok">
                    <Check size={11} strokeWidth={3} />
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Social proof */}
            <div className="f-proof" style={{ marginTop: 16 }}>
              <div className="f-proof-cell">
                <p className="f-proof-value">4.9 ★</p>
                <p className="f-proof-label">12 400+ rəy</p>
              </div>
              <span className="f-proof-sep" />
              <div className="f-proof-cell">
                <p className="f-proof-value">120K+</p>
                <p className="f-proof-label">aktiv ana</p>
              </div>
              <span className="f-proof-sep" />
              <div className="f-proof-cell">
                <p className="f-proof-value">№1</p>
                <p className="f-proof-label">ana tətbiqi AZ-da</p>
              </div>
            </div>

            <p
              className="f-hint"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14 }}
            >
              <ShieldCheck size={13} strokeWidth={2.2} />
              Ləğv etmək 10 saniyə çəkir — sual verilmir
            </p>
          </div>
        </div>
      </div>

      <footer className="f-footer">
        <button type="button" className="f-btn f-btn-premium" disabled={processing} onClick={purchase}>
          {processing ? <span className="f-spin" /> : <Crown size={16} strokeWidth={2.2} />}
          {processing ? "Aktivləşdirilir…" : isYearly ? "7 günü pulsuz başlat" : "Premium-a başla"}
        </button>
        <p className="f-footer-note">
          {isYearly
            ? "Bu gün 0 ₼ · 7-ci gündən ildə 59.99 ₼ · istənilən vaxt ləğv"
            : "Ayda 11.99 ₼ · bu gün başlayır · istənilən vaxt ləğv"}
        </p>
        <button type="button" className="f-btn f-btn-quiet" style={{ minHeight: 36 }} onClick={onSkip}>
          {skipLabel}
        </button>
      </footer>
    </>
  );
}
