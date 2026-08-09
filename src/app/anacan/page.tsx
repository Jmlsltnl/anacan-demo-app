import {
  Bell,
  Calendar,
  ChevronRight,
  Clock3,
  Heart,
  Lightbulb,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { BottomNav } from "./_components/bottom-nav";
import { Greeting } from "./_components/greeting";
import { GrowthCard } from "./_components/growth-card";
import { QuickAccess } from "./_components/quick-access";
import { RecommendationTeaser } from "./_components/recommendation-teaser";
import { TeethingCard } from "./_components/teething-card";
import { TodayHub } from "./_components/today-hub";

const trends = [
  { label: "Avg. feeding", sub: "This week", value: "0.0", icon: "🍽️" },
  { label: "Avg. sleep (h)", sub: "This week", value: "0.0", icon: "🌙" },
  { label: "Avg. diaper", sub: "This week", value: "0.0", icon: "🧷" },
];

const leaps = [
  { title: "The World of Sequences", meta: "Week 46 · 4 weeks later", tag: "Medium" as const },
  { title: "The World of Programs", meta: "Week 55 · 13 weeks later", tag: "Intensive" as const },
];

const articles = [
  { emoji: "🦷", title: "Teething Period: Natural and Safe Ways to Soothe Your Baby's Pain", read: "5 min", likes: 30, time: "4mo" },
  { emoji: "🥣", title: "Introduction to Solid Foods: A Healthy and Safe Start", read: "5 min", likes: 25, time: "4mo" },
  { emoji: "🌙", title: "Peaceful Sleep Guide: Establishing Your Baby's Sleep Routine", read: "5 min", likes: 30, time: "4mo" },
  { emoji: "👀", title: "Baby's Vision Development: How and When They Start Seeing Clearly", read: "5 min", likes: 11, time: "4mo" },
];

export default function AnacanPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          {/* Watercolor sky behind topbar + hero */}
          <div className="a-sky" aria-hidden>
            <span className="a-cloud c1" />
            <span className="a-cloud c2" />
            <span className="a-cloud c3" />
            <span className="a-cloud c4" />
            <span className="a-cloud c5" />
            <span className="a-cloud c6 deep" />
            <span className="a-cloud c7 deep" />
          </div>
          <div className="a-shell">
            {/* Top bar */}
            <header className="a-topbar">
              <Greeting />
              <div className="a-topbar-actions">
                <Link href="/anacan/shop" className="a-icon-btn" aria-label="Anacan Shop">
                  <ShoppingBag size={16} strokeWidth={2} />
                </Link>
                <button type="button" className="a-icon-btn" aria-label="Notifications">
                  <Bell size={16} strokeWidth={2} />
                  <span className="a-dot" />
                </button>
                <button type="button" className="a-avatar-btn" aria-label="Switch child profile">
                  👦
                </button>
              </div>
            </header>

            {/* Editorial hero */}
            <section className="a-hero-min a-fade-in">
              <p className="a-hero-eyebrow">
                Day <strong>294</strong> · Atlas
              </p>
              <h1 className="a-hero-headline a-heading">
                294 days of watching <em>Atlas</em> grow.
              </h1>
            </section>

            {/* Today's info — standalone card */}
            <section className="a-section">
              <div className="a-today-info a-fade-in">
                <div className="a-today-info-head">
                  <span className="a-today-info-icon">
                    <Lightbulb size={19} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="a-today-info-eyebrow">Today&apos;s info</p>
                    <p className="a-today-info-meta">Day 294 · 9 months, 21 days</p>
                  </div>
                  <span className="a-today-info-badge">Daily</span>
                </div>
                <h2 className="a-today-info-title a-heading">An intense activity period has begun</h2>
                <p className="a-today-info-text">
                  With significant advancements in motor skills, emotional, and cognitive development, your
                  baby has entered a period of intense activity. They may develop new skills, including
                  grasping everything within reach, swinging, banging, dropping, and throwing objects they
                  can lift. A large number of head injuries occur during these months — it&apos;s worth
                  setting some boundaries at home.
                </p>
                <div className="a-today-info-tip">
                  <Sparkles size={14} strokeWidth={2.2} />
                  <span>
                    <strong>Tip of the day:</strong> set boundaries around the room and remove small,
                    high-risk items within reach.
                  </span>
                </div>
              </div>
            </section>

            {/* CTA banner: message for mom */}
            <section className="a-section">
              <div className="a-cta a-fade-in">
                <div className="a-cta-top">
                  <span className="a-cta-badge">Day 294 · Message for mom</span>
                  <span className="a-cta-deco">
                    <Heart size={18} strokeWidth={2} />
                  </span>
                </div>
                <h2 className="a-cta-title a-heading">A little note, just for you</h2>
                <p className="a-cta-text">
                  Variety in feeding: you can now add very small amounts of well-cooked whole grains, soft pasta, or
                  soft bread to Atlas&apos;s diet — no salt or sugar, natural flavors are best. Offer one new
                  texture at a time and watch how he responds; his curiosity at the table is a great sign.
                </p>
              </div>
            </section>

            {/* Quick access — premium tools open the paywall sheet */}
            <QuickAccess />

            {/* Weekly trends */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Weekly review</h2>
                <span className="a-section-link">
                  Details <ChevronRight size={13} />
                </span>
              </div>
              <div className="a-list-card">
                {trends.map((t) => (
                  <div key={t.label} className="a-list-row">
                    <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 17 }}>
                      {t.icon}
                    </span>
                    <div>
                      <p className="a-list-title">{t.label}</p>
                      <p className="a-list-sub">{t.sub}</p>
                    </div>
                    <span className="a-list-trail" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="a-mini-dots">
                        {[4, 7, 5, 9, 6, 8, 5].map((h, i) => (
                          <span key={i} style={{ height: h }} />
                        ))}
                      </span>
                      <p className="a-list-value">{t.value}</p>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Teething */}
            <div className="a-section">
              <TeethingCard />
            </div>

            {/* Growth */}
            <div className="a-section">
              <GrowthCard />
            </div>

            {/* Today hub (log + summary) */}
            <div className="a-section">
              <TodayHub />
            </div>

            {/* Milestones illustration */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Development milestones</h2>
                <span className="a-section-link">8/10</span>
              </div>
              <div className="a-card">
                <div className="a-illustration">
                  <span className="a-illustration-icon">
                    <Trophy size={26} strokeWidth={2} />
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="a-bar-mini">
                    {[6, 9, 7, 10, 8, 10, 6, 9, 4, 3].map((h, i) => (
                      <span key={i} className={i < 8 ? "hi" : ""} style={{ height: `${h * 3}px` }} />
                    ))}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>8/10</p>
                    <p style={{ margin: "2px 0 0", fontSize: 10.5, color: "var(--a-ink-soft)", fontWeight: 700 }}>milestones met</p>
                  </div>
                </div>
                <p className="a-teaser">
                  Sitting, crawling, and standing achieved. <strong>Next up: first steps</strong> — typically 9–15 months.
                </p>
              </div>
            </section>

            {/* Crisis calendar */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Crisis calendar</h2>
                <span className="a-section-link">Next: week 46</span>
              </div>
              <div className="a-card" style={{ padding: "6px 18px" }}>
                {leaps.map((leap) => (
                  <div key={leap.title} className="a-rank-row">
                    <span className="a-rank-avatar" style={{ background: "var(--a-peach-1)", color: "var(--a-accent-ink)" }}>
                      <Calendar size={17} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="a-rank-title">{leap.title}</p>
                      <p className="a-rank-sub">{leap.meta}</p>
                    </div>
                    <span className={`a-rank-tag ${leap.tag.toLowerCase()}`}>{leap.tag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <div className="a-section">
              <RecommendationTeaser />
            </div>

            {/* Articles */}
            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Recent articles</h2>
                <span className="a-section-link">
                  All <ChevronRight size={13} />
                </span>
              </div>
              <div className="a-card" style={{ padding: "6px 18px" }}>
                {articles.map((a) => (
                  <div key={a.title} className="a-article-row">
                    <span className="a-article-thumb" style={{ background: "var(--a-peach-1)" }}>
                      {a.emoji}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p className="a-article-title">{a.title}</p>
                      <div className="a-article-meta">
                        <span>
                          <Clock3 size={10} /> {a.read}
                        </span>
                        <span>
                          <ThumbsUp size={10} /> {a.likes}
                        </span>
                        <span>{a.time} ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="a-disclaimer">
              <Stethoscope size={15} style={{ flexShrink: 0, marginTop: 1, color: "rgba(90, 45, 18, 0.85)" }} />
              <p>
                This information is for educational purposes only and is <strong>NOT</strong> a substitute for
                medical advice, diagnosis, or treatment. Always consult your doctor before making medical decisions.
                In an emergency, call <strong>103</strong>.
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
