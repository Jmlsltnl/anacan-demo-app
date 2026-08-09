"use client";

import {
  Armchair,
  Baby,
  Backpack,
  BedDouble,
  Car,
  Check,
  Package,
  Plus,
  RockingChair,
  ToyBrick,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categoryOf, discountPct, formatPrice, type CategoryId, type Product } from "../_lib/catalog";
import { addToCart } from "../_lib/shop-store";

export const CATEGORY_ICONS: Record<CategoryId, typeof Baby> = {
  stroller: Baby,
  carseat: Car,
  highchair: Armchair,
  bouncer: RockingChair,
  crib: BedDouble,
  carrier: Backpack,
  accessory: Package,
  toy: ToyBrick,
};

export function ProductThumb({
  product,
  iconSize = 40,
  className = "sh-thumb",
}: {
  product: Product;
  iconSize?: number;
  className?: string;
}) {
  const cat = categoryOf(product.category);
  const Icon = CATEGORY_ICONS[product.category];
  const pct = discountPct(product);

  return (
    <div className={className} style={{ background: cat.grad }}>
      <Icon size={iconSize} strokeWidth={1.6} color={cat.color} />
      {pct !== null && <span className="sh-off">-{pct}%</span>}
      {product.age && <span className="sh-age">{product.age}</span>}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAdded(true);
    timer.current = window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <Link href={`/anacan/shop/product/${product.id}`} className="sh-card">
      <ProductThumb product={product} />
      <div className="sh-card-body">
        <p className="sh-name">{product.title}</p>
        <div className="sh-price-row">
          <div>
            {product.oldPrice && <span className="sh-old">{formatPrice(product.oldPrice)}</span>}
            <p className="sh-price">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            className={`sh-add${added ? " done" : ""}`}
            onClick={quickAdd}
            aria-label={`${product.title} — səbətə əlavə et`}
          >
            {added ? <Check size={15} strokeWidth={3} /> : <Plus size={16} strokeWidth={2.6} />}
          </button>
        </div>
      </div>
    </Link>
  );
}
