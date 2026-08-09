"use client";

import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cartCount, getCart, getServerCart, subscribeShop } from "../_lib/shop-store";

const getCount = () => cartCount(getCart());
const getServerCount = () => cartCount(getServerCart());

export function ShopHeader({
  title,
  sub,
  backHref = "/anacan/shop",
  showCart = true,
}: {
  title: string;
  sub?: string;
  backHref?: string;
  showCart?: boolean;
}) {
  const count = useSyncExternalStore(subscribeShop, getCount, getServerCount);

  return (
    <header className="sh-topbar">
      <Link href={backHref} className="sh-back" aria-label="Geri qayıt">
        <ChevronLeft size={19} strokeWidth={2.2} />
      </Link>
      <div className="sh-topbar-titles">
        <p className="sh-topbar-title">{title}</p>
        {sub && <p className="sh-topbar-sub">{sub}</p>}
      </div>
      {showCart && (
        <Link href="/anacan/shop/cart" className="sh-cart-btn" aria-label={`Səbət — ${count} məhsul`}>
          <ShoppingBag size={17} strokeWidth={2.2} />
          {count > 0 && <span className="sh-cart-badge">{count > 99 ? "99+" : count}</span>}
        </Link>
      )}
    </header>
  );
}
