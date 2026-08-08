import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Daxil ol — Anacan",
  description: "Anacan hesabınıza daxil olun.",
};

export default function LoginPage() {
  return (
    <>
      <div className="f-topbar">
        <Link href="/anacan/landing" className="f-back" aria-label="Geri qayıt">
          <ChevronLeft size={19} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="f-scroll">
        <div className="f-shell" style={{ paddingBottom: 24 }}>
          <LoginForm />
        </div>
      </div>

      <footer className="f-footer">
        <p className="f-footer-note">
          Hesabınız yoxdur? <Link href="/anacan/register">Qeydiyyatdan keçin</Link>
        </p>
      </footer>
    </>
  );
}
