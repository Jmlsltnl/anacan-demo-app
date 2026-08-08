"use client";

import { Heart, MessageCircle, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

interface Post {
  id: string;
  name: string;
  anonymous?: boolean;
  premium?: boolean;
  time: string;
  text: string;
  tags?: string[];
  likes: number;
  comments: number;
  image?: boolean;
  avatar: string;
}

const AVATARS: Record<string, string> = {
  peach: "var(--a-grad-peach)",
  pink: "var(--a-grad-pink)",
  lav: "var(--a-grad-lav)",
  blue: "var(--a-grad-blue)",
  green: "var(--a-grad-green)",
  yellow: "var(--a-grad-yellow)",
  gray: "linear-gradient(135deg, #d8d3c6, #b3ac9a)",
};

const posts: Post[] = [
  { id: "p1", name: "Anonim", anonymous: true, time: "təxminən 7 saat əvvəl", text: "Salam  prolaktin çox olanda hamilə qalmaq olur?", likes: 1, comments: 4, avatar: "gray" },
  { id: "p2", name: "Sara", time: "1 gün əvvəl", text: "Qizlar amniosintez eletdiren var?Ikili testde mene trisemiya riski cixdi🥺", likes: 1, comments: 2, avatar: "pink" },
  { id: "p3", name: "Gunel", time: "1 gün əvvəl", text: "Salam qizlar mene qiz usagi ucun hansi adlari deye bilersiz?,)28+2 heftelik hamilelikdir vaxta da azalir inwaAllah", likes: 3, comments: 14, avatar: "lav" },
  { id: "p4", name: "Leyla Süleyman", time: "2 gün əvvəl", text: "salam 28 heftelik hamiletem canagim agriyir normaldi ?", likes: 1, comments: 2, avatar: "blue" },
  { id: "p5", name: "Günay", time: "2 gün əvvəl", text: "Qızlar 6 heftə 5günlük hamileyem çox üreyim bulanır yemeyim yaxşıdı iyrenmirem qaytarmıram da amma dehset ürek bulanma olur oda meni halsız edir siz ne etmisiz bu dönemde yaxşı tesir eden ne var((", likes: 0, comments: 2, avatar: "green" },
  { id: "p6", name: "Anonim", anonymous: true, time: "3 gün əvvəl", text: "Salam qızlar. 16+5 gunluk hamileyem. 14+1də usm-də usaqliq boynu uzunlugu 31 mm idi və ginekologum əisa oldugunu dedi mualicə yazdı.Biraz araşdrdm 27 mm-dən asagi olsa risklidi məndə 31 olmagina baxmayaraq mualica yazdı. Sizində basizina gəlib belə birsey.?", likes: 1, comments: 15, avatar: "gray" },
  { id: "p7", name: "T", time: "4 gün əvvəl", text: "Salam. Kimlər uyumsuzluq iynəsi vurdurubsa qiymətlərini yaza bilər? Fərqli qiymətlər eşidirəm . Bu niyə belədi?", likes: 1, comments: 2, avatar: "yellow" },
  { id: "p8", name: "Nüşabə", time: "5 gün əvvəl", text: "Salam xanimlar. Mənim ayaqimda damar damarin üsdünə çixir çox agriyir sizdədə olur? Olursa ne edirsiz?🤦🏻‍♀️", likes: 1, comments: 4, avatar: "pink" },
  { id: "p9", name: "P", time: "7 gün əvvəl", text: "salam ozel ve dovlet klinikasinda keyseriyye emeliyyati olanlar emeliyyatdan sonra 1 gun ranimasyada qalinir yoxsa bor bawa palataya kecirdirler?", likes: 2, comments: 11, avatar: "blue" },
  { id: "p10", name: "Badi İlqarqızı", time: "8 gün əvvəl", text: "Hamiləlik testi 1saat sonra gösrərəndə hamilə olur ya olmur?", likes: 2, comments: 5, avatar: "lav" },
  { id: "p11", name: "Anonim", anonymous: true, time: "9 gün əvvəl", text: "Salam 30.07.2026 38+4 bu gün ana oluram.", likes: 6, comments: 14, avatar: "gray" },
  { id: "p12", name: "Zeynəb", time: "9 gün əvvəl", text: "Salam mən 24+5 günlük hamiləyəm sarı axıntı gəlir su kimidi axıntını hiss edirəm ara bir sancılarım olur. normaldı?", likes: 2, comments: 8, avatar: "green" },
  { id: "p13", name: "Denra Nıftalıyeva", time: "11 gün əvvəl", text: "hereketı nece heftede hıs etmısız ılk usagdı cınsı qızdı hecne hıs etmrem ama uzıde hersey yaxsıd", likes: 2, comments: 13, avatar: "yellow" },
  { id: "p14", name: "Kəmalə", time: "13 gün əvvəl", text: "Salam. 12-ci həftənin tamamında cinsiyyəti dəqiq bilmək mümkündür? Eyni zamanda ikili tarama testi də veriləcək həmin gün", likes: 5, comments: 13, avatar: "pink" },
  { id: "p15", name: "Xəyalə", time: "17 gün əvvəl", text: "Salam 5 6 həfdəlik hamiləyəm qara qəhvəyi qan gəlir az az azca ağrmda olur hərdən belə olanlar yoxdu?", likes: 1, comments: 7, avatar: "blue" },
  {
    id: "p16",
    name: "Turkan Sultan",
    premium: true,
    time: "təxminən 1 ay əvvəl",
    text: 'Bizə "Hər şey əladır" deməyin.\nBizə "Filan funksiya olsa, gündəlik həyatım 10% daha rahat olar" deyin. Anacan-ın növbəti versiyasını birlikdə inkişaf etdirək:\n✨Sorğuya keçid linki: https://forms.gle/oSh7Bdxc4pfpH62y9',
    likes: 7,
    comments: 1,
    avatar: "yellow",
  },
  { id: "p17", name: "Sara", time: "təxminən 2 ay əvvəl", text: "Salam necesiz?\nHamileler varmi burda? #hamiləlik", tags: ["#hamiləlik"], likes: 12, comments: 26, avatar: "pink" },
  { id: "p18", name: "Aydan", time: "4 ay əvvəl", text: "2ildir evliyem hamilelik Olmur. Stimulyasiya eden olub? 7gün derman sonra iyne eden olb xeyirini gören varmı?", likes: 6, comments: 8, avatar: "lav" },
  {
    id: "p19",
    name: "Turkan",
    time: "5 ay əvvəl",
    text: "Anacanı ilk yükləyəndə bir çox suallarıma burda cavab olduğunu gördüm, alətlər bölməsindənsə ümumiyyətlə danışmaqla bitməz. Əllərinizə sağlıq. Çox gözəl tətbiq olub 😍.\nBu arada AI fotosessiya çox yerinə düşdü, çünki oğlum dünyaya gələndən fotosessiya üçün vaxt tapa bilmirdik.",
    tags: ["#anacan", "#ana"],
    likes: 22,
    comments: 1,
    image: true,
    avatar: "green",
  },
  { id: "p20", name: "Fəridə", time: "5 ay əvvəl", text: "Salam 5 həftəlik hamiləyəm amma bir dəfə belə olsun ürək bulanmam olmayıb, bu normaldır?", likes: 6, comments: 14, avatar: "blue" },
  {
    id: "p21",
    name: "Turkan Sultan",
    premium: true,
    time: "5 ay əvvəl",
    text: 'Salam, dəyərli analar!🌸\nAnalıq hər birimiz üçün fərqli bir təcrübə olsa da, ortaq məqsədimiz eynidir: övladlarımıza ən yaxşısını təmin etmək və onları sağlam, xoşbəxt böyütmək. Lakin bu proses yalnız gözəl anlardan ibarət deyil; zaman-zaman suallarla, qərarsızlıqlarla və təbii olaraq yorğunluqla da müşayiət olunur.\n\nMəhz bu ehtiyacları nəzərə alaraq "Anacan Cəmiyyət" bölməsini yaratdıq. Bura analar üçün həm etibarlı məlumat mərkəzi, həm də bir dəstək platformasıdır.✨',
    tags: ["#ana"],
    likes: 16,
    comments: 2,
    avatar: "yellow",
  },
  { id: "p22", name: "Zehra", time: "5 ay əvvəl", text: "Salam :)  #ana", tags: ["#ana"], likes: 12, comments: 3, avatar: "peach" },
];

export function CommunityFeed() {
  const [tab, setTab] = useState<"latest" | "popular">("latest");
  const [query, setQuery] = useState("");
  const [likedOverrides, setLikedOverrides] = useState<Record<string, boolean>>({});

  function toggleLike(id: string) {
    setLikedOverrides((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts.filter((p) => !q || p.text.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
    if (tab === "popular") {
      list = [...list].sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    }
    return list;
  }, [tab, query]);

  return (
    <div>
      <div className="a-search">
        <Search size={15} strokeWidth={2} color="var(--a-ink-faint)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Axtar..."
          aria-label="Search community posts"
        />
      </div>

      <div className="a-composer" style={{ marginTop: 12 }}>
        <span className="a-composer-avatar">🙂</span>
        <span className="a-composer-text">Nə düşünürsünüz?</span>
        <span className="a-cta-btn" style={{ padding: "9px 14px", fontSize: 11.5 }}>
          <Sparkles size={12} /> Əlavə et
        </span>
      </div>

      <div className="a-tabs" style={{ marginTop: 16, marginBottom: 14 }}>
        <button type="button" className={`a-tab${tab === "latest" ? " active" : ""}`} onClick={() => setTab("latest")}>
          Ən son
        </button>
        <button type="button" className={`a-tab${tab === "popular" ? " active" : ""}`} onClick={() => setTab("popular")}>
          Populyar
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map((p) => {
          const liked = likedOverrides[p.id] ?? false;
          return (
            <article key={p.id} className="a-post a-fade-in">
              <div className="a-post-head">
                <span className="a-post-avatar" style={{ background: AVATARS[p.avatar] }}>
                  {p.name.charAt(0).toUpperCase()}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="a-post-name-row">
                    <span className="a-post-name">{p.name}</span>
                    {p.premium && (
                      <span className="a-post-badge">
                        <Sparkles size={9} /> Premium
                      </span>
                    )}
                    {p.anonymous && <span className="a-post-anon">(Anonim)</span>}
                  </div>
                  <span className="a-post-time">· {p.time}</span>
                </div>
              </div>

              <p className="a-post-text">{p.text}</p>

              {p.image && (
                <div className="a-post-image">
                  <span style={{ fontSize: 26 }}>📷</span>
                  <span className="a-post-image-badge">1 / 4</span>
                </div>
              )}

              {p.tags && (
                <div className="a-post-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="a-post-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="a-post-footer">
                <button type="button" className={`a-post-action${liked ? " liked" : ""}`} onClick={() => toggleLike(p.id)}>
                  <Heart size={15} strokeWidth={2.2} fill={liked ? "currentColor" : "none"} />
                  {p.likes + (liked ? 1 : 0)}
                </button>
                <span className="a-post-action">
                  <MessageCircle size={15} strokeWidth={2.2} />
                  {p.comments}
                </span>
              </div>
            </article>
          );
        })}

        {visible.length === 0 && (
          <div className="a-card" style={{ textAlign: "center", color: "var(--a-ink-soft)", fontSize: 13 }}>
            Nəticə tapılmadı.
          </div>
        )}
      </div>
    </div>
  );
}
