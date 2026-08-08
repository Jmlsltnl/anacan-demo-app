"use client";

import { Clock3, Mic, RefreshCw, Sparkles, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "listening" | "analyzing" | "result";

interface Cause {
  emoji: string;
  label: string;
  pct: number;
  advice: string;
}

const RESULT: Cause[] = [
  { emoji: "🍼", label: "Aclıq", pct: 72, advice: "Son qidalanmadan 2 saatdan çox keçibsə, körpənizi yedizdirməyi sınayın." },
  { emoji: "😴", label: "Yorğunluq", pct: 14, advice: "Otağı qaranlıqlaşdırın və sakit yuxu rutini tətbiq edin." },
  { emoji: "💨", label: "Qaz sancısı", pct: 8, advice: "Körpəni şaquli tutub kürəyini yüngülcə masaj edin." },
  { emoji: "🦷", label: "Diş narahatlığı", pct: 4, advice: "Soyuq diş halqası təklif edin." },
  { emoji: "🧷", label: "Bez narahatlığı", pct: 2, advice: "Bezi yoxlayın və lazımdırsa dəyişin." },
];

const HISTORY = [
  { emoji: "😴", label: "Yorğunluq", pct: 65, time: "Bu gün, 14:32" },
  { emoji: "💨", label: "Qaz sancısı", pct: 71, time: "Dünən, 21:08" },
  { emoji: "🍼", label: "Aclıq", pct: 84, time: "Dünən, 12:47" },
];

const BAR_COLORS = ["var(--a-grad-lav)", "var(--a-grad-blue)", "var(--a-grad-green)", "var(--a-grad-yellow)", "var(--a-grad-peach)"];

export function CryAnalyzer() {
  const [stage, setStage] = useState<Stage>("idle");
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startListening() {
    setSeconds(0);
    setStage("listening");
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= 6) {
          stopListening(true);
          return s + 1;
        }
        return s + 1;
      });
    }, 1000);
  }

  function stopListening(auto = false) {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!auto && seconds < 2) {
      // too short — back to idle
      setStage("idle");
      return;
    }
    setStage("analyzing");
    setTimeout(() => setStage("result"), 1400);
  }

  function reset() {
    setSeconds(0);
    setStage("idle");
  }

  const top = RESULT[0];

  return (
    <>
      {/* Recorder card */}
      <div className="a-card a-fade-in">
        {stage !== "result" ? (
          <div className="a-cry-stage">
            <div className={`a-cry-mic-wrap${stage === "listening" ? " listening" : ""}`}>
              <span className="a-cry-pulse" />
              <span className="a-cry-pulse" />
              {stage === "analyzing" ? (
                <span className="a-cry-mic" style={{ background: "var(--a-grad-lav)", color: "#3c2e5c" }}>
                  <Sparkles size={34} strokeWidth={2} />
                </span>
              ) : (
                <button
                  type="button"
                  className={`a-cry-mic${stage === "listening" ? " listening" : ""}`}
                  aria-label={stage === "listening" ? "Dayandır" : "Analizə başla"}
                  onClick={() => (stage === "listening" ? stopListening() : startListening())}
                >
                  {stage === "listening" ? <Square size={30} strokeWidth={2.2} fill="currentColor" /> : <Mic size={34} strokeWidth={2} />}
                </button>
              )}
            </div>

            {stage === "idle" && (
              <>
                <p className="a-cry-status">Analizə başla</p>
                <p className="a-cry-hint">Mikrofonu körpəyə yaxın tutun və düyməyə toxunun</p>
              </>
            )}

            {stage === "listening" && (
              <>
                <p className="a-cry-status">Dinlənilir… 0:{String(seconds).padStart(2, "0")}</p>
                <p className="a-cry-hint">Ağlama səsi qeydə alınır (5–10 saniyə kifayətdir)</p>
                <div className="a-cry-wave">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </>
            )}

            {stage === "analyzing" && (
              <>
                <p className="a-cry-status">AI təhlil edir…</p>
                <p className="a-cry-hint">Səs nümunəsi 5 mümkün səbəblə müqayisə olunur</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="a-cry-result-hero">
              <span className="a-cry-result-emoji">{top.emoji}</span>
              <div>
                <p className="a-cry-result-title">{top.label}</p>
                <p className="a-cry-result-sub">Ən ehtimal olunan səbəb</p>
              </div>
              <span className="a-cry-result-pct">{top.pct}%</span>
            </div>

            {RESULT.map((c, i) => (
              <div key={c.label} className="a-list-row" style={{ display: "block", padding: "10px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 15 }}>{c.emoji}</span>
                  <p className="a-list-title" style={{ flex: 1 }}>{c.label}</p>
                  <span className="a-list-value">{c.pct}%</span>
                </div>
                <div className="a-inline-bar">
                  <div className="a-inline-bar-fill" style={{ width: `${c.pct}%`, background: BAR_COLORS[i % BAR_COLORS.length] }} />
                </div>
              </div>
            ))}

            <div className="a-teaser">
              <strong>Tövsiyə:</strong> {top.advice}
            </div>

            <button
              type="button"
              className="a-cta-btn"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={reset}
            >
              <RefreshCw size={13} strokeWidth={2.4} /> Yenidən analiz et
            </button>
          </>
        )}
      </div>

      {/* History */}
      <section className="a-section">
        <div className="a-section-head">
          <h2 className="a-section-title a-heading">Son analizlər</h2>
          <span className="a-section-link">{HISTORY.length} qeyd</span>
        </div>
        <div className="a-list-card">
          {HISTORY.map((h) => (
            <div key={h.time} className="a-list-row">
              <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 18 }}>
                {h.emoji}
              </span>
              <div>
                <p className="a-list-title">{h.label}</p>
                <p className="a-list-sub" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Clock3 size={10} /> {h.time}
                </p>
              </div>
              <span className="a-list-trail">
                <p className="a-list-value">{h.pct}%</p>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
