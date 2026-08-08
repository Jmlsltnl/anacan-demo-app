import { BottomNav } from "../_components/bottom-nav";
import { CareTabs } from "./_components/care-tabs";
import { ToothChart } from "./_components/tooth-chart";

export default function TeethingTrackerPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · Teething
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none", fontSize: 24 }}>
                Diş Çıxarma İzləyicisi
              </h1>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--a-ink-soft)" }}>Atlas dişlərini izləyin</p>
            </section>

            <div className="a-section">
              <div className="a-list-card">
                <div className="a-list-row">
                  <span className="a-list-icon" style={{ background: "var(--a-grad-peach)", fontSize: 20 }}>
                    👦
                  </span>
                  <div>
                    <p className="a-list-title">Atlas</p>
                    <p className="a-list-sub">9 ay 21 gün</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="a-section">
              <ToothChart />
            </div>

            <CareTabs />
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
