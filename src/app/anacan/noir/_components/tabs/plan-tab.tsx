"use client";

import { babyStatus, pregnancyStatus, type NoirProfile } from "../../_lib/noir-store";
import { GOAL_META, MILESTONES, ROADMAPS, VACCINES, weekNotes } from "../../_lib/noir-content";
import { FOCUS_OPTIONS } from "../../onboarding/_components/quiz-config";

export function PlanTab({ profile }: { profile: NoirProfile }) {
  const goal = profile.goal ?? "cycle";
  const meta = GOAL_META[goal];
  const preg = goal === "pregnant" ? pregnancyStatus(profile) : null;
  const baby = goal === "baby" ? babyStatus(profile) : null;
  const focusLabels = (profile.focus ?? [])
    .map((v) => FOCUS_OPTIONS[goal].find((o) => o.value === v))
    .filter(Boolean);

  return (
    <>
      <header className="n-home-top">
        <div>
          <p className="n-home-greet">{meta.emoji} {meta.label} planı</p>
          <h1 className="n-home-name n-display">90 günlük yol xəritəniz</h1>
          <p className="n-home-date">Qiymətləndirmə cavablarınızdan qurulub</p>
        </div>
      </header>

      {focusLabels.length > 0 && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Fokus sahələriniz</h2>
          </div>
          <div className="n-chips n-rise-in">
            {focusLabels.map((f) => (
              <span key={f!.value} className="n-chip on" style={{ pointerEvents: "none" }}>
                {f!.emoji} {f!.label}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="n-section-head">
        <h2 className="n-section-title n-display">Mərhələlər</h2>
        <span className="n-section-link" style={{ pointerEvents: "none" }}>
          1-ci mərhələdəsiniz
        </span>
      </div>
      <div className="n-card n-rise-in n-d1">
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

      {goal === "pregnant" && preg && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Bu həftə ({preg.week}-ci)</h2>
          </div>
          <div className="n-card n-rise-in n-d2" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {weekNotes(preg.week).map((note) => (
              <div key={note} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--n-gold)", flexShrink: 0, marginTop: 6 }} />
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, fontWeight: 600, color: "var(--n-soft)" }}>{note}</p>
              </div>
            ))}
          </div>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Müayinə pəncərələri</h2>
          </div>
          <div className="n-card n-rise-in n-d3" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {[
              { w: 12, t: "İlk trimestr skrininqi", s: "11–14-cü həftə pəncərəsi" },
              { w: 20, t: "Anatomik USM", s: "18–22-ci həftə pəncərəsi" },
              { w: 28, t: "Qlükoza tolerantlıq testi", s: "24–28-ci həftə" },
              { w: 36, t: "Doğuşönü qiymətləndirmə", s: "GBS və mövqe yoxlanışı" },
            ].map((c) => {
              const done = preg.week > c.w;
              return (
                <div key={c.w} className="n-remind">
                  <span className="n-remind-icon" style={{ background: done ? "var(--n-grad-teal)" : "var(--n-surface-2)" }}>
                    {done ? "✓" : "🩺"}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <p className="n-remind-title">{c.t}</p>
                    <p className="n-remind-sub">{c.s}</p>
                  </span>
                  <span className="n-remind-when">{done ? "keçdi" : `~${c.w}. həftə`}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {goal === "baby" && baby && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Peyvənd təqvimi</h2>
          </div>
          <div className="n-card n-rise-in n-d2" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {VACCINES.map((v) => {
              const done = v.month * 30.4375 <= baby.daysOld;
              return (
                <div key={v.name} className="n-remind">
                  <span className="n-remind-icon" style={{ background: done ? "var(--n-grad-teal)" : "var(--n-surface-2)" }}>
                    {done ? "✓" : "💉"}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <p className="n-remind-title">{v.name}</p>
                    <p className="n-remind-sub">{v.detail}</p>
                  </span>
                  <span className="n-remind-when">{v.month === 0 ? "doğumda" : `${v.month} ay`}</span>
                </div>
              );
            })}
          </div>
          <p className="n-hint" style={{ marginTop: 8 }}>
            Təqvim istinad xarakterlidir — dəqiq tarixləri pediatrınızla təsdiqləyin.
          </p>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">İnkişaf mərhələləri</h2>
          </div>
          <div className="n-card n-rise-in n-d3">
            <div className="n-road">
              {MILESTONES.filter((m) => m.month >= Math.max(baby.months - 2, 0)).slice(0, 5).map((m) => {
                const done = m.month <= baby.months;
                return (
                  <div key={m.month} className={`n-road-item${done ? " done" : m.month === MILESTONES.find((x) => x.month > baby.months)?.month ? " live" : ""}`}>
                    <p className="n-road-title">{m.title}</p>
                    <p className="n-road-sub">{m.detail}</p>
                    <span className="n-road-tag">~{m.month} ay</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {(goal === "cycle" || goal === "ttc") && (
        <>
          <div className="n-section-head">
            <h2 className="n-section-title n-display">Faza bələdçisi</h2>
          </div>
          <div className="n-card n-rise-in n-d2" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {[
              { e: "🌙", t: "Menstruasiya", s: "İstirahət, dəmir, yüngül hərəkət", w: `1–${profile.periodLen ?? 5} gün` },
              { e: "🌱", t: "Follikulyar", s: "Enerji pik edir — intensiv məşq, yeni başlanğıclar", w: "yüksələn" },
              { e: "✨", t: "Fertil pəncərə", s: goal === "ttc" ? "Ən vacib günlər — planın mərkəzi" : "Ovulyasiya ətrafı 6 gün", w: "6 gün" },
              { e: "🍂", t: "Luteal", s: "Maqnezium, yuxu, yumşaq templi günlər", w: "12–14 gün" },
            ].map((p) => (
              <div key={p.t} className="n-remind">
                <span className="n-remind-icon" style={{ background: "var(--n-surface-2)" }}>
                  {p.e}
                </span>
                <span style={{ minWidth: 0 }}>
                  <p className="n-remind-title">{p.t}</p>
                  <p className="n-remind-sub">{p.s}</p>
                </span>
                <span className="n-remind-when">{p.w}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
