import type { Metadata } from "next";
import { SuccessExperience } from "./_components/success-experience";
import { ShopHeader } from "../_components/shop-header";

export const metadata: Metadata = {
  title: "Sifariş qəbul olundu — Anacan Shop",
  description: "Sifarişiniz uğurla qəbul edildi.",
};

export default function SuccessPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <ShopHeader title="Sifariş tamamlandı" sub="Anacan Shop" backHref="/anacan/shop" showCart={false} />
        <SuccessExperience />
      </div>
    </div>
  );
}
