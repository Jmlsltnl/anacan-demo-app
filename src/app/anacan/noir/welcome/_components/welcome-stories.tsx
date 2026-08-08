"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORIES = [
  {
    emoji: "🌙",
    glow: "rgba(142, 123, 255, 0.55)",
    title: (
      <>
        Analıq <em>gecə 3-də</em> də davam edir
      </>
    ),
    text: "Biz də. Süni intellekt köməkçisi, ekspert məzmunu və dəqiq izləmə — yorğun anların ən sakit yoldaşı.",
  },
  {
    emoji: "🧬",
    glow: "rgba(87, 212, 193, 0.5)",
    title: (
      <>
        Ümumi məsləhət yox — <em>sizin</em> planınız
      </>
    ),
    text: "20 sualdan ibarət klinik yanaşmalı qiymətləndirmə: yuxu, qidalanma, əhval, dəstək sistemi. Hər cavab planınızı dəyişir.",
  },
  {
    emoji: "📊",
    glow: "rgba(217, 184, 120, 0.5)",
    title: (
      <>
        Hissləri <em>rəqəmlərə</em> çeviririk
      </>
    ),
    text: "Anacan Skoru bədəninizin 4 ölçüsünü izləyir. Nə yaxşılaşır, nə diqqət istəyir — hər səhər bir baxışda.",
  },
  {
    emoji: "🤍",
    glow: "rgba(255, 123, 166, 0.5)",
    title: (
      <>
        Hamiləlikdən <em>ilk addımlara</em> qədər
      </>
    ),
    text: "Hazırlıq, hamiləlik, körpə və sikl — dörd rejim, bir tətbiq. Həyatınız dəyişdikcə Anacan da sizinlə dəyişir.",
  },
];

const STORY_MS = 5200;

export function WelcomeStories() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % STORIES.length);
    }, STORY_MS);
    return () => window.clearTimeout(id);
  }, [index]);

  const story = STORIES[index];

  return (
    <div
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (delta < -42) setIndex((i) => Math.min(STORIES.length - 1, i + 1));
        if (delta > 42) setIndex((i) => Math.max(0, i - 1));
      }}
    >
      <div className="n-story-segments" aria-hidden>
        {STORIES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`n-story-seg${i < index ? " done" : ""}${i === index ? " live" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Hekayə ${i + 1}`}
            style={{ cursor: "pointer" }}
          >
            <span key={i === index ? `live-${index}` : undefined} />
          </button>
        ))}
      </div>

      <div className="n-brand-row">
        <span className="n-mark">
          <Heart size={18} strokeWidth={2.4} fill="currentColor" />
        </span>
        <p className="n-brand-name">
          Anacan
          <small>Noir Edition</small>
        </p>
      </div>

      <div className="n-step" key={index}>
        <div className="n-story-art">
          <span className="n-story-glow" style={{ background: story.glow }} />
          <span className="n-story-emoji" aria-hidden>
            {story.emoji}
          </span>
        </div>
        <h1 className="n-story-title n-display">{story.title}</h1>
        <p className="n-story-text">{story.text}</p>
      </div>

      <div className="n-stats-row n-rise-in n-d2">
        <div className="n-stat">
          <p className="n-stat-value">120K+</p>
          <p className="n-stat-label">aktiv ana</p>
        </div>
        <div className="n-stat">
          <p className="n-stat-value">4.9 ★</p>
          <p className="n-stat-label">orta reytinq</p>
        </div>
        <div className="n-stat">
          <p className="n-stat-value">500+</p>
          <p className="n-stat-label">ekspert məqaləsi</p>
        </div>
      </div>
    </div>
  );
}
