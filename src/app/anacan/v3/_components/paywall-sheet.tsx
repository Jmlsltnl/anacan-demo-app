"use client";

import { Check, Crown, Minus, ShieldCheck, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import {
  activatePlan,
  formatCountdown,
  getPremiumState,
  markDownsellUsed,
  startYearlyTrial,
  usePremium,
} from "../_lib/premium-store";

type Step = "offer" | "downsell" | "success";

const COMPARE: { label: string; free: boolean }[] = [
  { label: "Gündəlik qeydlər və izləmə", free: true },
  { label: "Today's info — tam gündəlik analiz", free: false },
  { label: "Cry Translator + Fairy Tales", free: false },
  { label: "İnkişaf analizi və percentile", free: false },
  { label: "Fərdi tövsiyələr (9–12 ay)", free: false },
  { label: "Bütün ekspert məqalələri", free: false },
  { label: "Reklamsız təcrübə", free: false },
];

const TIMELINE = [
  { emoji: "🔓", title: "Bu gün", sub: "Tam giriş dərhal açılır — bütün Premium funksiyalar." },
  { emoji: "🔔", title: "5-ci gün", sub: "Sınağın bitməsinə 2 gün qalmış xatırlatma göndəririk." },
  { emoji: "💳", title: "7-ci gün", sub: "Üzvlük başlayır. Ona qədər istənilən an ləğv edin." },
];

export function PaywallSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const premium = usePremium();
  const [step, setStep] = useState<Step>("offer");
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const [showClose, setShowClose] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successPlan, setSuccessPlan] = useState<"trial" | "monthly" | "discount">("trial");
  const [now, setNow] = useState(() => Date.now());

  /* delayed X — classic soft-paywall pattern */
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setShowClose(true), 2600);
    return () => {
      window.clearTimeout(t);
    };
  }, [open]);

  /* countdown tick */
  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [open]);

  if (!open) return null;

  const offerLeft = premium.offerEndsAt ? Math.max(0, premium.offerEndsAt - now) : 0;

  const requestClose = () => {
    // Exit-intent downsell: one time only, only if still not premium
    const state = getPremiumState();
    if (step === "offer" && state.status === "none" && !state.downsellUsed) {
      markDownsellUsed();
      setStep("downsell");
      return;
    }
    finishClose();
  };

  const finishClose = () => {
    setStep("offer");
    setShowClose(false);
    setProcessing(false);
    onClose();
  };

  const purchase = (kind: "trial" | "monthly" | "discount") => {
    setProcessing(true);
    window.setTimeout(() => {
      if (kind === "trial") startYearlyTrial();
      if (kind === "monthly") activatePlan("monthly");
      if (kind === "discount") activatePlan("yearly-discount");
      setSuccessPlan(kind);
      setProcessing(false);
      setStep("success");
    }, 900);
  };

  return (
    <>
      <button type="button" className="v3-backdrop" onClick={requestClose} aria-label="Bağla" />
      <div className="v3-sheet" role="dialog" aria-modal="true" aria-label="Anacan Premium">
        <div className="v3-grip" />
        <button
          type="button"
          className={`v3-close${showClose ? " show" : ""}`}
          onClick={requestClose}
          aria-label="Təklifi keç"
          tabIndex={showClose ? 0 : -1}
        >
          <X size={16} strokeWidth={2.4} />
        </button>

        {step === "offer" && (
          <>
            <div className="v3-sheet-scroll">
              <div className="v3-pw-head">
                <span className="v3-pw-crown">
                  <Crown size={26} strokeWidth={2.2} />
                </span>
                <h2 className="v3-pw-title">
                  Atlas üçün <em>tam</em> Anacan təcrübəsi
                </h2>
                <p className="v3-pw-sub">
                  Gündəlik analiz, ağlama tərcüməçisi, inkişaf proqnozları və 500+ ekspert məqaləsi — hamısı
                  bir üzvlükdə.
                </p>
                {offerLeft > 0 && (
                  <span className="v3-offer-chip">
                    <Zap size={12} strokeWidth={2.6} /> İlk gün endirimi bitir: <b>{formatCountdown(offerLeft)}</b>
                  </span>
                )}
              </div>

              <div className="v3-timeline">
                {TIMELINE.map((item) => (
                  <div key={item.title} className="v3-tl-item">
                    <span className="v3-tl-icon">{item.emoji}</span>
                    <div>
                      <p className="v3-tl-title">{item.title}</p>
                      <p className="v3-tl-sub">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="v3-plans">
                <button
                  type="button"
                  className={`v3-plan${plan === "yearly" ? " selected" : ""}`}
                  onClick={() => setPlan("yearly")}
                  aria-pressed={plan === "yearly"}
                >
                  <span className="v3-plan-flag">58% qənaət</span>
                  <span className="v3-plan-radio" />
                  <span>
                    <p className="v3-plan-name">İllik · 7 gün pulsuz</p>
                    <p className="v3-plan-meta">
                      <span className="v3-strike">143.88 ₼</span> ildə 59.99 ₼ · sınaqdan sonra
                    </p>
                  </span>
                  <p className="v3-plan-price">
                    4.99 ₼<small>/ay</small>
                  </p>
                </button>
                <button
                  type="button"
                  className={`v3-plan${plan === "monthly" ? " selected" : ""}`}
                  onClick={() => setPlan("monthly")}
                  aria-pressed={plan === "monthly"}
                >
                  <span className="v3-plan-radio" />
                  <span>
                    <p className="v3-plan-name">Aylıq</p>
                    <p className="v3-plan-meta">Öhdəliksiz · istənilən vaxt ləğv</p>
                  </span>
                  <p className="v3-plan-price">
                    11.99 ₼<small>/ay</small>
                  </p>
                </button>
              </div>

              <div className="v3-proof">
                <span className="stars">★★★★★</span>
                <span>4.9 · 12 400+ rəy</span>
                <span>120K+ ana</span>
              </div>

              <div className="v3-quote">
                <span className="v3-quote-avatar">👩</span>
                <div>
                  <p className="v3-quote-text">
                    “Gecə 3-də ağlamanın səbəbini Anacan-dan öyrəndim. Premium aldığım ən doğru qərar idi.”
                  </p>
                  <p className="v3-quote-name">Aysel · 6 aylıq körpənin anası</p>
                </div>
              </div>

              <div className="v3-compare">
                <div className="v3-compare-row head">
                  <span>Funksiya</span>
                  <span className="v3-compare-cell">Pulsuz</span>
                  <span className="v3-compare-cell premium">Premium</span>
                </div>
                {COMPARE.map((row) => (
                  <div key={row.label} className="v3-compare-row">
                    <span>{row.label}</span>
                    <span className={`v3-compare-cell${row.free ? " yes" : ""}`}>
                      {row.free ? <Check size={13} strokeWidth={3} /> : <Minus size={13} strokeWidth={2.4} />}
                    </span>
                    <span className="v3-compare-cell yes">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="v3-links">
                <button type="button">Alışı bərpa et</button>
                <button type="button">Şərtlər</button>
                <button type="button">Məxfilik</button>
              </div>
            </div>

            <div className="v3-footer">
              <button
                type="button"
                className="v3-cta"
                disabled={processing}
                onClick={() => purchase(plan === "yearly" ? "trial" : "monthly")}
              >
                {processing ? "Aktivləşdirilir…" : plan === "yearly" ? "7 günü pulsuz başlat" : "Premium-a keç"}
              </button>
              <p className="v3-cta-note">
                {plan === "yearly"
                  ? "Bu gün 0 ₼ · sınaqdan sonra ildə 59.99 ₼ · istənilən vaxt tək toxunuşla ləğv"
                  : "Ayda 11.99 ₼ · öhdəlik yoxdur · istənilən vaxt ləğv"}
              </p>
            </div>
          </>
        )}

        {step === "downsell" && (
          <>
            <div className="v3-sheet-scroll">
              <div className="v3-pw-head">
                <span className="v3-downsell-badge">-30%</span>
                <h2 className="v3-pw-title">
                  Gözləyin — <em>yalnız indi</em> üçün
                </h2>
                <p className="v3-pw-sub">
                  Getməzdən əvvəl: illik planı birdəfəlik endirimlə təklif edirik. Bu təklif bu pəncərə
                  bağlananda yox olur.
                </p>
              </div>
              <p className="v3-downsell-old">İldə 59.99 ₼</p>
              <p className="v3-downsell-new">
                41.99 ₼<small> / il · cəmi 3.49 ₼ ay</small>
              </p>
              <div
                className="v3-quote"
                style={{ background: "#f0faf3", border: "1px solid rgba(99,189,139,0.35)" }}
              >
                <ShieldCheck size={17} strokeWidth={2.2} style={{ color: "#1c7a4d", flexShrink: 0, marginTop: 2 }} />
                <p className="v3-quote-text">
                  30 gün ərzində bəyənməsəniz — pulunuzu sual vermədən qaytarırıq.
                </p>
              </div>
            </div>
            <div className="v3-footer">
              <button type="button" className="v3-cta" disabled={processing} onClick={() => purchase("discount")}>
                {processing ? "Aktivləşdirilir…" : "Endirimlə əldə et — 41.99 ₼/il"}
              </button>
              <button
                type="button"
                onClick={finishClose}
                style={{
                  display: "block",
                  margin: "10px auto 0",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "var(--a-ink-faint)",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Xeyr, tam qiymət ödəməyə üstünlük verirəm
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <div className="v3-sheet-scroll">
              <div className="v3-pw-head">
                <span className="v3-success-icon">
                  {successPlan === "trial" ? <Crown size={36} strokeWidth={2.2} /> : <Check size={38} strokeWidth={3} />}
                </span>
                <h2 className="v3-pw-title">
                  {successPlan === "trial" ? (
                    <>
                      Sınaq aktivdir — <em>hər şey açıldı</em>
                    </>
                  ) : (
                    <>
                      Xoş gəldiniz — <em>Premium ailəsinə</em>
                    </>
                  )}
                </h2>
                <p className="v3-pw-sub">
                  {successPlan === "trial"
                    ? "7 gün ərzində bütün Premium funksiyalar sizindir. 5-ci gündə xatırlatma göndərəcəyik — sürpriz olmayacaq."
                    : successPlan === "discount"
                      ? "Endirimli illik planınız aktivdir. Atlas-ın bütün analizi indi açıqdır."
                      : "Aylıq planınız aktivdir. Atlas-ın bütün analizi indi açıqdır."}
                </p>
              </div>
            </div>
            <div className="v3-footer">
              <button type="button" className="v3-cta" onClick={finishClose}>
                Kəşf etməyə başla
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
