import { BottomNav } from "../_components/bottom-nav";
import { CommunityFeed } from "./_components/community-feed";

export default function CommunityPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            {/* Header */}
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · Community
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none" }}>
                Cəmiyyət
              </h1>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--a-ink-soft)" }}>
                Digər qadınlar ilə əlaqədə olun
              </p>
            </section>

            <div className="a-section">
              <CommunityFeed />
            </div>
          </div>
        </div>

        <BottomNav defaultActive="community" />
      </div>
    </div>
  );
}
