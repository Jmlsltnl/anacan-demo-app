"use client";

import { Check, Inbox, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveNoirAccount, startNoirSession } from "../../_lib/noir-store";
import { NoirSocial } from "../../_components/noir-social";
import { OtpInput } from "../../_components/otp-input";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function RegisterFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<"form" | "code">("form");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState(makeCode);
  const [mailVisible, setMailVisible] = useState(false);
  const [otpStatus, setOtpStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [otpReset, setOtpReset] = useState(0);

  /** show the fake "email" a moment after a code is (re)sent */
  const deliverMail = () => {
    setMailVisible(false);
    window.setTimeout(() => setMailVisible(true), 900);
  };

  const finish = (accountEmail: string, provider: "email" | "apple" | "google") => {
    saveNoirAccount({ email: accountEmail, provider, createdAt: new Date().toISOString() });
    startNoirSession(accountEmail);
    router.replace("/anacan/noir/onboarding");
  };

  const handleSocial = (provider: "apple" | "google") => {
    finish(`ana@${provider === "apple" ? "icloud" : "gmail"}.demo`, provider);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const bad = !EMAIL_RE.test(email.trim());
    setEmailError(bad ? "E-poçt ünvanı düzgün deyil" : null);
    setTermsError(!terms);
    if (bad || !terms) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setCode(makeCode());
      setMode("code");
      deliverMail();
    }, 800);
  };

  const verify = (entered: string) => {
    if (entered === code) {
      setOtpStatus("ok");
      window.setTimeout(() => finish(email.trim().toLowerCase(), "email"), 500);
    } else {
      setOtpStatus("bad");
      window.setTimeout(() => {
        setOtpStatus("idle");
        setOtpReset((v) => v + 1);
      }, 600);
    }
  };

  if (mode === "code") {
    return (
      <div className="n-step" key="code">
        <p className="n-kicker">Son addım</p>
        <h1 className="n-title n-display">E-poçtunuzu təsdiqləyin</h1>
        <p className="n-sub">
          <strong style={{ color: "var(--n-ink)" }}>{email.trim()}</strong> ünvanına 6 rəqəmli kod
          göndərdik. Təsdiqdən dərhal sonra qiymətləndirməyə başlayırıq.
        </p>

        <OtpInput key={otpReset} status={otpStatus} onComplete={verify} />

        {mailVisible && (
          <div className="n-mail" role="status">
            <span className="n-mail-icon">
              <Inbox size={17} strokeWidth={2.2} />
            </span>
            <div>
              <p className="n-mail-head">📩 Yeni e-poçt · Anacan Noir</p>
              <p className="n-mail-text">
                Təsdiq kodunuz: <span className="n-mail-code">{code}</span> (demo: kod burada göstərilir)
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          className="n-btn n-btn-quiet"
          style={{ marginTop: 14 }}
          onClick={() => {
            setCode(makeCode());
            setOtpReset((v) => v + 1);
            setOtpStatus("idle");
            deliverMail();
          }}
        >
          Kod gəlmədi?&nbsp;<strong>Yenidən göndər</strong>
        </button>
        <button type="button" className="n-btn n-btn-quiet" style={{ minHeight: 36 }} onClick={() => setMode("form")}>
          E-poçtu dəyiş
        </button>
      </div>
    );
  }

  return (
    <div className="n-step" key="form">
      <p className="n-kicker">Qeydiyyat</p>
      <h1 className="n-title n-display">
        Hesab yaradın — <em>şifrəsiz</em>
      </h1>
      <p className="n-sub">
        Yadda saxlamalı heç nə yoxdur: e-poçtunuza göndərilən birdəfəlik kodla daxil olursunuz. Daha
        təhlükəsiz, daha rahat.
      </p>

      <NoirSocial onAuth={handleSocial} />

      <div className="n-divider">və ya e-poçt ilə</div>

      <form onSubmit={submit} noValidate>
        <div className="n-field">
          <label className="n-label" htmlFor="reg-email">
            E-poçt
          </label>
          <div className={`n-control${emailError ? " error" : ""}`}>
            <Mail size={17} strokeWidth={2} />
            <input
              id="reg-email"
              className="n-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              placeholder="siz@nümunə.az"
              autoComplete="email"
            />
          </div>
          {emailError && <p className="n-error">{emailError}</p>}
        </div>

        <button
          type="button"
          className="n-switch-row"
          style={{ marginBottom: 10, borderColor: termsError ? "var(--n-red)" : undefined }}
          onClick={() => {
            setTerms((v) => !v);
            setTermsError(false);
          }}
          aria-pressed={terms}
        >
          <span>
            <p className="n-switch-title">Şərtləri qəbul edirəm</p>
            <p className="n-switch-sub">İstifadə şərtləri və Məxfilik siyasəti</p>
          </span>
          <span className={`n-switch${terms ? " on" : ""}`}>
            <span className="n-switch-knob" />
          </span>
        </button>
        {termsError && (
          <p className="n-error" style={{ margin: "-4px 2px 10px" }}>
            Davam etmək üçün şərtləri qəbul edin
          </p>
        )}

        <button
          type="button"
          className="n-switch-row"
          style={{ marginBottom: 18 }}
          onClick={() => setMarketing((v) => !v)}
          aria-pressed={marketing}
        >
          <span>
            <p className="n-switch-title">Həftəlik məsləhət bülleteni</p>
            <p className="n-switch-sub">İstəyə bağlı — istənilən vaxt imtina</p>
          </span>
          <span className={`n-switch${marketing ? " on" : ""}`}>
            <span className="n-switch-knob" />
          </span>
        </button>

        <button type="submit" className="n-btn n-btn-gold" disabled={sending}>
          {sending ? <span className="n-spin" /> : null}
          {sending ? "Kod göndərilir…" : "Təsdiq kodu göndər"}
        </button>
      </form>

      <p
        className="n-hint"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16 }}
      >
        <Lock size={13} strokeWidth={2.2} />
        Sağlamlıq məlumatlarınız yalnız bu cihazda saxlanılır (demo)
      </p>

      <p className="n-footer-note" style={{ marginTop: 12 }}>
        Artıq hesabınız var? <Link href="/anacan/noir/login">Daxil olun</Link>
      </p>

      <div className="n-insight" style={{ marginTop: 20 }}>
        <Check size={15} strokeWidth={2.4} />
        <span>
          Qeydiyyatdan sonra 20 suallıq qiymətləndirmə sizi gözləyir — cavablarınızla Anacan Skorunuz və 90
          günlük planınız qurulacaq.
        </span>
      </div>
    </div>
  );
}
