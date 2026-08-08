"use client";

import { useEffect, useRef, useState } from "react";

type Provider = "apple" | "google";

function AppleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

/**
 * Apple-first social sign-in (iOS HIG ordering). The provider handshake is
 * simulated with a short delay so the prototype feels like a real OAuth hop.
 */
export function SocialButtons({
  disabled = false,
  onAuth,
}: {
  disabled?: boolean;
  onAuth: (provider: Provider) => void;
}) {
  const [busy, setBusy] = useState<Provider | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const start = (provider: Provider) => {
    if (busy) return;
    setBusy(provider);
    timer.current = window.setTimeout(() => {
      setBusy(null);
      onAuth(provider);
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button
        type="button"
        className="f-btn f-btn-social"
        style={{ background: "var(--a-ink)", borderColor: "var(--a-ink)", color: "#fdfbf7" }}
        disabled={disabled || busy !== null}
        onClick={() => start("apple")}
      >
        {busy === "apple" ? <span className="f-spin" /> : <AppleLogo />}
        Apple ilə davam et
      </button>
      <button
        type="button"
        className="f-btn f-btn-social"
        disabled={disabled || busy !== null}
        onClick={() => start("google")}
      >
        {busy === "google" ? <span className="f-spin" /> : <GoogleLogo />}
        Google ilə davam et
      </button>
    </div>
  );
}
