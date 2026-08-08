import type { Metadata } from "next";
import Link from "next/link";
import { WelcomeStories } from "./_components/welcome-stories";

export const metadata: Metadata = {
  title: "Xoş gəlmisiniz",
  description: "Anacan Noir — analıq üçün premium sağlamlıq yoldaşı.",
};

export default function WelcomePage() {
  return (
    <>
      <div className="n-scroll">
        <div className="n-shell" style={{ flex: 1 }}>
          <WelcomeStories />
        </div>
      </div>

      <footer className="n-footer">
        <Link href="/anacan/noir/register" className="n-btn n-btn-gold">
          Qiymətləndirməyə başla
        </Link>
        <Link href="/anacan/noir/login" className="n-btn n-btn-quiet" style={{ minHeight: 40 }}>
          Hesabınız var?&nbsp;<strong>Daxil olun</strong>
        </Link>
        <p className="n-footer-note">
          Davam etməklə <a href="#sertler">Şərtlər</a> və <a href="#mexfilik">Məxfilik siyasəti</a> ilə
          razılaşırsınız
        </p>
      </footer>
    </>
  );
}
