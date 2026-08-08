"use client";

import { Building2, MapPin, Search, Star, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";

type Category = "all" | "hospital" | "gynecology" | "ivf" | "pediatrics" | "mamologiya";

interface Partner {
  id: string;
  kind: "hospital" | "doctor";
  name: string;
  type: string;
  address: string;
  rating?: number;
  reviews?: number;
  recommended?: boolean;
  categories: Category[];
}

const categoryFilters: { key: Category; emoji: string; label: string }[] = [
  { key: "all", emoji: "✨", label: "Hamısı" },
  { key: "hospital", emoji: "🏥", label: "Xəstəxana" },
  { key: "gynecology", emoji: "👩‍⚕️", label: "Ginekologiya" },
  { key: "ivf", emoji: "🔬", label: "IVF" },
  { key: "pediatrics", emoji: "👶", label: "Pediatriya" },
  { key: "mamologiya", emoji: "🩺", label: "Mamologiya" },
];

const GRADIENTS = ["var(--a-grad-peach)", "var(--a-grad-pink)", "var(--a-grad-lav)", "var(--a-grad-blue)", "var(--a-grad-green)", "var(--a-grad-yellow)"];
const INK_COLORS = ["#8a4514", "#a3355f", "#4b2f8a", "#1c5a80", "#1c7a4d", "#7a5200"];

const partners: Partner[] = [
  {
    id: "h1",
    kind: "hospital",
    name: "Liv Bona Dea Hospital",
    type: "Xəstəxana · Çoxprofilli",
    address: "Nizami r-nu, Mehdi Abbasov küç. 2",
    rating: 4.8,
    reviews: 156,
    recommended: true,
    categories: ["hospital"],
  },
  {
    id: "h2",
    kind: "hospital",
    name: "Baku Medical Plaza (Babək)",
    type: "Xəstəxana · IVF və Mamalıq",
    address: "Xətai r-nu, Babək pr. 92N",
    rating: 4.7,
    reviews: 203,
    recommended: true,
    categories: ["hospital", "ivf", "mamologiya"],
  },
  {
    id: "h3",
    kind: "hospital",
    name: "Leyla Tibb Mərkəzi",
    type: "Klinika · Pediatriya və Mamalıq",
    address: "Xətai r-nu, Yusif Səfərov küç. 19",
    rating: 4.6,
    reviews: 178,
    recommended: true,
    categories: ["hospital", "pediatrics", "mamologiya"],
  },
  {
    id: "h4",
    kind: "hospital",
    name: "Caspian International Hospital",
    type: "Xəstəxana · Mamalıq və Neonatologiya",
    address: "Badamdar qəs., 1-ci yaşayış massivi, 31",
    recommended: true,
    categories: ["hospital", "mamologiya"],
  },
  {
    id: "d1",
    kind: "doctor",
    name: "Uzman Doktor Aynurə Həmidova",
    type: "Həkim · Mama ginekoloq",
    address: "Liv Bona Dea Hospital, 2 Mehdi Abbasov",
    rating: 5.0,
    categories: ["gynecology", "mamologiya"],
  },
  {
    id: "d2",
    kind: "doctor",
    name: "Uzman Doktor Leyla İbrahimli",
    type: "Həkim · Mama ginekoloq",
    address: "Baku Medical Plaza / Medilux, AZ1069, Kral Hüseyn 66B, Nərimanov r-nu, Bakı, Azərbaycan",
    rating: 5.0,
    categories: ["gynecology", "mamologiya"],
  },
  {
    id: "d3",
    kind: "doctor",
    name: "Dr. Aynurə İbrahimova",
    type: "Həkim · Uşaq nevrologiyası",
    address: "Sabunçu Tibb Mərkəzi – Terapevtik Poliklinika Bölməsi, City Clinic Hospital №3, Baku, Azerbaijan",
    rating: 5.0,
    categories: ["pediatrics"],
  },
  {
    id: "d4",
    kind: "doctor",
    name: "Uzman Doktor Gültap Xalıqlı",
    type: "Həkim · Mama ginekoloq",
    address: "Ege Hospital, 38 Həsən Əliyev Küçəsi",
    rating: 5.0,
    categories: ["gynecology", "mamologiya"],
  },
  {
    id: "d5",
    kind: "doctor",
    name: "Dr. Mədinə Dilbazi",
    type: "Həkim · Endokrinoloq",
    address: "Leyla Medical Center, Y. Səfəroğlu 19",
    rating: 5.0,
    categories: [],
  },
  {
    id: "d6",
    kind: "doctor",
    name: "Dr. Rəxşəndə Əliyeva",
    type: "Həkim · Mama ginekoloq",
    address: "DTX Hospital, 8RQ3+H6X, Nuraddin Pashayev St, Baku, Azerbaijan",
    rating: 5.0,
    categories: ["gynecology", "mamologiya"],
  },
  {
    id: "d7",
    kind: "doctor",
    name: "Dr. Zaynap Şaqidulina",
    type: "Həkim · Mama ginekoloq",
    address: "German Hospital, Yasamal r-nu, İsmayıl bəy Qutqaşınlı küç., 50",
    rating: 5.0,
    categories: ["gynecology", "mamologiya"],
  },
  {
    id: "d8",
    kind: "doctor",
    name: "Dr. Arzu Əyyubova",
    type: "Həkim · Endokrinoloq",
    address: "Universal Hospital, 196 Jafar Khandan St, Baku, Azerbaijan",
    rating: 5.0,
    categories: [],
  },
  {
    id: "h5",
    kind: "hospital",
    name: "Modern Hospital",
    type: "Xəstəxana · Çoxprofilli",
    address: "Babək pr. 85K",
    rating: 4.4,
    reviews: 98,
    categories: ["hospital"],
  },
];

export function PartnersDirectory() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners.filter((p) => {
      const matchesCategory = category === "all" || p.categories.includes(category);
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div>
      <div className="a-search">
        <Search size={15} strokeWidth={2} color="var(--a-ink-faint)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Həkim, xəstəxana axtar..."
          aria-label="Search doctors and hospitals"
        />
      </div>

      <div className="a-partner-filters" style={{ marginTop: 14 }}>
        {categoryFilters.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`a-tag${category === c.key ? " on" : ""}`}
            onClick={() => setCategory(c.key)}
          >
            <span>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="a-partner-list" style={{ marginTop: 16 }}>
        {visible.map((p, i) => (
          <button key={p.id} type="button" className="a-partner-card a-fade-in">
            <span
              className="a-partner-icon"
              style={{ background: GRADIENTS[i % GRADIENTS.length], color: INK_COLORS[i % INK_COLORS.length] }}
            >
              {p.kind === "hospital" ? <Building2 size={19} strokeWidth={2} /> : <Stethoscope size={19} strokeWidth={2} />}
            </span>
            <div className="a-partner-body">
              {p.recommended && (
                <span className="a-partner-recommended">
                  <Star size={10} fill="#f6ac1d" color="#f6ac1d" /> Tövsiyyə olunan
                </span>
              )}
              <p className="a-partner-name">{p.name}</p>
              <p className="a-partner-type">{p.type}</p>
              <span className="a-partner-address">
                <MapPin size={11} strokeWidth={2} />
                {p.address}
              </span>
              {p.rating && (
                <div className="a-partner-rating">
                  <Star size={13} fill="var(--a-ink)" color="var(--a-ink)" />
                  {p.rating.toFixed(1)}
                  {p.reviews && <span className="a-partner-rating-count">({p.reviews})</span>}
                </div>
              )}
            </div>
          </button>
        ))}

        {visible.length === 0 && (
          <div className="a-card" style={{ textAlign: "center", color: "var(--a-ink-soft)", fontSize: 13 }}>
            Nəticə tapılmadı.
          </div>
        )}
      </div>
    </div>
  );
}
