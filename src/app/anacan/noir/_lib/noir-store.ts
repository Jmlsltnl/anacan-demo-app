/**
 * Anacan Noir — client-side data layer.
 * Accounts, sessions, onboarding profile, daily logs and the
 * wellness score engine, all persisted to localStorage so the
 * prototype behaves like a functioning product.
 */

export type NoirGoal = "pregnant" | "baby" | "cycle" | "ttc";

export interface NoirAccount {
  email: string;
  provider: "email" | "apple" | "google";
  createdAt: string;
}

export interface ScoreBreakdown {
  total: number;
  sleep: number;
  mood: number;
  nutrition: number;
  activity: number;
}

export interface NoirProfile {
  /* identity */
  name?: string;
  ageRange?: string;
  goal?: NoirGoal;
  /* pregnancy */
  pregMode?: "due" | "lmp";
  dueDate?: string;
  lmpDate?: string;
  multiples?: boolean;
  firstPregnancy?: boolean;
  /* baby */
  babyName?: string;
  babyBirth?: string;
  babyGender?: "girl" | "boy" | null;
  birthType?: "vaginal" | "csection";
  /* cycle / ttc */
  lastPeriod?: string;
  cycleLen?: number;
  periodLen?: number;
  regularity?: string;
  tryingSince?: string;
  /* health context */
  conditions?: string[];
  supplements?: string[];
  sleepHours?: string;
  sleepQuality?: number;
  mood?: number;
  anxietyFreq?: string;
  activity?: string;
  mealRegularity?: string;
  waterIntake?: string;
  support?: string;
  focus?: string[];
  dailyMinutes?: string;
  preferredTime?: string;
  notifDaily?: boolean;
  notifWeekly?: boolean;
  notifCritical?: boolean;
  /* computed & lifecycle */
  score?: ScoreBreakdown;
  onboarded?: boolean;
  premium?: boolean;
  premiumPlan?: "monthly" | "yearly" | "lifetime" | null;
  trialEndsAt?: string;
}

export interface DayLog {
  water: number;
  sleepH: number | null;
  mood: number | null;
  tasks: Record<string, boolean>;
}

export type LogsMap = Record<string, DayLog>;

const KEYS = {
  account: "anacan.noir.account",
  session: "anacan.noir.session",
  profile: "anacan.noir.profile",
  logs: "anacan.noir.logs",
} as const;

/* ---------------- storage primitives + subscriptions ---------------- */

const cache = new Map<string, unknown>();
const listeners = new Set<() => void>();
let version = 0;

function notify() {
  version += 1;
  listeners.forEach((listener) => listener());
}

/** Subscribe to any store change (for useSyncExternalStore). */
export function subscribeNoir(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/** Monotonic change counter — stable snapshot for useSyncExternalStore. */
export function getNoirVersion(): number {
  return version;
}

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  if (cache.has(key)) return cache.get(key) as T | null;
  try {
    const raw = window.localStorage.getItem(key);
    const value = raw ? (JSON.parse(raw) as T) : null;
    cache.set(key, value);
    return value;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore — prototype degrades gracefully */
  }
  cache.set(key, value);
  notify();
}

function remove(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
  cache.set(key, null);
  notify();
}

/* ---------------- account & session ---------------- */

export function getNoirAccount(): NoirAccount | null {
  return read<NoirAccount>(KEYS.account);
}

export function saveNoirAccount(account: NoirAccount) {
  write(KEYS.account, account);
}

export function getNoirSession(): { email: string } | null {
  return read<{ email: string }>(KEYS.session);
}

export function startNoirSession(email: string) {
  write(KEYS.session, { email });
}

export function endNoirSession() {
  remove(KEYS.session);
}

export function resetNoirData() {
  remove(KEYS.account);
  remove(KEYS.session);
  remove(KEYS.profile);
  remove(KEYS.logs);
}

/* ---------------- profile ---------------- */

export function getNoirProfile(): NoirProfile | null {
  return read<NoirProfile>(KEYS.profile);
}

export function saveNoirProfile(patch: Partial<NoirProfile>): NoirProfile {
  const next = { ...(getNoirProfile() ?? {}), ...patch };
  write(KEYS.profile, next);
  return next;
}

/* ---------------- daily logs ---------------- */

export function getLogs(): LogsMap {
  return read<LogsMap>(KEYS.logs) ?? {};
}

export function getDayLog(dateISO: string): DayLog {
  return getLogs()[dateISO] ?? { water: 0, sleepH: null, mood: null, tasks: {} };
}

export function saveDayLog(dateISO: string, patch: Partial<DayLog>): DayLog {
  const logs = getLogs();
  const next = { ...getDayLog(dateISO), ...patch };
  logs[dateISO] = next;
  write(KEYS.logs, logs);
  return next;
}

export function toggleTask(dateISO: string, taskId: string): DayLog {
  const log = getDayLog(dateISO);
  const tasks = { ...log.tasks, [taskId]: !log.tasks[taskId] };
  return saveDayLog(dateISO, { tasks });
}

/** Consecutive active days ending today (a day counts if it has any log activity). */
export function computeStreak(): number {
  const logs = getLogs();
  let streak = 0;
  const cursor = startOfToday();
  for (let i = 0; i < 366; i++) {
    const iso = toISO(cursor);
    const log = logs[iso];
    const active =
      log && (log.water > 0 || log.sleepH !== null || log.mood !== null || Object.values(log.tasks).some(Boolean));
    if (active) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      // today may simply not be logged yet — don't break the chain on day one
      if (i === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
}

/* ---------------- score engine ---------------- */

export function computeScore(p: NoirProfile): ScoreBreakdown {
  const sleepBase = { "<5": 32, "5-6": 55, "7-8": 90, "8+": 82 }[p.sleepHours ?? ""] ?? 60;
  const sleepQ = p.sleepQuality ? p.sleepQuality * 18 : 60;
  const sleep = Math.round(sleepBase * 0.55 + sleepQ * 0.45);

  const moodBase = p.mood ? p.mood * 19 : 60;
  const anxiety = { hec: 92, bezen: 66, tez: 42 }[p.anxietyFreq ?? ""] ?? 65;
  const mood = Math.round(moodBase * 0.55 + anxiety * 0.45);

  const meals = { regular: 86, partial: 62, chaotic: 40 }[p.mealRegularity ?? ""] ?? 60;
  const water = { "1-3": 40, "4-6": 66, "7-8": 86, "8+": 92 }[p.waterIntake ?? ""] ?? 60;
  const suppBonus =
    (p.supplements ?? []).some((s) => s !== "none") && !(p.supplements ?? []).includes("none") ? 8 : 0;
  const nutrition = Math.min(100, Math.round(meals * 0.5 + water * 0.5) + suppBonus);

  const activity = { sedentary: 34, light: 60, moderate: 82, active: 93 }[p.activity ?? ""] ?? 55;

  const total = Math.round(sleep * 0.28 + mood * 0.27 + nutrition * 0.25 + activity * 0.2);
  return { total, sleep, mood, nutrition, activity };
}

export function scoreLabel(total: number): string {
  if (total >= 80) return "Əla";
  if (total >= 62) return "Yaxşı";
  if (total >= 45) return "Orta";
  return "Diqqət";
}

/* ---------------- dates (AZ) ---------------- */

export const AZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

export const AZ_WEEKDAYS = [
  "bazar",
  "bazar ertəsi",
  "çərşənbə axşamı",
  "çərşənbə",
  "cümə axşamı",
  "cümə",
  "şənbə",
];

export const AZ_DAYS_SHORT = ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."];

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return toISO(startOfToday());
}

export function parseISO(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function shiftDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

/** Days from today to the given date (negative → past). */
export function daysFromToday(iso: string): number {
  return Math.round((parseISO(iso).getTime() - startOfToday().getTime()) / 86400000);
}

export function fmtAz(d: Date): string {
  return `${d.getDate()} ${AZ_MONTHS[d.getMonth()]}`;
}

export function fmtAzFull(d: Date): string {
  return `${d.getDate()} ${AZ_MONTHS[d.getMonth()]}, ${AZ_WEEKDAYS[d.getDay()]}`;
}

export function greetingByHour(hour: number): string {
  if (hour >= 5 && hour < 12) return "Sabahınız xeyir";
  if (hour >= 12 && hour < 17) return "Günortanız xeyir";
  if (hour >= 17 && hour < 22) return "Axşamınız xeyir";
  return "Gecəniz xeyrə qalsın";
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ---------------- pregnancy ---------------- */

export interface PregnancyStatus {
  week: number;
  daysLeft: number;
  trimester: string;
  progressPct: number;
  dueDate: Date;
}

export function pregnancyStatus(p: NoirProfile): PregnancyStatus | null {
  const dueISO =
    p.pregMode === "lmp" && p.lmpDate
      ? toISO(shiftDays(parseISO(p.lmpDate), 280))
      : p.dueDate;
  if (!dueISO) return null;
  const daysLeft = clamp(daysFromToday(dueISO), 0, 294);
  const week = clamp(40 - Math.ceil(daysLeft / 7), 1, 42);
  const trimester = week <= 13 ? "1-ci" : week <= 27 ? "2-ci" : "3-cü";
  return {
    week,
    daysLeft,
    trimester,
    progressPct: Math.round((week / 40) * 100),
    dueDate: parseISO(dueISO),
  };
}

/* ---------------- baby ---------------- */

export interface BabyStatus {
  daysOld: number;
  months: number;
  restDays: number;
  ageText: string;
}

export function babyStatus(p: NoirProfile): BabyStatus | null {
  if (!p.babyBirth) return null;
  const daysOld = clamp(-daysFromToday(p.babyBirth), 0, 3650);
  const months = Math.floor(daysOld / 30.4375);
  const restDays = Math.round(daysOld - months * 30.4375);
  const ageText = months >= 1 ? `${months} ay ${Math.max(restDays, 0)} gün` : `${daysOld} günlük`;
  return { daysOld, months, restDays, ageText };
}

/* ---------------- cycle / ttc ---------------- */

export interface CycleStatus {
  day: number;
  phase: string;
  phaseEmoji: string;
  phaseText: string;
  nextPeriod: Date;
  daysToNext: number;
  fertileStart: Date;
  fertileEnd: Date;
  ovulation: Date;
  inFertileWindow: boolean;
}

export function cycleStatus(p: NoirProfile): CycleStatus | null {
  if (!p.lastPeriod) return null;
  const len = p.cycleLen ?? 28;
  const periodLen = p.periodLen ?? 5;
  const sinceStart = -daysFromToday(p.lastPeriod);
  if (sinceStart < 0) return null;
  const day = (sinceStart % len) + 1;
  const cyclesPassed = Math.floor(sinceStart / len);
  const currentStart = shiftDays(parseISO(p.lastPeriod), cyclesPassed * len);
  const nextPeriod = shiftDays(currentStart, len);
  const ovulation = shiftDays(nextPeriod, -14);
  const fertileStart = shiftDays(ovulation, -4);
  const fertileEnd = shiftDays(ovulation, 1);
  const today = startOfToday().getTime();
  const inFertileWindow = today >= fertileStart.getTime() && today <= fertileEnd.getTime();

  let phase = "Follikulyar faza";
  let phaseEmoji = "🌱";
  let phaseText = "Enerji tədricən yüksəlir — yeni işlərə başlamaq üçün yaxşı vaxtdır.";
  if (day <= periodLen) {
    phase = "Menstruasiya";
    phaseEmoji = "🌙";
    phaseText = "Bədəniniz istirahət istəyir. Dəmir tərkibli qidalar və yüngül hərəkət faydalıdır.";
  } else if (inFertileWindow) {
    phase = "Fertil pəncərə";
    phaseEmoji = "✨";
    phaseText = "Hamiləlik ehtimalının ən yüksək olduğu günlərdəsiniz.";
  } else if (today > fertileEnd.getTime()) {
    phase = "Luteal faza";
    phaseEmoji = "🍂";
    phaseText = "PMS əlamətləri mümkündür — yuxuya və maqneziuma diqqət edin.";
  }

  return {
    day,
    phase,
    phaseEmoji,
    phaseText,
    nextPeriod,
    daysToNext: Math.max(daysFromToday(toISO(nextPeriod)), 0),
    fertileStart,
    fertileEnd,
    ovulation,
    inFertileWindow,
  };
}
