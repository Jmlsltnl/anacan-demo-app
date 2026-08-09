/**
 * Anacan Shop — static catalog.
 * Prices in AZN; `price` is the current (discounted) price,
 * `oldPrice` is present only for discounted items.
 */

export type CategoryId =
  | "stroller"
  | "carseat"
  | "highchair"
  | "bouncer"
  | "crib"
  | "carrier"
  | "accessory"
  | "toy";

export interface Category {
  id: CategoryId;
  label: string;
  grad: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "stroller", label: "Uşaq arabaları", grad: "var(--a-grad-peach)", color: "#8a4514" },
  { id: "carseat", label: "Avtomobil oturacaqları", grad: "var(--a-grad-blue)", color: "#1c5a80" },
  { id: "highchair", label: "Yedirmə oturacaqları", grad: "var(--a-grad-green)", color: "#1c7a4d" },
  { id: "bouncer", label: "Şezlonq və yelləncəklər", grad: "var(--a-grad-lav)", color: "#4b2f8a" },
  { id: "crib", label: "Beşiklər", grad: "var(--a-grad-pink)", color: "#a3355f" },
  { id: "carrier", label: "Kenqurular", grad: "var(--a-grad-yellow)", color: "#7a5200" },
  { id: "accessory", label: "Aksesuarlar", grad: "var(--a-grad-blue)", color: "#1c5a80" },
  { id: "toy", label: "Oyun və inkişaf", grad: "var(--a-grad-yellow)", color: "#7a5200" },
];

export function categoryOf(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

export interface Product {
  id: string;
  title: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  age?: string;
}

export const PRODUCTS: Product[] = [
  /* ---- Uşaq arabaları ---- */
  { id: "parcel-lx", title: "Parcel LX Uşaq Arabası Evergreen", category: "stroller", price: 512.1, oldPrice: 569 },
  { id: "aire-twin", title: "“Aire Twin” Əkizlər üçün Uşaq Arabası Shale", category: "stroller", price: 479 },
  { id: "pact-pro", title: "Pact Pro Uşaq Arabası Pebble", category: "stroller", price: 479 },
  { id: "versatrax", title: "Versatrax Uşaq Arabası Raven", category: "stroller", price: 639.2, oldPrice: 799 },
  { id: "litetrax-pro", title: "Litetrax Pro Uşaq Arabası Shale", category: "stroller", price: 424.15, oldPrice: 499 },
  { id: "we-boz", title: "WE Uşaq Arabası Boz", category: "stroller", price: 512.1, oldPrice: 569 },
  { id: "we-qara", title: "WE Uşaq Arabası Qara", category: "stroller", price: 512.1, oldPrice: 569 },
  { id: "mysa-boz", title: "Mysa Uşaq Arabası Boz/Lunar Rock", category: "stroller", price: 927.2, oldPrice: 1159 },
  { id: "mysa-qara", title: "Mysa Uşaq Arabası Qara/Black Satin", category: "stroller", price: 927.2, oldPrice: 1159 },
  { id: "coya-qara", title: "Cybex Coya RG Uşaq Arabası Qara", category: "stroller", price: 1100 },
  { id: "coya-yasil", title: "Cybex Coya RG Uşaq Arabası Yaşıl", category: "stroller", price: 1100 },
  { id: "priam", title: "Cybex Priam 3-ü 1-də Uşaq Arabası Bej", category: "stroller", price: 2950 },
  { id: "urbino-mavi", title: "Urbino Uşaq Arabası Mavi/Royal Blue", category: "stroller", price: 341.1, oldPrice: 379 },
  { id: "urbino-yasil", title: "Urbino Uşaq Arabası Yaşıl/Evergreen", category: "stroller", price: 341.1, oldPrice: 379 },

  /* ---- Avtomobil oturacaqları ---- */
  { id: "i-traver", title: "i-Traver Uşaq Avtomobil Oturacağı Evergreen", category: "carseat", price: 332.1, oldPrice: 369 },
  { id: "i-spin-xl", title: "I-Spin XL Uşaq Avtomobil Oturacağı Evergreen", category: "carseat", price: 764.15, oldPrice: 899 },
  { id: "every-stage-fx", title: "Every Stage FX Uşaq Avtomobil Oturacağı Gray Flannel", category: "carseat", price: 549 },
  { id: "every-stage", title: "Every Stage Uşaq Avtomobil Oturacağı Ember", category: "carseat", price: 369 },
  { id: "i-irvana", title: "I-Irvana Uşaq Avtomobil Oturacağı Thunder", category: "carseat", price: 332.1, oldPrice: 369 },
  { id: "i-pivot", title: "I-Pivot Grow Uşaq Avtomobil Oturacağı Shale", category: "carseat", price: 636.65, oldPrice: 749 },
  { id: "unico-evo", title: "Unico Evo I-Size Uşaq Avtomobil Oturacağı Grey Black", category: "carseat", price: 629.1, oldPrice: 699 },

  /* ---- Yedirmə oturacaqları ---- */
  { id: "feed-indigo", title: "Körpələr üçün Yedirmə Oturacağı İndigo Mavi", category: "highchair", price: 76.99 },
  { id: "feed-pink", title: "Körpələr üçün Yedirmə Oturacağı Soft Çəhrayı", category: "highchair", price: 76.99 },
  { id: "mimzy-recline", title: "Yedirmə Oturacağı “Mimzy Recline” Strata Mist Wood", category: "highchair", price: 330 },
  { id: "mimzy-taupe", title: "Yedirmə Oturacağı “Mimzy Snacker” Taupe", category: "highchair", price: 155 },
  { id: "mimzy-cosmo", title: "Yedirmə Oturacağı “Mimzy Snacker” Cosmo Tan", category: "highchair", price: 155 },
  { id: "polly-easy", title: "Polly Easy Körpələr üçün Yedirmə Oturacağı Woodland", category: "highchair", price: 332.1, oldPrice: 369 },
  { id: "polly-taupe", title: "Körpələr üçün Yedirmə Oturacağı Polly Taupe", category: "highchair", price: 332.1, oldPrice: 369 },
  { id: "merav-olive", title: "Meraviglia Təkamül Kreslosu Olive Yaşıl", category: "highchair", price: 449.1, oldPrice: 499, age: "0ay+" },
  { id: "merav-fossil", title: "Meraviglia Təkamül Kreslosu Fossil Bej", category: "highchair", price: 449.1, oldPrice: 499, age: "0ay+" },
  { id: "merav-ebony", title: "Meraviglia Təkamül Kreslosu Ebony Qara", category: "highchair", price: 449.1, oldPrice: 499, age: "0ay+" },

  /* ---- Şezlonq və yelləncəklər ---- */
  { id: "swing-matcha", title: "Yelləncək və Oyun Şezlonqu Matcha", category: "bouncer", price: 183.92, oldPrice: 229.9, age: "0ay+" },
  { id: "swing-terra", title: "Yelləncək və Oyun Şezlonqu Terracotta", category: "bouncer", price: 183.92, oldPrice: 229.9, age: "0ay+" },
  { id: "swing-vanil", title: "Yelləncək və Oyun Şezlonqu Vanil", category: "bouncer", price: 183.92, oldPrice: 229.9, age: "0ay+" },
  { id: "serina", title: "Serina Swivel Uşaq üçün Şezlonq Elephant Duo", category: "bouncer", price: 314.5, oldPrice: 370 },
  { id: "rhythm", title: "Rhythm’n’Sound Uşaq üçün Şezlonq Slate Grey", category: "bouncer", price: 296.65, oldPrice: 349 },
  { id: "lullaglide", title: "Lullaglide Stand Natural", category: "bouncer", price: 319.2, oldPrice: 399, age: "0ay+" },

  /* ---- Beşiklər ---- */
  { id: "ramble", title: "Araba üçün Beşik Ramble Raven", category: "crib", price: 271.2, oldPrice: 339 },
  { id: "flexi", title: "Flexi Uşaq Arabası üçün Beşik Qəhvəyi/Bronze Lizard", category: "crib", price: 335.2, oldPrice: 419 },

  /* ---- Kenqurular ---- */
  { id: "boppy", title: "Boppy PerfectFit Uşaq Daşımaq üçün Kenquru Boz", category: "carrier", price: 144.99 },
  { id: "praktik", title: "Uşaq Daşımaq üçün Praktik Kenquru Boz", category: "carrier", price: 84.99 },

  /* ---- Aksesuarlar ---- */
  { id: "kemer-xl", title: "Klipsli Uşaq Arabası Kəməri XL", category: "accessory", price: 26.99 },
  { id: "fincan", title: "2-si 1-də Fincan və Telefon Tutacağı", category: "accessory", price: 32.99 },
  { id: "yastiq-sari", title: "Boyun Qoruyucu Uşaq Yastığı Sarı", category: "accessory", price: 32.99 },
  { id: "yastiq-boz", title: "Boyun Qoruyucu Uşaq Yastığı Boz", category: "accessory", price: 32.99 },

  /* ---- Oyun və inkişaf ---- */
  { id: "merav-toy", title: "Meraviglia Yemək Masası Üçün İnkişaf Etdirici Oyuncaq", category: "toy", price: 99.9, age: "0ay+" },
  { id: "crescendo", title: "Crescendo “Öyrənmə Qülləsi” Dəsti", category: "toy", price: 154.8, oldPrice: 172, age: "2yaş+" },
  { id: "walky", title: "Walky Talky Uşaq Yerimə Arabası Boz", category: "toy", price: 199 },
];

/* ---------------- helpers ---------------- */

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function discountPct(p: Product): number | null {
  if (!p.oldPrice) return null;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

export function formatPrice(value: number): string {
  const [int, dec] = value.toFixed(2).split(".");
  const withThousands = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${withThousands}.${dec}₼`;
}

/** Deterministic pseudo rating so the demo feels alive without extra data. */
export function ratingOf(p: Product): { stars: number; count: number } {
  let h = 0;
  for (const ch of p.id) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return { stars: Math.round((4.3 + (h % 7) / 10) * 10) / 10, count: 14 + (h % 180) };
}

/** Category-level marketing copy for detail pages. */
export const CATEGORY_COPY: Record<CategoryId, { desc: string; features: string[] }> = {
  stroller: {
    desc: "Şəhər həyatı üçün düşünülmüş yüngül şassi, bir hərəkətlə qatlanma və hamar sürüş. Yenidoğan dövründən gəzinti yaşına qədər uzanan rahatlıq.",
    features: [
      "Bir əllə, bir hərəkətə qatlanır",
      "Amortizasiyalı təkərlər — hamar sürüş",
      "5 nöqtəli təhlükəsizlik kəməri",
      "Uzanan günlük və baxış pəncərəsi",
      "Geniş alt səbət",
    ],
  },
  carseat: {
    desc: "i-Size / ECE R129 standartlarına uyğun qoruma, yan zərbə mühafizəsi və böyüdükcə tənzimlənən oturuş. Uzun yolların sakit yol yoldaşı.",
    features: [
      "ECE R129 (i-Size) sertifikatı",
      "Yan zərbə qoruması",
      "ISOFIX bərkitmə sistemi",
      "Böyüyən başlıq və çiyin kəmərləri",
      "Nəfəs alan, çıxarıla bilən üzlük",
    ],
  },
  highchair: {
    desc: "İlk qaşıqdan ailə süfrəsinə — asan təmizlənən səth, tənzimlənən hündürlük və körpənizi düzgün oturuşda saxlayan dizayn.",
    features: [
      "Tənzimlənən hündürlük və söykənəcək",
      "Çıxarılan, yuyula bilən podnos",
      "5 nöqtəli kəmər",
      "Kompakt qatlanma",
      "Asan silinən materiallar",
    ],
  },
  bouncer: {
    desc: "Zərif yellənmə ritmi, yumşaq dəstək və oyun anları bir yerdə — ananın əlləri boşalır, körpə sakitləşir.",
    features: [
      "Təbii yellənmə hərəkəti",
      "Tənzimlənən söykənmə bucağı",
      "Yumşaq, yuyula bilən üzlük",
      "Yığcam saxlanma",
      "Oyun elementləri ilə",
    ],
  },
  crib: {
    desc: "Yenidoğanın ilk aylarında üfüqi, təhlükəsiz yuxu mühiti — arabaya uyğunlaşan, evdə də istifadə edilə bilən beşik.",
    features: [
      "Üfüqi yatış səthi — yenidoğan üçün ideal",
      "Nəfəs alan materiallar",
      "Araba şassisinə asan quraşdırma",
      "Yumşaq daxili döşəkçə",
    ],
  },
  carrier: {
    desc: "Erqonomik “M” oturuş mövqeyi, çiyin və bel yükünü bölüşdürən dizayn — körpəniz qəlbinizə yaxın, əlleriniz sərbəst.",
    features: [
      "Erqonomik M-mövqe dəstəyi",
      "Tənzimlənən çiyin qayışları",
      "Bel dəstək kəməri",
      "Nəfəs alan parça",
    ],
  },
  accessory: {
    desc: "Gündəlik gəzintiləri asanlaşdıran kiçik, amma dəyərli detallar — düşünülmüş analar üçün praktik həllər.",
    features: ["Asan quraşdırma", "Davamlı material", "Yüngül və yığcam", "Əksər modellərlə uyğun"],
  },
  toy: {
    desc: "Yaşa uyğun stimullar, təhlükəsiz materiallar və inkişafı dəstəkləyən oyun ssenariləri — əylənərək öyrənmək üçün.",
    features: [
      "Yaşa uyğun inkişaf stimulları",
      "BPA-siz, təhlükəsiz materiallar",
      "Motorika və koordinasiya dəstəyi",
      "Asan təmizlənir",
    ],
  },
};
