import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Qeydiyyat — Anacan",
  description: "Anacan hesabı yaradın və sizə özəl plan qurun.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="f-topbar">
        <Link href="/anacan/landing" className="f-back" aria-label="Geri qayıt">
          <ChevronLeft size={19} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="f-scroll">
        <div className="f-shell" style={{ paddingBottom: 24 }}>
          <RegisterForm />
        </div>
      </div>

      <footer className="f-footer">
        <p className="f-footer-note">
          Artıq hesabınız var? <Link href="/anacan/login">Daxil olun</Link>
        </p>
      </footer>
    </>
  );
}
