"use client";

import { Banknote, CreditCard, MapPin, Phone, Truck, User, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { formatPrice } from "../../_lib/catalog";
import {
  cartLines,
  cartTotals,
  getCart,
  getServerCart,
  placeOrder,
  subscribeShop,
} from "../../_lib/shop-store";

const CITIES = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Digər"];

export function CheckoutExperience() {
  const router = useRouter();
  const cart = useSyncExternalStore(subscribeShop, getCart, getServerCart);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Bakı");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"card" | "cash">("card");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [processing, setProcessing] = useState(false);

  const lines = cartLines(cart);
  const totals = cartTotals(cart, delivery);
  const empty = lines.length === 0 && !processing;

  /* guard: nothing to check out → back to cart (client-side only) */
  useEffect(() => {
    if (empty) router.replace("/anacan/shop/cart");
  }, [empty, router]);

  if (lines.length === 0) return null;

  const submit = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Adınızı yazın";
    if (phone.replace(/\D/g, "").length < 9) next.phone = "Nömrə tam deyil (məs: 50 123 45 67)";
    if (address.trim().length < 5) next.address = "Ünvanı daha dəqiq yazın";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setProcessing(true);
    window.setTimeout(() => {
      placeOrder({
        total: totals.total,
        itemCount: totals.itemCount,
        payment,
        delivery,
        name: name.trim(),
        city,
      });
      router.replace("/anacan/shop/success");
    }, 1100);
  };

  return (
    <>
      <div className="sh-scroll">
        <div className="sh-shell" style={{ paddingTop: 4 }}>
          {/* Contact */}
          <h2 className="sh-section-title">Əlaqə məlumatları</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label className="sh-form-label" htmlFor="co-name">
                Ad, soyad
              </label>
              <div className={`sh-control${errors.name ? " error" : ""}`}>
                <User size={15} strokeWidth={2.2} style={{ color: "var(--a-ink-faint)", flexShrink: 0 }} />
                <input
                  id="co-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  placeholder="Türkan Məmmədova"
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="sh-err">{errors.name}</p>}
            </div>
            <div>
              <label className="sh-form-label" htmlFor="co-phone">
                Telefon
              </label>
              <div className={`sh-control${errors.phone ? " error" : ""}`}>
                <Phone size={15} strokeWidth={2.2} style={{ color: "var(--a-ink-faint)", flexShrink: 0 }} />
                <span className="sh-prefix">+994</span>
                <input
                  id="co-phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/[^\d\s]/g, ""));
                    setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  placeholder="50 123 45 67"
                  inputMode="tel"
                  autoComplete="tel-national"
                />
              </div>
              {errors.phone && <p className="sh-err">{errors.phone}</p>}
            </div>
          </div>

          {/* Address */}
          <h2 className="sh-section-title" style={{ marginTop: 20 }}>
            Çatdırılma ünvanı
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`sh-cat${city === c ? " on" : ""}`}
                onClick={() => setCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <div className={`sh-control${errors.address ? " error" : ""}`}>
              <MapPin size={15} strokeWidth={2.2} style={{ color: "var(--a-ink-faint)", flexShrink: 0 }} />
              <input
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((er) => ({ ...er, address: undefined }));
                }}
                placeholder="Küçə, bina, mənzil"
                autoComplete="street-address"
                aria-label="Ünvan"
              />
            </div>
            {errors.address && <p className="sh-err">{errors.address}</p>}
          </div>

          {/* Delivery */}
          <h2 className="sh-section-title" style={{ marginTop: 20 }}>
            Çatdırılma üsulu
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              className={`sh-radio-row${delivery === "standard" ? " on" : ""}`}
              onClick={() => setDelivery("standard")}
              aria-pressed={delivery === "standard"}
            >
              <span className="sh-radio-dot" />
              <Truck size={17} strokeWidth={2} style={{ color: "var(--a-accent-ink)", flexShrink: 0 }} />
              <span>
                <p className="sh-radio-title">Standart</p>
                <p className="sh-radio-sub">1–2 iş günü</p>
              </span>
              <span className="sh-radio-trail">{totals.freeDelivery && delivery === "standard" ? "Pulsuz" : "5.99₼"}</span>
            </button>
            <button
              type="button"
              className={`sh-radio-row${delivery === "express" ? " on" : ""}`}
              onClick={() => setDelivery("express")}
              aria-pressed={delivery === "express"}
            >
              <span className="sh-radio-dot" />
              <Zap size={17} strokeWidth={2} style={{ color: "var(--a-accent-ink)", flexShrink: 0 }} />
              <span>
                <p className="sh-radio-title">Ekspress</p>
                <p className="sh-radio-sub">Bu gün, 3 saat ərzində (Bakı)</p>
              </span>
              <span className="sh-radio-trail">9.99₼</span>
            </button>
          </div>

          {/* Payment */}
          <h2 className="sh-section-title" style={{ marginTop: 20 }}>
            Ödəniş üsulu
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              className={`sh-radio-row${payment === "card" ? " on" : ""}`}
              onClick={() => setPayment("card")}
              aria-pressed={payment === "card"}
            >
              <span className="sh-radio-dot" />
              <CreditCard size={17} strokeWidth={2} style={{ color: "var(--a-accent-ink)", flexShrink: 0 }} />
              <span>
                <p className="sh-radio-title">Kartla onlayn</p>
                <p className="sh-radio-sub">Visa / Mastercard · təhlükəsiz ödəniş</p>
              </span>
            </button>
            <button
              type="button"
              className={`sh-radio-row${payment === "cash" ? " on" : ""}`}
              onClick={() => setPayment("cash")}
              aria-pressed={payment === "cash"}
            >
              <span className="sh-radio-dot" />
              <Banknote size={17} strokeWidth={2} style={{ color: "var(--a-accent-ink)", flexShrink: 0 }} />
              <span>
                <p className="sh-radio-title">Qapıda nağd</p>
                <p className="sh-radio-sub">Çatdırılma zamanı ödəyin</p>
              </span>
            </button>
          </div>

          {/* Summary */}
          <h2 className="sh-section-title" style={{ marginTop: 20 }}>
            Sifariş xülasəsi
          </h2>
          <div className="a-card" style={{ padding: "12px 16px" }}>
            {lines.map(({ product, qty }) => (
              <div key={product.id} className="sh-sum-row">
                <span
                  style={{
                    maxWidth: 210,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {qty}× {product.title}
                </span>
                <strong>{formatPrice(product.price * qty)}</strong>
              </div>
            ))}
            {totals.promoDiscount > 0 && (
              <div className="sh-sum-row">
                Promo (−10%) <span className="free">−{formatPrice(totals.promoDiscount)}</span>
              </div>
            )}
            <div className="sh-sum-row">
              Çatdırılma{" "}
              {totals.freeDelivery ? <span className="free">Pulsuz</span> : <strong>{formatPrice(totals.delivery)}</strong>}
            </div>
            <div className="sh-sum-row total">
              Yekun <span>{formatPrice(totals.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="sh-footer">
        <button type="button" className="sh-cta" disabled={processing} onClick={submit}>
          {processing ? "Sifariş göndərilir…" : `Sifarişi təsdiqlə · ${formatPrice(totals.total)}`}
        </button>
        <p className="sh-footer-note">Təsdiqləməklə çatdırılma şərtləri ilə razılaşırsınız</p>
      </footer>
    </>
  );
}
