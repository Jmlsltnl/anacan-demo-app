"use client";

import { Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    emoji: "🤰",
    bg: "var(--a-grad-peach)",
    orbs: ["🍑", "💛", "🌿"],
    title: (
      <>
        Hamiləliyin hər həftəsi, <em>yanınızda</em> bir bələdçi
      </>
    ),
    text: "Körpənizin inkişafını həftə-həftə izləyin, bədəninizdəki dəyişiklikləri anlayın, doğuşa hazır olun.",
  },
  {
    emoji: "👶",
    bg: "var(--a-grad-pink)",
    orbs: ["🍼", "🧸", "🌙"],
    title: (
      <>
        Körpənizin ilk ili — <em>gün-gün</em>, addım-addım
      </>
    ),
    text: "Yuxu, qidalanma, inkişaf sıçrayışları və peyvənd təqvimi — hamısı bir yerdə, sadə dildə.",
  },
  {
    emoji: "🌸",
    bg: "var(--a-grad-lav)",
    orbs: ["📅", "💜", "✨"],
    title: (
      <>
        Siklinizi tanıyın, <em>bədəninizi</em> anlayın
      </>
    ),
    text: "Dəqiq dövr proqnozları, ovulyasiya pəncərəsi və simptom analizi — bədəniniz sizə nə deyir?",
  },
  {
    emoji: "💬",
    bg: "var(--a-grad-blue)",
    orbs: ["🤖", "🔊", "📖"],
    title: (
      <>
        Anacan.AI — sualınıza <em>saniyələr</em> içində cavab
      </>
    ),
    text: "Ağlama tərcüməçisi, süni intellekt köməkçisi və 500+ ekspert məqaləsi — gecə 3-də belə yanınızda.",
  },
];

const proof = [
  { value: "4.9", star: true, label: "12 400+ rəy" },
  { value: "120K+", label: "aktiv ana" },
  { value: "№1", label: "ana tətbiqi AZ-da" },
];

export function LandingExperience() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, [index]);

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(slides.length - 1, next)));
  };

  return (
    <div>
      <div className="f-brand f-rise">
        <span className="f-logo">
          <Heart size={18} strokeWidth={2.4} fill="currentColor" />
        </span>
        <p className="f-brand-name a-heading">Anacan</p>
      </div>

      <div
        className="f-carousel"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (delta < -42) go(index + 1);
          if (delta > 42) go(index - 1);
        }}
      >
        <div className="f-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div className="f-slide" key={i} aria-hidden={i !== index}>
              <div className="f-slide-art" style={{ background: slide.bg }}>
                <span aria-hidden>{slide.emoji}</span>
                <span className="f-slide-orb" style={{ top: -8, right: -4 }}>
                  {slide.orbs[0]}
                </span>
                <span className="f-slide-orb two" style={{ bottom: 2, left: -18 }}>
                  {slide.orbs[1]}
                </span>
                <span className="f-slide-orb three" style={{ top: 52, left: -34 }}>
                  {slide.orbs[2]}
                </span>
              </div>
              <h1 className="f-slide-title a-heading">{slide.title}</h1>
              <p className="f-slide-text">{slide.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="f-dots" role="tablist" aria-label="Təqdimat slaydları">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slayd ${i + 1}`}
            className={`f-dot${i === index ? " on" : ""}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <div className="f-proof f-rise f-d2">
        {proof.map((cell, i) => (
          <div key={cell.label} style={{ display: "contents" }}>
            {i > 0 && <span className="f-proof-sep" />}
            <div className="f-proof-cell">
              <p className="f-proof-value">
                {cell.star && <Star size={13} fill="currentColor" strokeWidth={0} />}
                {cell.value}
              </p>
              <p className="f-proof-label">{cell.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
