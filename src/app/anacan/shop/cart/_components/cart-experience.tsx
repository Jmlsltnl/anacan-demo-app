"use client";

import { ShoppingBag, Tag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { formatPrice } from "../../_lib/catalog";
import {
  FREE_DELIVERY_FROM,
  applyPromo,
  cartLines,
  cartTotals,
  getCart,
  getServerCart,
  removeFromCart,
  removePromo,
  setQty,
  subscribeShop,
} from "../../_lib/shop-store";
import { ProductThumb } from "../../_components/product-card";

export function CartExperience() {
  const router = useRouter();
  const cart = useSyncExternalStore(subscribeShop, getCart, getServerCart);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);

  const lines = cartLines(cart);
  const totals = cartTotals(cart);

  if (lines.length === 0) {
    return (
      <div className="sh-scroll">
        <div className="sh-empty">
          <div className="sh-empty-icon">
            <ShoppingBag size={32} strokeWidth={1.8} />
          </div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "var(--a-ink)" }}>Səbətiniz boşdur</p>
          <p style={{ margin: "6px 0 18px", fontSize: 12, fontWeight: 600, color: "var(--a-on-bg-soft)" }}>
            Atlas üçün lazım olan hər şey bir toxunuş uzaqlıqdadır
          </p>
          <Link
            href="/anacan/shop"
            className="sh-cta"
            style={{ display: "inline-flex", padding: "0 26px", textDecoration: "none" }}
          >
            Alış-verişə başla
          </Link>
        </div>
      </div>
    );
  }

  const submitPromo = () => {
    if (applyPromo(promoInput)) {
      setPromoInput("");
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  return (
    <>
      <div className="sh-scroll">
        <div className="sh-shell" style={{ paddingTop: 4 }}>
          {/* Lines */}
          <div className="a-card" style={{ padding: "4px 16px" }}>
            {lines.map(({ product, qty }) => (
              <div key={product.id} className="sh-line">
                <Link href={`/anacan/shop/product/${product.id}`} aria-label={product.title}>
                  <ProductThumb product={product} iconSize={26} className="sh-line-thumb" />
                </Link>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                  <p className="sh-line-name">{product.title}</p>
                  <p className="sh-line-price">
                    {formatPrice(product.price * qty)}
                    {product.oldPrice && <small>{formatPrice(product.oldPrice * qty)}</small>}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7 }}>
                    <div className="sh-line-qty">
                      <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label="Azalt">
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, Math.min(9, qty + 1))}
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="sh-remove"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`${product.title} — səbətdən sil`}
                    >
                      <Trash2 size={14} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo */}
          <div className="sh-section">
            {cart.promo ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "11px 14px",
                  borderRadius: 13,
                  background: "#eef9f1",
                  border: "1px solid rgba(99, 189, 139, 0.4)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1c7a4d",
                }}
              >
                <Tag size={14} strokeWidth={2.2} />
                “{cart.promo}” tətbiq olundu — −10%
                <button
                  type="button"
                  onClick={removePromo}
                  aria-label="Promo kodu sil"
                  style={{ marginLeft: "auto", color: "#1c7a4d", display: "grid", placeItems: "center" }}
                >
                  <X size={14} strokeWidth={2.4} />
                </button>
              </div>
            ) : (
              <>
                <div className="sh-promo">
                  <input
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError(false);
                    }}
                    placeholder="Promo kod (məs: ANACAN10)"
                    aria-label="Promo kod"
                  />
                  <button type="button" onClick={submitPromo}>
                    Tətbiq et
                  </button>
                </div>
                {promoError && <p className="sh-err">Kod tanınmadı — “ANACAN10” sınayın</p>}
              </>
            )}
          </div>

          {/* Summary */}
          <div className="sh-section">
            <div className="a-card" style={{ padding: "12px 16px" }}>
              <div className="sh-sum-row">
                Ara cəm ({totals.itemCount} məhsul) <strong>{formatPrice(totals.subtotal)}</strong>
              </div>
              {totals.savings > 0 && (
                <div className="sh-sum-row">
                  Endirim qənaəti <span className="free">−{formatPrice(totals.savings)}</span>
                </div>
              )}
              {totals.promoDiscount > 0 && (
                <div className="sh-sum-row">
                  Promo (−10%) <span className="free">−{formatPrice(totals.promoDiscount)}</span>
                </div>
              )}
              <div className="sh-sum-row">
                Çatdırılma{" "}
                {totals.freeDelivery ? (
                  <span className="free">Pulsuz</span>
                ) : (
                  <strong>{formatPrice(totals.delivery)}</strong>
                )}
              </div>
              {!totals.freeDelivery && (
                <p style={{ margin: "4px 0 0", fontSize: 10.5, fontWeight: 600, color: "var(--a-ink-soft)" }}>
                  Pulsuz çatdırılmaya {formatPrice(Math.max(FREE_DELIVERY_FROM - (totals.subtotal - totals.promoDiscount), 0))}{" "}
                  qalıb
                </p>
              )}
              <div className="sh-sum-row total">
                Yekun <span>{formatPrice(totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="sh-footer">
        <button type="button" className="sh-cta" onClick={() => router.push("/anacan/shop/checkout")}>
          Sifarişi rəsmiləşdir · {formatPrice(totals.total)}
        </button>
        <p className="sh-footer-note">Ödəniş növbəti addımda seçilir — kart və ya qapıda nağd</p>
      </footer>
    </>
  );
}
