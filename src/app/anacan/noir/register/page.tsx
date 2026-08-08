import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RegisterFlow } from "./_components/register-flow";

export const metadata: Metadata = {
  title: "Qeydiyyat",
  description: "Anacan Noir hesabı yaradın — şifrəsiz, bir dəqiqəyə.",
};

export default function NoirRegisterPage() {
  return (
    <>
      <div className="n-topbar">
        <Link href="/anacan/noir/welcome" className="n-back" aria-label="Geri qayıt">
          <ChevronLeft size={19} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="n-scroll">
        <div className="n-shell" style={{ paddingBottom: 32 }}>
          <RegisterFlow />
        </div>
      </div>
    </>
  );
}
