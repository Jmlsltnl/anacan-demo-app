import {
  AlertTriangle,
  Battery,
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock3,
  Droplets,
  Dumbbell,
  Eye,
  Heart,
  Moon,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Utensils,
  Zap,
} from "lucide-react";
import { BottomNav } from "../_components/bottom-nav";
import { CalendarMonth } from "./_components/calendar-month";
import { MoodEnergy } from "./_components/mood-energy";
import { PeriodStatus } from "./_components/period-status";
import { PhaseTips } from "./_components/phase-tips";
import { PillReminder } from "./_components/pill-reminder";

const forToday = [
  { icon: Dumbbell, title: "Exercise and Your Cycle", text: "Adjust your workout intensity based on your cycle phase for better results and recovery." },
  { icon: Moon, title: "Sleep Quality", text: "Hormonal changes throughout your cycle can affect sleep. Maintain a regular sleep schedule for better rest." },
  { icon: Droplets, title: "Hydration Matters", text: "Staying well-hydrated helps reduce bloating and can ease period symptoms." },
  { icon: BookOpen, title: "Understanding Your Cycle", text: "Your menstrual cycle is divided into four phases, each with unique hormonal changes." },
  { icon: Zap, title: "Energy Boost", text: "During the follicular phase, estrogen rises and brings increased energy and optimism." },
];

const upcoming = [
  { icon: Calendar, title: "Upcoming Period", sub: "1 September", value: "24 days left", bg: "var(--a-grad-pink)", ink: "#a3355f" },
  { icon: Heart, title: "Fertile Window", sub: "13 August – 19 August", value: "In 6 days", bg: "var(--a-grad-green)", ink: "#1c7a4d" },
  { icon: Sparkles, title: "Ovulation Day", sub: "3 March", value: "Predicted", bg: "var(--a-grad-yellow)", ink: "#7a5200" },
];

const latestCycles = [
  { n: "#10", title: "18 Jun", sub: "In progress", value: "1 day" },
  { n: "#9", title: "29 Mar – 18 Jun", sub: "81 day cycle", value: "1 day" },
  { n: "#8", title: "17 Jun", sub: "In progress", value: "1 day" },
];

const trend = [
  { label: "#3", value: 32 },
  { label: "#5", value: 45 },
  { label: "#6", value: 21 },
  { label: "#7", value: 81 },
  { label: "#9", value: 38 },
];

const alerts = [
  { title: "Short cycle detected", text: "Your shortest cycle is 1 day. Cycles under 21 days may require medical attention." },
  { title: "Long cycle detected", text: "Your longest cycle is 81 days. Cycles over 35 days can be a sign of PCOS or hormonal imbalance." },
  { title: "Irregular cycle", text: "There is an 80-day difference between cycles. This could be due to stress, weight changes, or thyroid issues." },
];

const symptoms = [
  { emoji: "🤕", title: "Headache" },
  { emoji: "😣", title: "Cramps" },
  { emoji: "💗", title: "Breast tenderness" },
  { emoji: "🤢", title: "Nausea" },
  { emoji: "🫄", title: "Bloating" },
];

const reminders = [
  { emoji: "🌸", title: "Ovulation is approaching", sub: "09:00 · 1 day before" },
  { emoji: "💕", title: "Fertile window begins", sub: "09:00 · 1 day before" },
  { emoji: "🔴", title: "Period is approaching", sub: "09:00 · 2 days before" },
];

const quickStats = [
  { icon: Battery, label: "Energy level", value: "High" },
  { icon: Moon, label: "Recommended sleep", value: "7–8 h" },
  { icon: Utensils, label: "Focus food", value: "Protein" },
  { icon: Dumbbell, label: "Workout intensity", value: "Medium" },
];

const articles = [
  { emoji: "🍼", bg: "var(--a-grad-peach)", title: "Period After Birth: When Does the Cycle Return?", read: "5 min", views: 42 },
  { emoji: "💊", bg: "var(--a-grad-pink)", title: "Unbearable Period Pains (Dysmenorrhea): Natural Remedies and When to See a Doctor", read: "5 min", views: 31 },
  { emoji: "📊", bg: "var(--a-grad-green)", title: "Why a Period Tracker is Important: 3 Health Benefits of Tracking with \"Anacan\"", read: "5 min", views: 34 },
];

export default function PeriodPage() {
  const maxTrend = Math.max(...trend.map((t) => t.value));

  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            {/* Top bar */}
            <header className="a-topbar">
              <div>
                <p className="a-eyebrow">Good evening</p>
                <p className="a-wordmark">Turkan 👋</p>
              </div>
              <div className="a-topbar-actions">
                <button type="button" className="a-icon-btn" aria-label="Notifications">
                  <Bell size={16} strokeWidth={2} />
                  <span className="a-dot" />
                </button>
                <button type="button" className="a-avatar-btn" aria-label="Profile">
                  🌸
                </button>
              </div>
            </header>

            {/* Alert hero */}
            <section className="a-fade-in" style={{ marginTop: 8 }}>
              <div className="a-alert-card">
                <span className="a-alert-eyebrow">
                  <AlertTriangle size={13} strokeWidth={2.3} /> Cycle alert
                </span>
                <h1 className="a-alert-headline a-heading">Your period is 133 days late</h1>
                <p className="a-alert-text">
                  Your average cycle is 38 days. It can be caused by stress, weight changes, hormonal fluctuations,
                  or pregnancy. Consider taking a pregnancy test.
                </p>
                <span className="a-cta-btn">Ask Dr. Anacan</span>
              </div>
            </section>

            {/* For today */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">For today</h2>
                <span className="a-section-link">7 Aug</span>
              </div>
              <div className="a-hscroll">
                {forToday.map((item) => (
                  <div key={item.title} className="a-hscroll-card">
                    <span className="a-list-icon" style={{ background: "var(--a-grad-pink)", color: "#a3355f" }}>
                      <item.icon size={17} strokeWidth={2} />
                    </span>
                    <p className="a-hscroll-title">{item.title}</p>
                    <p className="a-hscroll-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Currently — phase status */}
            <div className="a-section">
              <PeriodStatus />
            </div>

            {/* Calendar */}
            <div className="a-section">
              <CalendarMonth />
            </div>

            {/* Tips for this phase */}
            <PhaseTips />

            {/* Upcoming */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Upcoming</h2>
              </div>
              <div className="a-list-card">
                {upcoming.map((u) => (
                  <div key={u.title} className="a-list-row">
                    <span className="a-list-icon" style={{ background: u.bg, color: u.ink }}>
                      <u.icon size={17} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="a-list-title">{u.title}</p>
                      <p className="a-list-sub">{u.sub}</p>
                    </div>
                    <span className="a-list-trail">
                      <p className="a-list-value">{u.value}</p>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily note / mood chart */}
            <div className="a-section">
              <MoodEnergy />
            </div>

            {/* Cycle statistics */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Cycle statistics</h2>
                <span className="a-section-link">10 cycles</span>
              </div>
              <div className="a-card">
                <div className="a-grid-2" style={{ marginTop: 0 }}>
                  <div className="a-stat-tile">
                    <span className="a-stat-tile-icon" style={{ background: "var(--a-grad-pink)", color: "#a3355f" }}>
                      <Calendar size={15} />
                    </span>
                    <div>
                      <p className="a-stat-tile-label">Average cycle</p>
                      <p className="a-stat-tile-value">38 day</p>
                    </div>
                  </div>
                  <div className="a-stat-tile">
                    <span className="a-stat-tile-icon" style={{ background: "var(--a-grad-blue)", color: "#1c5a80" }}>
                      <Droplets size={15} />
                    </span>
                    <div>
                      <p className="a-stat-tile-label">Average period</p>
                      <p className="a-stat-tile-value">1 day</p>
                    </div>
                  </div>
                  <div className="a-stat-tile">
                    <span className="a-stat-tile-icon" style={{ background: "var(--a-grad-yellow)", color: "#7a5200" }}>
                      <TrendingUp size={15} />
                    </span>
                    <div>
                      <p className="a-stat-tile-label">Range</p>
                      <p className="a-stat-tile-value">1–81 day</p>
                    </div>
                  </div>
                  <div className="a-stat-tile">
                    <span className="a-stat-tile-icon" style={{ background: "var(--a-grad-green)", color: "#1c7a4d" }}>
                      <Sparkles size={15} />
                    </span>
                    <div>
                      <p className="a-stat-tile-label">Variation</p>
                      <p className="a-stat-tile-value">80 day diff.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest cycles */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Latest cycles</h2>
              </div>
              <div className="a-list-card">
                {latestCycles.map((c) => (
                  <div key={c.n} className="a-list-row">
                    <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 11.5, fontWeight: 800, color: "var(--a-ink-soft)" }}>
                      {c.n}
                    </span>
                    <div>
                      <p className="a-list-title">{c.title}</p>
                      <p className="a-list-sub">{c.sub}</p>
                    </div>
                    <span className="a-list-trail">
                      <p className="a-list-value">{c.value}</p>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Cycle length trend */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Cycle length trend</h2>
              </div>
              <div className="a-card">
                <div className="a-trend-bars">
                  {trend.map((t) => (
                    <div key={t.label} className="a-trend-bar-col">
                      <div
                        className={`a-trend-bar${t.value === maxTrend ? " hi" : ""}`}
                        style={{ height: `${(t.value / 81) * 100}%` }}
                      />
                      <span className="a-trend-bar-label">{t.label}</span>
                    </div>
                  ))}
                </div>
                <p className="a-teaser">
                  Median <strong>38 days</strong> · Normal range: 21–35 days (ACOG)
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                {alerts.map((a) => (
                  <div key={a.title} className="a-card">
                    <div className="a-list-row" style={{ padding: 0 }}>
                      <span className="a-list-icon" style={{ background: "var(--a-pink-1)", color: "#b1275b" }}>
                        <AlertTriangle size={16} strokeWidth={2} />
                      </span>
                      <p className="a-list-title">{a.title}</p>
                    </div>
                    <p style={{ margin: "10px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--a-ink-soft)" }}>{a.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Symptom pattern analysis */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Symptom patterns</h2>
                <span className="a-section-link">Last 90 days</span>
              </div>
              <div className="a-list-card">
                {symptoms.map((s) => (
                  <div key={s.title} className="a-list-row" style={{ display: "block" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 17 }}>
                        {s.emoji}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p className="a-list-title">{s.title}</p>
                        <p className="a-list-sub">1 time · 100% 🌱 Follicular</p>
                      </div>
                      <span className="a-list-value">100%</span>
                    </div>
                    <div className="a-inline-bar" style={{ marginLeft: 53 }}>
                      <div className="a-inline-bar-fill" style={{ width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pill reminder */}
            <div className="a-section">
              <PillReminder />
            </div>

            {/* Reminders */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Reminders</h2>
                <span className="a-section-link">4 active</span>
              </div>
              <div className="a-list-card">
                {reminders.map((r) => (
                  <div key={r.title} className="a-list-row">
                    <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 17 }}>
                      {r.emoji}
                    </span>
                    <div>
                      <p className="a-list-title">{r.title}</p>
                      <p className="a-list-sub">{r.sub}</p>
                    </div>
                  </div>
                ))}
                <button type="button" className="a-list-row" style={{ width: "100%", textAlign: "left" }}>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: "var(--a-ink-soft)" }}>Show all</span>
                  <ChevronRight size={15} className="a-list-chevron" />
                </button>
              </div>
            </section>

            {/* Quick stats */}
            <section className="a-section">
              <div className="a-grid-2" style={{ marginTop: 0 }}>
                {quickStats.map((s) => (
                  <div key={s.label} className="a-stat-tile">
                    <span className="a-stat-tile-icon" style={{ background: "var(--a-surface)", border: "1px solid var(--a-line)" }}>
                      <s.icon size={15} color="var(--a-peach-2)" />
                    </span>
                    <div>
                      <p className="a-stat-tile-label">{s.label}</p>
                      <p className="a-stat-tile-value">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest articles */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Latest articles</h2>
                <span className="a-section-link">
                  All <ChevronRight size={13} />
                </span>
              </div>
              <div className="a-card" style={{ padding: "6px 18px" }}>
                {articles.map((a) => (
                  <div key={a.title} className="a-article-row">
                    <span className="a-article-thumb" style={{ background: a.bg }}>
                      {a.emoji}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p className="a-article-title">{a.title}</p>
                      <div className="a-article-meta">
                        <span>
                          <Clock3 size={10} /> {a.read}
                        </span>
                        <span>
                          <Eye size={10} /> {a.views}
                        </span>
                        <span>6mo ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="a-disclaimer">
              <Stethoscope size={15} style={{ flexShrink: 0, marginTop: 1, color: "var(--a-ink-soft)" }} />
              <p>
                This information is for educational purposes only and is <strong>NOT</strong> a substitute for
                medical advice, diagnosis, or treatment. Always consult your doctor or a qualified healthcare
                professional before making any medical decisions. In an emergency, call <strong>103</strong>.
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
