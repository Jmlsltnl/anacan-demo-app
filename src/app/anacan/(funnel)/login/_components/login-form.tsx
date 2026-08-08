"use client";

import { AlertCircle, CheckCircle2, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DEMO_ACCOUNT,
  getAccount,
  getProfile,
  startSession,
} from "../../../_lib/demo-auth";
import { SocialButtons } from "../../_components/social-buttons";
import { TextField } from "../../_components/text-field";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

type Mode = "login" | "forgot" | "sent";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (value: string) => (EMAIL_RE.test(value.trim()) ? null : "E-poçt ünvanı düzgün deyil");

  /** Where a signed-in user should land. */
  const nextRoute = (signedInEmail: string) => {
    const profile = getProfile();
    if (profile?.onboarded) return "/anacan";
    const account = getAccount();
    if (account && account.email === signedInEmail && account.email !== DEMO_ACCOUNT.email) {
      return "/anacan/onboarding"; // resume unfinished setup
    }
    return "/anacan";
  };

  const handleSocial = (provider: "apple" | "google") => {
    const socialEmail = `ana@${provider === "apple" ? "icloud" : "gmail"}.demo`;
    startSession(socialEmail);
    router.replace(nextRoute(socialEmail));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = password.length >= 6 ? null : "Şifrə ən azı 6 simvol olmalıdır";
    setEmailError(emailErr);
    setPasswordError(passErr);
    setFormError(null);
    if (emailErr || passErr) return;

    setSubmitting(true);
    window.setTimeout(() => {
      const account = getAccount();
      const normalized = email.trim().toLowerCase();
      const matchesStored = account && account.email === normalized && account.password === password;
      const matchesDemo = normalized === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;

      if (matchesStored || matchesDemo) {
        startSession(normalized);
        router.replace(nextRoute(normalized));
        return;
      }
      setSubmitting(false);
      setFormError("E-poçt və ya şifrə yanlışdır.");
    }, 850);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setMode("sent");
    }, 850);
  };

  if (mode === "forgot" || mode === "sent") {
    return (
      <div className="f-step" key="forgot">
        <h1 className="f-title a-heading">Şifrəni bərpa edin</h1>
        <p className="f-sub">
          E-poçt ünvanınızı yazın — sizə şifrəni yeniləmək üçün təhlükəsiz link göndərəcəyik.
        </p>

        {mode === "sent" ? (
          <>
            <div className="f-alert success" role="status">
              <CheckCircle2 size={16} strokeWidth={2.2} />
              <span>
                Bərpa linki <strong>{email.trim()}</strong> ünvanına göndərildi. Gələnlər qutusunu (və spam
                qovluğunu) yoxlayın.
              </span>
            </div>
            <button type="button" className="f-btn f-btn-primary" onClick={() => setMode("login")}>
              Girişə qayıt
            </button>
          </>
        ) : (
          <form onSubmit={handleForgot} noValidate>
            <TextField
              id="forgot-email"
              label="E-poçt"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                setEmailError(null);
              }}
              placeholder="siz@nümunə.az"
              icon={<Mail size={17} strokeWidth={2} />}
              error={emailError}
              autoComplete="email"
              autoFocus
            />
            <button type="submit" className="f-btn f-btn-primary" disabled={submitting}>
              {submitting ? <span className="f-spin" /> : null}
              {submitting ? "Göndərilir…" : "Bərpa linkini göndər"}
            </button>
            <button
              type="button"
              className="f-btn f-btn-quiet"
              style={{ marginTop: 6 }}
              onClick={() => setMode("login")}
            >
              Girişə qayıt
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="f-step" key="login">
      <h1 className="f-title a-heading">
        Yenidən xoş gəlmisiniz <span aria-hidden>👋</span>
      </h1>
      <p className="f-sub">Sizi görmək gözəldir. Davam etmək üçün hesabınıza daxil olun.</p>

      <SocialButtons disabled={submitting} onAuth={handleSocial} />

      <div className="f-divider">və ya e-poçt ilə</div>

      {formError && (
        <div className="f-alert error" role="alert">
          <AlertCircle size={16} strokeWidth={2.2} />
          <span>
            {formError} Hesabınız yoxdur?{" "}
            <Link href="/anacan/register">Qeydiyyatdan keçin</Link>
          </span>
        </div>
      )}

      <form onSubmit={handleLogin} noValidate>
        <TextField
          id="login-email"
          label="E-poçt"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            setEmailError(null);
            setFormError(null);
          }}
          onBlur={() => email && setEmailError(validateEmail(email))}
          placeholder="siz@nümunə.az"
          icon={<Mail size={17} strokeWidth={2} />}
          error={emailError}
          autoComplete="email"
        />
        <TextField
          id="login-password"
          label="Şifrə"
          value={password}
          onChange={(v) => {
            setPassword(v);
            setPasswordError(null);
            setFormError(null);
          }}
          placeholder="••••••••"
          icon={<Lock size={17} strokeWidth={2} />}
          password
          error={passwordError}
          autoComplete="current-password"
        />

        <div style={{ display: "flex", justifyContent: "flex-end", margin: "-6px 0 16px" }}>
          <button
            type="button"
            className="f-skip"
            style={{ color: "var(--a-ink)" }}
            onClick={() => {
              setMode("forgot");
              setFormError(null);
              setPasswordError(null);
            }}
          >
            Şifrəni unutmusunuz?
          </button>
        </div>

        <button type="submit" className="f-btn f-btn-primary" disabled={submitting}>
          {submitting ? <span className="f-spin" /> : null}
          {submitting ? "Yoxlanılır…" : "Daxil ol"}
        </button>
      </form>

      <button
        type="button"
        className="f-rule"
        style={{ margin: "18px auto 0", display: "flex" }}
        onClick={() => {
          setEmail(DEMO_ACCOUNT.email);
          setPassword(DEMO_ACCOUNT.password);
          setEmailError(null);
          setPasswordError(null);
          setFormError(null);
        }}
      >
        <Sparkles size={12} strokeWidth={2.2} />
        Demo hesabla sınayın: {DEMO_ACCOUNT.email}
      </button>
    </div>
  );
}
