/**
 * Anacan Shop — cart / promo / order state.
 * localStorage-backed with change subscriptions so the cart badge,
 * cart page and checkout stay in sync across client islands.
 */

import { PRODUCTS, getProduct, type Product } from "./catalog";

export interface CartState {
  items: Record<string, number>; // productId -> qty
  promo: string | null;
}

export interface OrderInfo {
  number: string;
  total: number;
  itemCount: number;
  payment: "card" | "cash";
  delivery: "standard" | "express";
  name: string;
  city: string;
  placedAt: string;
}

const CART_KEY = "anacan.shop.cart";
const ORDER_KEY = "anacan.shop.order";

const DEFAULT_CART: CartState = { items: {}, promo: null };

let cartCache: CartState | null = null;
/** undefined → not read from storage yet; null → no order exists */
let orderCache: OrderInfo | null | undefined = undefined;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeShop(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getCart(): CartState {
  if (typeof window === "undefined") return DEFAULT_CART;
  if (cartCache) return cartCache;
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    cartCache = raw ? { ...DEFAULT_CART, ...(JSON.parse(raw) as CartState) } : DEFAULT_CART;
  } catch {
    cartCache = DEFAULT_CART;
  }
  return cartCache;
}

export function getServerCart(): CartState {
  return DEFAULT_CART;
}

function writeCart(next: CartState) {
  cartCache = next;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
  } catch {
    /* in-memory fallback */
  }
  notify();
}

/* ---------------- cart actions ---------------- */

export function addToCart(id: string, qty = 1) {
  const cart = getCart();
  writeCart({ ...cart, items: { ...cart.items, [id]: (cart.items[id] ?? 0) + qty } });
}

export function setQty(id: string, qty: number) {
  const cart = getCart();
  const items = { ...cart.items };
  if (qty <= 0) delete items[id];
  else items[id] = qty;
  writeCart({ ...cart, items });
}

export function removeFromCart(id: string) {
  setQty(id, 0);
}

export function clearCart() {
  writeCart({ items: {}, promo: null });
}

export function applyPromo(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  if (normalized !== "ANACAN10") return false;
  writeCart({ ...getCart(), promo: normalized });
  return true;
}

export function removePromo() {
  writeCart({ ...getCart(), promo: null });
}

/* ---------------- selectors ---------------- */

export function cartCount(cart: CartState): number {
  return Object.values(cart.items).reduce((sum, qty) => sum + qty, 0);
}

export interface CartLine {
  product: Product;
  qty: number;
}

export function cartLines(cart: CartState): CartLine[] {
  return Object.entries(cart.items)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((line): line is CartLine => Boolean(line.product))
    .sort((a, b) => PRODUCTS.indexOf(a.product) - PRODUCTS.indexOf(b.product));
}

export const FREE_DELIVERY_FROM = 100;
export const DELIVERY_FEE = 5.99;
export const EXPRESS_FEE = 9.99;
export const PROMO_RATE = 0.1;

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  savings: number; // vs old prices
  promoDiscount: number;
  delivery: number;
  total: number;
  freeDelivery: boolean;
}

export function cartTotals(cart: CartState, delivery: "standard" | "express" = "standard"): CartTotals {
  const lines = cartLines(cart);
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const savings = lines.reduce(
    (sum, line) => sum + ((line.product.oldPrice ?? line.product.price) - line.product.price) * line.qty,
    0
  );
  const promoDiscount = cart.promo ? subtotal * PROMO_RATE : 0;
  const afterPromo = subtotal - promoDiscount;
  const freeDelivery = afterPromo >= FREE_DELIVERY_FROM && delivery === "standard";
  const deliveryFee = itemCount === 0 ? 0 : freeDelivery ? 0 : delivery === "express" ? EXPRESS_FEE : DELIVERY_FEE;
  return {
    itemCount,
    subtotal,
    savings,
    promoDiscount,
    delivery: deliveryFee,
    total: afterPromo + deliveryFee,
    freeDelivery,
  };
}

/* ---------------- order ---------------- */

export function placeOrder(order: Omit<OrderInfo, "number" | "placedAt">): OrderInfo {
  const full: OrderInfo = {
    ...order,
    number: `ANC-${Math.floor(10000 + Math.random() * 90000)}`,
    placedAt: new Date().toISOString(),
  };
  orderCache = full;
  try {
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(full));
  } catch {
    /* ignore */
  }
  clearCart(); // also notifies subscribers
  return full;
}

/** Cached read — stable reference for useSyncExternalStore snapshots. */
export function getLastOrder(): OrderInfo | null {
  if (typeof window === "undefined") return null;
  if (orderCache !== undefined) return orderCache;
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    orderCache = raw ? (JSON.parse(raw) as OrderInfo) : null;
  } catch {
    orderCache = null;
  }
  return orderCache;
}
