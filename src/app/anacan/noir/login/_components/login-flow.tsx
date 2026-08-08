"use client";

import { Inbox, Mail, ScanFace } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import {
  getNoirAccount,
  getNoirProfile,
  saveNoirAccount,
  startNoirSession,
  subscribeNoir,
} from "../../_lib/noir-store";
import { NoirSocial } from "../../_components/noir-social";
import { OtpInput } from "../../_components/otp-input";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const getServerAccount = () => null;

function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function LoginFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<"start" | "code">("start");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState(makeCode);
  const [mailVisible, setMailVisible] = useState(false);
  const [otpStatus, setOtpStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [otpReset, setOtpReset] = useState(0);
  const [scanning, setScanning] = useState(false);
  const account = useSyncExternalStore(subscribeNoir, getNoirAccount, getServerAccount);

  /** show the fake "email" a moment after a code is (re)sent */
  const deliverMail = () => {
    setMailVisible(false);
    window.setTimeout(() => setMailVisible(true), 900);
  };

  const destination = () => (getNoirProfile()?.onboarded ? "/anacan/noir" : "/anacan/noir/onboarding");

  const signIn = (signedEmail: string) => {
    startNoirSession(signedEmail);
    router.replace(destination());
  };

  const handleSocial = (provider: "apple" | "google") => {
    const socialEmail = `ana@${provider === "apple" ? "icloud" : "gmail"}.demo`;
    if (!getNoirAccount()) {
      saveNoirAccount({ email: socialEmail, provider, createdAt: new Date().toISOString() });
    }
    signIn(socialEmail);
  };

  const handleQuickContinue = () => {
    if (!account || scanning) return;
    setScanning(true);
    window.setTimeout(() => signIn(account.email), 1100);
  };

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("E-poçt ünvanı düzgün deyil");
      return;
    }
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
      window.setTimeout(() => signIn(email.trim().toLowerCase()), 500);
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
        <p className="n-kicker">Təsdiq</p>
        <h1 className="n-title n-display">Kodu daxil edin</h1>
        <p className="n-sub">
          <strong style={{ color: "var(--n-ink)" }}>{email.trim()}</strong> ünvanına 6 rəqəmli giriş kodu
          göndərdik. Şifrə yoxdur — kod hər dəfə yenidir, hesabınız hər dəfə qorunur.
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
                Giriş kodunuz: <span className="n-mail-code">{code}</span> — 10 dəqiqə etibarlıdır. (demo:
                kod burada göstərilir)
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
        <button type="button" className="n-btn n-btn-quiet" style={{ minHeight: 36 }} onClick={() => setMode("start")}>
          E-poçtu dəyiş
        </button>
      </div>
    );
  }

  return (
    <div className="n-step" key="start">
      <p className="n-kicker">Giriş</p>
      <h1 className="n-title n-display">
        Yenidən <em>xoş gəlmisiniz</em>
      </h1>
      <p className="n-sub">Şifrəsiz, təhlükəsiz giriş — e-poçtunuza birdəfəlik kod göndəririk.</p>

      {account && (
        <button
          type="button"
          className={`n-return${scanning ? " scanning" : ""}`}
          onClick={handleQuickContinue}
        >
          <span className="n-avatar">{account.email[0]?.toUpperCase()}</span>
          <span>
            <p className="n-return-name">{scanning ? "Tanınır…" : "Davam et"}</p>
            <p className="n-return-mail">{account.email}</p>
          </span>
          <span className={`n-faceid${scanning ? " pulse" : ""}`}>
            <ScanFace size={20} strokeWidth={2} />
          </span>
        </button>
      )}

      <NoirSocial disabled={scanning} onAuth={handleSocial} />

      <div className="n-divider">və ya e-poçt ilə</div>

      <form onSubmit={sendCode} noValidate>
        <div className="n-field">
          <label className="n-label" htmlFor="login-email">
            E-poçt
          </label>
          <div className={`n-control${emailError ? " error" : ""}`}>
            <Mail size={17} strokeWidth={2} />
            <input
              id="login-email"
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

        <button type="submit" className="n-btn n-btn-gold" disabled={sending}>
          {sending ? <span className="n-spin" /> : null}
          {sending ? "Kod göndərilir…" : "Giriş kodu göndər"}
        </button>
      </form>

      <p className="n-footer-note" style={{ marginTop: 18 }}>
        Hesabınız yoxdur? <Link href="/anacan/noir/register">Qeydiyyatdan keçin</Link>
      </p>
    </div>
  );
}
