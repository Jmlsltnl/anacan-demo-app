/**
 * Anacan Noir — content library (AZ).
 * Articles, daily insights, task templates, reference calendars.
 * Educational content only — the reader UI always shows a medical disclaimer.
 */

import type { NoirGoal } from "./noir-store";

/* ---------------- Articles ---------------- */

export interface Article {
  id: string;
  goals: NoirGoal[];
  category: string;
  emoji: string;
  accent: string;
  mins: number;
  title: string;
  excerpt: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "folic",
    goals: ["pregnant", "ttc"],
    category: "Qidalanma",
    emoji: "💊",
    accent: "var(--n-grad-teal)",
    mins: 4,
    title: "Fol turşusu: niyə ilk 12 həftə kritikdir",
    excerpt: "Nevral borunun formalaşması hamiləliyin ilk həftələrində baş verir — çox vaxt siz hələ xəbər tutmamış.",
    body: [
      "Fol turşusu (B9 vitamini) körpənin beyin və onurğa beyninin əsasını təşkil edən nevral borunun formalaşmasında həlledici rol oynayır. Bu proses hamiləliyin ilk 28 günündə — çox qadının hamiləlikdən xəbər tutmadığı dövrdə — tamamlanır. Buna görə mütəxəssislər hamiləliyi planlayan qadınlara ən azı 1 ay əvvəldən gündəlik 400 mkq fol turşusu qəbul etməyi tövsiyə edir.",
      "Təbii mənbələr arasında tünd yaşıl yarpaqlı tərəvəzlər (ispanaq, brokkoli), paxlalılar, sitrus meyvələri və zənginləşdirilmiş taxıl məhsulları var. Lakin yalnız qida ilə lazımi dozaya çatmaq çətindir — əlavə qəbulu standart yanaşmadır.",
      "Əgər ailənizdə nevral boru qüsuru olubsa və ya diabet, epilepsiya kimi vəziyyətləriniz varsa, həkiminiz daha yüksək doza təyin edə bilər. Dozanı özbaşına artırmayın — hər addımı həkiminizlə razılaşdırın.",
    ],
  },
  {
    id: "trimester2",
    goals: ["pregnant"],
    category: "Bələdçi",
    emoji: "🌤️",
    accent: "var(--n-grad-violet)",
    mins: 5,
    title: "İkinci trimestr: enerjinin qayıdışı",
    excerpt: "14–27-ci həftələr çox ana üçün hamiləliyin ən rahat dövrüdür. Bu enerjini necə düzgün istifadə etməli?",
    body: [
      "İkinci trimestrdə ürəkbulanma adətən azalır, enerji qayıdır və qarın hələ hərəkəti məhdudlaşdırmır. Bu dövr doğuşa hazırlıq kurslarına yazılmaq, ev düzənini planlamaq və yüngül idmana (üzgüçülük, hamilə yoqası, gəzinti) başlamaq üçün ideal pəncərədir.",
      "16–20-ci həftələr arasında ilk hərəkətləri hiss edə bilərsiniz — əvvəlcə 'kəpənək qanadı' kimi zərif titrəyişlər şəklində. İlk hamiləlikdə bu hiss daha gec, təkrar hamiləlikdə daha tez gələ bilər; hər ikisi normaldır.",
      "Bu dövrün vacib müayinələri: 18–22-ci həftələrdə aparılan anatomik ultrasəs müayinəsi körpənin orqanlarının inkişafını qiymətləndirir. Dəmir səviyyənizi də yoxlatdırın — ikinci trimestrdə anemiya riski artır.",
    ],
  },
  {
    id: "birthbag",
    goals: ["pregnant"],
    category: "Hazırlıq",
    emoji: "🧳",
    accent: "var(--n-grad-rose)",
    mins: 6,
    title: "Doğuş çantası: tam siyahı",
    excerpt: "36-cı həftəyə qədər hazır olmalı çantanın ana, körpə və sənəd bölmələri üzrə tam siyahısı.",
    body: [
      "Ana üçün: rahat gecəlik və xalat, əmizdirmə büstqalteri, doğuşdan sonrakı gigiyena vasitələri, şəxsi əşyalar, telefon adapteri, dodaq balzamı (doğuş otaqlarının havası quru olur) və evdən çıxarkən geyəcəyiniz rahat paltar. Sənədlər: şəxsiyyət vəsiqəsi, hamiləlik kartı və müayinə nəticələri əlçatan bölmədə olsun.",
      "Körpə üçün: 2–3 dəst bodi və kombinezon (56 ölçü), papaq, corab, əlcək, zərif yaylıq, avtomobil oturacağı (xəstəxanadan evə ilk yol üçün vacibdir) və mövsümə uyğun üst geyim. Bezlər və nəm salfetlər adətən xəstəxanada olur, amma öz markanızı istəyirsinizsə, kiçik paket götürün.",
      "Partnyor üçün də kiçik çanta hazırlayın: qəlyanaltı, su, enerji üçün quru meyvə, telefon adapteri. Doğuş uzun çəkə bilər — hazırlıqlı dəstək daha yaxşı dəstəkdir. Çantanı 36-cı həftəyə qədər qapının yanında saxlayın.",
    ],
  },
  {
    id: "pregsleep",
    goals: ["pregnant"],
    category: "Yuxu",
    emoji: "🌙",
    accent: "var(--n-grad-blue)",
    mins: 4,
    title: "Hamiləlikdə yuxu: rahat mövqelər",
    excerpt: "Üçüncü trimestrdə yuxusuzluq niyə artır və sol tərəf üstə yatmaq nə üçün tövsiyə olunur?",
    body: [
      "20-ci həftədən sonra mütəxəssislər sol tərəf üstə yatmağı tövsiyə edir: bu mövqe ana qarnındakı əsas venaya (vena cava) təzyiqi azaldır və körpəyə gedən qan axınını yaxşılaşdırır. Dizlərinizin arasına qoyulan yastıq çanaq ağrılarını əhəmiyyətli dərəcədə azaldır.",
      "Gecə tez-tez oyanmaq — sidik kisəsinə təzyiq, ayaq kramplari və körpənin hərəkətləri ilə bağlı normal haldır. Axşam 6-dan sonra maye qəbulunu azaldın (gündəlik normanı gündüzə bölün), yatmazdan əvvəl 10 dəqiqəlik yüngül gərnəşmə krampları azaldır.",
      "Yuxu rituallarını qoruyun: sərin otaq (19–21°C), qaranlıq, ekransız son 30 dəqiqə. Uzanan kimi yata bilmirsinizsə, narahat olmayın — bədəniniz gecə qidalanmalarına indidən 'məşq edir'. Gündüz 20–30 dəqiqəlik qısa yuxu da bərpaedicidir.",
    ],
  },
  {
    id: "sleepreg",
    goals: ["baby"],
    category: "Yuxu",
    emoji: "😴",
    accent: "var(--n-grad-blue)",
    mins: 5,
    title: "4 aylıq yuxu reqressiyası: elmi izah",
    excerpt: "Yaxşı yatan körpə birdən niyə tez-tez oyanır? Bu, geriləmə deyil — beynin yetkinləşməsidir.",
    body: [
      "Təxminən 3,5–4,5 aylıqda körpənin yuxu arxitekturası köklü dəyişir: yenidoğan tipli dərin yuxudan böyüklərə xas dövrü (siklik) yuxuya keçid baş verir. İndi hər 45–60 dəqiqədən bir yüngül yuxu fazası gəlir — və özbaşına yuxuya dala bilməyən körpə hər dövrün sonunda tam oyanır.",
      "Bu dövrdə ən vacib bacarıq — 'yuxulu, amma oyaq' qoymaqdır: körpəni tam yatmış halda deyil, yuxuya getməzdən bir az əvvəl çarpayıya qoyun. Beləcə o, öz-özünə yuxuya dalmağı öyrənir və gecə oyanışlarında sizin köməyinizə daha az ehtiyac duyur.",
      "Sabit axşam ritualı (vanna → masaj → əmizdirmə → laylay) beyinə 'yuxu vaxtıdır' siqnalı verir. Reqressiya adətən 2–6 həftə çəkir. Bu müddətdə əlavə dəstək normaldır — pis vərdiş deyil, keçid dövrüdür.",
    ],
  },
  {
    id: "solids",
    goals: ["baby"],
    category: "Qidalanma",
    emoji: "🥣",
    accent: "var(--n-grad-teal)",
    mins: 5,
    title: "Əlavə qidaya keçid: hazırlıq işarələri",
    excerpt: "6 ay yalnız təqvim rəqəmi deyil — körpənin özü hazır olduğunu 3 əsas işarə ilə göstərir.",
    body: [
      "Ümumdünya Səhiyyə Təşkilatı ilk 6 ayda eksklüziv ana südü (və ya uyğunlaşdırılmış qarışıq) tövsiyə edir. Amma təqvimlə yanaşı, hazırlıq işarələrinə baxın: körpə dəstəklə otura bilir, başını sabit saxlayır və qaşığı görəndə ağzını açır (dil itələmə refleksi zəifləyib).",
      "İlk qidalar üçün yaxşı seçimlər: dəmirlə zəngin sıyıqlar, yumşaq bişirilmiş tərəvəz püreləri (balqabaq, kartof, yerkökü) və meyvələr. Hər yeni qidanı 3 gün ara ilə təqdim edin ki, mümkün allergik reaksiyanı müəyyən edə biləsiniz. 1 yaşa qədər duz və şəkər əlavə etməyin, bal isə qadağandır (botulizm riski).",
      "İlk aylarda məqsəd qidalandırmaq yox, tanış etmaqdır — əsas qida hələ də süddür. Körpə üzünü çevirirsə, israr etməyin: iştahaya hörmət yeməklə sağlam münasibətin təməlidir.",
    ],
  },
  {
    id: "crying",
    goals: ["baby"],
    category: "Davranış",
    emoji: "🍼",
    accent: "var(--n-grad-rose)",
    mins: 4,
    title: "Ağlamanın 5 səbəbi və sakitləşdirmə",
    excerpt: "Aclıq, yorğunluq, qaz, diskomfort, stimul çoxluğu — hər birinin öz 'imzası' var.",
    body: [
      "Aclıq ağlaması adətən ritmik və tələbkardır, əl-ağız hərəkətləri ilə müşayiət olunur. Yorğunluq ağlaması zingiltili olur, göz ovuşdurma və üz çevirmə ilə gəlir. Qaz sancısı ağlamasında körpə ayaqlarını qarnına çəkir, üzü qızarır — adətən axşam saatlarında pik edir.",
      "5S sakitləşdirmə metodu (Dr. Harvi Karp): bələmə (Swaddle), yan/qarınüstə tutuş (Side), şşş səsi (Shush), yüngül yırğalama (Swing) və əmmə (Suck). Bu ardıcıllıq bətndaxili mühiti xatırladaraq sinir sistemini sakitləşdirir.",
      "Bəzən körpə hər ehtiyacı qarşılansa da ağlayır — bu da normaldır. Özünüzü həddən artıq gərgin hiss edirsinizsə, körpəni təhlükəsiz yerə (çarpayıya) qoyub 5 dəqiqə nəfəs almaq ayıb deyil, düzgün addımdır. Sakit ana — sakit körpənin yarısıdır.",
    ],
  },
  {
    id: "vaccines",
    goals: ["baby"],
    category: "Sağlamlıq",
    emoji: "💉",
    accent: "var(--n-grad-violet)",
    mins: 6,
    title: "Peyvənd təqvimi: nə vaxt və niyə",
    excerpt: "İlk 18 ayın peyvənd xəritəsi: hansı yaşda hansı qoruma formalaşır.",
    body: [
      "Peyvənd təqvimi immun sistemin ən həssas olduğu dövrlərdə maksimum qoruma yaratmaq üçün qurulub. Doğumda BCG (vərəm) və Hepatit B ilə başlanır; 2, 3 və 4-cü aylarda difteriya-göyöskürək-tetanus əsaslı kombinə peyvəndlər, poliomielit və pnevmokok seriyaları vurulur; 12-ci ayda qızılca-parotit-məxmərək (QPM) əlavə olunur.",
      "Peyvənddən sonra 1–2 gün hərarət, iynə yerində qızartı və narahatlıq normal reaksiyalardır — immun sistemin işlədiyini göstərir. Bol maye, yüngül geyim və lazım olduqda həkimin məsləhət gördüyü dozada qızdırmasalıcı kifayətdir. 38,5°C-dən yuxarı davamlı hərarətdə həkimə müraciət edin.",
      "Təqvimdən gecikmisinizsə, sıfırdan başlamaq lazım deyil — 'çatdırma' sxemi ilə davam etdirilir. Dəqiq tarixləri həmişə pediatrınızla birlikdə planlayın; bu məqalə rəsmi milli təqvimi əvəz etmir.",
    ],
  },
  {
    id: "phases",
    goals: ["cycle", "ttc"],
    category: "Sikl",
    emoji: "🌸",
    accent: "var(--n-grad-rose)",
    mins: 5,
    title: "Siklin 4 fazası: hormonal xəritəniz",
    excerpt: "Enerjiniz, əhvalınız və iştahınız niyə ay boyu dəyişir? Cavab 4 fazadadır.",
    body: [
      "Menstruasiya (1–5-ci günlər): estrogen və progesteron minimumdadır — enerji aşağı, istirahət ehtiyacı yüksəkdir. Dəmir itkisini kompensasiya etmək üçün qırmızı ət, ispanaq, mərci faydalıdır. Follikulyar faza (6–13): estrogen yüksəlir, enerji və fokus artır — yeni layihələr, intensiv məşqlər üçün ən yaxşı dövr.",
      "Ovulyasiya (təxminən 14-cü gün): yumurta hüceyrə azad olur; bəzi qadınlar bir tərəfdə qısa sancı (mittelschmerz) hiss edir. Fertil pəncərə ovulyasiyadan 4 gün əvvəl başlayır — spermatozoidlər 5 günə qədər yaşaya bildiyi üçün. Luteal faza (15–28): progesteron dominantlıq edir; PMS, şirin istəyi və yuxululuq bu fazanın 'imzasıdır'.",
      "Siklinizi izləmək yalnız proqnoz üçün deyil — o, ümumi sağlamlığın 'beşinci vital göstəricisi' sayılır. Qəfil dəyişikliklər (çox ağrılı, çox qısa/uzun siklllər) ginekoloqla müzakirə üçün əsasdır.",
    ],
  },
  {
    id: "pms",
    goals: ["cycle"],
    category: "Sağlamlıq",
    emoji: "🧘‍♀️",
    accent: "var(--n-grad-teal)",
    mins: 4,
    title: "PMS-i yüngülləşdirməyin elmi yolları",
    excerpt: "Maqnezium, hərəkət, yuxu — üç sadə vasitənin arxasındakı mexanizmlər.",
    body: [
      "PMS simptomları (əsəbilik, şişkinlik, döş həssaslığı, yuxu pozğunluğu) luteal fazada progesteronun dalğalanması ilə bağlıdır. Tədqiqatlarda maqnezium qəbulu (xüsusən B6 ilə birlikdə) əhval simptomlarını azaldan vasitələr arasında ən çox dəstəklənəndir: badam, tünd şokolad, banan, kabak tumu təbii mənbələrdir.",
      "Aerob hərəkət — həftədə 3 dəfə 30 dəqiqəlik sürətli gəzinti belə — endorfin səviyyəsini qaldıraraq ağrı hissini azaldır. Duz və kofeini luteal fazada məhdudlaşdırmaq şişkinliyi və döş həssaslığını yüngülləşdirir.",
      "Simptomlarınızı 2–3 sikl ərzində qeyd edin: nümunə görünəndə idarə etmək asanlaşır. Gündəlik həyatı pozan ağırlıqda PMS (PMDD şübhəsi) özbaşına idarə ediləcək vəziyyət deyil — mütəxəssis dəstəyi effektivdir və normaldır.",
    ],
  },
  {
    id: "fertile",
    goals: ["ttc", "cycle"],
    category: "Fertillik",
    emoji: "✨",
    accent: "var(--n-grad-gold, linear-gradient(135deg, rgba(217,184,120,.28), rgba(217,184,120,.07)))",
    mins: 4,
    title: "Fertil pəncərəni düzgün hesablamaq",
    excerpt: "Ovulyasiya 'siklin 14-cü günü' deyil — növbəti dövrdən 14 gün əvvəldir. Fərq böyükdür.",
    body: [
      "Ən çox yayılmış səhv: ovulyasiyanı siklin əvvəlindən 14 gün sonra axtarmaq. Əslində luteal faza sabitdir (12–14 gün), dəyişən follikulyar fazadır. Yəni 32 günlük sikldə ovulyasiya təxminən 18-ci gündə baş verir, 25 günlükdə isə 11-ci gündə.",
      "Fertil pəncərə ovulyasiyadan əvvəlki 4–5 gün və ovulyasiya günüdür. Bədən əlamətləri dəqiqliyi artırır: yumurta ağı konsistensiyalı servikal ifrazat, bazal temperaturun ovulyasiyadan sonra 0,3–0,5°C qalxması, LH test zolaqlarında pik.",
      "6–12 ay müntəzəm cəhddən sonra (35 yaşdan yuxarı — 6 ay) nəticə yoxdursa, reproduktoloq konsultasiyası növbəti məntiqli addımdır. Bu, 'uğursuzluq' deyil — vaxtında dəstək almaqdır.",
    ],
  },
  {
    id: "ttc90",
    goals: ["ttc"],
    category: "Hazırlıq",
    emoji: "🗺️",
    accent: "var(--n-grad-violet)",
    mins: 5,
    title: "Hamiləliyə hazırlıq: 90 günlük plan",
    excerpt: "Yumurta hüceyrənin yetişmə dövrü ~90 gündür — bu, hazırlığın bioloji pəncərəsidir.",
    body: [
      "Yumurta hüceyrələr ovulyasiyadan təxminən 90 gün əvvəl yetişməyə başlayır — bu müddətdəki qidalanma, yuxu və stress səviyyəsi hüceyrə keyfiyyətinə təsir edir. İlk 30 gün: fol turşusuna başlayın, siqaret/alkoqolu tam dayandırın, kofeini gündə 1–2 fincana endirin.",
      "31–60-cı günlər: ginekoloji baxış, TORCH və tiroid analizləri, diş həkimi (hamiləlikdə müalicə məhdudlaşır), lazımi peyvəndlərin yenilənməsi (məxmərək immuniteti xüsusilə vacibdir). Partnyor üçün də plan var: 3 aylıq spermatogenez dövründə eyni prinsiplər işləyir.",
      "61–90-cı günlər: sikl izləmə vərdişini oturuşdurun, bədən kütlə indeksinizi optimal aralığa yaxınlaşdırın, stress idarəsi ritualı seçin (nəfəs məşqi, yoqa, gəzinti). Hazırlıq mükəmməllik yarışı deyil — kiçik, davamlı addımlar yığımıdır.",
    ],
  },
];

/* ---------------- Daily insights ---------------- */

export interface Insight {
  emoji: string;
  title: string;
  text: string;
}

export const INSIGHTS: Record<NoirGoal, Insight[]> = {
  pregnant: [
    { emoji: "🥑", title: "Omeqa-3 günü", text: "Həftədə 2 dəfə yağlı balıq (qızardılmamış) körpənin beyin inkişafını dəstəkləyir. Balıq yemirsinizsə, həkiminizlə DHA əlavəsini müzakirə edin." },
    { emoji: "🚶‍♀️", title: "20 dəqiqə qayda", text: "Gündəlik 20 dəqiqəlik gəzinti hamiləlik diabetinin riskini azaldır və axşam yuxusunu dərinləşdirir." },
    { emoji: "💧", title: "Su və amniotik maye", text: "Amniotik maye hər 3 saatdan bir yenilənir — gündəlik 8–10 stəkan su bu dövriyyənin xammalıdır." },
    { emoji: "🧂", title: "Duza diqqət", text: "Şişkinlik hiss edirsinizsə, suyu azaltmayın — duzu azaldın. Susuzluq şişkinliyi artırır, paradoksal görünsə də." },
    { emoji: "🎧", title: "Səs bağı", text: "24-cü həftədən körpə səsinizi eşidir və tanıyır. Gündə 5 dəqiqə uca səslə oxumaq doğuşdan sonra tanış səs körpüsü yaradır." },
    { emoji: "🦵", title: "Kramp həlli", text: "Gecə baldır krampları üçün: yatmazdan əvvəl 30 saniyə divara söykənərək baldır gərnəşməsi + gün ərzində maqneziumlu qidalar." },
  ],
  baby: [
    { emoji: "🛁", title: "Ritual gücü", text: "Eyni ardıcıllıqla vanna → masaj → laylay beyinə 'yuxu gəlir' siqnalı verir. Ardıcıllıq möcüzələr yaradır — 1 həftəyə fərqi görəcəksiniz." },
    { emoji: "🗣️", title: "Danışıq vannası", text: "Gün ərzində gördüklərinizi körpəyə şərh edin ('İndi alma yuyuruq...'). Bu 'canlı yayım' söz ehtiyatının təməlini qoyur." },
    { emoji: "☀️", title: "Səhər işığı", text: "Səhər 15 dəqiqə gün işığı körpənin sirkad ritmini tənzimləyir — gecə yuxusu daha erkən oturuşur." },
    { emoji: "🤸", title: "Tummy time", text: "Oyaq vaxtı qarınüstə mövqe boyun və kürək əzələlərini gücləndirir. Gündə bir neçə dəfə, 3–5 dəqiqədən başlayın." },
    { emoji: "📵", title: "Ekransız 2 yaş", text: "ÜST 2 yaşa qədər ekran tövsiyə etmir — körpə beyni üçün ən yaxşı 'tətbiq' sizin üzünüzdür." },
    { emoji: "🧊", title: "Diş qaşıntısı", text: "Soyudulmuş (donmuş yox) diş halqası və təmiz barmaqla diş əti masajı — ən təhlükəsiz sakitləşdirmə üsullarıdır." },
  ],
  cycle: [
    { emoji: "🌡️", title: "Bazal ritm", text: "Səhər yataqdan qalxmadan ölçülən temperatur ovulyasiyadan sonra 0,3–0,5°C qalxır — 2–3 sikl izləmək öz nümunənizi göstərir." },
    { emoji: "🍫", title: "Maqnezium fazası", text: "Luteal fazada tünd şokolad istəyi təsadüf deyil — bədən maqnezium axtarır. Badam və banan da eyni ehtiyacı qarşılayır." },
    { emoji: "🏃‍♀️", title: "Fazaya uyğun idman", text: "Follikulyar fazada intensiv, luteal fazada yüngül məşqlər — hormonal dalğa ilə işləmək, ona qarşı yox." },
    { emoji: "📓", title: "Simptom gündəliyi", text: "Ağrı, əhval və enerjini qeyd etmək 2–3 sikldən sonra nümunəni üzə çıxarır — həkim görüşündə bu qeydlər qızıl dəyərindədir." },
    { emoji: "🫖", title: "Zəncəfil dəstəyi", text: "Tədqiqatlarda zəncəfil menstrual ağrını azaldan təbii vasitələr sırasındadır — dövrün ilk 2 günü isti zəncəfil çayı sınayın." },
    { emoji: "😴", title: "PMS və yuxu", text: "Luteal fazada yuxu ehtiyacı artır. Bu 'tənbəllik' deyil — progesteronun təbii sedativ təsiridir. Özünüzə icazə verin." },
  ],
  ttc: [
    { emoji: "📅", title: "Pəncərə qaydası", text: "Fertil pəncərə ovulyasiyadan ƏVVƏLKİ günlərdir — spermatozoidlər 5 günə qədər gözləyə bilir, yumurta hüceyrə isə cəmi 24 saat." },
    { emoji: "💊", title: "İkili hazırlıq", text: "Fol turşusu sizin üçün, sink və selen partnyor üçün — hazırlıq iki nəfərlik komanda işidir." },
    { emoji: "🧘", title: "Stress bioloji faktordur", text: "Xroniki stress ovulyasiyanı gecikdirə bilir. Gündə 10 dəqiqə nəfəs məşqi — romantika deyil, fiziologiyadır." },
    { emoji: "☕", title: "Kofein həddi", text: "Gündə 200 mq-a qədər kofein (1–2 fincan) təhlükəsiz sayılır — hazırlıq dövründə bu həddə qalmaq ideal başlanğıcdır." },
    { emoji: "🌙", title: "Yuxu və hormonlar", text: "7 saatdan az yuxu LH dalğasını pozaraq ovulyasiya vaxtını dəyişə bilir — yuxu fertillik planının gizli qəhrəmanıdır." },
    { emoji: "🔬", title: "Vaxt qaydası", text: "35 yaşa qədər 12 ay, 35+ yaşda 6 ay müntəzəm cəhddən sonra mütəxəssisə müraciət standart tövsiyədir." },
  ],
};

/* ---------------- Daily task templates ---------------- */

export interface TaskTemplate {
  id: string;
  label: string;
  tag: string;
}

export const TASKS: Record<NoirGoal, TaskTemplate[]> = {
  pregnant: [
    { id: "p-water", label: "8 stəkan su iç", tag: "Qidalanma" },
    { id: "p-vitamin", label: "Prenatal vitamini qəbul et", tag: "Sağlamlıq" },
    { id: "p-walk", label: "20 dəqiqə gəzinti", tag: "Hərəkət" },
    { id: "p-kegel", label: "Kegel məşqi — 3 dəst", tag: "Hazırlıq" },
    { id: "p-talk", label: "Körpənlə 5 dəqiqə danış", tag: "Bağ" },
  ],
  baby: [
    { id: "b-tummy", label: "Tummy time — 10 dəqiqə", tag: "İnkişaf" },
    { id: "b-book", label: "1 kitab oxu", tag: "Dil" },
    { id: "b-air", label: "Açıq havada gəzinti", tag: "Sağlamlıq" },
    { id: "b-ritual", label: "Axşam ritualına əməl et", tag: "Yuxu" },
    { id: "b-self", label: "Özünə 15 dəqiqə ayır", tag: "Ana" },
  ],
  cycle: [
    { id: "c-log", label: "Simptomları qeyd et", tag: "İzləmə" },
    { id: "c-move", label: "20 dəqiqə hərəkət", tag: "Hərəkət" },
    { id: "c-iron", label: "Dəmir tərkibli qida", tag: "Qidalanma" },
    { id: "c-screen", label: "Yatmazdan 30 dəq əvvəl ekranı bağla", tag: "Yuxu" },
    { id: "c-water", label: "7+ stəkan su", tag: "Qidalanma" },
  ],
  ttc: [
    { id: "t-folic", label: "Fol turşusu qəbul et", tag: "Hazırlıq" },
    { id: "t-track", label: "Sikl əlamətlərini qeyd et", tag: "İzləmə" },
    { id: "t-breath", label: "10 dəqiqə nəfəs məşqi", tag: "Stress" },
    { id: "t-walk", label: "30 dəqiqə gəzinti", tag: "Hərəkət" },
    { id: "t-couple", label: "Partnyorla keyfiyyətli vaxt", tag: "Bağ" },
  ],
};

/* ---------------- Pregnancy reference ---------------- */

export interface BabySize {
  week: number;
  fruit: string;
  emoji: string;
  length: string;
  weight: string;
}

export const BABY_SIZES: BabySize[] = [
  { week: 6, fruit: "noxud", emoji: "🫛", length: "0,6 sm", weight: "<1 q" },
  { week: 8, fruit: "moruq", emoji: "🫐", length: "1,6 sm", weight: "1 q" },
  { week: 10, fruit: "ərik", emoji: "🍑", length: "3,1 sm", weight: "4 q" },
  { week: 12, fruit: "laym", emoji: "🍋", length: "5,4 sm", weight: "14 q" },
  { week: 16, fruit: "avokado", emoji: "🥑", length: "11,6 sm", weight: "100 q" },
  { week: 20, fruit: "banan", emoji: "🍌", length: "25 sm", weight: "300 q" },
  { week: 24, fruit: "qarğıdalı", emoji: "🌽", length: "30 sm", weight: "600 q" },
  { week: 28, fruit: "badımcan", emoji: "🍆", length: "37 sm", weight: "1 kq" },
  { week: 32, fruit: "kokos", emoji: "🥥", length: "42 sm", weight: "1,7 kq" },
  { week: 36, fruit: "kahı", emoji: "🥬", length: "47 sm", weight: "2,6 kq" },
  { week: 40, fruit: "balqabaq", emoji: "🎃", length: "51 sm", weight: "3,4 kq" },
];

export function babySizeForWeek(week: number): BabySize {
  let found = BABY_SIZES[0];
  for (const s of BABY_SIZES) {
    if (week >= s.week) found = s;
  }
  return found;
}

export const WEEK_NOTES: { from: number; to: number; notes: string[] }[] = [
  { from: 1, to: 13, notes: ["Bütün əsas orqanlar formalaşır — fol turşusu dövrü", "Ürəkbulanma üçün: az-az, tez-tez qidalanın"] },
  { from: 14, to: 27, notes: ["Enerji qayıdır — yüngül idman üçün ideal pəncərə", "16–22-ci həftələrdə ilk hərəkətləri hiss edə bilərsiniz"] },
  { from: 28, to: 34, notes: ["Körpə çəki yığır, yuxu-oyaqlıq ritmi qurulur", "Kick count: gündəlik hərəkət sayına diqqət"] },
  { from: 35, to: 42, notes: ["Doğuş çantası hazır olsun", "Braxton-Hiks yığılmaları güclənə bilər — nəfəs texnikaları məşq edin"] },
];

export function weekNotes(week: number): string[] {
  return WEEK_NOTES.find((w) => week >= w.from && week <= w.to)?.notes ?? [];
}

/* ---------------- Baby reference ---------------- */

export interface VaccineEntry {
  month: number;
  name: string;
  detail: string;
}

export const VACCINES: VaccineEntry[] = [
  { month: 0, name: "BCG + Hepatit B (1)", detail: "Doğum evində" },
  { month: 2, name: "5-birləşmiş + OPV + PKV (1)", detail: "İlk seriya" },
  { month: 3, name: "5-birləşmiş + OPV + PKV (2)", detail: "İkinci doza" },
  { month: 4, name: "5-birləşmiş + OPV + PKV (3)", detail: "Üçüncü doza" },
  { month: 12, name: "QPM (qızılca-parotit-məxmərək)", detail: "1 yaş peyvəndi" },
  { month: 18, name: "Revaksinasiya (AKDS + OPV)", detail: "Gücləndirici doza" },
];

export interface MilestoneEntry {
  month: number;
  title: string;
  detail: string;
}

export const MILESTONES: MilestoneEntry[] = [
  { month: 1, title: "Başını qısa müddət qaldırır", detail: "Qarınüstə mövqedə boyun gücü formalaşır" },
  { month: 2, title: "Sosial gülümsəmə", detail: "Üzünüzə baxıb şüurlu gülümsəyir" },
  { month: 3, title: "Əşyaları izləyir və tutmağa can atır", detail: "Əl-göz koordinasiyası başlayır" },
  { month: 4, title: "Çevrilməyə başlayır", detail: "Qarından arxaya ilk dönmələr" },
  { month: 6, title: "Dəstəksiz oturur", detail: "Onurğa və gövdə əzələləri gücləndi" },
  { month: 8, title: "İməkləyir", detail: "Hərəkət azadlığının ilk mərhələsi" },
  { month: 9, title: "Tutunaraq ayağa qalxır", detail: "İlk addımlara hazırlıq" },
  { month: 12, title: "İlk addımlar və ilk sözlər", detail: "9–15 ay aralığı normaldır" },
  { month: 18, title: "10–20 söz, qaşıqla yemək", detail: "Müstəqillik partlayışı" },
  { month: 24, title: "2 sözlü cümlələr", detail: "'Ana gəl', 'su ver' dövrü" },
];

/* ---------------- 90-day roadmaps ---------------- */

export interface RoadPhase {
  title: string;
  window: string;
  items: string[];
}

export const ROADMAPS: Record<NoirGoal, RoadPhase[]> = {
  pregnant: [
    { title: "Təməl: bədəninizi tanıyın", window: "1–30-cu günlər", items: ["Gündəlik vitamin rutini oturuşdurun", "Su və yuxu vərdişlərini izləyin", "Həkim görüş təqvimini qurun"] },
    { title: "Güc: aktiv hazırlıq", window: "31–60-cı günlər", items: ["Hamilə yoqası / gəzinti rejimi", "Doğuş planı üzərində düşünün", "Anatomik USM-i planlayın"] },
    { title: "Zirvə: doğuşa doğru", window: "61–90-cı günlər", items: ["Doğuş çantası siyahısı", "Nəfəs texnikaları məşqi", "Yenidoğan əsasları kursu"] },
  ],
  baby: [
    { title: "Ritm: gün rejimi qurun", window: "1–30-cu günlər", items: ["Sabit axşam ritualı", "Yuxu pəncərələrini öyrənin", "Gündəlik tummy time"] },
    { title: "İnkişaf: stimullaşdırma", window: "31–60-cı günlər", items: ["Gündə 1 kitab vərdişi", "Səs və toxunma oyunları", "Peyvənd təqvimini yoxlayın"] },
    { title: "Balans: ana da vacibdir", window: "61–90-cı günlər", items: ["Özünüzə həftəlik 2 saat", "Dəstək şəbəkənizi genişləndirin", "İnkişaf qeydlərinə baxış"] },
  ],
  cycle: [
    { title: "Müşahidə: baza yaradın", window: "1-ci sikl", items: ["Hər gün simptom qeydi", "Dövr başlanğıcını dəqiq qeyd edin", "Yuxu rejimini sabitləyin"] },
    { title: "Nümunə: özünüzü oxuyun", window: "2-ci sikl", items: ["Faza-əhval əlaqəsinə baxın", "Fazaya uyğun idman sınayın", "Qida-simptom bağlantısını izləyin"] },
    { title: "Optimallaşdırma", window: "3-cü sikl", items: ["PMS protokolunuzu qurun", "Proqnoz dəqiqliyini yoxlayın", "Lazım olsa mütəxəssis görüşü"] },
  ],
  ttc: [
    { title: "Hazırlıq: təməl 30 gün", window: "1–30-cu günlər", items: ["Fol turşusuna başlayın", "Zərərli vərdişləri sıfırlayın", "Sikl izləməni qurun"] },
    { title: "Yoxlama: sağlamlıq paneli", window: "31–60-cı günlər", items: ["Ginekoloji baxış + analizlər", "Diş həkimi görüşü", "Partnyor hazırlığı"] },
    { title: "Fokus: fertil pəncərə", window: "61–90-cı günlər", items: ["Ovulyasiya əlamətlərini izləyin", "Stress ritualı: gündə 10 dəq", "Yuxunu 7+ saata çatdırın"] },
  ],
};

/* ---------------- Goal meta ---------------- */

export const GOAL_META: Record<NoirGoal, { label: string; emoji: string; accent: string }> = {
  pregnant: { label: "Hamiləlik", emoji: "🤰", accent: "var(--n-grad-rose)" },
  baby: { label: "Körpə", emoji: "👶", accent: "var(--n-grad-violet)" },
  cycle: { label: "Sikl", emoji: "🌸", accent: "var(--n-grad-teal)" },
  ttc: { label: "Hazırlıq", emoji: "✨", accent: "var(--n-grad-blue)" },
};
