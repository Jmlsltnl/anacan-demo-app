import type { Metadata } from "next";
import { ShopExperience } from "./_components/shop-experience";
import { ShopHeader } from "./_components/shop-header";

export const metadata: Metadata = {
  title: "Anacan Shop",
  description: "Uşaq arabaları, avtomobil oturacaqları, yedirmə oturacaqları və daha çox — Anacan Shop.",
};

export default function ShopPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <ShopHeader
          title="Anacan Shop"
          sub="Arabalar, oturacaqlar və daha çox"
          backHref="/anacan"
        />
        <div className="sh-scroll">
          <ShopExperience />
        </div>
      </div>
    </div>
  );
}
