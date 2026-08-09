/**
 * Lightweight client-side store for the Anacan prototype.
 * Persists the demo account, session and onboarding profile in
 * localStorage so the funnel behaves like a real product flow.
 */

export type Goal = "pregnant" | "baby" | "cycle";

export interface DemoAccount {
  email: string;
  password: string;
  provider: "email" | "apple" | "google";
  createdAt: string;
}

export interface AnacanProfile {
  momName?: string;
  goal?: Goal;
  /* pregnancy */
  dueDate?: string;
  lmpDate?: string;
  firstPregnancy?: boolean;
  /* baby */
  babyName?: string;
  babyBirth?: string;
  babyGender?: "girl" | "boy";
  /* cycle */
  lastPeriod?: string;
  cycleLen?: number;
  /* shared funnel answers */
  focus?: string[];
  minutes?: string;
  discovery?: string;
  reminders?: boolean;
  /* premium state */
  premium?: boolean;
  premiumPlan?: "yearly" | "monthly" | null;
  trialStartedAt?: string;
  onboarded?: boolean;
}

const KEYS = {
  account: "anacan.account",
  profile: "anacan.profile",
  session: "anacan.session",
} as const;

export const DEMO_ACCOUNT: DemoAccount = {
  email: "demo@anacan.az",
  password: "anacan123",
  provider: "email",
  createdAt: "2026-01-01T00:00:00.000Z",
};

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

const STORE_EVENT = "anacan:store";

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — prototype keeps working in-memory */
  }
  window.dispatchEvent(new Event(STORE_EVENT));
}

/** Subscribe to store changes (same-tab custom event + cross-tab storage). */
export function subscribeAnacanStore(callback: () => void): () => void {
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/* ---------- Account ---------- */

export function getAccount(): DemoAccount | null {
  return read<DemoAccount>(KEYS.account);
}

export function saveAccount(account: DemoAccount) {
  write(KEYS.account, account);
}

/* ---------- Session ---------- */

export function getSession(): { email: string } | null {
  return read<{ email: string }>(KEYS.session);
}

export function startSession(email: string) {
  write(KEYS.session, { email });
}

export function endSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.session);
}

/* ---------- Profile (onboarding answers) ---------- */

export function getProfile(): AnacanProfile | null {
  return read<AnacanProfile>(KEYS.profile);
}

export function saveProfile(patch: Partial<AnacanProfile>): AnacanProfile {
  const next = { ...(getProfile() ?? {}), ...patch };
  write(KEYS.profile, next);
  return next;
}
