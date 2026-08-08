import type { Metadata } from "next";
import Link from "next/link";
import { LandingExperience } from "./_components/landing-experience";

export const metadata: Metadata = {
  title: "Anacan — Ana olmağın ağıllı yoldaşı",
  description:
    "Hamiləlik, körpə inkişafı və sikl izləmə — hamısı bir tətbiqdə. 120 000+ ananın etibar etdiyi Anacan ilə tanış olun.",
};

export default function LandingPage() {
  return (
    <>
      <div className="f-scroll">
        <div className="f-shell" style={{ flex: 1 }}>
          <LandingExperience />
        </div>
      </div>

      <footer className="f-footer">
        <Link href="/anacan/register" className="f-btn f-btn-primary">
          Pulsuz başlayın
        </Link>
        <Link
          href="/anacan/login"
          className="f-btn f-btn-quiet"
          style={{ minHeight: 40 }}
        >
          Hesabınız var?&nbsp;<strong style={{ color: "var(--a-ink)" }}>Daxil olun</strong>
        </Link>
        <p className="f-footer-note">
          Davam etməklə <a href="#sertler">İstifadə şərtləri</a> və{" "}
          <a href="#mexfilik">Məxfilik siyasəti</a> ilə razılaşırsınız.
        </p>
      </footer>
    </>
  );
}
