import { BottomNav } from "../_components/bottom-nav";
import { PartnersDirectory } from "./_components/partners-directory";

export default function PartnersPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · Partners
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none", fontSize: 24 }}>
                Həkimlər və Xəstəxanalar
              </h1>
            </section>

            <div className="a-section">
              <PartnersDirectory />
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
