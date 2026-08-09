import type { Metadata } from "next";
import { CheckoutExperience } from "./_components/checkout-experience";
import { ShopHeader } from "../_components/shop-header";

export const metadata: Metadata = {
  title: "Sifarişin rəsmiləşdirilməsi — Anacan Shop",
  description: "Çatdırılma və ödəniş məlumatları.",
};

export default function CheckoutPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <ShopHeader title="Rəsmiləşdirmə" sub="Çatdırılma və ödəniş" backHref="/anacan/shop/cart" showCart={false} />
        <CheckoutExperience />
      </div>
    </div>
  );
}
