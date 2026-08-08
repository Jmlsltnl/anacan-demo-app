import { Sparkles } from "lucide-react";
import { BottomNav } from "../_components/bottom-nav";
import { AiChat } from "./_components/ai-chat";

export default function AiPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="a-shell">
          <header className="a-chat-header">
            <span className="a-chat-header-avatar">
              <Sparkles size={20} strokeWidth={2} />
            </span>
            <div>
              <p className="a-chat-header-name a-heading">Anacan.AI</p>
              <p className="a-chat-header-status">
                <span className="a-chat-status-dot" /> Onlayn
              </p>
            </div>
          </header>
        </div>

        <div className="a-scroll-area" style={{ paddingBottom: 200 }}>
          <div className="a-shell">
            <AiChat />
          </div>
        </div>

        <BottomNav defaultActive="ai" />
      </div>
    </div>
  );
}
