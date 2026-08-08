import { BottomNav } from "../_components/bottom-nav";
import { VaccineCalendar } from "./_components/vaccine-calendar";

export default function VaccinesPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · Vaccines
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none", fontSize: 24 }}>
                Peyvənd Təqvimi
              </h1>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--a-ink-soft)" }}>Milli İmmunizasiya Qrafiki</p>
            </section>

            <div className="a-section">
              <VaccineCalendar />
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
