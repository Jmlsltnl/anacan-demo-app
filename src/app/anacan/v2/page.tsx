import {
  Baby,
  BookOpen,
  Calendar,
  Camera,
  ChevronRight,
  Droplets,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Moon,
  Ruler,
  Sandwich,
  Scale,
  Stethoscope,
  ThumbsUp,
  Trophy,
  Volume2,
} from "lucide-react";
import { BottomNav } from "./_components/bottom-nav";
import { HeroActions } from "./_components/hero-actions";
import { LeapDisclosure } from "./_components/leap-disclosure";
import { TodayInfoDisclosure } from "./_components/today-info-disclosure";

const snapshot = [
  { icon: Droplets, label: "Water", value: "2/12", color: "#3f8ff2" },
  { icon: Moon, label: "Sleep", value: "0 min", color: "#17181c" },
  { icon: Sandwich, label: "Feeding", value: "0×", color: "#2fbf78" },
  { icon: Baby, label: "Diaper", value: "0×", color: "#17181c" },
  { icon: null, label: "Teeth", value: "2/20", color: "#3f8ff2", emoji: "🦷" },
];

const quickAccess = [
  { icon: MessageCircle, label: "Cry Translator" },
  { icon: Camera, label: "Photoshoot" },
  { icon: BookOpen, label: "Fairy Tales" },
  { icon: Volume2, label: "White Noise" },
];

const badges = [
  { label: "Water", value: "2/12", icon: Droplets, cls: "w-bg-blue" },
  { label: "Sleep", value: "0 sess.", icon: Moon, cls: "w-bg-black" },
  { label: "Feeding", value: "0 times", icon: Sandwich, cls: "w-bg-green" },
  { label: "Diaper", value: "0 times", icon: Baby, cls: "w-bg-black" },
  { label: "Teeth", value: "2/20", icon: Info, cls: "w-bg-blue" },
  { label: "This week", value: "5/7 days", icon: Calendar, cls: "w-bg-green" },
];

const devGrid = [
  { label: "Weight", value: "8.9 kg", icon: Scale },
  { label: "Height", value: "74 cm", icon: Ruler },
  { label: "Head circ.", value: "45 cm", icon: Baby },
  { label: "Teeth", value: "2 / 20", icon: Info },
  { label: "Avg. sleep", value: "0.0 h", icon: Moon },
  { label: "Avg. feeding", value: "0.0×", icon: Sandwich },
  { label: "Avg. diaper", value: "0.0×", icon: Droplets },
  { label: "Milestones", value: "8 / 10", icon: Trophy },
  { label: "Age", value: "294 d", icon: Calendar },
  { label: "Percentile", value: "65th", icon: Ruler },
];

const weekBars = [
  { d: "M", h: 42 },
  { d: "T", h: 58 },
  { d: "W", h: 36 },
  { d: "T", h: 64 },
  { d: "F", h: 50 },
  { d: "S", h: 20 },
  { d: "S", h: 14, active: true },
];

const articles = [
  { emoji: "🦷", title: "Teething Period: Natural and Safe Ways to Soothe Your Baby's Pain", read: "5 min", likes: 30 },
  { emoji: "🥣", title: "Introduction to Solid Foods: A Healthy and Safe Start", read: "5 min", likes: 25 },
  { emoji: "🌙", title: "Peaceful Sleep Guide: Establishing Your Baby's Sleep Routine", read: "5 min", likes: 30 },
  { emoji: "👀", title: "Baby's Vision Development: How and When They Start Seeing Clearly", read: "5 min", likes: 11 },
];

export default function AnacanV2Page() {
  return (
    <div className="w-app">
      <div className="w-page">
        <div className="w-screen">
          <div className="w-scroll-area">
            {/* Hero */}
            <section className="w-hero w-fade-in">
              <div className="w-hero-top">
                <span className="w-hero-loc">
                  <MapPin size={13} strokeWidth={2.3} />
                  Atlas · 9 months old
                </span>
                <HeroActions />
              </div>

              <div className="w-hero-chips">
                <span className="w-hero-chip">
                  <span style={{ fontSize: 14 }}>🦷</span>
                  <span>
                    <b>2/20</b>
                    <span>teeth in</span>
                  </span>
                </span>
                <span className="w-hero-chip">
                  <Calendar size={13} strokeWidth={2.3} />
                  <span>
                    <b>Wk 46</b>
                    <span>next leap</span>
                  </span>
                </span>
              </div>

              <div className="w-hero-main">
                <span className="w-hero-num">294</span>
                <span className="w-hero-unit">days</span>
              </div>
              <p className="w-hero-sub">9 months, 21 days old · 81% to first birthday</p>
              <p className="w-hero-desc">
                Active growth phase — grasping, swinging, and exploring everything within reach.
              </p>
              <span className="w-hero-cta">
                View milestones <ChevronRight size={13} strokeWidth={2.6} />
              </span>
            </section>

            <div className="w-shell">
              {/* Day snapshot strip */}
              <div className="w-section">
                <div className="w-card">
                  <div className="w-strip">
                    {snapshot.map((s) => (
                      <div key={s.label} className="w-strip-col">
                        <span className="w-strip-icon" style={{ background: `${s.color}1a` }}>
                          {s.emoji ? (
                            <span style={{ fontSize: 16 }}>{s.emoji}</span>
                          ) : (
                            s.icon && <s.icon size={16} strokeWidth={2} color={s.color} />
                          )}
                        </span>
                        <span className="w-strip-label">{s.label}</span>
                        <span className="w-strip-value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Today's info + leaps disclosures */}
              <div className="w-section">
                <div className="w-card">
                  <TodayInfoDisclosure full="With significant advancements in motor skills, emotional, and cognitive development, your baby has entered a period of intense activity — grasping, swinging, banging, dropping, and throwing anything within reach." />
                  <div className="w-strip-divider" />
                  <LeapDisclosure />
                </div>
              </div>

              {/* Quick access */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Quick access</h2>
                </div>
                <div className="w-card">
                  <div className="w-strip" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                    {quickAccess.map((tool) => (
                      <div key={tool.label} className="w-strip-col">
                        <span className="w-strip-icon" style={{ background: "var(--w-surface-2)" }}>
                          <tool.icon size={16} strokeWidth={2} color="var(--w-blue)" />
                        </span>
                        <span className="w-strip-label">{tool.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Message for mom - dark card */}
              <section className="w-section">
                <div className="w-dark-card w-fade-in">
                  <div className="w-dark-top">
                    <span className="w-dark-tag">Day 294 · Message for mom</span>
                    <span className="w-dark-icon">
                      <Heart size={15} strokeWidth={2.2} />
                    </span>
                  </div>
                  <p className="w-dark-quote">A little note, just for you</p>
                  <p className="w-dark-text">
                    Variety in feeding: you can now add very small amounts of well-cooked whole grains, soft pasta,
                    or soft bread to Atlas&apos;s diet — no salt or sugar, natural flavors are best.
                  </p>
                </div>
              </section>

              {/* Quick stat badges */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Quick stats</h2>
                </div>
                <div className="w-badges">
                  {badges.map((b) => (
                    <div key={b.label} className={`w-badge ${b.cls}`}>
                      <span className="w-badge-icon">
                        <b.icon size={17} strokeWidth={2.2} />
                      </span>
                      <span className="w-badge-value">{b.value}</span>
                      <span className="w-badge-label">{b.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Growth & development grid */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Growth &amp; development</h2>
                  <span className="w-section-link">Details</span>
                </div>
                <div className="w-card">
                  <div className="w-grid-2">
                    {devGrid.map((t) => (
                      <div key={t.label} className="w-tile">
                        <span className="w-tile-icon">
                          <t.icon size={15} strokeWidth={2} color="var(--w-blue)" />
                        </span>
                        <div>
                          <p className="w-tile-label">{t.label}</p>
                          <p className="w-tile-value">{t.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Weekly review bar chart */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Weekly review</h2>
                  <span className="w-section-link">This week</span>
                </div>
                <div className="w-card">
                  <div className="w-bars">
                    {weekBars.map((b, i) => (
                      <div key={i} className="w-bar-col">
                        <div className={`w-bar${b.active ? " active" : ""}`} style={{ height: `${b.h}%` }} />
                        <span className="w-bar-label">{b.d}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: "12px 0 0", fontSize: 11.5, color: "var(--w-ink-soft)" }}>
                    Logging is just getting started — averages will settle in after a few more days.
                  </p>
                </div>
              </section>

              {/* Growth percentile band */}
              <section className="w-section">
                <div className="w-card">
                  <div className="w-section-head" style={{ marginBottom: 0 }}>
                    <h2 className="w-section-title">Growth percentile</h2>
                    <span className="w-tile-icon" style={{ width: 26, height: 26 }}>
                      <Info size={13} strokeWidth={2} color="var(--w-ink-soft)" />
                    </span>
                  </div>
                  <div className="w-band-wrap">
                    <div className="w-band">
                      <span className="w-band-marker" style={{ left: "65%" }} />
                    </div>
                    <div className="w-band-labels">
                      <span>Low</span>
                      <span>Typical</span>
                      <span>High</span>
                    </div>
                  </div>
                  <p style={{ margin: "12px 0 0", fontSize: 11.5, color: "var(--w-ink-soft)", lineHeight: 1.5 }}>
                    Tracking in the <strong style={{ color: "var(--w-ink)" }}>65th percentile</strong> — a healthy,
                    steady growth curve for 9 months.
                  </p>
                </div>
              </section>

              {/* Development recommendations */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Development recommendations</h2>
                  <span className="w-section-link">9–12 mo</span>
                </div>
                <div className="w-card">
                  <div className="w-disclosure">
                    <span className="w-disclosure-icon">
                      <Sandwich size={16} strokeWidth={2} color="var(--w-blue)" />
                    </span>
                    <div>
                      <p className="w-disclosure-title">Solid foods</p>
                      <p className="w-disclosure-sub" style={{ whiteSpace: "normal" }}>
                        Gradually introduce new flavors — small amounts of soft, well-cooked whole grains and pasta.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent articles */}
              <section className="w-section">
                <div className="w-section-head">
                  <h2 className="w-section-title">Recent articles</h2>
                  <span className="w-section-link">All</span>
                </div>
                <div className="w-card">
                  {articles.map((a) => (
                    <div key={a.title} className="w-list-row">
                      <span className="w-list-thumb">{a.emoji}</span>
                      <div style={{ minWidth: 0 }}>
                        <p className="w-list-title">{a.title}</p>
                        <div className="w-list-meta">
                          <span>{a.read}</span>
                          <span>
                            <ThumbsUp size={10} style={{ display: "inline", marginRight: 3 }} />
                            {a.likes}
                          </span>
                          <span>4mo ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Disclaimer */}
              <div className="w-disclaimer">
                <p>
                  <Stethoscope size={12} style={{ display: "inline", marginRight: 5, verticalAlign: -1 }} />
                  This information is for educational purposes only and is <strong>NOT</strong> a substitute for
                  medical advice, diagnosis, or treatment. Always consult your doctor before making medical
                  decisions. In an emergency, call <strong>103</strong>.
                </p>
              </div>
            </div>
          </div>

          <BottomNav />
        </div>
      </div>
    </div>
  );
}
