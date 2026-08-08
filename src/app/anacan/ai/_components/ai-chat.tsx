"use client";

import { ChevronDown, Send, Sparkles, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
  time: string;
}

const SUGGESTIONS = [
  "Menstrual siklim haqqında məlumat ver",
  "PMS simptomları ilə necə mübarizə aparım?",
  "Fertil pəncərəm nə vaxtdır?",
];

const CANNED: Record<string, string> = {
  "Menstrual siklim haqqında məlumat ver":
    "Orta menstrual sikl 21-35 gün arasında dəyişə bilər və adətən 28 günə yaxın olur. Sikliniz follikulyar faza, ovulyasiya, luteal faza və menstruasiya mərhələlərindən keçir. Anacan tətbiqindəki Sikl bölməsindən öz məlumatlarınızı izləyə bilərsiniz.",
  "PMS simptomları ilə necə mübarizə aparım?":
    "PMS simptomlarını yüngülləşdirmək üçün mütəmadi məşq etmək, duz və kofeini azaltmaq, kifayət qədər maqnezium və B6 vitamini almaq faydalı ola bilər. Ağrı üçün isti kompres də kömək edə bilər. Simptomlar şiddətli olarsa, həkiminizə müraciət edin.",
  "Fertil pəncərəm nə vaxtdır?":
    "Fertil pəncərə adətən ovulyasiyadan 5 gün əvvəl və 1 gün sonrakı dövrü əhatə edir. 28 günlük sikldə bu, təxminən 10–16-cı günlərə düşür. Dəqiq tarix üçün Sikl Kalendarı bölməsinə baxa bilərsiniz.",
};

const FALLBACK =
  "Təşəkkür edirəm sualınız üçün! Daha dəqiq kömək edə bilmək üçün simptomlarınızı və ya vəziyyətinizi bir az daha ətraflı təsvir edə bilərsiniz. Unutmayın, bu məlumatlar məsləhət xarakterlidir və həkim müayinəsini əvəz etmir.";

function now() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greet",
      role: "ai",
      text: "Salam, Turkan. Mən Anacan.AI. Menstrual tsikl, simptomlar və ümumi sağlamlıq üzrə suallarınıza peşəkar cavab verməyə hazıram.",
      time: "19:13",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed, time: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = CANNED[trimmed] ?? FALLBACK;
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "ai", text: reply, time: now() }]);
      setTyping(false);
    }, 750);
  }

  return (
    <>
      <div className="a-chat-warn">
        <button type="button" className="a-chat-warn-summary" onClick={() => setWarnOpen((v) => !v)}>
          <Stethoscope size={15} strokeWidth={2} color="#7a5200" />
          <span className="txt">Həkim məsləhəti əvəzi deyil</span>
          <ChevronDown
            size={15}
            style={{ flexShrink: 0, transform: warnOpen ? "rotate(180deg)" : "none", transition: "transform 200ms ease", color: "#7a5200" }}
          />
        </button>
        {warnOpen && (
          <p className="a-chat-warn-body">
            Anacan.AI tibbi məsləhət, diaqnoz və ya müalicə əvəzi DEYİL. Verilən məlumatlar yalnız informasiya
            xarakterli olub yalnız təhsil məqsədi daşıyır. Hər hansı tibbi qərar verməzdən əvvəl mütləq həkiminizə
            və ya ixtisaslı tibb işçisinə müraciət edin. Təcili hallarda 103-ə zəng edin.
          </p>
        )}
      </div>

      {messages.map((m) => (
        <div key={m.id} className={`a-chat-msg-row${m.role === "user" ? " user" : ""}`}>
          {m.role === "ai" && (
            <span className="a-chat-avatar">
              <Sparkles size={13} strokeWidth={2.2} />
            </span>
          )}
          <div className="a-chat-bubble-wrap">
            <div className={`a-chat-bubble ${m.role}`}>{m.text}</div>
            <span className="a-chat-time">{m.time}</span>
          </div>
        </div>
      ))}

      {typing && (
        <div className="a-chat-msg-row">
          <span className="a-chat-avatar">
            <Sparkles size={13} strokeWidth={2.2} />
          </span>
          <div className="a-chat-bubble-wrap">
            <div className="a-chat-bubble ai">
              <span className="a-chat-typing">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        </div>
      )}

      {messages.length === 1 && !typing && (
        <>
          <p className="a-chat-suggest-label">Məsləhət üçün sual seçin:</p>
          <div className="a-chat-suggest-row">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="a-chat-suggest-btn" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      <div ref={endRef} />

      <div className="a-chat-input-wrap">
        <div className="a-chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(input);
            }}
            placeholder="Anacan.AI-yə sualınızı yazın..."
            aria-label="Message Anacan.AI"
          />
          <button type="button" className="a-chat-send" disabled={!input.trim()} aria-label="Send message" onClick={() => send(input)}>
            <Send size={15} strokeWidth={2.3} />
          </button>
        </div>
        <p className="a-chat-footnote">Anacan.AI səhv edə bilər. Tibbi qərarlar üçün həkiminizə müraciət edin.</p>
      </div>
    </>
  );
}
