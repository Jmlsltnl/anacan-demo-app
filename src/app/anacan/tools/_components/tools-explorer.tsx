"use client";

import {
  Briefcase,
  Cake,
  Calculator,
  Camera,
  ChefHat,
  CloudSun,
  Droplets,
  Ear,
  Footprints,
  Gauge,
  Images,
  NotebookPen,
  Pill,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Syringe,
  Tag,
  Timer,
  TrendingUp,
  Utensils,
  Wand2,
  Waves,
} from "lucide-react";
import { useMemo, useState } from "react";

const GRADIENTS = [
  "var(--a-grad-peach)",
  "var(--a-grad-pink)",
  "var(--a-grad-lav)",
  "var(--a-grad-blue)",
  "var(--a-grad-green)",
  "var(--a-grad-yellow)",
];
const INK_COLORS = ["#8a4514", "#a3355f", "#4b2f8a", "#1c5a80", "#1c7a4d", "#7a5200"];

function ToothIcon({ size = 16 }: { size?: number; strokeWidth?: number; color?: string }) {
  return <span style={{ fontSize: size + 2, lineHeight: 1 }}>🦷</span>;
}

const featured = [
  {
    key: "fotosessiya",
    badge: "✨ AI",
    title: "Fotosessiya",
    text: "AI ilə unikal körpə şəkilləri yaradın",
    icon: Sparkles,
    bg: "var(--a-grad-lav)",
    ink: "#3c2e5c",
  },
  {
    key: "reseptler",
    badge: "🍳 Populyar",
    title: "Reseptlər",
    text: "Sağlam və dadlı reseptlər",
    icon: ChefHat,
    bg: "var(--a-grad-peach)",
    ink: "#5c3417",
  },
];

const tools = [
  { title: "Tortlar", text: "Xüsusi günlər üçün tortlar", icon: Cake },
  { title: "İnkişaf izləyicisi", text: "Körpənin çəkisi, boyu və baş ölçülərini izləyin", icon: TrendingUp },
  { title: "Həkim və Klinikalar", text: "Tibb müəssisələrini tapın", icon: Stethoscope },
  { title: "Peyvənd Təqvimi", text: "Uşağınızın peyvənd qrafikini izləyin", icon: Syringe },
  { title: "Bloqlar", text: "Faydalı məqalələr oxuyun", icon: NotebookPen },
  { title: "Körpə Adları", text: "Azərbaycan adları seçin", icon: Tag },
  { title: "Dekret Kalkulyatoru", text: "Azərbaycan qanunvericiliyinə uyğun dekret ödənişini hesablayın", icon: Calculator },
  { title: "Ağlama analizi", text: "Ağlama səbəbini anlayın", icon: Ear },
  { title: "Qidalanma", text: "Sağlam qidalanma planı", icon: Utensils },
  { title: "Diş Çıxarma İzləyicisi", text: "Körpənizin dişlərinin çıxmasını izləyin", icon: ToothIcon },
  { title: "Ortaq Alışveriş", text: "Partnyor ilə ortaq siyahı", icon: ShoppingCart },
  { title: "Hava və Geyim", text: "Havaya uyğun geyim tövsiyələri", icon: CloudSun },
  { title: "Səs-Küy Ölçər", text: "Yuxu mühitinin səs-küyünü ölçün", icon: Gauge },
  { title: "Təhlükəsizlik", text: "Yemək və fəaliyyətləri yoxlayın", icon: ShieldCheck },
  { title: "Körpə Albomu", text: "Hər ay bir xatirə - körpənizin böyüməsini izləyin", icon: Images },
  { title: "Təpik Sayğacı", text: "Körpə hərəkətlərini izləyin", icon: Footprints },
  { title: "Sancı Ölçən", text: "5-1-1 qaydası ilə izləyin", icon: Timer },
  { title: "Qan Şəkəri", text: "Qan şəkəri izləyicisi", icon: Droplets },
  { title: "Çəki İzləyici", text: "AI analizli çəki izləmə", icon: Scale },
  { title: "Sehrli Nağılçı", text: "AI ilə fərdi nağıllar yaradın", icon: Wand2 },
  { title: "Vitamin İzləyicisi", text: "Gündəlik vitamin qəbulunu izləyin və xatırlatma alın", icon: Pill },
  { title: "Hamiləlik Albomu", text: "Hamiləlik səyahətinizi sənədləşdirin", icon: Camera },
  { title: "Xəstəxana Çantası", text: "Doğuma hazırlıq siyahısı", icon: Briefcase },
  { title: "Bəyaz Küylər", text: "Körpəni sakitləşdirin", icon: Waves },
  { title: "Əhval Gündəliyi", text: "Əhvalınızı izləyin", icon: NotebookPen },
];

export function ToolsExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const all = [
      ...featured.map((f) => ({ title: f.title, text: f.text, icon: f.icon })),
      ...tools,
    ];
    return all.filter((t) => t.title.toLowerCase().includes(q) || t.text.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <div className="a-search">
        <span style={{ fontSize: 15 }}>🌸</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Alət axtarın..."
          aria-label="Search tools"
        />
        {!query && <Search size={15} strokeWidth={2} color="var(--a-ink-faint)" />}
      </div>

      {filtered ? (
        <div className="a-section">
          <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "var(--a-ink-soft)" }}>
            {filtered.length} nəticə
          </p>
          {filtered.length > 0 ? (
            <div className="a-tool-grid">
              {filtered.map((t, i) => (
                <button key={t.title} type="button" className="a-tool-tile">
                  <span className="a-tool-icon" style={{ background: GRADIENTS[i % GRADIENTS.length], color: INK_COLORS[i % INK_COLORS.length] }}>
                    <t.icon size={17} strokeWidth={2} />
                  </span>
                  <p className="a-tool-title">{t.title}</p>
                  <p className="a-tool-sub">{t.text}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="a-card" style={{ textAlign: "center", color: "var(--a-ink-soft)", fontSize: 13 }}>
              Nəticə tapılmadı.
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="a-section" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {featured.map((f) => (
              <div key={f.key} className="a-cta a-fade-in" style={{ background: f.bg }}>
                <span className="a-cta-shape" style={{ width: 130, height: 130, top: -45, right: -35 }} />
                <div className="a-cta-top">
                  <span className="a-cta-badge">
                    {f.badge} · Premium
                  </span>
                  <span className="a-cta-deco" style={{ color: f.ink }}>
                    <f.icon size={18} strokeWidth={2} />
                  </span>
                </div>
                <h2 className="a-cta-title a-heading" style={{ color: f.ink }}>
                  {f.title}
                </h2>
                <p className="a-cta-text" style={{ color: `${f.ink}b3` }}>
                  {f.text}
                </p>
                <span className="a-cta-btn">Aç</span>
              </div>
            ))}
          </div>

          <section className="a-section">
            <div className="a-section-head">
              <h2 className="a-section-title a-heading">Bütün alətlər</h2>
              <span className="a-section-link">{tools.length} alət</span>
            </div>
            <div className="a-tool-grid">
              {tools.map((t, i) => (
                <button key={t.title} type="button" className="a-tool-tile">
                  <span className="a-tool-icon" style={{ background: GRADIENTS[i % GRADIENTS.length], color: INK_COLORS[i % INK_COLORS.length] }}>
                    <t.icon size={17} strokeWidth={2} />
                  </span>
                  <p className="a-tool-title">{t.title}</p>
                  <p className="a-tool-sub">{t.text}</p>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
