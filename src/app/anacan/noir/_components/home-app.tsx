"use client";

import { Compass, Home, Map, Plus, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Article } from "../_lib/noir-content";
import {
  computeStreak,
  getDayLog,
  getNoirProfile,
  getNoirSession,
  getNoirVersion,
  saveDayLog,
  subscribeNoir,
  todayISO,
  toggleTask,
  type DayLog,
} from "../_lib/noir-store";
import { DiscoverTab } from "./tabs/discover-tab";
import { PlanTab } from "./tabs/plan-tab";
import { ProfileTab } from "./tabs/profile-tab";
import { TodayTab } from "./tabs/today-tab";

type Tab = "today" | "plan" | "discover" | "profile";

const NAV: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: "today", label: "Bu gün", icon: Home },
  { key: "plan", label: "Plan", icon: Map },
  { key: "discover", label: "Kəşf", icon: Compass },
  { key: "profile", label: "Profil", icon: User },
];

const EMPTY_LOG: DayLog = { water: 0, sleepH: null, mood: null, tasks: {} };
const getServerVersion = () => -1;

export function HomeApp() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("today");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [reader, setReader] = useState<Article | null>(null);

  /* single source of truth: the noir store (localStorage + change subscription) */
  const version = useSyncExternalStore(subscribeNoir, getNoirVersion, getServerVersion);
  const isClient = version >= 0;
  const session = isClient ? getNoirSession() : null;
  const profile = isClient ? getNoirProfile() : null;
  const dateISO = todayISO();
  const log = isClient ? getDayLog(dateISO) : EMPTY_LOG;
  const streak = isClient ? computeStreak() : 0;
  const ready = isClient && Boolean(session) && Boolean(profile?.onboarded);

  /* auth + onboarding gate */
  useEffect(() => {
    if (!isClient) return;
    if (!session) {
      router.replace("/anacan/noir/welcome");
    } else if (!profile?.onboarded) {
      router.replace("/anacan/noir/onboarding");
    }
  }, [isClient, session, profile, router]);

  const updateLog = (patch: Partial<DayLog>) => {
    saveDayLog(dateISO, patch);
  };

  const onToggleTask = (taskId: string) => {
    toggleTask(dateISO, taskId);
  };

  if (!ready || !profile) {
    return (
      <div className="n-scroll" style={{ display: "grid", placeItems: "center" }}>
        <span className="n-spin" style={{ width: 26, height: 26, color: "var(--n-gold)" }} />
      </div>
    );
  }

  return (
    <>
      <div className="n-scroll" key={tab}>
        <div className="n-shell" style={{ paddingBottom: 28, flex: 1 }}>
          {tab === "today" && (
            <TodayTab
              profile={profile}
              log={log}
              streak={streak}
              onToggleTask={onToggleTask}
              onUpdateLog={updateLog}
              onOpenArticle={setReader}
              onGoProfile={() => setTab("profile")}
            />
          )}
          {tab === "plan" && <PlanTab profile={profile} />}
          {tab === "discover" && <DiscoverTab profile={profile} onOpen={setReader} />}
          {tab === "profile" && <ProfileTab profile={profile} />}
        </div>
      </div>

      <div className="n-nav-wrap">
        <nav className="n-nav" aria-label="Əsas naviqasiya">
          {NAV.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const active = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`n-nav-item${active ? " active" : ""}`}
                onClick={() => setTab(item.key)}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                {item.label}
              </button>
            );
          })}
          <button type="button" className="n-fab" onClick={() => setSheetOpen(true)} aria-label="Sürətli qeyd">
            <Plus size={24} strokeWidth={2.6} />
          </button>
          {NAV.slice(2).map((item) => {
            const Icon = item.icon;
            const active = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`n-nav-item${active ? " active" : ""}`}
                onClick={() => setTab(item.key)}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick log sheet */}
      {sheetOpen && (
        <>
          <button
            type="button"
            className="n-sheet-backdrop"
            onClick={() => setSheetOpen(false)}
            aria-label="Bağla"
          />
          <div className="n-sheet" role="dialog" aria-label="Sürətli qeyd">
            <div className="n-sheet-grip" />
            <h2 className="n-sheet-title n-display">Sürətli qeyd</h2>
            <p className="n-sheet-sub">Bu günün göstəriciləri — hər qeyd skorunuzu dəqiqləşdirir</p>

            <div className="n-log-grid" style={{ marginBottom: 12 }}>
              <div className="n-log-cell">
                <p className="n-log-head">💧 Su</p>
                <p className="n-log-value">
                  {log.water}
                  <small> / 8 stəkan</small>
                </p>
                <div className="n-log-btns">
                  <button
                    type="button"
                    className="n-log-btn"
                    disabled={log.water <= 0}
                    onClick={() => updateLog({ water: Math.max(0, log.water - 1) })}
                    aria-label="Su azalt"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="n-log-btn"
                    disabled={log.water >= 15}
                    onClick={() => updateLog({ water: Math.min(15, log.water + 1) })}
                    aria-label="Su artır"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="n-log-cell">
                <p className="n-log-head">😴 Yuxu</p>
                <p className="n-log-value">
                  {log.sleepH ?? "—"}
                  <small> saat</small>
                </p>
                <div className="n-log-btns">
                  <button
                    type="button"
                    className="n-log-btn"
                    disabled={(log.sleepH ?? 0) <= 0}
                    onClick={() => updateLog({ sleepH: Math.max(0, (log.sleepH ?? 7) - 0.5) })}
                    aria-label="Yuxu azalt"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="n-log-btn"
                    disabled={(log.sleepH ?? 0) >= 14}
                    onClick={() => updateLog({ sleepH: Math.min(14, (log.sleepH ?? 6.5) + 0.5) })}
                    aria-label="Yuxu artır"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <p className="n-log-head" style={{ marginBottom: 8 }}>
              🌤️ Bu günün əhvalı
            </p>
            <div className="n-mood-row" style={{ marginBottom: 20 }}>
              {["😫", "😕", "😐", "🙂", "😄"].map((emoji, i) => (
                <button
                  key={emoji}
                  type="button"
                  className={`n-mood${log.mood === i + 1 ? " on" : ""}`}
                  onClick={() => updateLog({ mood: i + 1 })}
                  aria-label={`Əhval ${i + 1}/5`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button type="button" className="n-btn n-btn-gold" onClick={() => setSheetOpen(false)}>
              Hazırdır
            </button>
          </div>
        </>
      )}

      {/* Article reader */}
      {reader && (
        <div className="n-reader" role="dialog" aria-label={reader.title}>
          <div className="n-reader-top">
            <span className="n-kicker" style={{ margin: 0 }}>
              Anacan Kitabxana
            </span>
            <button type="button" className="n-back" onClick={() => setReader(null)} aria-label="Bağla">
              <X size={18} strokeWidth={2.2} />
            </button>
          </div>
          <div className="n-reader-body">
            <p className="n-reader-cat">
              {reader.category} · {reader.emoji}
            </p>
            <h1 className="n-reader-title n-display">{reader.title}</h1>
            <div className="n-reader-meta">
              <span>{reader.mins} dəq oxu</span>
              <span>Ekspert yoxlanışından keçib</span>
            </div>
            {reader.body.map((paragraph, i) => (
              <p key={i} className="body-text">
                {paragraph}
              </p>
            ))}
            <div className="n-disclaimer">
              <span aria-hidden>🩺</span>
              <span>
                Bu məzmun maarifləndirmə məqsədi daşıyır və tibbi məsləhəti, diaqnozu və ya müalicəni əvəz
                etmir. Qərarlarınızı həkiminizlə birlikdə verin. Təcili hallarda 103-ə zəng edin.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
