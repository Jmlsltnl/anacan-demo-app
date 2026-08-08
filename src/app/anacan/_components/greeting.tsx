"use client";

import { useSyncExternalStore } from "react";
import { getProfile } from "../_lib/demo-auth";

const FALLBACK_NAME = "Turkan";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return getProfile()?.momName ?? FALLBACK_NAME;
}

function getServerSnapshot() {
  return FALLBACK_NAME;
}

/**
 * Personalized topbar greeting: falls back to the demo persona until
 * the onboarding funnel has stored a real name.
 */
export function Greeting() {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div>
      <p className="a-eyebrow">Good morning</p>
      <p className="a-wordmark">{name} 👋</p>
    </div>
  );
}
