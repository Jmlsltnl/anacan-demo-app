import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, categoryOf, getProduct } from "../../_lib/catalog";
import { ShopHeader } from "../../_components/shop-header";
import { ProductDetail } from "./_components/product-detail";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: product ? `${product.title} — Anacan Shop` : "Məhsul — Anacan Shop",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);

  return (
    <div className="a-page">
      <div className="a-screen">
        <ShopHeader title={categoryOf(product.category).label} sub="Anacan Shop" />
        <ProductDetail product={product} related={related} />
      </div>
    </div>
  );
}
