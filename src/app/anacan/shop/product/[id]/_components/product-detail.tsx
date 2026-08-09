"use client";

import { Check, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CATEGORY_COPY,
  categoryOf,
  discountPct,
  formatPrice,
  ratingOf,
  type Product,
} from "../../../_lib/catalog";
import { addToCart } from "../../../_lib/shop-store";
import { CATEGORY_ICONS, ProductCard, ProductThumb } from "../../../_components/product-card";

export function ProductDetail({ product, related = [] }: { product: Product; related?: Product[] }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cat = categoryOf(product.category);
  const Icon = CATEGORY_ICONS[product.category];
  const copy = CATEGORY_COPY[product.category];
  const rating = ratingOf(product);
  const pct = discountPct(product);

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
  };

  return (
    <>
      <div className="sh-scroll">
        <div className="sh-shell" style={{ paddingTop: 4 }}>
          <ProductThumb product={product} iconSize={84} className="sh-hero" />

          <span className="sh-cat-chip">
            <Icon size={12} strokeWidth={2.2} /> {cat.label}
          </span>
          <h1 className="sh-detail-title">{product.title}</h1>
          <p className="sh-rating">
            <span className="stars">
              {"★".repeat(Math.round(rating.stars))}
              {"☆".repeat(5 - Math.round(rating.stars))}
            </span>
            {rating.stars} · {rating.count} rəy
          </p>

          <div className="sh-detail-price">
            <span className="now">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="was">{formatPrice(product.oldPrice)}</span>}
            {pct !== null && product.oldPrice && (
              <span className="save">−{formatPrice(product.oldPrice - product.price)} qənaət</span>
            )}
          </div>

          <div className="sh-section">
            <h2 className="sh-section-title">Haqqında</h2>
            <p className="sh-desc">{copy.desc}</p>
          </div>

          <div className="sh-section">
            <h2 className="sh-section-title">Xüsusiyyətlər</h2>
            <div className="a-card" style={{ padding: "6px 16px" }}>
              {copy.features.map((feature) => (
                <div key={feature} className="sh-feature">
                  <Check size={14} strokeWidth={2.8} />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="sh-section">
            <h2 className="sh-section-title">Çatdırılma və zəmanət</h2>
            <div className="a-card" style={{ padding: "4px 16px" }}>
              <div className="sh-trust">
                <span className="sh-trust-icon">
                  <Truck size={15} strokeWidth={2.2} />
                </span>
                Bakı daxili 1–2 iş günü · 100₼-dən yuxarı pulsuz
              </div>
              <div className="sh-trust">
                <span className="sh-trust-icon">
                  <RotateCcw size={15} strokeWidth={2.2} />
                </span>
                14 gün ərzində rahat qaytarma
              </div>
              <div className="sh-trust">
                <span className="sh-trust-icon">
                  <ShieldCheck size={15} strokeWidth={2.2} />
                </span>
                Rəsmi distribütor zəmanəti
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="sh-section" style={{ paddingBottom: 4 }}>
            <h2 className="sh-section-title" style={{ padding: "0 18px" }}>
              Bənzər məhsullar
            </h2>
            <div className="sh-related">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="sh-footer">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="sh-qty">
            <button type="button" disabled={qty <= 1} onClick={() => setQty((v) => v - 1)} aria-label="Azalt">
              −
            </button>
            <span>{qty}</span>
            <button type="button" disabled={qty >= 9} onClick={() => setQty((v) => v + 1)} aria-label="Artır">
              +
            </button>
          </div>
          {added ? (
            <button type="button" className="sh-cta dark" onClick={() => router.push("/anacan/shop/cart")}>
              <ShoppingBag size={16} strokeWidth={2.4} /> Səbətə keç
            </button>
          ) : (
            <button type="button" className="sh-cta" onClick={handleAdd}>
              <ShoppingBag size={16} strokeWidth={2.4} /> Səbətə əlavə et · {formatPrice(product.price * qty)}
            </button>
          )}
        </div>
        {added && (
          <p className="sh-footer-note" style={{ color: "#1c7a4d" }}>
            ✓ Səbətə əlavə olundu
          </p>
        )}
      </footer>
    </>
  );
}
