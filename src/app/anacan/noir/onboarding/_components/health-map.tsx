"use client";

import { Sparkles } from "lucide-react";
import {
  babyStatus,
  cycleStatus,
  fmtAz,
  pregnancyStatus,
  scoreLabel,
  type NoirProfile,
  type ScoreBreakdown,
} from "../../_lib/noir-store";
import { FOCUS_OPTIONS } from "./quiz-config";
import { GOAL_META, ROADMAPS, babySizeForWeek } from "../../_lib/noir-content";
import { ScoreRing } from "../../_components/score-ring";

const SUBS: { key: keyof Omit<ScoreBreakdown, "total">; label: string; color: string; tip: string }[] = [
  { key: "sleep", label: "Yuxu", color: "var(--n-violet)", tip: "Yuxu pəncərənizi 30 dəqiqə önə çəkin" },
  { key: "mood", label: "Əhval", color: "var(--n-rose)", tip: "Gündə 10 dəqiqəlik nəfəs ritualı planlaşdırıldı" },
  { key: "nutrition", label: "Qidalanma", color: "var(--n-teal)", tip: "Su və dəmir blokları planınıza əlavə olundu" },
  { key: "activity", label: "Aktivlik", color: "var(--n-gold)", tip: "20 dəqiqəlik gəzinti gündəlik hədəfə çevrildi" },
];

export function HealthMap({ profile, score }: { profile: NoirProfile; score: ScoreBreakdown }) {
  const goal = profile.goal ?? "cycle";
  const meta = GOAL_META[goal];
  const preg = goal === "pregnant" ? pregnancyStatus(profile) : null;
  const baby = goal === "baby" ? babyStatus(profile) : null;
  const cyc = goal === "cycle" || goal === "ttc" ? cycleStatus(profile) : null;
  const attention = SUBS.filter((s) => score[s.key] < 60);
  const focusLabels = (profile.focus ?? [])
    .map((v) => FOCUS_OPTIONS[goal].find((o) => o.value === v))
    .filter(Boolean);

  return (
    <div className="n-step" key="healthmap">
      <p className="n-kicker">
        <Sparkles size={12} strokeWidth={2.4} /> Sağlamlıq xəritəniz
      </p>
      <h1 className="n-title n-display">
        {profile.name ? `${profile.name}, xəritəniz` : "Xəritəniz"} <em>hazırdır</em>
      </h1>
      <p className="n-sub">Cavablarınızdan qurulan başlanğıc mənzərə — bundan sonra hər qeydlə dəqiqləşəcək.</p>

      <div className="n-card n-card-lg n-rise-in" style={{ display: "grid", placeItems: "center" }}>
        <ScoreRing value={score.total} size={172} stroke={11}>
          <p className="n-ring-value n-display">{score.total}</p>
          <p className="n-ring-label">Anacan Skoru · {scoreLabel(score.total)}</p>
        </ScoreRing>

        <div className="n-subscores" style={{ width: "100%", marginTop: 20 }}>
          {SUBS.map((s) => (
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

      {attention.length > 0 && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Diqqət sahələri</h2>
          </div>
          <div className="n-card n-rise-in n-d1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {attention.map((s) => (
              <div key={s.key} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: s.color,
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, fontWeight: 600 }}>
                  <strong>{s.label}:</strong>{" "}
                  <span style={{ color: "var(--n-soft)" }}>{s.tip}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="n-section-head">
        <h2 className="n-section-title n-display">Vəziyyətiniz</h2>
      </div>
      <div className="n-hero n-rise-in n-d2">
        <span className="n-hero-glow" style={{ background: "rgba(217,184,120,0.4)", top: -80, right: -60 }} />
        <p className="n-hero-eyebrow">
          {meta.emoji} {meta.label} rejimi
        </p>
        {goal === "pregnant" && preg && (
          <>
            <h3 className="n-hero-title n-display">
              {preg.week}-ci həftə · {preg.trimester} trimestr
            </h3>
            <p className="n-hero-sub">
              Körpəniz təxminən {babySizeForWeek(preg.week).fruit} boydadır{" "}
              {babySizeForWeek(preg.week).emoji} · doğuşa ~{preg.daysLeft} gün
            </p>
          </>
        )}
        {goal === "baby" && baby && (
          <>
            <h3 className="n-hero-title n-display">
              {profile.babyName || "Körpəniz"} — {baby.ageText}
            </h3>
            <p className="n-hero-sub">{baby.daysOld} gündür birlikdəsiniz · inkişaf planı yaşa görə quruldu</p>
          </>
        )}
        {(goal === "cycle" || goal === "ttc") && cyc && (
          <>
            <h3 className="n-hero-title n-display">
              Siklin {cyc.day}-ci günü · {cyc.phase}
            </h3>
            <p className="n-hero-sub">
              {goal === "ttc"
                ? `Fertil pəncərə: ${fmtAz(cyc.fertileStart)} – ${fmtAz(cyc.fertileEnd)}`
                : `Növbəti dövr: ${fmtAz(cyc.nextPeriod)} (~${cyc.daysToNext} gün)`}
            </p>
          </>
        )}
        {focusLabels.length > 0 && (
          <div className="n-chips" style={{ marginTop: 14 }}>
            {focusLabels.map((f) => (
              <span key={f!.value} className="n-chip" style={{ pointerEvents: "none" }}>
                {f!.emoji} {f!.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="n-section-head">
        <h2 className="n-section-title n-display">90 günlük yol xəritəsi</h2>
      </div>
      <div className="n-card n-rise-in n-d3">
        <div className="n-road">
          {ROADMAPS[goal].map((phase, i) => (
            <div key={phase.title} className={`n-road-item${i === 0 ? " live" : ""}`}>
              <p className="n-road-title">{phase.title}</p>
              <p className="n-road-sub">{phase.items.join(" · ")}</p>
              <span className="n-road-tag">{phase.window}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
