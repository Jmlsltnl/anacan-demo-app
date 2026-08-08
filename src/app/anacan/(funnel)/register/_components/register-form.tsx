"use client";

import { AlertCircle, Check, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEMO_ACCOUNT, getAccount, saveAccount, startSession } from "../../../_lib/demo-auth";
import { SocialButtons } from "../../_components/social-buttons";
import { TextField } from "../../_components/text-field";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const RULES = [
  { id: "len", label: "Ən azı 8 simvol", test: (v: string) => v.length >= 8 },
  { id: "letter", label: "Ən azı 1 hərf", test: (v: string) => /\p{L}/u.test(v) },
  { id: "digit", label: "Ən azı 1 rəqəm", test: (v: string) => /\d/.test(v) },
] as const;

const STRENGTH_LABELS = ["", "Zəif", "Orta", "Güclü"];

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const score = RULES.filter((r) => r.test(password)).length;
  const validateEmail = (value: string) => (EMAIL_RE.test(value.trim()) ? null : "E-poçt ünvanı düzgün deyil");

  const finish = (accountEmail: string, provider: "email" | "apple" | "google", pass: string) => {
    saveAccount({
      email: accountEmail,
      password: pass,
      provider,
      createdAt: new Date().toISOString(),
    });
    startSession(accountEmail);
    router.replace("/anacan/onboarding");
  };

  const handleSocial = (provider: "apple" | "google") => {
    finish(`ana@${provider === "apple" ? "icloud" : "gmail"}.demo`, provider, "oauth-demo");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = score === RULES.length ? null : "Şifrə aşağıdakı tələblərə cavab verməlidir";
    setEmailError(emailErr);
    setPasswordError(passErr);
    setTermsError(!terms);
    setDuplicate(false);
    if (emailErr || passErr || !terms) return;

    const normalized = email.trim().toLowerCase();
    const existing = getAccount();
    if (normalized === DEMO_ACCOUNT.email || existing?.email === normalized) {
      setDuplicate(true);
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => finish(normalized, "email", password), 850);
  };

  return (
    <div className="f-step">
      <h1 className="f-title a-heading">Hesab yaradın</h1>
      <p className="f-sub">
        Cəmi 1 dəqiqə çəkir — sonra sizə özəl planınızı birlikdə quracağıq.
      </p>

      <SocialButtons disabled={submitting} onAuth={handleSocial} />

      <div className="f-divider">və ya e-poçt ilə</div>

      {duplicate && (
        <div className="f-alert error" role="alert">
          <AlertCircle size={16} strokeWidth={2.2} />
          <span>
            Bu e-poçt artıq qeydiyyatdadır. <Link href="/anacan/login">Daxil olun</Link>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="reg-email"
          label="E-poçt"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            setEmailError(null);
            setDuplicate(false);
          }}
          onBlur={() => email && setEmailError(validateEmail(email))}
          placeholder="siz@nümunə.az"
          icon={<Mail size={17} strokeWidth={2} />}
          error={emailError}
          autoComplete="email"
        />

        <TextField
          id="reg-password"
          label="Şifrə"
          value={password}
          onChange={(v) => {
            setPassword(v);
            setPasswordError(null);
          }}
          placeholder="Güclü bir şifrə seçin"
          icon={<Lock size={17} strokeWidth={2} />}
          password
          error={passwordError}
          autoComplete="new-password"
        />

        {password.length > 0 && (
          <>
            <div className={`f-strength w${score}`} aria-hidden>
              <div className="f-strength-bar">
                <span />
              </div>
              <span className="f-strength-label">{STRENGTH_LABELS[score]}</span>
            </div>
            <div className="f-rules">
              {RULES.map((rule) => (
                <span key={rule.id} className={`f-rule${rule.test(password) ? " ok" : ""}`}>
                  <Check size={11} strokeWidth={3} />
                  {rule.label}
                </span>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className={`f-check${terms ? " on" : ""}${termsError ? " error" : ""}`}
            onClick={() => {
              setTerms((v) => !v);
              setTermsError(false);
            }}
            aria-pressed={terms}
          >
            <span className="f-check-box">
              <Check size={14} strokeWidth={3} />
            </span>
            <span className="f-check-text">
              <strong>İstifadə şərtləri</strong> və <strong>Məxfilik siyasəti</strong> ilə razıyam
            </span>
          </button>
          {termsError && (
            <p className="f-error-text" style={{ margin: "0 0 10px 33px" }}>
              <AlertCircle size={13} strokeWidth={2.4} /> Davam etmək üçün şərtləri qəbul edin
            </p>
          )}
          <button
            type="button"
            className={`f-check${marketing ? " on" : ""}`}
            onClick={() => setMarketing((v) => !v)}
            aria-pressed={marketing}
          >
            <span className="f-check-box">
              <Check size={14} strokeWidth={3} />
            </span>
            <span className="f-check-text">Mənə faydalı məsləhətlər və yeniliklər göndərin (istəyə bağlı)</span>
          </button>
        </div>

        <button type="submit" className="f-btn f-btn-primary" style={{ marginTop: 10 }} disabled={submitting}>
          {submitting ? <span className="f-spin" /> : null}
          {submitting ? "Hesab yaradılır…" : "Davam et"}
        </button>
      </form>

      <p
        className="f-hint"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16 }}
      >
        <ShieldCheck size={14} strokeWidth={2.2} />
        Məlumatlarınız yalnız bu cihazda saxlanılır (demo rejimi)
      </p>
    </div>
  );
}
