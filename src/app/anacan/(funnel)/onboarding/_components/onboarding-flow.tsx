"use client";

import {
  Baby,
  Check,
  ChevronLeft,
  Crown,
  Heart,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveProfile, type Goal } from "../../../_lib/demo-auth";
import { TextField } from "../../_components/text-field";
import { Paywall } from "./paywall";
import { PlanLoading } from "./plan-loading";

/* ---------------- Types & data ---------------- */

type StepId =
  | "welcome"
  | "goal"
  | "name"
  | "detail"
  | "focus"
  | "proof"
  | "habit"
  | "reminders"
  | "building"
  | "reveal"
  | "paywall"
  | "success";

const ORDER: StepId[] = [
  "welcome",
  "goal",
  "name",
  "detail",
  "focus",
  "proof",
  "habit",
  "reminders",
  "building",
  "reveal",
  "paywall",
  "success",
];

const QUIZ: StepId[] = ["goal", "name", "detail", "focus", "proof", "habit", "reminders"];

interface Answers {
  goal: Goal | null;
  momName: string;
  pregMode: "due" | "lmp";
  dueDate: string;
  lmpDate: string;
  firstPregnancy: boolean | null;
  babyName: string;
  babyBirth: string;
  babyGender: "girl" | "boy" | null;
  lastPeriod: string;
  cycleLen: number;
  focus: string[];
  minutes: string;
  reminders: boolean | null;
}

const GOALS: { id: Goal; emoji: string; bg: string; title: string; sub: string }[] = [
  {
    id: "pregnant",
    emoji: "🤰",
    bg: "var(--a-grad-peach)",
    title: "Hamiləyəm",
    sub: "Həftə-həftə inkişaf, simptomlar və doğuş bələdçisi",
  },
  {
    id: "baby",
    emoji: "👶",
    bg: "var(--a-grad-pink)",
    title: "Körpəm var",
    sub: "Yuxu, qidalanma, inkişaf və peyvənd izləmə",
  },
  {
    id: "cycle",
    emoji: "🌸",
    bg: "var(--a-grad-lav)",
    title: "Siklimi izləyirəm",
    sub: "Dövr proqnozu, ovulyasiya və simptom analizi",
  },
];

const FOCUS: Record<Goal, { emoji: string; label: string }[]> = {
  pregnant: [
    { emoji: "🤢", label: "Ürəkbulanma və simptomlar" },
    { emoji: "🥗", label: "Qidalanma" },
    { emoji: "👶", label: "Körpənin inkişafı" },
    { emoji: "🧘", label: "Doğuşa hazırlıq" },
    { emoji: "😴", label: "Yuxu və rahatlıq" },
    { emoji: "💛", label: "Emosional dəstək" },
  ],
  baby: [
    { emoji: "😴", label: "Yuxu rejimi" },
    { emoji: "🍼", label: "Qidalanma və əlavə qida" },
    { emoji: "😭", label: "Ağlamanın səbəbləri" },
    { emoji: "🚼", label: "İnkişaf mərhələləri" },
    { emoji: "💉", label: "Peyvənd təqvimi" },
    { emoji: "💆‍♀️", label: "Ananın özünə qulluğu" },
  ],
  cycle: [
    { emoji: "📅", label: "Dövr proqnozu" },
    { emoji: "🌡️", label: "PMS və ağrılar" },
    { emoji: "🥚", label: "Ovulyasiya izləmə" },
    { emoji: "🤍", label: "Hamiləlik planlaması" },
    { emoji: "⚖️", label: "Hormonal balans" },
    { emoji: "⚡", label: "Əhval və enerji" },
  ],
};

const HABITS = [
  { id: "5", emoji: "☕", title: "Gündə 5 dəqiqə", sub: "Qısa, konkret tövsiyələr" },
  { id: "10", emoji: "🌿", title: "Gündə 10 dəqiqə", sub: "Balanslı gündəlik plan", popular: true },
  { id: "15", emoji: "📚", title: "15 dəqiqə və daha çox", sub: "Dərin məqalələr və tam izləmə" },
];

const INCLUDED: Record<Goal, string[]> = {
  pregnant: ["Həftəlik inkişaf bələdçisi", "Simptom izləyici və məsləhətlər", "Doğuşa hazırlıq siyahısı"],
  baby: ["Gündəlik yuxu və qida izləmə", "İnkişaf sıçrayışı təqvimi", "Peyvənd xatırlatmaları"],
  cycle: ["Dövr və ovulyasiya proqnozu", "Simptom nümunələrinin analizi", "Fərdi sağlamlıq içgörüləri"],
};

/* ---------------- Date helpers ---------------- */

const AZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISO(iso: string) {
  return new Date(`${iso}T00:00:00`);
}

function shiftDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

/** Days from today until the given ISO date (negative if in the past). */
function daysFromToday(iso: string) {
  return Math.round((parseISO(iso).getTime() - startOfToday().getTime()) / 86400000);
}

function fmtAz(d: Date) {
  return `${d.getDate()} ${AZ_MONTHS[d.getMonth()]}`;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function trimesterLabel(week: number) {
  if (week <= 13) return "1-ci";
  if (week <= 27) return "2-ci";
  return "3-cü";
}

/* ---------------- Component ---------------- */

export function OnboardingFlow() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<StepId>("welcome");
  const [answers, setAnswers] = useState<Answers>({
    goal: null,
    momName: "",
    pregMode: "due",
    dueDate: "",
    lmpDate: "",
    firstPregnancy: null,
    babyName: "",
    babyBirth: "",
    babyGender: null,
    lastPeriod: "",
    cycleLen: 28,
    focus: [],
    minutes: "",
    reminders: null,
  });
  const [premiumPlan, setPremiumPlan] = useState<"yearly" | "monthly" | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const goTo = (target: StepId) => setStep(target);
  const goNext = () => {
    const i = ORDER.indexOf(step);
    if (i < ORDER.length - 1) setStep(ORDER[i + 1]);
  };
  const goBack = () => {
    const i = ORDER.indexOf(step);
    if (i > 0) setStep(ORDER[i - 1]);
  };

  const autoAdvance = () => window.setTimeout(goNext, 380);

  /* ----- derived personalization ----- */

  const today = startOfToday();
  const name = answers.momName.trim();

  const pregDue =
    answers.pregMode === "due"
      ? answers.dueDate
      : answers.lmpDate
        ? toISO(shiftDays(parseISO(answers.lmpDate), 280))
        : "";
  const pregDaysLeft = pregDue ? daysFromToday(pregDue) : null;
  const pregWeek =
    pregDaysLeft !== null && pregDaysLeft >= 0 ? clamp(40 - Math.ceil(pregDaysLeft / 7), 1, 42) : null;

  const babyDaysOld = answers.babyBirth ? -daysFromToday(answers.babyBirth) : null;
  const babyMonths = babyDaysOld !== null && babyDaysOld >= 0 ? Math.floor(babyDaysOld / 30.4375) : null;

  const cycleNext = answers.lastPeriod
    ? shiftDays(parseISO(answers.lastPeriod), answers.cycleLen)
    : null;

  const detailValid = (() => {
    switch (answers.goal) {
      case "pregnant":
        return pregWeek !== null && answers.firstPregnancy !== null;
      case "baby":
        return answers.babyName.trim().length >= 2 && babyDaysOld !== null && babyDaysOld >= 0;
      case "cycle":
        return answers.lastPeriod !== "" && daysFromToday(answers.lastPeriod) <= 0;
      default:
        return false;
    }
  })();

  const persistAnswers = () => {
    saveProfile({
      momName: name,
      goal: answers.goal ?? undefined,
      dueDate: pregDue || undefined,
      lmpDate: answers.lmpDate || undefined,
      firstPregnancy: answers.firstPregnancy ?? undefined,
      babyName: answers.babyName.trim() || undefined,
      babyBirth: answers.babyBirth || undefined,
      babyGender: answers.babyGender ?? undefined,
      lastPeriod: answers.lastPeriod || undefined,
      cycleLen: answers.goal === "cycle" ? answers.cycleLen : undefined,
      focus: answers.focus,
      minutes: answers.minutes || undefined,
      reminders: answers.reminders ?? undefined,
    });
  };

  /* ----- terminal steps render their own chrome ----- */

  if (step === "paywall") {
    return (
      <Paywall
        momName={name || undefined}
        onSubscribe={(plan) => {
          setPremiumPlan(plan);
          saveProfile({
            premium: true,
            premiumPlan: plan,
            trialStartedAt: new Date().toISOString(),
            onboarded: true,
          });
          goTo("success");
        }}
        onSkip={() => {
          setPremiumPlan(null);
          saveProfile({ premium: false, premiumPlan: null, onboarded: true });
          goTo("success");
        }}
      />
    );
  }

  if (step === "success") {
    const trialEnd = fmtAz(shiftDays(today, 7));
    return (
      <>
        <div className="f-scroll" ref={scrollRef}>
          <div className="f-success-hero">
            <div className="f-confetti" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <span className="f-success-icon">
              <Check size={42} strokeWidth={3} />
            </span>
            <h1 className="f-title a-heading">
              {premiumPlan ? (
                <>
                  Premium aktivdir{name ? `, ${name}` : ""}! <span aria-hidden>👑</span>
                </>
              ) : (
                <>Hər şey hazırdır{name ? `, ${name}` : ""}!</>
              )}
            </h1>
            <p className="f-sub" style={{ marginBottom: 0 }}>
              {premiumPlan
                ? `7 günlük pulsuz sınağınız başladı — ${trialEnd} tarixinə qədər tam giriş sizindir.`
                : "Planınız hazırdır. Premium-u istənilən vaxt profil bölməsindən aktivləşdirə bilərsiniz."}
            </p>
          </div>

          <div className="f-shell" style={{ paddingTop: 22 }}>
            <div className="f-tasks">
              <div className="f-task done">
                <span className="f-task-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                Profiliniz quruldu
              </div>
              <div className="f-task done" style={{ animationDelay: "120ms" }}>
                <span className="f-task-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                Planınız fərdiləşdirildi
              </div>
              <div className="f-task done" style={{ animationDelay: "240ms" }}>
                <span className="f-task-dot">
                  <Check size={13} strokeWidth={3.2} />
                </span>
                {premiumPlan ? "Premium sınaq aktiv edildi" : "Pulsuz plan aktiv edildi"}
              </div>
            </div>
          </div>
        </div>

        <footer className="f-footer">
          <button type="button" className="f-btn f-btn-primary" onClick={() => router.replace("/anacan")}>
            Anacan-a keç
          </button>
        </footer>
      </>
    );
  }

  if (step === "building") {
    return (
      <div className="f-scroll" ref={scrollRef}>
        <div className="f-shell">
          <PlanLoading name={name || undefined} onDone={() => goTo("reveal")} />
        </div>
      </div>
    );
  }

  /* ----- shared chrome: topbar + scroll + footer ----- */

  const quizIndex = QUIZ.indexOf(step);
  const progress = quizIndex >= 0 ? ((quizIndex + 1) / QUIZ.length) * 100 : null;

  const footer = (() => {
    switch (step) {
      case "welcome":
        return (
          <>
            <button type="button" className="f-btn f-btn-primary" onClick={goNext}>
              Başlayaq
            </button>
            <p className="f-footer-note">Təxminən 2 dəqiqə · 7 qısa sual</p>
          </>
        );
      case "name":
        return (
          <button type="button" className="f-btn f-btn-primary" disabled={name.length < 2} onClick={goNext}>
            Davam et
          </button>
        );
      case "detail":
        return (
          <button type="button" className="f-btn f-btn-primary" disabled={!detailValid} onClick={goNext}>
            Davam et
          </button>
        );
      case "focus":
        return (
          <button
            type="button"
            className="f-btn f-btn-primary"
            disabled={answers.focus.length === 0}
            onClick={goNext}
          >
            Davam et{answers.focus.length > 0 ? ` (${answers.focus.length})` : ""}
          </button>
        );
      case "proof":
        return (
          <button type="button" className="f-btn f-btn-primary" onClick={goNext}>
            Davam et
          </button>
        );
      case "reminders":
        return (
          <>
            <button
              type="button"
              className="f-btn f-btn-primary"
              onClick={() => {
                set("reminders", true);
                persistAnswers();
                saveProfile({ reminders: true });
                goNext();
              }}
            >
              Bildirişləri aç 🔔
            </button>
            <button
              type="button"
              className="f-btn f-btn-quiet"
              onClick={() => {
                set("reminders", false);
                persistAnswers();
                saveProfile({ reminders: false });
                goNext();
              }}
            >
              İndi yox
            </button>
          </>
        );
      case "reveal":
        return (
          <>
            <button type="button" className="f-btn f-btn-premium" onClick={() => goTo("paywall")}>
              <Crown size={17} strokeWidth={2.2} /> Planı aç
            </button>
            <p className="f-footer-note">Plan Premium üzvlüklə tam açılır — ilk 7 gün pulsuz</p>
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <>
      <div className="f-topbar">
        {step === "welcome" ? (
          <span className="f-topbar-spacer" />
        ) : (
          <button type="button" className="f-back" onClick={goBack} aria-label="Əvvəlki addım">
            <ChevronLeft size={19} strokeWidth={2.2} />
          </button>
        )}
        {progress !== null ? (
          <div className="f-progress" role="progressbar" aria-valuenow={Math.round(progress)}>
            <span className="f-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        ) : (
          <span style={{ flex: 1 }} />
        )}
        <span className="f-topbar-spacer" />
      </div>

      <div className="f-scroll" ref={scrollRef}>
        <div className="f-shell" style={{ paddingBottom: 24 }}>
          {step === "welcome" && (
            <div className="f-step" key="welcome">
              <p className="f-kicker">
                <Sparkles size={12} strokeWidth={2.4} /> Sizə özəl plan
              </p>
              <h1 className="f-title a-heading">
                Gəlin sizi <em>yaxından</em> tanıyaq
              </h1>
              <p className="f-sub">
                Bir neçə qısa sual verəcəyik — cavablarınıza əsasən Anacan sizin üçün fərdi plan quracaq.
              </p>
              <div className="f-tasks">
                {[
                  { emoji: "🎯", text: "Məqsədinizə uyğun gündəlik məzmun" },
                  { emoji: "🧠", text: "Elmi əsaslı, həkim təsdiqli tövsiyələr" },
                  { emoji: "🇦🇿", text: "Tam Azərbaycan dilində" },
                ].map((row, i) => (
                  <div key={row.text} className={`f-task done f-d${i + 1}`}>
                    <span style={{ fontSize: 18 }}>{row.emoji}</span>
                    {row.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "goal" && (
            <div className="f-step" key="goal">
              <h1 className="f-title a-heading">Hazırda hansı mərhələdəsiniz?</h1>
              <p className="f-sub">Anacan təcrübəniz tamamilə buna əsasən qurulacaq.</p>
              <div className="f-choices">
                {GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    className={`f-choice${answers.goal === goal.id ? " selected" : ""}`}
                    onClick={() => {
                      set("goal", goal.id);
                      set("focus", []);
                      autoAdvance();
                    }}
                  >
                    <span className="f-choice-icon" style={{ background: goal.bg }}>
                      {goal.emoji}
                    </span>
                    <span className="f-choice-body">
                      <p className="f-choice-title">{goal.title}</p>
                      <p className="f-choice-sub">{goal.sub}</p>
                    </span>
                    <span className="f-choice-tick">
                      <Check size={13} strokeWidth={3.2} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "name" && (
            <div className="f-step" key="name">
              <h1 className="f-title a-heading">Sizə necə müraciət edək?</h1>
              <p className="f-sub">Adınız yalnız təcrübəni fərdiləşdirmək üçün istifadə olunur.</p>
              <TextField
                id="mom-name"
                label="Adınız"
                value={answers.momName}
                onChange={(v) => set("momName", v)}
                placeholder="Məsələn: Türkan"
                icon={<User size={17} strokeWidth={2} />}
                autoComplete="given-name"
                autoFocus
              />
              {name.length >= 2 && (
                <div className="f-insight">
                  <Heart size={15} strokeWidth={2.2} />
                  <span>Çox gözəl, {name}! Sizinlə tanış olmaq xoşdur 💛</span>
                </div>
              )}
            </div>
          )}

          {step === "detail" && answers.goal === "pregnant" && (
            <div className="f-step" key="detail-pregnant">
              <h1 className="f-title a-heading">Hamiləliyiniz haqqında</h1>
              <p className="f-sub">Həftəlik bələdçini düzgün həftədən başlatmaq üçün lazımdır.</p>

              <div className="f-chips" style={{ marginBottom: 18 }}>
                <button
                  type="button"
                  className={`f-chip${answers.pregMode === "due" ? " on" : ""}`}
                  onClick={() => set("pregMode", "due")}
                >
                  Doğuş tarixini bilirəm
                </button>
                <button
                  type="button"
                  className={`f-chip${answers.pregMode === "lmp" ? " on" : ""}`}
                  onClick={() => set("pregMode", "lmp")}
                >
                  Son menstruasiya tarixi
                </button>
              </div>

              {answers.pregMode === "due" ? (
                <TextField
                  id="due-date"
                  label="Təxmini doğuş tarixi"
                  type="date"
                  value={answers.dueDate}
                  onChange={(v) => set("dueDate", v)}
                  min={toISO(today)}
                  max={toISO(shiftDays(today, 280))}
                />
              ) : (
                <TextField
                  id="lmp-date"
                  label="Son menstruasiyanın ilk günü"
                  type="date"
                  value={answers.lmpDate}
                  onChange={(v) => set("lmpDate", v)}
                  min={toISO(shiftDays(today, -300))}
                  max={toISO(today)}
                  hint="Doğuş tarixini bunun əsasında hesablayacağıq"
                />
              )}

              {pregWeek !== null && (
                <div className="f-insight">
                  <Sparkles size={15} strokeWidth={2.2} />
                  <span>
                    Təbriklər! Təxminən <strong>{pregWeek}-ci həftədəsiniz</strong> —{" "}
                    {trimesterLabel(pregWeek)} trimestr.
                    {answers.pregMode === "lmp" && pregDue
                      ? ` Təxmini doğuş: ${fmtAz(parseISO(pregDue))}.`
                      : ""}
                  </span>
                </div>
              )}

              <p className="f-label" style={{ marginTop: 20 }}>
                Bu ilk hamiləliyinizdir?
              </p>
              <div className="f-chips">
                <button
                  type="button"
                  className={`f-chip${answers.firstPregnancy === true ? " on" : ""}`}
                  onClick={() => set("firstPregnancy", true)}
                >
                  ✨ Bəli, ilk dəfə
                </button>
                <button
                  type="button"
                  className={`f-chip${answers.firstPregnancy === false ? " on" : ""}`}
                  onClick={() => set("firstPregnancy", false)}
                >
                  💪 Xeyr, təcrübəm var
                </button>
              </div>
            </div>
          )}

          {step === "detail" && answers.goal === "baby" && (
            <div className="f-step" key="detail-baby">
              <h1 className="f-title a-heading">Körpəniz haqqında</h1>
              <p className="f-sub">İnkişaf planını körpənizin yaşına görə quracağıq.</p>

              <TextField
                id="baby-name"
                label="Körpənin adı"
                value={answers.babyName}
                onChange={(v) => set("babyName", v)}
                placeholder="Məsələn: Atlas"
                icon={<Baby size={17} strokeWidth={2} />}
              />
              <TextField
                id="baby-birth"
                label="Doğum tarixi"
                type="date"
                value={answers.babyBirth}
                onChange={(v) => set("babyBirth", v)}
                min={toISO(shiftDays(today, -365 * 5))}
                max={toISO(today)}
              />

              <p className="f-label" style={{ marginTop: 6 }}>
                Cinsi <small>· istəyə bağlı</small>
              </p>
              <div className="f-chips">
                <button
                  type="button"
                  className={`f-chip${answers.babyGender === "girl" ? " on" : ""}`}
                  onClick={() => set("babyGender", answers.babyGender === "girl" ? null : "girl")}
                >
                  🎀 Qız
                </button>
                <button
                  type="button"
                  className={`f-chip${answers.babyGender === "boy" ? " on" : ""}`}
                  onClick={() => set("babyGender", answers.babyGender === "boy" ? null : "boy")}
                >
                  🧸 Oğlan
                </button>
              </div>

              {answers.babyName.trim().length >= 2 && babyDaysOld !== null && babyDaysOld >= 0 && (
                <div className="f-insight">
                  <Heart size={15} strokeWidth={2.2} />
                  <span>
                    <strong>{answers.babyName.trim()}</strong> artıq <strong>{babyDaysOld} gündür</strong>{" "}
                    sizinlədir {babyMonths !== null && babyMonths >= 1 ? `(${babyMonths} aylıq)` : ""} 🎉
                  </span>
                </div>
              )}
            </div>
          )}

          {step === "detail" && answers.goal === "cycle" && (
            <div className="f-step" key="detail-cycle">
              <h1 className="f-title a-heading">Sikliniz haqqında</h1>
              <p className="f-sub">Proqnozları ilk gündən dəqiq qurmaq üçün lazımdır.</p>

              <TextField
                id="last-period"
                label="Son dövrün ilk günü"
                type="date"
                value={answers.lastPeriod}
                onChange={(v) => set("lastPeriod", v)}
                min={toISO(shiftDays(today, -90))}
                max={toISO(today)}
              />

              <p className="f-label" style={{ marginTop: 6 }}>
                Adətən sikliniz neçə gündür?
              </p>
              <div className="f-stepper">
                <button
                  type="button"
                  className="f-stepper-btn"
                  onClick={() => set("cycleLen", Math.max(21, answers.cycleLen - 1))}
                  disabled={answers.cycleLen <= 21}
                  aria-label="Azalt"
                >
                  −
                </button>
                <div className="f-stepper-value">
                  <p className="f-stepper-num">{answers.cycleLen}</p>
                  <p className="f-stepper-unit">gün</p>
                </div>
                <button
                  type="button"
                  className="f-stepper-btn"
                  onClick={() => set("cycleLen", Math.min(35, answers.cycleLen + 1))}
                  disabled={answers.cycleLen >= 35}
                  aria-label="Artır"
                >
                  +
                </button>
              </div>
              <p className="f-hint">Əmin deyilsinizsə, 28 saxlayın — zamanla dəqiqləşdirəcəyik.</p>

              {cycleNext && (
                <div className="f-insight">
                  <Sparkles size={15} strokeWidth={2.2} />
                  <span>
                    Növbəti dövrünüz təxminən <strong>{fmtAz(cycleNext)}</strong> tarixində gözlənilir 📅
                  </span>
                </div>
              )}
            </div>
          )}

          {step === "focus" && answers.goal && (
            <div className="f-step" key="focus">
              <h1 className="f-title a-heading">Sizi ən çox nə maraqlandırır?</h1>
              <p className="f-sub">Bir neçəsini seçin — planınıza daxil edəcəyik.</p>
              <div className="f-chips-grid">
                {FOCUS[answers.goal].map((item) => {
                  const on = answers.focus.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={`f-chip${on ? " on" : ""}`}
                      onClick={() =>
                        set(
                          "focus",
                          on ? answers.focus.filter((f) => f !== item.label) : [...answers.focus, item.label]
                        )
                      }
                      aria-pressed={on}
                    >
                      <span>{item.emoji}</span> {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "proof" && (
            <div className="f-step" key="proof">
              <div className="f-stat-hero">
                <p className="f-stat-num a-heading">93%</p>
                <p className="f-stat-text">
                  Anacan istifadəçilərinin <strong>93%-i</strong> ilk həftədə özünü{" "}
                  <strong>daha inamlı</strong> hiss etdiyini deyir
                </p>
              </div>

              <div className="f-quote f-rise f-d1">
                <span className="f-quote-avatar" style={{ background: "var(--a-grad-pink)" }}>
                  👩
                </span>
                <div className="f-quote-body">
                  <div className="f-quote-stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="f-quote-text">
                    “Gecə saat 3-də körpəmin niyə ağladığını Anacan-dan öyrəndim. Sanki yanımda təcrübəli bir
                    ana var.”
                  </p>
                  <p className="f-quote-name">Aysel · 6 aylıq körpənin anası</p>
                </div>
              </div>

              <div className="f-quote f-rise f-d2">
                <span className="f-quote-avatar" style={{ background: "var(--a-grad-lav)" }}>
                  🧕
                </span>
                <div className="f-quote-body">
                  <div className="f-quote-stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="f-quote-text">
                    “Dövr proqnozları inanılmaz dəqiqdir. Bədənimi ilk dəfə bu qədər yaxşı tanıyıram.”
                  </p>
                  <p className="f-quote-name">Nigar · 2 ildir Anacan istifadəçisi</p>
                </div>
              </div>
            </div>
          )}

          {step === "habit" && (
            <div className="f-step" key="habit">
              <h1 className="f-title a-heading">Gündə nə qədər vaxt ayıra bilərsiniz?</h1>
              <p className="f-sub">Gündəlik planınızın həcmini buna uyğunlaşdıracağıq.</p>
              <div className="f-choices">
                {HABITS.map((habit) => (
                  <button
                    key={habit.id}
                    type="button"
                    className={`f-choice${answers.minutes === habit.id ? " selected" : ""}`}
                    onClick={() => {
                      set("minutes", habit.id);
                      autoAdvance();
                    }}
                  >
                    <span className="f-choice-icon" style={{ background: "var(--a-surface-soft)" }}>
                      {habit.emoji}
                    </span>
                    <span className="f-choice-body">
                      <p className="f-choice-title">
                        {habit.title}
                        {habit.popular && (
                          <span
                            style={{
                              marginLeft: 8,
                              padding: "3px 8px",
                              borderRadius: 999,
                              background: "var(--a-grad-cta)",
                              fontSize: 9.5,
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              color: "#7c2d46",
                              verticalAlign: "middle",
                            }}
                          >
                            Ən populyar
                          </span>
                        )}
                      </p>
                      <p className="f-choice-sub">{habit.sub}</p>
                    </span>
                    <span className="f-choice-tick">
                      <Check size={13} strokeWidth={3.2} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "reminders" && (
            <div className="f-step" key="reminders">
              <h1 className="f-title a-heading">Heç nəyi qaçırmayın</h1>
              <p className="f-sub">
                Vaxtında, lazımlı qədər — peyvənd, dövr və inkişaf xatırlatmaları. Spam yox, söz veririk.
              </p>

              <div
                className="f-rise f-d1"
                style={{
                  padding: "15px 16px",
                  borderRadius: "var(--a-radius-md)",
                  background: "var(--a-surface)",
                  border: "1px solid var(--a-line)",
                  boxShadow: "0 14px 30px rgba(var(--a-shadow), 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span
                    className="f-logo"
                    style={{ width: 22, height: 22, borderRadius: 7, boxShadow: "none" }}
                  >
                    <Heart size={11} strokeWidth={2.6} fill="currentColor" />
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.04em" }}>ANACAN</span>
                  <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--a-ink-soft)", fontWeight: 600 }}>
                    indi
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, fontWeight: 600 }}>
                  {answers.goal === "pregnant" &&
                    `🤰 ${pregWeek ?? 24}-cü həftə başladı — körpəniz bu həftə nə öyrənir?`}
                  {answers.goal === "baby" &&
                    `💉 Sabah: ${answers.babyName.trim() || "körpəniz"} üçün peyvənd görüşü — unutmayın!`}
                  {answers.goal === "cycle" && "🌸 Dövrünüzə 2 gün qaldı — özünüzə qulluq vaxtıdır."}
                  {!answers.goal && "💛 Bu gün üçün planınız hazırdır."}
                </p>
              </div>

              <p className="f-hint" style={{ textAlign: "center", marginTop: 14 }}>
                İstənilən vaxt parametrlərdən dəyişə bilərsiniz
              </p>
            </div>
          )}

          {step === "reveal" && (
            <div className="f-step" key="reveal">
              <p className="f-kicker">
                <Sparkles size={12} strokeWidth={2.4} /> Planınız hazırdır
              </p>
              <h1 className="f-title a-heading">
                {name ? `${name}, sizə` : "Sizə"} özəl plan hazırdır <span aria-hidden>🎉</span>
              </h1>
              <p className="f-sub">Cavablarınız əsasında qurulub — hər gün sizinlə birlikdə dəyişəcək.</p>

              <div className="f-plan-card f-rise">
                <span className="f-plan-card-shape" style={{ width: 150, height: 150, top: -60, right: -40 }} />
                <span className="f-plan-card-shape" style={{ width: 100, height: 100, bottom: -40, left: -30 }} />
                <p className="f-plan-head">Anacan planı</p>
                <h2 className="f-plan-title a-heading">
                  {answers.goal === "pregnant" &&
                    `Həftə ${pregWeek ?? "—"}: ${trimesterLabel(pregWeek ?? 1)} trimestr bələdçiniz`}
                  {answers.goal === "baby" &&
                    `${answers.babyName.trim() || "Körpəniz"} üçün inkişaf planı`}
                  {answers.goal === "cycle" && `${answers.cycleLen} günlük siklinizə uyğun plan`}
                </h2>

                <div className="f-plan-stats">
                  {answers.goal === "pregnant" && (
                    <>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{pregWeek ?? "—"}</p>
                        <p className="f-plan-stat-label">həftə</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{pregDaysLeft ?? "—"}</p>
                        <p className="f-plan-stat-label">gün qalıb</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{trimesterLabel(pregWeek ?? 1)}</p>
                        <p className="f-plan-stat-label">trimestr</p>
                      </div>
                    </>
                  )}
                  {answers.goal === "baby" && (
                    <>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{babyMonths ?? 0} ay</p>
                        <p className="f-plan-stat-label">yaş</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{babyDaysOld ?? 0}</p>
                        <p className="f-plan-stat-label">gün birlikdə</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{answers.focus.length}</p>
                        <p className="f-plan-stat-label">fokus sahə</p>
                      </div>
                    </>
                  )}
                  {answers.goal === "cycle" && (
                    <>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{answers.cycleLen}</p>
                        <p className="f-plan-stat-label">günlük sikl</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{cycleNext ? fmtAz(cycleNext) : "—"}</p>
                        <p className="f-plan-stat-label">növbəti dövr</p>
                      </div>
                      <div className="f-plan-stat">
                        <p className="f-plan-stat-value">{answers.focus.length}</p>
                        <p className="f-plan-stat-label">fokus sahə</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="f-focus-tags">
                  {answers.focus.map((label) => {
                    const item = answers.goal ? FOCUS[answers.goal].find((f) => f.label === label) : null;
                    return (
                      <span key={label} className="f-focus-tag">
                        {item?.emoji} {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {answers.goal && (
                <div className="f-features f-rise f-d2">
                  {INCLUDED[answers.goal].map((row) => (
                    <div key={row} className="f-feat">
                      <span className="f-feat-icon">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {row}
                    </div>
                  ))}
                  <div className="f-feat muted">
                    <span className="f-feat-icon">
                      <Crown size={13} strokeWidth={2.4} />
                    </span>
                    Anacan.AI limitsiz + bütün premium alətlər
                    <span className="f-feat-note">Premium</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {footer && <footer className="f-footer">{footer}</footer>}
    </>
  );
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.94 6.26L21.5 9.27l-4.75 4.35L17.88 20 12 16.77 6.12 20l1.13-6.38L2.5 9.27l6.56-1.01L12 2z" />
    </svg>
  );
}
