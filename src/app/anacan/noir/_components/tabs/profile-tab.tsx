"use client";

import {
  Bell,
  Check,
  ChevronRight,
  Crown,
  LogOut,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  endNoirSession,
  fmtAz,
  getNoirAccount,
  parseISO,
  resetNoirData,
  saveNoirProfile,
  shiftDays,
  startOfToday,
  toISO,
  type NoirProfile,
} from "../../_lib/noir-store";
import { GOAL_META } from "../../_lib/noir-content";

export function ProfileTab({ profile }: { profile: NoirProfile }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name ?? "");
  const [confirmReset, setConfirmReset] = useState(false);
  const account = getNoirAccount();
  const goal = profile.goal ?? "cycle";
  const meta = GOAL_META[goal];

  const saveName = () => {
    if (nameDraft.trim().length >= 2) {
      saveNoirProfile({ name: nameDraft.trim() });
    }
    setEditing(false);
  };

  const toggleNotif = (key: "notifDaily" | "notifWeekly" | "notifCritical") => {
    saveNoirProfile({ [key]: !profile[key] });
  };

  const startTrial = () => {
    saveNoirProfile({
      premium: true,
      premiumPlan: "yearly",
      trialEndsAt: toISO(shiftDays(startOfToday(), 7)),
    });
  };

  return (
    <>
      <header className="n-home-top">
        <span className="n-avatar" style={{ width: 54, height: 54, fontSize: 21 }}>
          {(profile.name ?? "A")[0]?.toUpperCase()}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          {editing ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div className="n-control" style={{ minHeight: 42, flex: 1 }}>
                <input
                  className="n-input"
                  style={{ padding: "8px 0" }}
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  autoFocus
                  aria-label="Ad"
                />
              </div>
              <button type="button" className="n-back" onClick={saveName} aria-label="Yadda saxla">
                <Check size={17} strokeWidth={2.4} />
              </button>
            </div>
          ) : (
            <h1 className="n-home-name n-display" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {profile.name ?? "Ana"}
              <button
                type="button"
                onClick={() => {
                  setNameDraft(profile.name ?? "");
                  setEditing(true);
                }}
                aria-label="Adı dəyiş"
                style={{ color: "var(--n-faint)", display: "grid", placeItems: "center" }}
              >
                <Pencil size={14} strokeWidth={2.2} />
              </button>
            </h1>
          )}
          <p className="n-home-date">{account?.email ?? "demo istifadəçi"}</p>
        </div>
        <span className="n-chip on" style={{ pointerEvents: "none", flexShrink: 0 }}>
          {meta.emoji} {meta.label}
        </span>
      </header>

      {/* membership */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Üzvlük</h2>
      </div>
      {profile.premium ? (
        <div className="n-upsell n-rise-in" style={{ cursor: "default" }}>
          <span className="n-crown" style={{ width: 44, height: 44, margin: 0, borderRadius: 15, animation: "none" }}>
            <Crown size={20} strokeWidth={2.2} />
          </span>
          <span style={{ minWidth: 0 }}>
            <p className="n-upsell-title">
              Premium aktivdir ·{" "}
              {profile.premiumPlan === "yearly"
                ? "illik plan"
                : profile.premiumPlan === "monthly"
                  ? "aylıq plan"
                  : "ömürlük"}
            </p>
            <p className="n-upsell-sub">
              {profile.trialEndsAt
                ? `Pulsuz sınaq ${fmtAz(parseISO(profile.trialEndsAt))} tarixinə qədər`
                : "Bütün funksiyalara tam giriş"}
            </p>
          </span>
        </div>
      ) : (
        <button type="button" className="n-upsell n-rise-in" onClick={startTrial}>
          <span className="n-crown" style={{ width: 44, height: 44, margin: 0, borderRadius: 15, animation: "none" }}>
            <Crown size={20} strokeWidth={2.2} />
          </span>
          <span style={{ minWidth: 0 }}>
            <p className="n-upsell-title">7 günlük pulsuz sınağı başlat</p>
            <p className="n-upsell-sub">Bu gün 0 ₼ · istənilən vaxt ləğv · tək toxunuş</p>
          </span>
          <ChevronRight size={17} style={{ marginLeft: "auto", color: "var(--n-gold)", flexShrink: 0 }} />
        </button>
      )}

      {/* notifications */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Bildirişlər</h2>
      </div>
      <div className="n-card n-rise-in n-d1" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {(
          [
            { key: "notifDaily", t: "Gündəlik brif", s: "Seçdiyiniz vaxtda günün planı" },
            { key: "notifWeekly", t: "Həftəlik hesabat", s: "Skor və irəliləyiş xülasəsi" },
            { key: "notifCritical", t: "Kritik xatırlatmalar", s: "Peyvənd, müayinə, dövr" },
          ] as const
        ).map((row) => {
          const on = Boolean(profile[row.key]);
          return (
            <button
              key={row.key}
              type="button"
              className="n-prow"
              onClick={() => toggleNotif(row.key)}
              aria-pressed={on}
            >
              <span className="n-prow-icon">
                <Bell size={16} strokeWidth={2.2} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block" }}>{row.t}</span>
                <span style={{ display: "block", fontSize: 10.5, fontWeight: 600, color: "var(--n-faint)", marginTop: 2 }}>
                  {row.s}
                </span>
              </span>
              <span className={`n-switch${on ? " on" : ""}`} style={{ marginLeft: "auto" }}>
                <span className="n-switch-knob" />
              </span>
            </button>
          );
        })}
      </div>

      {/* data & account */}
      <div className="n-section-head">
        <h2 className="n-section-title n-display">Hesab və məlumatlar</h2>
      </div>
      <div className="n-card n-rise-in n-d2" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <button
          type="button"
          className="n-prow"
          onClick={() => router.push("/anacan/noir/onboarding")}
        >
          <span className="n-prow-icon">
            <RefreshCw size={16} strokeWidth={2.2} />
          </span>
          Qiymətləndirməni yenilə
          <span className="n-prow-trail">
            skoru yenidən hesabla <ChevronRight size={13} />
          </span>
        </button>
        <button
          type="button"
          className="n-prow"
          onClick={() => {
            endNoirSession();
            router.replace("/anacan/noir/login");
          }}
        >
          <span className="n-prow-icon">
            <LogOut size={16} strokeWidth={2.2} />
          </span>
          Çıxış
          <span className="n-prow-trail">
            <ChevronRight size={13} />
          </span>
        </button>
        <button
          type="button"
          className="n-prow"
          style={{ color: confirmReset ? "var(--n-red)" : undefined }}
          onClick={() => {
            if (!confirmReset) {
              setConfirmReset(true);
              window.setTimeout(() => setConfirmReset(false), 3000);
              return;
            }
            resetNoirData();
            router.replace("/anacan/noir/welcome");
          }}
        >
          <span className="n-prow-icon" style={{ color: confirmReset ? "var(--n-red)" : undefined }}>
            <Trash2 size={16} strokeWidth={2.2} />
          </span>
          {confirmReset ? "Əminsiniz? Bir daha toxunun" : "Demo məlumatları sıfırla"}
          <span className="n-prow-trail">
            <ChevronRight size={13} />
          </span>
        </button>
      </div>

      <p className="n-hint" style={{ textAlign: "center", marginTop: 22 }}>
        Anacan Noir · prototip v2.0 · məlumatlar yalnız bu cihazda
      </p>
    </>
  );
}
