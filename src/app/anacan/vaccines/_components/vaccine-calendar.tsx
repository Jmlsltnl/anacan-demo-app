"use client";

import { Syringe } from "lucide-react";
import { useMemo, useState } from "react";

type Status = "done" | "delayed" | "queued";

interface Vaccine {
  name: string;
  dose: string;
  status: Status;
}

const vaccines: Vaccine[] = [
  { name: "Hepatit B", dose: "Doğuşda • 1-ci doza", status: "done" },
  { name: "BCG (Vərəm)", dose: "Doğuşda • 1-ci doza", status: "done" },
  { name: "Poliomielit (İnaktiv – IPV)", dose: "2 aylıq • 1-ci doza", status: "delayed" },
  { name: "Rotavirus", dose: "2 aylıq • 1-ci doza", status: "delayed" },
  { name: "HiB (Hemofil influensa tip B)", dose: "2 aylıq • 1-ci doza", status: "delayed" },
  { name: "Pnevmokokk (PCV)", dose: "2 aylıq • 1-ci doza", status: "delayed" },
  { name: "DTP (Difteriya, Tetanoz, Boğmaca)", dose: "2 aylıq • 1-ci doza", status: "delayed" },
  { name: "Hepatit B", dose: "2 aylıq • 2-ci doza", status: "delayed" },
  { name: "DTP (Difteriya, Tetanoz, Boğmaca)", dose: "3 aylıq • 2-ci doza", status: "delayed" },
  { name: "Poliomielit (Oral – OPV)", dose: "3 aylıq • 1-ci doza", status: "delayed" },
  { name: "HiB (Hemofil influensa tip B)", dose: "3 aylıq • 2-ci doza", status: "delayed" },
  { name: "Pnevmokokk (PCV)", dose: "4 aylıq • 2-ci doza", status: "delayed" },
  { name: "DTP (Difteriya, Tetanoz, Boğmaca)", dose: "4 aylıq • 3-cü doza", status: "delayed" },
  { name: "HiB (Hemofil influensa tip B)", dose: "4 aylıq • 3-cü doza", status: "delayed" },
  { name: "Poliomielit (İnaktiv – IPV)", dose: "4 aylıq • 2-ci doza", status: "delayed" },
  { name: "Rotavirus", dose: "4 aylıq • 2-ci doza", status: "delayed" },
  { name: "Hepatit B", dose: "4 aylıq • 3-cü doza", status: "delayed" },
  { name: "Poliomielit (Oral – OPV)", dose: "6 aylıq • 2-ci doza", status: "delayed" },
  { name: "Hepatit B", dose: "6 aylıq • 4-cü doza", status: "delayed" },
  { name: "MMR (Qızılca, Məxmərək, Parotit)", dose: "12 aylıq • 1-ci doza", status: "queued" },
  { name: "Pnevmokokk (PCV)", dose: "12 aylıq • Bustər", status: "queued" },
  { name: "Su çiçəyi (Varicella) · könüllü", dose: "12 aylıq • 1-ci doza", status: "queued" },
  { name: "Poliomielit (Oral – OPV)", dose: "18 aylıq • Bustər", status: "queued" },
  { name: "Hepatit A", dose: "18 aylıq • 1-ci doza", status: "queued" },
  { name: "HiB (Hemofil influensa tip B)", dose: "18 aylıq • Bustər", status: "queued" },
  { name: "DTP (Difteriya, Tetanoz, Boğmaca)", dose: "18 aylıq • Bustər (revaksinasiya)", status: "queued" },
  { name: "Hepatit A", dose: "24 aylıq • 2-ci doza", status: "queued" },
  { name: "Poliomielit (Oral – OPV)", dose: "6 yaş • İkinci bustər", status: "queued" },
  { name: "MMR (Qızılca, Məxmərək, Parotit)", dose: "6 yaş • 2-ci doza", status: "queued" },
  { name: "Su çiçəyi (Varicella) · könüllü", dose: "6 yaş • 2-ci doza", status: "queued" },
  { name: "DTP (Difteriya, Tetanoz, Boğmaca)", dose: "6 yaş • İkinci bustər", status: "queued" },
];

const STATUS_LABEL: Record<Status, string> = { done: "Tamamlandı", delayed: "Gecikdi", queued: "Növbədə" };
const STATUS_CLASS: Record<Status, string> = { done: "done", delayed: "delayed", queued: "queued" };
const STATUS_ICON_BG: Record<Status, string> = {
  done: "var(--a-grad-green)",
  delayed: "var(--a-grad-pink)",
  queued: "var(--a-grad-blue)",
};
const STATUS_ICON_INK: Record<Status, string> = { done: "#1c7a4d", delayed: "#a3355f", queued: "#1c5a80" };

type Tab = "full" | "upcoming" | "done";

export function VaccineCalendar() {
  const [tab, setTab] = useState<Tab>("full");

  const total = vaccines.length;
  const done = vaccines.filter((v) => v.status === "done").length;
  const delayed = vaccines.filter((v) => v.status === "delayed").length;
  const queued = vaccines.filter((v) => v.status === "queued").length;
  const pct = Math.round((done / total) * 100);

  const visible = useMemo(() => {
    if (tab === "upcoming") return vaccines.filter((v) => v.status === "queued");
    if (tab === "done") return vaccines.filter((v) => v.status === "done");
    return vaccines;
  }, [tab]);

  return (
    <>
      <div className="a-card a-fade-in">
        <div className="a-list-row" style={{ padding: "0 0 14px" }}>
          <span className="a-list-icon" style={{ background: "var(--a-grad-peach)", fontSize: 20 }}>
            👦
          </span>
          <div>
            <p className="a-list-title">Atlas</p>
            <p className="a-list-sub">9 ay 21 gün</p>
          </div>
          <span className="a-list-trail" style={{ fontSize: 20 }}>
            🇦🇿
          </span>
        </div>

        <div className="a-trio" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{total}</p>
            <p className="a-trio-label">Cəmi</p>
          </div>
          <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{done}</p>
            <p className="a-trio-label">Tamam</p>
          </div>
          <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{queued}</p>
            <p className="a-trio-label">Qalan</p>
          </div>
          <div className="a-trio-item" style={{ border: "none", background: "var(--a-surface-soft)" }}>
            <p className="a-trio-value">{delayed}</p>
            <p className="a-trio-label">Gecikən</p>
          </div>
        </div>

        <div className="a-ring-hero" style={{ marginTop: 16 }}>
          <div className="a-ring" style={{ "--pct": pct } as React.CSSProperties}>
            <div className="a-ring-inner">
              <b>{pct}%</b>
              <span>tərəqqi</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "var(--a-ink-soft)", flex: 1 }}>
            Milli İmmunizasiya Qrafikinə əsasən Atlasın peyvəndlərinin izlənməsi.
          </p>
        </div>
      </div>

      <section className="a-section">
        <div className="a-section-head">
          <h2 className="a-section-title a-heading">Cədvəl</h2>
          <div className="a-tabs">
            <button type="button" className={`a-tab${tab === "full" ? " active" : ""}`} onClick={() => setTab("full")}>
              Tam qrafik
            </button>
            <button type="button" className={`a-tab${tab === "upcoming" ? " active" : ""}`} onClick={() => setTab("upcoming")}>
              Yaxınlaşan
            </button>
            <button type="button" className={`a-tab${tab === "done" ? " active" : ""}`} onClick={() => setTab("done")}>
              Tamamlanmış
            </button>
          </div>
        </div>

        <div className="a-list-card">
          {visible.map((v, i) => (
            <div key={`${v.name}-${v.dose}-${i}`} className="a-list-row">
              <span className="a-list-icon" style={{ background: STATUS_ICON_BG[v.status], color: STATUS_ICON_INK[v.status] }}>
                <Syringe size={17} strokeWidth={2} />
              </span>
              <div style={{ minWidth: 0 }}>
                <p className="a-list-title">{v.name}</p>
                <p className="a-list-sub">{v.dose}</p>
              </div>
              <span className={`a-status-pill ${STATUS_CLASS[v.status]}`}>{STATUS_LABEL[v.status]}</span>
            </div>
          ))}
        </div>
      </section>

      <p style={{ margin: "16px 4px 0", fontSize: 10.5, lineHeight: 1.55, color: "var(--a-ink-faint)", textAlign: "center" }}>
        Mənbə: Azərbaycan Respublikası Səhiyyə Nazirliyi — Milli İmmunizasiya Qrafiki
      </p>
    </>
  );
}
