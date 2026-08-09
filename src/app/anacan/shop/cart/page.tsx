import type { Metadata } from "next";
import { CartExperience } from "./_components/cart-experience";
import { ShopHeader } from "../_components/shop-header";

export const metadata: Metadata = {
  title: "Səbət — Anacan Shop",
  description: "Səbətiniz və sifariş xülasəsi.",
};

export default function CartPage() {
  return (
    <div className="a-page">
      <div className="a-screen">
        <ShopHeader title="Səbət" sub="Anacan Shop" showCart={false} />
        <CartExperience />
      </div>
    </div>
  );
}
