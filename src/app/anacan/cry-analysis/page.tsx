import { Stethoscope } from "lucide-react";
import { BottomNav } from "../_components/bottom-nav";
import { CryAnalyzer } from "./_components/cry-analyzer";

const tips = [
  { emoji: "🤫", title: "Sakit mühit", text: "Fon səslərini (TV, danışıq) minimuma endirin — analiz dəqiqliyi artır." },
  { emoji: "📏", title: "Yaxın məsafə", text: "Telefonu körpədən 30–50 sm məsafədə tutun." },
  { emoji: "⏱️", title: "5–10 saniyə", text: "Qısa, davamlı ağlama nümunəsi ən yaxşı nəticəni verir." },
];

export default function CryAnalysisPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-scroll-area">
          <div className="a-shell">
            <section className="a-hero-min a-fade-in" style={{ textAlign: "left", padding: "20px 2px 6px" }}>
              <p className="a-hero-eyebrow" style={{ justifyContent: "flex-start" }}>
                Anacan · AI
              </p>
              <h1 className="a-hero-headline a-heading" style={{ margin: 0, maxWidth: "none", fontSize: 24 }}>
                Ağlama Analizi
              </h1>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--a-ink-soft)" }}>
                AI ilə ağlama səbəbini anlayın
              </p>
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
                  <span className="a-list-trail">
                    <p className="a-list-value">✨ AI</p>
                  </span>
                </div>
              </div>
            </div>

            <div className="a-section">
              <CryAnalyzer />
            </div>

            <section className="a-section">
              <div className="a-section-head">
                <h2 className="a-section-title a-heading">Dəqiq nəticə üçün</h2>
              </div>
              <div className="a-trio">
                {tips.map((t) => (
                  <div key={t.title} className="a-trio-item">
                    <span className="a-trio-icon" style={{ background: "var(--a-surface-soft)", fontSize: 18 }}>
                      {t.emoji}
                    </span>
                    <p className="a-trio-label" style={{ color: "var(--a-ink)" }}>{t.title}</p>
                    <p className="a-tool-sub" style={{ WebkitLineClamp: 3 }}>{t.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="a-disclaimer">
              <Stethoscope size={15} style={{ flexShrink: 0, marginTop: 1, color: "var(--a-ink-soft)" }} />
              <p>
                AI analizi yalnız istiqamətləndirici xarakter daşıyır və <strong>tibbi diaqnoz deyil</strong>.
                Körpəniz dayanmadan ağlayırsa, hərarəti varsa və ya narahatlığı davam edirsə, mütləq həkiminizə
                müraciət edin. Təcili hallarda <strong>103</strong>-ə zəng edin.
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
