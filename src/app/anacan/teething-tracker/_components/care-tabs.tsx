"use client";

import { useState } from "react";

const tips = [
  { emoji: "🧊", title: "Soyuq Diş Halqaları", tag: "Ağrı Kəsici", color: "pink", text: "Diş halqalarını soyuducuda saxlayın. Heç vaxt dondurmayın, çünki körpənin diş ətləri üçün çox soyuq ola bilər." },
  { emoji: "👆", title: "Yumşaq Diş Əti Masajı", tag: "Ağrı Kəsici", color: "pink", text: "Təmiz barmağınızla körpənizin diş ətlərini dairəvi hərəkətlərlə yumşaq şəkildə masaj edin." },
  { emoji: "🧴", title: "Təmiz Islaq Parça", tag: "Ağrı Kəsici", color: "pink", text: "Təmiz, islaq parçanı soyuducuda soyudun və körpənin çeynəməsinə icazə verin." },
  { emoji: "🪥", title: "İlk Diş Qulluğu", tag: "Zamanı", color: "blue", text: "İlk diş görünən kimi yalnız su ilə yumşaq körpə diş fırçası istifadə edərək fırçalamağa başlayın." },
  { emoji: "🍭", title: "Şəkərdən Qaçının", tag: "Ümumi", color: "green", text: "Erkən diş çürümələrinin qarşısını almaq üçün, xüsusilə yatmazdan əvvəl şəkərli qida və içkilərdən qaçın." },
  { emoji: "🏥", title: "Mütəmadi Diş Həkimi Ziyarətləri", tag: "Sonra", color: "lav", text: "Körpənin ilk diş həkimi ziyarətini ilk ad günündən əvvəl və ya ilk diş görünəndə planlaşdırın." },
  { emoji: "💧", title: "Sulanma Səpgisinin Qarşısını Alma", tag: "Zamanı", color: "blue", text: "Körpənin çənəsini və boynunu quru saxlayın. Sulanma səpgisinin qarşısını almaq üçün yumşaq bariyer kremi sürtün." },
  { emoji: "🧸", title: "Təhlükəsiz Diş Oyuncaqları", tag: "Ümumi", color: "green", text: "BPA-sız, toksik olmayan diş oyuncaqları seçin. Boğulma təhlükəsi yarada biləcək kiçik hissələri olan oyuncaqlardan qaçın." },
];

const symptoms = [
  { emoji: "💧", label: "Salivasiya artımı" },
  { emoji: "😖", label: "Əsəbilik" },
  { emoji: "🌡️", label: "Yüngül hərarət" },
  { emoji: "😬", label: "Çeynəmə istəyi" },
  { emoji: "🫧", label: "Diş əti şişməsi" },
  { emoji: "🍽️", label: "İştahsızlıq" },
  { emoji: "😴", label: "Yuxu pozulması" },
  { emoji: "👂", label: "Qulağını dartma" },
];

const TAG_COLORS: Record<string, { bg: string; ink: string }> = {
  pink: { bg: "var(--a-pink-1)", ink: "#a3355f" },
  blue: { bg: "var(--a-blue-1)", ink: "#1c5a80" },
  green: { bg: "var(--a-green-1)", ink: "#1c7a4d" },
  lav: { bg: "var(--a-lav-1)", ink: "#4b2f8a" },
};

export function CareTabs() {
  const [tab, setTab] = useState<"qulluq" | "simptomlar">("qulluq");
  const [activeSymptoms, setActiveSymptoms] = useState<string[]>(["Salivasiya artımı", "Çeynəmə istəyi"]);

  function toggleSymptom(label: string) {
    setActiveSymptoms((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));
  }

  return (
    <section className="a-section">
      <div className="a-section-head">
        <h2 className="a-section-title a-heading">Qulluq məsləhətləri</h2>
        <div className="a-tabs">
          <button type="button" className={`a-tab${tab === "qulluq" ? " active" : ""}`} onClick={() => setTab("qulluq")}>
            Qulluq
          </button>
          <button type="button" className={`a-tab${tab === "simptomlar" ? " active" : ""}`} onClick={() => setTab("simptomlar")}>
            Simptomlar
          </button>
        </div>
      </div>

      {tab === "qulluq" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tips.map((tip) => {
            const c = TAG_COLORS[tip.color];
            return (
              <div key={tip.title} className="a-card">
                <div className="a-list-row" style={{ padding: 0 }}>
                  <span className="a-list-icon" style={{ background: "var(--a-surface-soft)", fontSize: 18 }}>
                    {tip.emoji}
                  </span>
                  <div>
                    <p className="a-list-title">{tip.title}</p>
                    <span className="a-tip-tag" style={{ background: c.bg, color: c.ink }}>
                      {tip.tag}
                    </span>
                  </div>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--a-ink-soft)" }}>{tip.text}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="a-card">
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--a-ink-soft)" }}>
            Bu gün müşahidə etdiyiniz simptomları qeyd edin:
          </p>
          <div className="a-tag-row" style={{ marginBottom: 0 }}>
            {symptoms.map((s) => (
              <button
                key={s.label}
                type="button"
                className={`a-tag${activeSymptoms.includes(s.label) ? " on" : ""}`}
                onClick={() => toggleSymptom(s.label)}
              >
                <span>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
