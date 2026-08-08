import {
  Baby,
  Calendar,
  ChevronRight,
  Clock3,
  Eye,
  Footprints,
  Scale,
  Search,
  Stethoscope,
} from "lucide-react";
import { BottomNav } from "../_components/bottom-nav";
import { QuickLog } from "./_components/quick-log";

const recommendations = [
  { emoji: "🏃", text: "Do gentle exercises (yoga, swimming)" },
  { emoji: "🍎", text: "Eat foods rich in iron and calcium" },
  { emoji: "👶", text: "Start tracking baby's movements" },
  { emoji: "🛒", text: "Start planning the baby's room" },
  { emoji: "📚", text: "Look into childbirth preparation classes" },
];

const trio = [
  { icon: Calendar, label: "days left", value: "108", color: "var(--a-grad-yellow)", ink: "#7a5200" },
  { icon: Footprints, label: "kick", value: "0", color: "var(--a-grad-pink)", ink: "#a3355f" },
  { icon: Scale, label: "kg weight", value: "+14.0", color: "var(--a-grad-blue)", ink: "#1c5a80" },
];

const development = [
  { emoji: "👀", label: "Eye" },
  { emoji: "👂", label: "Ear" },
  { emoji: "✋", label: "Finger" },
  { emoji: "🦶", label: "Kick" },
  { emoji: "💇", label: "Hair" },
];

const articles = [
  { emoji: "🤱", bg: "var(--a-grad-peach)", title: "Maternity Leave (Decree): Eligibility and How to Calculate Payments", read: "5 min", views: 70 },
  { emoji: "💰", bg: "var(--a-grad-green)", title: "How to Get the 600 Manat One-Time Allowance: Documents and E-social Registration", read: "5 min", views: 201 },
  { emoji: "📛", bg: "var(--a-grad-lav)", title: "Modern Azerbaijani Names: Most Popular Boy and Girl Names for 2026 (with Meanings)", read: "5 min", views: 187 },
  { emoji: "😟", bg: "var(--a-grad-blue)", title: "Fear of Childbirth (Tokophobia): Expert Tips on How to Overcome It", read: "5 min", views: 64 },
];

export default function PregnancyPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            {/* Top bar */}
            <header className="a-topbar">
              <div>
                <p className="a-eyebrow">Good afternoon</p>
                <p className="a-wordmark">Turkan 👋</p>
              </div>
              <div className="a-topbar-actions">
                <button type="button" className="a-icon-btn" aria-label="Search">
                  <Search size={16} strokeWidth={2} />
                </button>
                <button type="button" className="a-avatar-btn" aria-label="Pregnancy profile">
                  🤰
                </button>
              </div>
            </header>

            {/* Editorial hero */}
            <section className="a-hero-min a-fade-in">
              <p className="a-hero-eyebrow">
                Week <strong>24</strong>, Day 3 · 2nd Trimester
              </p>

              <div className="a-egg-wrap">
                <span className="a-egg-heart">
                  <span style={{ fontSize: 13 }}>💗</span>
                </span>
                <div className="a-egg">
                  <Baby size={40} strokeWidth={1.8} />
                </div>
              </div>

              <h1 className="a-hero-headline a-heading">
                Mommy, right now I am the size of a <em>Cauliflower</em>
              </h1>

              <div className="a-tag-row" style={{ justifyContent: "center", marginTop: 18, marginBottom: 0 }}>
                <span className="a-tag">172. day</span>
                <span className="a-tag">29.8 cm</span>
                <span className="a-tag">533.5 gr</span>
                <span className="a-tag">108 days left</span>
              </div>

              <div className="a-pbar">
                <div className="a-pbar-track">
                  <div className="a-pbar-fill" style={{ width: "61%" }} />
                  <span className="a-pbar-pct" style={{ left: "61%" }}>
                    61%
                  </span>
                </div>
                <div className="a-pbar-labels">
                  <span>Home</span>
                  <span>Birth</span>
                </div>
              </div>
            </section>

            {/* 2nd Trimester Recommendations */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">
                  🌸 2nd Trimester Recommendations 🌸
                </h2>
              </div>
              <div className="a-list-card">
                {recommendations.map((r) => (
                  <div key={r.text} className="a-list-row">
                    <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 17 }}>
                      {r.emoji}
                    </span>
                    <p className="a-list-title" style={{ fontWeight: 600 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Stat trio */}
            <section className="a-section">
              <div className="a-trio">
                {trio.map((t) => (
                  <div key={t.label} className="a-trio-item">
                    <span className="a-trio-icon" style={{ background: t.color, color: t.ink }}>
                      <t.icon size={17} strokeWidth={2} />
                    </span>
                    <p className="a-trio-value">{t.value}</p>
                    <p className="a-trio-label">{t.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Baby's development */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Baby&apos;s development</h2>
              </div>
              <div className="a-trio" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                {development.map((d) => (
                  <div key={d.label} className="a-trio-item" style={{ padding: "12px 2px" }}>
                    <span className="a-trio-icon" style={{ background: "var(--a-surface-soft)", fontSize: 18 }}>
                      {d.emoji}
                    </span>
                    <p className="a-trio-label">{d.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Message from baby */}
            <section className="a-section">
              <div className="a-cta a-fade-in">
                <span className="a-cta-shape" style={{ width: 140, height: 140, top: -50, right: -40 }} />
                <span className="a-cta-shape" style={{ width: 90, height: 90, bottom: -30, left: -20 }} />
                <div className="a-cta-top">
                  <span className="a-cta-badge">Day 172 / 280 · Message from baby</span>
                  <span className="a-cta-deco">
                    <Baby size={18} strokeWidth={2} />
                  </span>
                </div>
                <h2 className="a-cta-title a-heading">My nostrils are opening! 👃</h2>
                <p className="a-cta-text">
                  Until now, my nostrils were closed, but today they&apos;re opening. Now I can &quot;breathe&quot;
                  the amniotic fluid more easily through my nose. This is exercising my breathing muscles. Sometimes,
                  when the fluid goes down the wrong way, I get the hiccups. Do you feel those little jerks?
                </p>
              </div>
            </section>

            {/* Body changes */}
            <section className="a-section">
              <div className="a-card a-fade-in">
                <div className="a-card-head" style={{ marginBottom: 10 }}>
                  <h3 className="a-card-title a-heading" style={{ fontSize: 15 }}>
                    🤰 Body Changes
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "var(--a-ink-soft)" }}>
                  Back pain may intensify. As your belly grows forward, you involuntarily arch your back to
                  maintain your center of gravity. This strains your spinal muscles. Standing for long periods can
                  exacerbate the pain.
                </p>
              </div>
            </section>

            {/* Baby's growth */}
            <section className="a-section">
              <div className="a-card a-fade-in">
                <div className="a-card-head" style={{ marginBottom: 10 }}>
                  <h3 className="a-card-title a-heading" style={{ fontSize: 15 }}>
                    🌱 Baby&apos;s Growth
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "var(--a-ink-soft)" }}>
                  Your baby&apos;s functional vocal cords can now cause them to hiccup from time to time throughout
                  the day. You might even start feeling these hiccups yourself! If your baby exhibits rhythmic
                  movements at regular intervals, similar to a heartbeat, it indicates they are hiccuping. Many
                  expectant mothers worry that hiccups might harm their baby, but they are actually very important
                  for your baby&apos;s development. These hiccuping movements can last from a few minutes to
                  sometimes even half an hour. As organs continue to grow and develop, the diaphragm intermittently
                  contracts, leading to hiccups — a form of exercise preparing it for extrauterine breathing after
                  birth.
                </p>
              </div>
            </section>

            {/* Tip of the day */}
            <section className="a-section">
              <div className="a-card a-fade-in">
                <div className="a-card-head" style={{ marginBottom: 10 }}>
                  <h3 className="a-card-title a-heading" style={{ fontSize: 15 }}>
                    💡 Tip of the Day
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "var(--a-ink-soft)" }}>
                  To reduce shortness of breath, try to sit upright and open your chest by pulling your shoulders
                  back. To meet your calcium needs, prioritize dairy products or leafy green vegetables throughout
                  the day. If your belly is itchy, moisturize your skin with natural almond oil or cocoa butter.
                  Today, relax a bit and dream of the beautiful days ahead with your baby.
                </p>
              </div>
            </section>

            {/* Water + quick logs */}
            <div className="a-section">
              <QuickLog />
            </div>

            {/* Articles */}
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
