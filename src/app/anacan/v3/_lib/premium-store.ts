/**
 * Anacan v3 — premium/monetization state.
 * localStorage-backed store with change subscriptions so every locked
 * surface on the page unlocks live the moment a trial/plan is activated.
 */

import { useSyncExternalStore } from "react";

export type PremiumStatus = "none" | "trial" | "premium";
export type PremiumPlan = "yearly" | "monthly" | "yearly-discount";

export interface PremiumState {
  status: PremiumStatus;
  plan: PremiumPlan | null;
  /** epoch ms — end of the 7-day free trial */
  trialEndsAt: number | null;
  /** epoch ms — end of the 24h intro offer countdown */
  offerEndsAt: number | null;
  downsellUsed: boolean;
  paywallSeen: boolean;
}

const KEY = "anacan.v3.premium";

const DEFAULT_STATE: PremiumState = {
  status: "none",
  plan: null,
  trialEndsAt: null,
  offerEndsAt: null,
  downsellUsed: false,
  paywallSeen: false,
};

let cache: PremiumState | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribePremium(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getPremiumState(): PremiumState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULT_STATE, ...(JSON.parse(raw) as PremiumState) } : DEFAULT_STATE;
  } catch {
    cache = DEFAULT_STATE;
  }
  return cache;
}

function getServerState(): PremiumState {
  return DEFAULT_STATE;
}

function patch(partial: Partial<PremiumState>) {
  const next = { ...getPremiumState(), ...partial };
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* prototype: keep working in-memory */
  }
  notify();
}

/* ---------------- actions ---------------- */

const DAY_MS = 86_400_000;

/** Starts the 24h intro-offer countdown once (idempotent). */
export function ensureOfferStarted() {
  const state = getPremiumState();
  if (state.offerEndsAt === null) {
    patch({ offerEndsAt: Date.now() + DAY_MS });
  }
}

export function startYearlyTrial() {
  patch({ status: "trial", plan: "yearly", trialEndsAt: Date.now() + 7 * DAY_MS });
}

export function activatePlan(plan: "monthly" | "yearly-discount") {
  patch({ status: "premium", plan, trialEndsAt: null });
}

export function markPaywallSeen() {
  patch({ paywallSeen: true });
}

export function markDownsellUsed() {
  patch({ downsellUsed: true });
}

/** Demo helper — resets the whole monetization state. */
export function resetPremium() {
  patch({ ...DEFAULT_STATE, paywallSeen: true, offerEndsAt: Date.now() + DAY_MS });
}

/* ---------------- selectors ---------------- */

/** Premium access right now (trial counts while it lasts). */
export function isUnlocked(state: PremiumState): boolean {
  if (state.status === "premium") return true;
  if (state.status === "trial") return (state.trialEndsAt ?? 0) > Date.now();
  return false;
}

export function trialDaysLeft(state: PremiumState): number {
  if (state.status !== "trial" || !state.trialEndsAt) return 0;
  return Math.max(0, Math.ceil((state.trialEndsAt - Date.now()) / DAY_MS));
}

export function usePremium(): PremiumState {
  return useSyncExternalStore(subscribePremium, getPremiumState, getServerState);
}

/** mm:ss / hh:mm:ss formatting for countdowns */
export function formatCountdown(msLeft: number): string {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
