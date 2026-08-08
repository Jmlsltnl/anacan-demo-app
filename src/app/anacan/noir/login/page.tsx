import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginFlow } from "./_components/login-flow";

export const metadata: Metadata = {
  title: "Daxil ol",
  description: "Anacan Noir hesabınıza şifrəsiz daxil olun.",
};

export default function NoirLoginPage() {
  return (
    <>
      <div className="n-topbar">
        <Link href="/anacan/noir/welcome" className="n-back" aria-label="Geri qayıt">
          <ChevronLeft size={19} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="n-scroll">
        <div className="n-shell" style={{ paddingBottom: 32 }}>
          <LoginFlow />
        </div>
      </div>
    </>
  );
}
