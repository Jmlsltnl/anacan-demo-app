"use client";

import { Check, Package } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { formatPrice } from "../../_lib/catalog";
import { getLastOrder, subscribeShop } from "../../_lib/shop-store";

const getOrder = () => getLastOrder();
const getServerOrder = () => null;

export function SuccessExperience() {
  const order = useSyncExternalStore(subscribeShop, getOrder, getServerOrder);

  return (
    <>
      <div className="sh-scroll">
        <div className="sh-shell" style={{ textAlign: "center", paddingTop: 46 }}>
          <span className="sh-success-icon">
            <Check size={40} strokeWidth={3} />
          </span>
          <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "var(--a-ink)" }}>
            Sifarişiniz qəbul olundu!
          </h1>
          <p style={{ margin: "0 0 16px", fontSize: 12.5, lineHeight: 1.6, fontWeight: 600, color: "var(--a-on-bg-soft)" }}>
            {order
              ? `Təşəkkürlər, ${order.name.split(" ")[0]}! Kuryerimiz ${
                  order.delivery === "express" ? "bu gün 3 saat ərzində" : "1–2 iş günü ərzində"
                } sizinlə əlaqə saxlayacaq.`
              : "Təşəkkürlər! Kuryerimiz tezliklə sizinlə əlaqə saxlayacaq."}
          </p>

          {order && (
            <>
              <span className="sh-order-chip">
                <Package size={14} strokeWidth={2.2} /> Sifariş №{order.number}
              </span>
              <div className="a-card" style={{ padding: "12px 16px", marginTop: 18, textAlign: "left" }}>
                <div className="sh-sum-row">
                  Məhsul sayı <strong>{order.itemCount}</strong>
                </div>
                <div className="sh-sum-row">
                  Çatdırılma <strong>{order.delivery === "express" ? "Ekspress" : "Standart"} · {order.city}</strong>
                </div>
                <div className="sh-sum-row">
                  Ödəniş <strong>{order.payment === "card" ? "Kartla onlayn" : "Qapıda nağd"}</strong>
                </div>
                <div className="sh-sum-row total">
                  Yekun <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="sh-footer">
        <Link href="/anacan/shop" className="sh-cta" style={{ textDecoration: "none" }}>
          Alış-verişə davam et
        </Link>
        <Link
          href="/anacan"
          style={{
            textAlign: "center",
            padding: "10px 0 2px",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--a-ink-soft)",
            textDecoration: "none",
          }}
        >
          Ana səhifəyə qayıt
        </Link>
      </footer>
    </>
  );
}
