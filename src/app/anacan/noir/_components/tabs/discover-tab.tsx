"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { NoirProfile } from "../../_lib/noir-store";
import { ARTICLES, GOAL_META, type Article } from "../../_lib/noir-content";

export function DiscoverTab({
  profile,
  onOpen,
}: {
  profile: NoirProfile;
  onOpen: (a: Article) => void;
}) {
  const goal = profile.goal ?? "cycle";
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Sizin üçün");

  const categories = useMemo(() => {
    const set = new Set<string>(["Sizin üçün", "Hamısı"]);
    ARTICLES.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, []);

  const list = useMemo(() => {
    let items = ARTICLES;
    if (cat === "Sizin üçün") items = items.filter((a) => a.goals.includes(goal));
    else if (cat !== "Hamısı") items = items.filter((a) => a.category === cat);
    const q = query.trim().toLowerCase();
    if (q) items = items.filter((a) => (a.title + a.excerpt).toLowerCase().includes(q));
    return items;
  }, [cat, query, goal]);

  return (
    <>
      <header className="n-home-top">
        <div>
          <p className="n-home-greet">Kitabxana</p>
          <h1 className="n-home-name n-display">Kəşf edin</h1>
          <p className="n-home-date">Ekspert yoxlanışlı, {GOAL_META[goal].label.toLowerCase()} rejiminizə uyğun</p>
        </div>
      </header>

      <div className="n-control" style={{ marginBottom: 14 }}>
        <Search size={16} strokeWidth={2.2} />
        <input
          className="n-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Mövzu axtarın: yuxu, peyvənd, PMS…"
          aria-label="Məqalə axtarışı"
        />
      </div>

      <div className="n-chips" style={{ marginBottom: 18 }}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`n-chip${cat === c ? " on" : ""}`}
            style={{ padding: "8px 13px", fontSize: 11.5 }}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((article, i) => (
          <button
            key={article.id}
            type="button"
            className={`n-article n-rise-in${i < 4 ? ` n-d${i + 1}` : ""}`}
            onClick={() => onOpen(article)}
          >
            <span className="n-article-thumb" style={{ background: article.accent }}>
              {article.emoji}
            </span>
            <span style={{ minWidth: 0 }}>
              <p className="n-article-title">{article.title}</p>
              <p className="n-daily-text" style={{ marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {article.excerpt}
              </p>
              <span className="n-article-meta">
                <span>{article.category}</span>
                <span>{article.mins} dəq</span>
              </span>
            </span>
          </button>
        ))}
        {list.length === 0 && (
          <div className="n-card" style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 26 }}>🔍</p>
            <p style={{ margin: "8px 0 0", fontSize: 13, fontWeight: 700 }}>Heç nə tapılmadı</p>
            <p className="n-hint" style={{ marginTop: 4 }}>
              Başqa açar söz və ya kateqoriya sınayın
            </p>
          </div>
        )}
      </div>

      <div className="n-quote" style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "flex-start", padding: "15px 16px", borderRadius: "var(--n-r-md)", background: "var(--n-surface)", border: "1px solid var(--n-line)" }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>🩺</span>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "var(--n-soft)", fontWeight: 500 }}>
          <strong style={{ color: "var(--n-ink)" }}>Ekspertdən:</strong> “Ən yaxşı məlumat mənbəyi — etibarlı,
          yoxlanılmış və sizin vəziyyətinizə uyğun olandır. Hər oxuduğunuzu həkiminizlə müzakirə etməkdən
          çəkinməyin.”
        </p>
      </div>
    </>
  );
}
