"use client";

import { Baby, Check, ChevronLeft, Crown, Heart, Lock, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  computeScore,
  daysFromToday,
  fmtAz,
  getNoirSession,
  pregnancyStatus,
  cycleStatus,
  babyStatus,
  saveNoirProfile,
  shiftDays,
  startOfToday,
  toISO,
  type NoirProfile,
  type ScoreBreakdown,
} from "../../_lib/noir-store";
import { Analysis } from "./analysis";
import { HealthMap } from "./health-map";
import { NoirPaywall, type NoirPlan } from "./noir-paywall";
import {
  AGE_RANGES,
  FOCUS_OPTIONS,
  GOAL_OPTIONS,
  QUIZ_STEPS,
  resolveFact,
  type MultiStep,
  type ScaleStep,
  type SingleStep,
} from "./quiz-config";

type Phase = "quiz" | "analysis" | "map" | "paywall" | "success";

export function OnboardingEngine() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<NoirProfile>({
    cycleLen: 28,
    periodLen: 5,
    pregMode: "due",
    conditions: [],
    supplements: [],
    focus: [],
    notifDaily: true,
    notifWeekly: true,
    notifCritical: true,
  });
  const [score, setScore] = useState<ScoreBreakdown | null>(null);
  const [premiumPlan, setPremiumPlan] = useState<NoirPlan | null>(null);

  // soft auth gate
  useEffect(() => {
    if (!getNoirSession()) router.replace("/anacan/noir/welcome");
  }, [router]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [idx, phase]);

  const step = QUIZ_STEPS[idx];
  const goal = answers.goal ?? "cycle";
  const today = startOfToday();

  const setField = (id: keyof NoirProfile, value: unknown) =>
    setAnswers((a) => ({ ...a, [id]: value as never }));

  const finishQuiz = () => {
    const computed = computeScore(answers);
    setScore(computed);
    saveNoirProfile({ ...answers, score: computed });
    setPhase("analysis");
  };

  const goNext = () => {
    if (idx < QUIZ_STEPS.length - 1) setIdx(idx + 1);
    else finishQuiz();
  };

  const goBack = () => {
    if (idx > 0) setIdx(idx - 1);
  };

  const autoNext = () => window.setTimeout(goNext, 360);

  /* ---------- terminal phases ---------- */

  if (phase === "analysis") {
    return (
      <div className="n-scroll" ref={scrollRef}>
        <div className="n-shell">
          <Analysis name={answers.name} onDone={() => setPhase("map")} />
        </div>
      </div>
    );
  }

  if (phase === "map" && score) {
    return (
      <>
        <div className="n-scroll" ref={scrollRef}>
          <div className="n-shell" style={{ paddingTop: 18, paddingBottom: 24 }}>
            <HealthMap profile={answers} score={score} />
          </div>
        </div>
        <footer className="n-footer">
          <button type="button" className="n-btn n-btn-gold" onClick={() => setPhase("paywall")}>
            <Crown size={16} strokeWidth={2.2} /> Xəritəni tam aç
          </button>
          <p className="n-footer-note">Tam xəritə və gündəlik plan Premium ilə açılır — ilk 7 gün pulsuz</p>
        </footer>
      </>
    );
  }

  if (phase === "paywall") {
    return (
      <NoirPaywall
        name={answers.name}
        onSubscribe={(plan) => {
          setPremiumPlan(plan);
          saveNoirProfile({
            premium: true,
            premiumPlan: plan,
            trialEndsAt: plan === "yearly" ? toISO(shiftDays(today, 7)) : undefined,
            onboarded: true,
          });
          setPhase("success");
        }}
        onSkip={() => {
          setPremiumPlan(null);
          saveNoirProfile({ premium: false, premiumPlan: null, onboarded: true });
          setPhase("success");
        }}
      />
    );
  }

  if (phase === "success") {
    return (
      <>
        <div className="n-scroll" ref={scrollRef} style={{ position: "relative" }}>
          <div className="n-confetti" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", padding: "52px 22px 10px" }}>
            <span className="n-success-icon">
              {premiumPlan ? <Crown size={40} strokeWidth={2.4} /> : <Check size={42} strokeWidth={3} />}
            </span>
            <h1 className="n-title n-display">
              {premiumPlan ? (
                <>
                  Premium aktivdir{answers.name ? `, ${answers.name}` : ""} <em>👑</em>
                </>
              ) : (
                <>Hər şey hazırdır{answers.name ? `, ${answers.name}` : ""}</>
              )}
            </h1>
            <p className="n-sub" style={{ marginBottom: 0 }}>
              {premiumPlan === "yearly"
                ? `7 günlük pulsuz sınaq başladı — ${fmtAz(shiftDays(today, 7))} tarixinə qədər tam giriş.`
                : premiumPlan
                  ? "Bütün Premium funksiyalar açıldı. Xoş gəldiniz!"
                  : "Pulsuz planla başlayırsınız — Premium-u istənilən vaxt Profil bölməsindən aktivləşdirin."}
            </p>
          </div>

          <div className="n-shell" style={{ paddingTop: 20 }}>
            <div className="n-phases">
              <div className="n-phase done">
                <span className="n-phase-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                Sağlamlıq xəritəniz quruldu
              </div>
              <div className="n-phase done" style={{ animationDelay: "120ms" }}>
                <span className="n-phase-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                90 günlük plan aktivləşdirildi
              </div>
              <div className="n-phase done" style={{ animationDelay: "240ms" }}>
                <span className="n-phase-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                {premiumPlan ? "Premium üzvlük aktivdir" : "Pulsuz plan aktivdir"}
              </div>
            </div>
          </div>
        </div>

        <footer className="n-footer">
          <button type="button" className="n-btn n-btn-gold" onClick={() => router.replace("/anacan/noir")}>
            Anacan-a keç
          </button>
        </footer>
      </>
    );
  }

  /* ---------- quiz phase ---------- */

  const progress = ((idx + 1) / QUIZ_STEPS.length) * 100;

  /* derived detail validation & insights */
  const preg = pregnancyStatus(answers);
  const babyInfo = babyStatus(answers);
  const cyc = cycleStatus(answers);

  const detailValid = (() => {
    switch (goal) {
      case "pregnant":
        return preg !== null && answers.multiples !== undefined && answers.firstPregnancy !== undefined;
      case "baby":
        return (
          (answers.babyName ?? "").trim().length >= 2 &&
          !!answers.babyBirth &&
          daysFromToday(answers.babyBirth) <= 0 &&
          !!answers.birthType
        );
      case "cycle":
        return !!answers.lastPeriod && daysFromToday(answers.lastPeriod) <= 0 && !!answers.regularity;
      case "ttc":
        return !!answers.tryingSince && !!answers.lastPeriod && daysFromToday(answers.lastPeriod) <= 0;
    }
  })();

  const footer = (() => {
    if (step.kind === "custom") {
      switch (step.id) {
        case "privacy":
          return (
            <>
              <button type="button" className="n-btn n-btn-gold" onClick={goNext}>
                Qiymətləndirməyə başla
              </button>
              <p className="n-footer-note">18 addım · təxminən 3 dəqiqə · istənilən vaxt geri qayıda bilərsiniz</p>
            </>
          );
        case "identity":
          return (
            <button
              type="button"
              className="n-btn n-btn-gold"
              disabled={(answers.name ?? "").trim().length < 2 || !answers.ageRange}
              onClick={goNext}
            >
              Davam et
            </button>
          );
        case "detail":
          return (
            <button type="button" className="n-btn n-btn-gold" disabled={!detailValid} onClick={goNext}>
              Davam et
            </button>
          );
        case "fact":
          return (
            <button type="button" className="n-btn n-btn-gold" onClick={goNext}>
              Maraqlıdır, davam et
            </button>
          );
        case "rhythm":
          return (
            <button
              type="button"
              className="n-btn n-btn-gold"
              disabled={!answers.dailyMinutes || !answers.preferredTime}
              onClick={goNext}
            >
              Davam et
            </button>
          );
        case "notifications":
          return (
            <button type="button" className="n-btn n-btn-gold" onClick={goNext}>
              Planımı qur
            </button>
          );
        default:
          return null;
      }
    }
    if (step.kind === "multi") {
      const values = (answers[step.id] as string[] | undefined) ?? [];
      return (
        <button type="button" className="n-btn n-btn-gold" disabled={values.length === 0} onClick={goNext}>
          Davam et{values.length > 0 ? ` (${values.length})` : ""}
        </button>
      );
    }
    return null; // single & scale auto-advance
  })();

  return (
    <>
      <div className="n-topbar">
        {idx > 0 ? (
          <button type="button" className="n-back" onClick={goBack} aria-label="Əvvəlki addım">
            <ChevronLeft size={19} strokeWidth={2.2} />
          </button>
        ) : (
          <span className="n-topbar-spacer" />
        )}
        <div className="n-progress" role="progressbar" aria-valuenow={Math.round(progress)}>
          <span className="n-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="n-step-count">
          {idx + 1}/{QUIZ_STEPS.length}
        </span>
      </div>

      <div className="n-scroll" ref={scrollRef}>
        <div className="n-shell" style={{ paddingBottom: 24 }}>
          <div className="n-step" key={idx}>
            {step.kind === "custom" && step.id === "privacy" && (
              <>
                <p className="n-kicker">
                  <Lock size={12} strokeWidth={2.4} /> Əvvəlcə vacib söz
                </p>
                <h1 className="n-title n-display">
                  Cavablarınız <em>yalnız sizindir</em>
                </h1>
                <p className="n-sub">
                  İndi verəcəyimiz suallar klinik qiymətləndirmə məntiqi ilə qurulub: yuxu, əhval, qidalanma,
                  dəstək sistemi. Nə qədər dürüst olsanız, planınız o qədər dəqiq olacaq.
                </p>
                <div className="n-phases">
                  {[
                    { emoji: "🔐", text: "Məlumatlar cihazınızda qalır, satılmır" },
                    { emoji: "🧭", text: "Hər cavab planı real vaxtda dəyişir" },
                    { emoji: "🩺", text: "Tibbi məsləhət deyil — bələdçidir" },
                  ].map((row, i) => (
                    <div key={row.text} className={`n-phase done n-d${i + 1}`}>
                      <span style={{ fontSize: 18 }}>{row.emoji}</span>
                      {row.text}
                    </div>
                  ))}
                </div>
              </>
            )}

            {step.kind === "custom" && step.id === "goal" && (
              <>
                <h1 className="n-title n-display">Hansı mərhələdəsiniz?</h1>
                <p className="n-sub">Anacan dörd rejimdə işləyir — sizinki hansıdır?</p>
                <div className="n-choices">
                  {GOAL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`n-choice${answers.goal === option.value ? " selected" : ""}`}
                      onClick={() => {
                        setAnswers((a) => ({ ...a, goal: option.value, focus: [] }));
                        autoNext();
                      }}
                    >
                      <span className="n-choice-icon" style={{ background: option.accent }}>
                        {option.emoji}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <p className="n-choice-title">{option.label}</p>
                        <p className="n-choice-sub">{option.sub}</p>
                      </span>
                      <span className="n-choice-tick">
                        <Check size={13} strokeWidth={3.2} />
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step.kind === "custom" && step.id === "identity" && (
              <>
                <h1 className="n-title n-display">Tanış olaq</h1>
                <p className="n-sub">Ad — müraciət üçün, yaş aralığı — tövsiyələrin dəqiqliyi üçün.</p>
                <div className="n-field">
                  <label className="n-label" htmlFor="noir-name">
                    Adınız
                  </label>
                  <div className="n-control">
                    <User size={17} strokeWidth={2} />
                    <input
                      id="noir-name"
                      className="n-input"
                      value={answers.name ?? ""}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Məsələn: Türkan"
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                <p className="n-label" style={{ marginTop: 4 }}>
                  Yaş aralığınız
                </p>
                <div className="n-chips">
                  {AGE_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      className={`n-chip${answers.ageRange === range ? " on" : ""}`}
                      onClick={() => setField("ageRange", range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                {(answers.name ?? "").trim().length >= 2 && (
                  <div className="n-insight">
                    <Heart size={15} strokeWidth={2.2} />
                    <span>Xoş gəldiniz, {(answers.name ?? "").trim()} — buradan sonrası birlikdə 🤍</span>
                  </div>
                )}
              </>
            )}

            {step.kind === "custom" && step.id === "detail" && goal === "pregnant" && (
              <>
                <h1 className="n-title n-display">Hamiləliyiniz haqqında</h1>
                <p className="n-sub">Həftəlik bələdçini doğru nöqtədən başlatmaq üçün.</p>
                <div className="n-chips" style={{ marginBottom: 16 }}>
                  <button
                    type="button"
                    className={`n-chip${answers.pregMode === "due" ? " on" : ""}`}
                    onClick={() => setField("pregMode", "due")}
                  >
                    Doğuş tarixini bilirəm
                  </button>
                  <button
                    type="button"
                    className={`n-chip${answers.pregMode === "lmp" ? " on" : ""}`}
                    onClick={() => setField("pregMode", "lmp")}
                  >
                    Son menstruasiya tarixi
                  </button>
                </div>
                <div className="n-field">
                  <label className="n-label" htmlFor="preg-date">
                    {answers.pregMode === "due" ? "Təxmini doğuş tarixi" : "Son menstruasiyanın ilk günü"}
                  </label>
                  <div className="n-control">
                    <input
                      id="preg-date"
                      className="n-input"
                      type="date"
                      value={(answers.pregMode === "due" ? answers.dueDate : answers.lmpDate) ?? ""}
                      min={answers.pregMode === "due" ? toISO(today) : toISO(shiftDays(today, -300))}
                      max={answers.pregMode === "due" ? toISO(shiftDays(today, 280)) : toISO(today)}
                      onChange={(e) =>
                        setField(answers.pregMode === "due" ? "dueDate" : "lmpDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                {preg && (
                  <div className="n-insight">
                    <Sparkles size={15} strokeWidth={2.2} />
                    <span>
                      Təbriklər — <strong>{preg.week}-ci həftə</strong>, {preg.trimester} trimestr. Körpəniz{" "}
                      {fmtAz(preg.dueDate)} ətrafında sizinlə olacaq.
                    </span>
                  </div>
                )}
                <p className="n-label" style={{ marginTop: 18 }}>
                  Neçə körpə gözləyirsiniz?
                </p>
                <div className="n-chips">
                  <button
                    type="button"
                    className={`n-chip${answers.multiples === false ? " on" : ""}`}
                    onClick={() => setField("multiples", false)}
                  >
                    👶 Tək körpə
                  </button>
                  <button
                    type="button"
                    className={`n-chip${answers.multiples === true ? " on" : ""}`}
                    onClick={() => setField("multiples", true)}
                  >
                    👶👶 Əkiz və ya çox
                  </button>
                </div>
                <p className="n-label" style={{ marginTop: 18 }}>
                  Bu ilk hamiləliyinizdir?
                </p>
                <div className="n-chips">
                  <button
                    type="button"
                    className={`n-chip${answers.firstPregnancy === true ? " on" : ""}`}
                    onClick={() => setField("firstPregnancy", true)}
                  >
                    ✨ Bəli, ilk dəfə
                  </button>
                  <button
                    type="button"
                    className={`n-chip${answers.firstPregnancy === false ? " on" : ""}`}
                    onClick={() => setField("firstPregnancy", false)}
                  >
                    💪 Təcrübəm var
                  </button>
                </div>
              </>
            )}

            {step.kind === "custom" && step.id === "detail" && goal === "baby" && (
              <>
                <h1 className="n-title n-display">Körpəniz haqqında</h1>
                <p className="n-sub">Yaş + doğuş növü = inkişaf və bərpa planınızın təməli.</p>
                <div className="n-field">
                  <label className="n-label" htmlFor="baby-name">
                    Körpənin adı
                  </label>
                  <div className="n-control">
                    <Baby size={17} strokeWidth={2} />
                    <input
                      id="baby-name"
                      className="n-input"
                      value={answers.babyName ?? ""}
                      onChange={(e) => setField("babyName", e.target.value)}
                      placeholder="Məsələn: Atlas"
                    />
                  </div>
                </div>
                <div className="n-field">
                  <label className="n-label" htmlFor="baby-birth">
                    Doğum tarixi
                  </label>
                  <div className="n-control">
                    <input
                      id="baby-birth"
                      className="n-input"
                      type="date"
                      value={answers.babyBirth ?? ""}
                      min={toISO(shiftDays(today, -365 * 5))}
                      max={toISO(today)}
                      onChange={(e) => setField("babyBirth", e.target.value)}
                    />
                  </div>
                </div>
                {babyInfo && (answers.babyName ?? "").trim().length >= 2 && (
                  <div className="n-insight">
                    <Heart size={15} strokeWidth={2.2} />
                    <span>
                      <strong>{(answers.babyName ?? "").trim()}</strong> — {babyInfo.ageText},{" "}
                      {babyInfo.daysOld} gündür sizinlə 🎉
                    </span>
                  </div>
                )}
                <p className="n-label" style={{ marginTop: 18 }}>
                  Cinsi <small>· istəyə bağlı</small>
                </p>
                <div className="n-chips">
                  <button
                    type="button"
                    className={`n-chip${answers.babyGender === "girl" ? " on" : ""}`}
                    onClick={() => setField("babyGender", answers.babyGender === "girl" ? null : "girl")}
                  >
                    🎀 Qız
                  </button>
                  <button
                    type="button"
                    className={`n-chip${answers.babyGender === "boy" ? " on" : ""}`}
                    onClick={() => setField("babyGender", answers.babyGender === "boy" ? null : "boy")}
                  >
                    🧸 Oğlan
                  </button>
                </div>
                <p className="n-label" style={{ marginTop: 18 }}>
                  Doğuş necə oldu?
                </p>
                <div className="n-chips">
                  <button
                    type="button"
                    className={`n-chip${answers.birthType === "vaginal" ? " on" : ""}`}
                    onClick={() => setField("birthType", "vaginal")}
                  >
                    🌿 Təbii doğuş
                  </button>
                  <button
                    type="button"
                    className={`n-chip${answers.birthType === "csection" ? " on" : ""}`}
                    onClick={() => setField("birthType", "csection")}
                  >
                    🏥 Qeysəriyyə
                  </button>
                </div>
                <p className="n-hint">Bərpa tövsiyələri doğuş növünə görə fərqlənir.</p>
              </>
            )}

            {step.kind === "custom" && step.id === "detail" && goal === "cycle" && (
              <>
                <h1 className="n-title n-display">Sikliniz haqqında</h1>
                <p className="n-sub">İlk gündən dəqiq proqnoz üçün üç göstərici kifayətdir.</p>
                <div className="n-field">
                  <label className="n-label" htmlFor="last-period">
                    Son dövrün ilk günü
                  </label>
                  <div className="n-control">
                    <input
                      id="last-period"
                      className="n-input"
                      type="date"
                      value={answers.lastPeriod ?? ""}
                      min={toISO(shiftDays(today, -90))}
                      max={toISO(today)}
                      onChange={(e) => setField("lastPeriod", e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 6 }}>
                  <div>
                    <p className="n-label">Sikl uzunluğu</p>
                    <div className="n-stepper">
                      <button
                        type="button"
                        className="n-stepper-btn"
                        disabled={(answers.cycleLen ?? 28) <= 21}
                        onClick={() => setField("cycleLen", (answers.cycleLen ?? 28) - 1)}
                        aria-label="Azalt"
                      >
                        −
                      </button>
                      <div>
                        <p className="n-stepper-num">{answers.cycleLen ?? 28}</p>
                        <p className="n-stepper-unit">gün</p>
                      </div>
                      <button
                        type="button"
                        className="n-stepper-btn"
                        disabled={(answers.cycleLen ?? 28) >= 35}
                        onClick={() => setField("cycleLen", (answers.cycleLen ?? 28) + 1)}
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="n-label">Dövr müddəti</p>
                    <div className="n-stepper">
                      <button
                        type="button"
                        className="n-stepper-btn"
                        disabled={(answers.periodLen ?? 5) <= 2}
                        onClick={() => setField("periodLen", (answers.periodLen ?? 5) - 1)}
                        aria-label="Azalt"
                      >
                        −
                      </button>
                      <div>
                        <p className="n-stepper-num">{answers.periodLen ?? 5}</p>
                        <p className="n-stepper-unit">gün</p>
                      </div>
                      <button
                        type="button"
                        className="n-stepper-btn"
                        disabled={(answers.periodLen ?? 5) >= 8}
                        onClick={() => setField("periodLen", (answers.periodLen ?? 5) + 1)}
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <p className="n-label" style={{ marginTop: 12 }}>
                  Sikliniz nə qədər müntəzəmdir?
                </p>
                <div className="n-chips">
                  {[
                    { v: "regular", l: "⏱️ Müntəzəm (±2 gün)" },
                    { v: "variable", l: "🌊 Dəyişkəndir" },
                    { v: "unknown", l: "🤷‍♀️ Bilmirəm" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`n-chip${answers.regularity === o.v ? " on" : ""}`}
                      onClick={() => setField("regularity", o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
                {cyc && (
                  <div className="n-insight">
                    <Sparkles size={15} strokeWidth={2.2} />
                    <span>
                      Hazırda siklin <strong>{cyc.day}-ci günü</strong> · {cyc.phase}. Növbəti dövr:{" "}
                      <strong>{fmtAz(cyc.nextPeriod)}</strong>
                    </span>
                  </div>
                )}
              </>
            )}

            {step.kind === "custom" && step.id === "detail" && goal === "ttc" && (
              <>
                <h1 className="n-title n-display">Hazırlıq yolunuz</h1>
                <p className="n-sub">Fertil pəncərənizi hesablamaq və planı düzgün fazadan başlatmaq üçün.</p>
                <p className="n-label">Nə vaxtdan cəhd edirsiniz?</p>
                <div className="n-chips" style={{ marginBottom: 16 }}>
                  {[
                    { v: "<3", l: "3 aydan az" },
                    { v: "3-6", l: "3–6 ay" },
                    { v: "6-12", l: "6–12 ay" },
                    { v: "12+", l: "1 ildən çox" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`n-chip${answers.tryingSince === o.v ? " on" : ""}`}
                      onClick={() => setField("tryingSince", o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
                <div className="n-field">
                  <label className="n-label" htmlFor="ttc-period">
                    Son dövrün ilk günü
                  </label>
                  <div className="n-control">
                    <input
                      id="ttc-period"
                      className="n-input"
                      type="date"
                      value={answers.lastPeriod ?? ""}
                      min={toISO(shiftDays(today, -90))}
                      max={toISO(today)}
                      onChange={(e) => setField("lastPeriod", e.target.value)}
                    />
                  </div>
                </div>
                <p className="n-label">Orta sikl uzunluğu</p>
                <div className="n-stepper" style={{ maxWidth: 220 }}>
                  <button
                    type="button"
                    className="n-stepper-btn"
                    disabled={(answers.cycleLen ?? 28) <= 21}
                    onClick={() => setField("cycleLen", (answers.cycleLen ?? 28) - 1)}
                    aria-label="Azalt"
                  >
                    −
                  </button>
                  <div>
                    <p className="n-stepper-num">{answers.cycleLen ?? 28}</p>
                    <p className="n-stepper-unit">gün</p>
                  </div>
                  <button
                    type="button"
                    className="n-stepper-btn"
                    disabled={(answers.cycleLen ?? 28) >= 35}
                    onClick={() => setField("cycleLen", (answers.cycleLen ?? 28) + 1)}
                    aria-label="Artır"
                  >
                    +
                  </button>
                </div>
                {cyc && (
                  <div className="n-insight">
                    <Sparkles size={15} strokeWidth={2.2} />
                    <span>
                      Növbəti fertil pəncərəniz: <strong>{fmtAz(cyc.fertileStart)} – {fmtAz(cyc.fertileEnd)}</strong>{" "}
                      · ovulyasiya ~{fmtAz(cyc.ovulation)}
                    </span>
                  </div>
                )}
                {answers.tryingSince === "12+" && (
                  <div className="n-insight" style={{ background: "rgba(106,168,255,0.1)", borderColor: "rgba(106,168,255,0.3)", color: "var(--n-blue)" }}>
                    <Heart size={15} strokeWidth={2.2} />
                    <span>
                      1 ildən çox cəhd — reproduktoloq konsultasiyası standart tövsiyədir. Planınıza analiz
                      bələdçisi əlavə etdik.
                    </span>
                  </div>
                )}
              </>
            )}

            {step.kind === "custom" && step.id === "fact" && (
              <>
                <p className="n-kicker">
                  <Sparkles size={12} strokeWidth={2.4} /> Sizə uyğunlaşdırıldı
                </p>
                {(() => {
                  const fact = resolveFact(answers);
                  return (
                    <div className="n-fact n-rise-in">
                      <span className="n-fact-emoji">{fact.emoji}</span>
                      <h2 className="n-fact-title n-display">{fact.title}</h2>
                      <p className="n-fact-text">{fact.text}</p>
                      <p className="n-fact-source">{fact.source}</p>
                    </div>
                  );
                })()}
              </>
            )}

            {step.kind === "custom" && step.id === "rhythm" && (
              <>
                <h1 className="n-title n-display">Gündəlik ritminiz</h1>
                <p className="n-sub">Planın həcmini və çatdırılma vaxtını buna uyğunlaşdırırıq.</p>
                <p className="n-label">Gündə nə qədər vaxt ayıra bilərsiniz?</p>
                <div className="n-choices" style={{ marginBottom: 18 }}>
                  {[
                    { v: "5", emoji: "☕", t: "5 dəqiqə", s: "Qısa, konkret kartlar" },
                    { v: "10", emoji: "🌿", t: "10 dəqiqə", s: "Balanslı gündəlik plan" },
                    { v: "15+", emoji: "📚", t: "15+ dəqiqə", s: "Dərin məqalələr və tam izləmə" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`n-choice${answers.dailyMinutes === o.v ? " selected" : ""}`}
                      onClick={() => setField("dailyMinutes", o.v)}
                    >
                      <span className="n-choice-icon" style={{ background: "var(--n-surface-2)" }}>
                        {o.emoji}
                      </span>
                      <span>
                        <p className="n-choice-title">{o.t}</p>
                        <p className="n-choice-sub">{o.s}</p>
                      </span>
                      <span className="n-choice-tick">
                        <Check size={13} strokeWidth={3.2} />
                      </span>
                    </button>
                  ))}
                </div>
                <p className="n-label">Günün hansı vaxtı sizə uyğundur?</p>
                <div className="n-chips">
                  {[
                    { v: "morning", l: "☀️ Səhər" },
                    { v: "noon", l: "🌤️ Günorta" },
                    { v: "evening", l: "🌙 Axşam" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`n-chip${answers.preferredTime === o.v ? " on" : ""}`}
                      onClick={() => setField("preferredTime", o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step.kind === "custom" && step.id === "notifications" && (
              <>
                <h1 className="n-title n-display">Xatırlatma tərziniz</h1>
                <p className="n-sub">Hansı bildirişlər sizə xidmət etsin? Spam yox — söz veririk.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(
                    [
                      { key: "notifDaily", t: "Gündəlik brif", s: "Seçdiyiniz vaxtda günün planı" },
                      { key: "notifWeekly", t: "Həftəlik hesabat", s: "Skorunuz və irəliləyiş xülasəsi" },
                      { key: "notifCritical", t: "Kritik xatırlatmalar", s: "Peyvənd, müayinə, dövr proqnozu" },
                    ] as const
                  ).map((row) => {
                    const on = Boolean(answers[row.key]);
                    return (
                      <button
                        key={row.key}
                        type="button"
                        className="n-switch-row"
                        onClick={() => setField(row.key, !on)}
                        aria-pressed={on}
                      >
                        <span>
                          <p className="n-switch-title">{row.t}</p>
                          <p className="n-switch-sub">{row.s}</p>
                        </span>
                        <span className={`n-switch${on ? " on" : ""}`}>
                          <span className="n-switch-knob" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step.kind === "single" && (
              <>
                <h1 className="n-title n-display">{(step as SingleStep).title}</h1>
                {(step as SingleStep).sub && <p className="n-sub">{(step as SingleStep).sub}</p>}
                <div className="n-choices">
                  {(step as SingleStep).options.map((option) => {
                    const selected = answers[step.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={`n-choice${selected ? " selected" : ""}`}
                        onClick={() => {
                          setField(step.id, option.value);
                          autoNext();
                        }}
                      >
                        <span className="n-choice-icon" style={{ background: "var(--n-surface-2)" }}>
                          {option.emoji}
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <p className="n-choice-title">{option.label}</p>
                          {option.sub && <p className="n-choice-sub">{option.sub}</p>}
                        </span>
                        <span className="n-choice-tick">
                          <Check size={13} strokeWidth={3.2} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step.kind === "scale" && (
              <>
                <h1 className="n-title n-display">{(step as ScaleStep).title}</h1>
                {(step as ScaleStep).sub && <p className="n-sub">{(step as ScaleStep).sub}</p>}
                <div className="n-scale">
                  {(step as ScaleStep).emojis.map((emoji, i) => {
                    const value = i + 1;
                    const selected = answers[step.id] === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        className={`n-scale-dot${selected ? " on" : ""}`}
                        onClick={() => {
                          setField(step.id, value);
                          autoNext();
                        }}
                        aria-label={`${value}/5`}
                      >
                        {emoji}
                        <small>{value}</small>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="n-hint">{(step as ScaleStep).captions[0]}</p>
                  <p className="n-hint">{(step as ScaleStep).captions[1]}</p>
                </div>
              </>
            )}

            {step.kind === "multi" && (
              <>
                <h1 className="n-title n-display">
                  {step.id === "focus" ? "Növbəti 90 gündə nəyə fokuslanaq?" : (step as MultiStep).title}
                </h1>
                <p className="n-sub">
                  {step.id === "focus"
                    ? "Ən çox 4 sahə seçin — planınız bunların ətrafında qurulacaq."
                    : (step as MultiStep).sub}
                </p>
                <div className={(step as MultiStep).grid || step.id === "focus" ? "n-chips-grid" : "n-chips"}>
                  {(step.id === "focus" ? FOCUS_OPTIONS[goal] : (step as MultiStep).options).map((option) => {
                    const values = (answers[step.id] as string[] | undefined) ?? [];
                    const on = values.includes(option.value);
                    const noneValue = (step as MultiStep).noneValue;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={`n-chip${on ? " on" : ""}`}
                        aria-pressed={on}
                        onClick={() => {
                          let next: string[];
                          if (on) {
                            next = values.filter((v) => v !== option.value);
                          } else if (noneValue && option.value === noneValue) {
                            next = [noneValue];
                          } else {
                            next = [...values.filter((v) => v !== noneValue), option.value];
                            if (step.id === "focus" && next.length > 4) return;
                          }
                          setField(step.id, next);
                        }}
                      >
                        <span>{option.emoji}</span> {option.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {footer && <footer className="n-footer">{footer}</footer>}
    </>
  );
}
