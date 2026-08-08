import { BottomNav } from "../_components/bottom-nav";
import { ToolsExplorer } from "./_components/tools-explorer";

export default function ToolsPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · Tools
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none" }}>
                Alətlər
              </h1>
            </section>

            <div className="a-section">
              <ToolsExplorer />
            </div>
          </div>
        </div>

        <BottomNav defaultActive="tools" />
      </div>
    </div>
  );
}
