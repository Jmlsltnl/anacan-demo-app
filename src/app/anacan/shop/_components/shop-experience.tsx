"use client";

import { ChevronDown, Search, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, discountPct, type CategoryId } from "../_lib/catalog";
import { ProductCard } from "./product-card";

type SortId = "newest" | "priceAsc" | "priceDesc" | "discount";

const SORTS: { id: SortId; label: string }[] = [
  { id: "newest", label: "Ən yenilər" },
  { id: "priceAsc", label: "Ucuzdan bahaya" },
  { id: "priceDesc", label: "Bahadan ucuza" },
  { id: "discount", label: "Endirim faizi" },
];

const PAGE_SIZES = [12, 24, 36];

export function ShopExperience() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("newest");
  const [pageSize, setPageSize] = useState(12);
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => {
    let items = PRODUCTS;
    if (category !== "all") items = items.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) items = items.filter((p) => p.title.toLowerCase().includes(q));
    switch (sort) {
      case "priceAsc":
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case "discount":
        items = [...items].sort((a, b) => (discountPct(b) ?? 0) - (discountPct(a) ?? 0));
        break;
      default:
        break; // catalog order = newest
    }
    return items;
  }, [category, query, sort]);

  const shown = filtered.slice(0, visible);
  const resetPaging = (size = pageSize) => setVisible(size);

  return (
    <>
      {/* Search */}
      <div className="sh-shell" style={{ paddingTop: 4 }}>
        <div className="sh-search">
          <Search size={16} strokeWidth={2.2} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            placeholder="Məhsul axtarın: araba, oturacaq, şezlonq…"
            aria-label="Məhsul axtarışı"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="sh-cats">
        <button
          type="button"
          className={`sh-cat${category === "all" ? " on" : ""}`}
          onClick={() => {
            setCategory("all");
            resetPaging();
          }}
        >
          Hamısı
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`sh-cat${category === cat.id ? " on" : ""}`}
            onClick={() => {
              setCategory(cat.id);
              resetPaging();
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="sh-shell">
        {/* Toolbar */}
        <div className="sh-toolbar">
          <p className="sh-count">
            {filtered.length} məhsuldan {Math.min(shown.length, filtered.length)} göstərilir
          </p>
          <div className="sh-selects">
            <select
              className="sh-select"
              value={pageSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setPageSize(size);
                resetPaging(size);
              }}
              aria-label="Səhifədə göstər"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  Göstər {size}
                </option>
              ))}
            </select>
            <select
              className="sh-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortId);
                resetPaging();
              }}
              aria-label="Sıralama"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Free delivery strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            padding: "10px 13px",
            borderRadius: 13,
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--a-accent-ink)",
          }}
        >
          <Truck size={14} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          100₼-dən yuxarı sifarişlərə çatdırılma pulsuzdur · “ANACAN10” ilə −10%
        </div>

        {/* Grid */}
        {shown.length > 0 ? (
          <div className="sh-grid">
            {shown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="sh-empty">
            <div className="sh-empty-icon">
              <Search size={30} strokeWidth={1.8} />
            </div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "var(--a-ink)" }}>Heç nə tapılmadı</p>
            <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 600, color: "var(--a-on-bg-soft)" }}>
              Başqa açar söz və ya kateqoriya sınayın
            </p>
          </div>
        )}

        {shown.length < filtered.length && (
          <button type="button" className="sh-more" onClick={() => setVisible((v) => v + pageSize)}>
            Daha çox göstər ({filtered.length - shown.length}) <ChevronDown size={15} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </>
  );
}
