"use client";

import { ChevronRight, Crown, Flame } from "lucide-react";
import { useState } from "react";
import {
  babyStatus,
  cycleStatus,
  fmtAz,
  fmtAzFull,
  getLogs,
  greetingByHour,
  pregnancyStatus,
  scoreLabel,
  shiftDays,
  startOfToday,
  toISO,
  AZ_DAYS_SHORT,
  type DayLog,
  type NoirProfile,
} from "../../_lib/noir-store";
import {
  ARTICLES,
  GOAL_META,
  INSIGHTS,
  MILESTONES,
  TASKS,
  VACCINES,
  babySizeForWeek,
  weekNotes,
  type Article,
} from "../../_lib/noir-content";
import { ScoreRing } from "../score-ring";

const SUB_META: { key: "sleep" | "mood" | "nutrition" | "activity"; label: string; color: string }[] = [
  { key: "sleep", label: "Yuxu", color: "var(--n-violet)" },
  { key: "mood", label: "Əhval", color: "var(--n-rose)" },
  { key: "nutrition", label: "Qidalanma", color: "var(--n-teal)" },
  { key: "activity", label: "Aktivlik", color: "var(--n-gold)" },
];

export function TodayTab({
  profile,
  log,
  streak,
  onToggleTask,
  onUpdateLog,
  onOpenArticle,
  onGoProfile,
}: {
  profile: NoirProfile;
  log: DayLog;
  streak: number;
  onToggleTask: (id: string) => void;
  onUpdateLog: (patch: Partial<DayLog>) => void;
  onOpenArticle: (a: Article) => void;
  onGoProfile: () => void;
}) {
  const [scoreOpen, setScoreOpen] = useState(false);
  const [metric, setMetric] = useState<"water" | "tasks">("water");

  const now = new Date();
  const today = startOfToday();
  const goal = profile.goal ?? "cycle";
  const meta = GOAL_META[goal];
  const preg = goal === "pregnant" ? pregnancyStatus(profile) : null;
  const baby = goal === "baby" ? babyStatus(profile) : null;
  const cyc = goal === "cycle" || goal === "ttc" ? cycleStatus(profile) : null;

  const tasks = TASKS[goal];
  const doneCount = tasks.filter((t) => log.tasks[t.id]).length;
  const taskPct = Math.round((doneCount / tasks.length) * 100);

  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const insight = INSIGHTS[goal][dayOfYear % INSIGHTS[goal].length];
  const relatedArticle = ARTICLES.find((a) => a.goals.includes(goal));

  /* weekly chart from stored logs */
  const logs = getLogs();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = shiftDays(today, i - 6);
    const iso = toISO(d);
    const dayLog = logs[iso];
    const value =
      metric === "water"
        ? (dayLog?.water ?? 0)
        : Object.values(dayLog?.tasks ?? {}).filter(Boolean).length;
    const max = metric === "water" ? 8 : tasks.length;
    return { label: AZ_DAYS_SHORT[d.getDay()], pct: Math.min(100, Math.round((value / max) * 100)), isToday: i === 6 };
  });

  /* reminders */
  const reminders: { emoji: string; bg: string; title: string; sub: string; when: string }[] = [];
  if (goal === "pregnant" && preg) {
    const checkWeeks = [12, 20, 28, 32, 36, 38, 40];
    const nextCheck = checkWeeks.find((w) => w > preg.week);
    if (nextCheck) {
      const date = shiftDays(preg.dueDate, -(40 - nextCheck) * 7);
      reminders.push({
        emoji: "🩺",
        bg: "var(--n-grad-teal)",
        title: `${nextCheck}-ci həftə müayinəsi`,
        sub: nextCheck === 20 ? "Anatomik USM pəncərəsi" : "Planlı həkim görüşü",
        when: fmtAz(date),
      });
    }
    if (preg.week >= 30) {
      reminders.push({
        emoji: "🧳",
        bg: "var(--n-grad-rose)",
        title: "Doğuş çantasını tamamla",
        sub: "36-cı həftəyə qədər hazır olsun",
        when: `${Math.max(36 - preg.week, 0)} həftə`,
      });
    }
  }
  if (goal === "baby" && baby) {
    const nextVaccine = VACCINES.find((v) => v.month * 30.4375 > baby.daysOld);
    if (nextVaccine && profile.babyBirth) {
      const date = shiftDays(new Date(`${profile.babyBirth}T00:00:00`), Math.round(nextVaccine.month * 30.4375));
      reminders.push({
        emoji: "💉",
        bg: "var(--n-grad-violet)",
        title: nextVaccine.name,
        sub: nextVaccine.detail,
        when: fmtAz(date),
      });
    }
    const nextMilestone = MILESTONES.find((m) => m.month > baby.months);
    if (nextMilestone) {
      reminders.push({
        emoji: "🏆",
        bg: "var(--n-grad-rose)",
        title: nextMilestone.title,
        sub: nextMilestone.detail,
        when: `~${nextMilestone.month} ay`,
      });
    }
  }
  if (cyc) {
    if (goal === "cycle") {
      reminders.push({
        emoji: "🌸",
        bg: "var(--n-grad-rose)",
        title: "Növbəti dövr",
        sub: `${profile.cycleLen ?? 28} günlük sikl proqnozu`,
        when: fmtAz(cyc.nextPeriod),
      });
    }
    reminders.push({
      emoji: "✨",
      bg: "var(--n-grad-blue)",
      title: goal === "ttc" ? "Fertil pəncərə" : "Ovulyasiya proqnozu",
      sub: goal === "ttc" ? `${fmtAz(cyc.fertileStart)} – ${fmtAz(cyc.fertileEnd)}` : "Təxmini tarix",
      when: fmtAz(cyc.ovulation),
    });
  }

  const score = profile.score;

  return (
    <>
      {/* header */}
      <header className="n-home-top">
        <div style={{ minWidth: 0 }}>
          <p className="n-home-greet">{greetingByHour(now.getHours())}</p>
          <h1 className="n-home-name n-display">{profile.name ?? "Ana"} ✦</h1>
          <p className="n-home-date">{fmtAzFull(today)}</p>
        </div>
        <span className="n-streak" title="Ardıcıl aktiv günlər">
          <Flame size={13} strokeWidth={2.4} />
          {streak} gün
        </span>
      </header>

      {/* goal hero */}
      <section className="n-hero n-rise-in" style={{ marginTop: 12 }}>
        <span className="n-hero-glow" style={{ background: "rgba(217,184,120,0.45)", top: -90, right: -70 }} />
        <p className="n-hero-eyebrow">
          {meta.emoji} {meta.label} rejimi
        </p>

        {goal === "pregnant" && preg && (
          <>
            <h2 className="n-hero-title n-display">
              {preg.week}-ci həftə — körpəniz {babySizeForWeek(preg.week).fruit} boyda{" "}
              {babySizeForWeek(preg.week).emoji}
            </h2>
            <p className="n-hero-sub">
              {babySizeForWeek(preg.week).length} · {babySizeForWeek(preg.week).weight} ·{" "}
              {weekNotes(preg.week)[0]}
            </p>
            <div className="n-hero-grid">
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{preg.week}/40</p>
                <p className="n-hero-cell-label">həftə</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{preg.daysLeft}</p>
                <p className="n-hero-cell-label">gün qalıb</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{preg.trimester}</p>
                <p className="n-hero-cell-label">trimestr</p>
              </div>
            </div>
          </>
        )}

        {goal === "baby" && baby && (
          <>
            <h2 className="n-hero-title n-display">
              {profile.babyName ?? "Körpəniz"} — {baby.ageText}
            </h2>
            <p className="n-hero-sub">
              {MILESTONES.filter((m) => m.month <= baby.months).slice(-1)[0]?.title ??
                "İlk günlər — tanışlıq dövrü"}
            </p>
            <div className="n-hero-grid">
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{baby.months} ay</p>
                <p className="n-hero-cell-label">yaş</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{baby.daysOld}</p>
                <p className="n-hero-cell-label">gün birlikdə</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">
                  {VACCINES.filter((v) => v.month * 30.4375 <= baby.daysOld).length}/{VACCINES.length}
                </p>
                <p className="n-hero-cell-label">peyvənd</p>
              </div>
            </div>
          </>
        )}

        {(goal === "cycle" || goal === "ttc") && cyc && (
          <>
            <h2 className="n-hero-title n-display">
              {cyc.day}-ci gün · {cyc.phase} {cyc.phaseEmoji}
            </h2>
            <p className="n-hero-sub">{cyc.phaseText}</p>
            <div className="n-hero-grid">
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{cyc.daysToNext}</p>
                <p className="n-hero-cell-label">gün dövrə</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{fmtAz(cyc.ovulation)}</p>
                <p className="n-hero-cell-label">ovulyasiya</p>
              </div>
              <div className="n-hero-cell">
                <p className="n-hero-cell-value">{profile.cycleLen ?? 28}</p>
                <p className="n-hero-cell-label">günlük sikl</p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* score */}
      {score && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Anacan Skoru</h2>
            <button type="button" className="n-section-link" onClick={() => setScoreOpen((v) => !v)}>
              {scoreOpen ? "Bağla" : "Təfərrüat"} <ChevronRight size={13} style={{ transform: scoreOpen ? "rotate(90deg)" : "none", transition: "transform 200ms" }} />
            </button>
          </div>
          <div className="n-card n-rise-in n-d1" style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <ScoreRing value={score.total} size={92} stroke={8}>
              <p className="n-ring-value n-display" style={{ fontSize: 24 }}>
                {score.total}
              </p>
            </ScoreRing>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>{scoreLabel(score.total)} səviyyə</p>
              <p style={{ margin: "4px 0 0", fontSize: 11.5, lineHeight: 1.55, color: "var(--n-soft)", fontWeight: 500 }}>
                Qiymətləndirmə cavablarınızdan hesablanıb — gündəlik qeydlər onu canlı saxlayır.
              </p>
            </div>
          </div>
          {scoreOpen && (
            <div className="n-card n-rise-in" style={{ marginTop: 10 }}>
              <div className="n-subscores">
                {SUB_META.map((s) => (
                  <div key={s.key}>
                    <div className="n-subscore-head">
                      <p className="n-subscore-name">{s.label}</p>
                      <p className="n-subscore-val">{score[s.key]}/100</p>
                    </div>
                    <div className="n-bar">
                      <span style={{ width: `${score[s.key]}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* daily plan */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Bu günün planı</h2>
        <span className="n-section-link" style={{ pointerEvents: "none" }}>
          {doneCount}/{tasks.length}
        </span>
      </div>
      <div className="n-card n-rise-in n-d2" style={{ paddingTop: 6, paddingBottom: 6 }}>
        {tasks.map((task) => {
          const done = Boolean(log.tasks[task.id]);
          return (
            <button
              key={task.id}
              type="button"
              className={`n-task-row${done ? " done" : ""}`}
              onClick={() => onToggleTask(task.id)}
              aria-pressed={done}
            >
              <span className="n-task-check">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span style={{ minWidth: 0 }}>
                <p className="n-task-label">{task.label}</p>
                <p className="n-task-tag">{task.tag}</p>
              </span>
              {task.id === tasks[0].id && (
                <span className="n-task-ring">
                  <ScoreRing value={taskPct} size={40} stroke={4.5}>
                    <span style={{ fontSize: 9, fontWeight: 800 }}>{taskPct}%</span>
                  </ScoreRing>
                </span>
              )}
            </button>
          );
        })}
        {doneCount === tasks.length && (
          <div className="n-insight" style={{ marginBottom: 12 }}>
            <Flame size={15} strokeWidth={2.2} />
            <span>Bugünkü plan tamamlandı — seriya davam edir! 🔥</span>
          </div>
        )}
      </div>

      {/* quick log summary */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Sürətli qeyd</h2>
      </div>
      <div className="n-log-grid n-rise-in n-d3">
        <div className="n-log-cell">
          <p className="n-log-head">💧 Su</p>
          <p className="n-log-value">
            {log.water}
            <small> / 8</small>
          </p>
          <div className="n-log-btns">
            <button
              type="button"
              className="n-log-btn"
              disabled={log.water <= 0}
              onClick={() => onUpdateLog({ water: Math.max(0, log.water - 1) })}
              aria-label="Su azalt"
            >
              −
            </button>
            <button
              type="button"
              className="n-log-btn"
              disabled={log.water >= 15}
              onClick={() => onUpdateLog({ water: Math.min(15, log.water + 1) })}
              aria-label="Su artır"
            >
              +
            </button>
          </div>
        </div>
        <div className="n-log-cell">
          <p className="n-log-head">🌤️ Əhval</p>
          <div className="n-mood-row" style={{ marginTop: 2 }}>
            {["😫", "😕", "😐", "🙂", "😄"].map((emoji, i) => (
              <button
                key={emoji}
                type="button"
                className={`n-mood${log.mood === i + 1 ? " on" : ""}`}
                style={{ height: 36, fontSize: 16 }}
                onClick={() => onUpdateLog({ mood: i + 1 })}
                aria-label={`Əhval ${i + 1}/5`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* weekly chart */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Həftəlik icmal</h2>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className={`n-chip${metric === "water" ? " on" : ""}`}
            style={{ padding: "6px 12px", fontSize: 10.5 }}
            onClick={() => setMetric("water")}
          >
            Su
          </button>
          <button
            type="button"
            className={`n-chip${metric === "tasks" ? " on" : ""}`}
            style={{ padding: "6px 12px", fontSize: 10.5 }}
            onClick={() => setMetric("tasks")}
          >
            Plan
          </button>
        </div>
      </div>
      <div className="n-card n-rise-in">
        <div className="n-week">
          {week.map((day, i) => (
            <div key={i} className="n-week-col">
              <span className={`n-week-bar${day.pct >= 75 ? " hi" : ""}`} style={{ height: `${Math.max(day.pct, 5)}%` }} />
              <span className={`n-week-day${day.isToday ? " today" : ""}`}>{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* insight of the day */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Günün kartı</h2>
      </div>
      <div className="n-daily n-rise-in">
        <span className="n-daily-emoji" style={{ background: "var(--n-surface-2)" }}>
          {insight.emoji}
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="n-daily-title">{insight.title}</p>
          <p className="n-daily-text">{insight.text}</p>
          {relatedArticle && (
            <button
              type="button"
              className="n-section-link"
              style={{ marginTop: 8 }}
              onClick={() => onOpenArticle(relatedArticle)}
            >
              Əlaqəli məqaləni oxu <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>

      {/* reminders */}
      {reminders.length > 0 && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Yaxınlaşanlar</h2>
          </div>
          <div className="n-card n-rise-in" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {reminders.map((r) => (
              <div key={r.title} className="n-remind">
                <span className="n-remind-icon" style={{ background: r.bg }}>
                  {r.emoji}
                </span>
                <span style={{ minWidth: 0 }}>
                  <p className="n-remind-title">{r.title}</p>
                  <p className="n-remind-sub">{r.sub}</p>
                </span>
                <span className="n-remind-when">{r.when}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* premium upsell */}
      {!profile.premium && (
        <button type="button" className="n-upsell n-rise-in" style={{ marginTop: 22 }} onClick={onGoProfile}>
          <span className="n-crown" style={{ width: 44, height: 44, margin: 0, borderRadius: 15, animation: "none" }}>
            <Crown size={20} strokeWidth={2.2} />
          </span>
          <span style={{ minWidth: 0 }}>
            <p className="n-upsell-title">Premium — ilk 7 gün pulsuz</p>
            <p className="n-upsell-sub">Limitsiz Aİ köməkçisi, tam kitabxana, dərin analitika</p>
          </span>
          <ChevronRight size={17} style={{ marginLeft: "auto", color: "var(--n-gold)", flexShrink: 0 }} />
        </button>
      )}

      <div className="n-disclaimer" style={{ marginTop: 22 }}>
        <span aria-hidden>🩺</span>
        <span>
          Anacan məlumatlandırır, həkiminizi əvəz etmir. Narahatlıq halında mütəxəssisə müraciət edin — təcili
          hallarda <strong>103</strong>.
        </span>
      </div>
    </>
  );
}
