import type { NoirGoal, NoirProfile } from "../../_lib/noir-store";

/* ---------------- option types ---------------- */

export interface QuizOption {
  value: string;
  label: string;
  sub?: string;
  emoji?: string;
}

export interface SingleStep {
  kind: "single";
  id: keyof NoirProfile;
  title: string;
  sub?: string;
  options: QuizOption[];
  rich?: boolean; // large card layout
}

export interface MultiStep {
  kind: "multi";
  id: keyof NoirProfile;
  title: string;
  sub?: string;
  options: QuizOption[];
  noneValue?: string; // exclusive "none of these"
  grid?: boolean;
}

export interface ScaleStep {
  kind: "scale";
  id: keyof NoirProfile;
  title: string;
  sub?: string;
  emojis: string[];
  captions: [string, string];
}

export interface CustomStep {
  kind: "custom";
  id: "privacy" | "goal" | "identity" | "detail" | "fact" | "rhythm" | "notifications";
}

export type QuizStep = SingleStep | MultiStep | ScaleStep | CustomStep;

/* ---------------- goal cards ---------------- */

export const GOAL_OPTIONS: { value: NoirGoal; emoji: string; accent: string; label: string; sub: string }[] = [
  {
    value: "ttc",
    emoji: "✨",
    accent: "var(--n-grad-blue)",
    label: "Hamiləliyə hazırlaşıram",
    sub: "Fertil pəncərə, 90 günlük hazırlıq planı, analiz xəritəsi",
  },
  {
    value: "pregnant",
    emoji: "🤰",
    accent: "var(--n-grad-rose)",
    label: "Hamiləyəm",
    sub: "Həftəlik bələdçi, simptom izləmə, doğuşa hazırlıq",
  },
  {
    value: "baby",
    emoji: "👶",
    accent: "var(--n-grad-violet)",
    label: "Körpəm var",
    sub: "Yuxu, qidalanma, inkişaf mərhələləri, peyvənd təqvimi",
  },
  {
    value: "cycle",
    emoji: "🌸",
    accent: "var(--n-grad-teal)",
    label: "Siklimi izləyirəm",
    sub: "Dəqiq proqnoz, faza bələdçisi, simptom analizi",
  },
];

export const AGE_RANGES = ["18–24", "25–31", "32–38", "38+"];

/* ---------------- focus options per goal ---------------- */

export const FOCUS_OPTIONS: Record<NoirGoal, QuizOption[]> = {
  pregnant: [
    { value: "symptoms", label: "Simptomların idarəsi", emoji: "🤢" },
    { value: "nutrition", label: "Qidalanma", emoji: "🥗" },
    { value: "birth", label: "Doğuşa hazırlıq", emoji: "🧘‍♀️" },
    { value: "sleep", label: "Yuxu keyfiyyəti", emoji: "🌙" },
    { value: "mental", label: "Emosional tarazlıq", emoji: "💛" },
    { value: "fitness", label: "Formada qalmaq", emoji: "🤸‍♀️" },
  ],
  baby: [
    { value: "sleep", label: "Yuxu rejimi", emoji: "😴" },
    { value: "feeding", label: "Qidalanma", emoji: "🍼" },
    { value: "development", label: "İnkişaf mərhələləri", emoji: "🚼" },
    { value: "health", label: "Peyvənd və sağlamlıq", emoji: "💉" },
    { value: "behavior", label: "Ağlama və sakitlik", emoji: "🫂" },
    { value: "self", label: "Öz enerjim", emoji: "🔋" },
  ],
  cycle: [
    { value: "prediction", label: "Dəqiq proqnoz", emoji: "📅" },
    { value: "pain", label: "Ağrı idarəsi", emoji: "🌡️" },
    { value: "pms", label: "PMS-lə mübarizə", emoji: "🍫" },
    { value: "hormones", label: "Hormonal balans", emoji: "⚖️" },
    { value: "fitness", label: "Fazaya uyğun idman", emoji: "🏃‍♀️" },
    { value: "planning", label: "Gələcək planlama", emoji: "🗺️" },
  ],
  ttc: [
    { value: "timing", label: "Ovulyasiya vaxtlaması", emoji: "🎯" },
    { value: "nutrition", label: "Fertillik qidalanması", emoji: "🥑" },
    { value: "stress", label: "Stress idarəsi", emoji: "🧘" },
    { value: "partner", label: "Partnyor hazırlığı", emoji: "💑" },
    { value: "tests", label: "Analiz və müayinələr", emoji: "🔬" },
    { value: "mindset", label: "Psixoloji hazırlıq", emoji: "🤍" },
  ],
};

/* ---------------- ordered quiz ---------------- */

export const QUIZ_STEPS: QuizStep[] = [
  { kind: "custom", id: "privacy" },
  { kind: "custom", id: "goal" },
  { kind: "custom", id: "identity" },
  { kind: "custom", id: "detail" },
  {
    kind: "multi",
    id: "conditions",
    title: "Diqqət etməli olduğumuz vəziyyət varmı?",
    sub: "Planınızı və məzmunu buna görə uyğunlaşdırırıq. Bu, tibbi diaqnoz deyil.",
    noneValue: "none",
    grid: true,
    options: [
      { value: "diabetes", label: "Diabet", emoji: "🩸" },
      { value: "thyroid", label: "Tiroid pozğunluğu", emoji: "🦋" },
      { value: "anemia", label: "Anemiya", emoji: "💊" },
      { value: "hypertension", label: "Yüksək təzyiq", emoji: "❤️" },
      { value: "pcos", label: "PKOS", emoji: "🌀" },
      { value: "migraine", label: "Miqren", emoji: "⚡" },
      { value: "none", label: "Heç biri", emoji: "✅" },
    ],
  },
  {
    kind: "multi",
    id: "supplements",
    title: "Hazırda hansı əlavələri qəbul edirsiniz?",
    sub: "Qidalanma tövsiyələrinizi boşluqlara görə quracağıq.",
    noneValue: "none",
    grid: true,
    options: [
      { value: "folic", label: "Fol turşusu", emoji: "🟢" },
      { value: "iron", label: "Dəmir", emoji: "🔩" },
      { value: "vitd", label: "D vitamini", emoji: "☀️" },
      { value: "omega", label: "Omeqa-3", emoji: "🐟" },
      { value: "multi", label: "Multivitamin", emoji: "💊" },
      { value: "none", label: "Heç biri", emoji: "➖" },
    ],
  },
  { kind: "custom", id: "fact" },
  {
    kind: "single",
    id: "sleepHours",
    title: "Gecə adətən neçə saat yatırsınız?",
    sub: "Yuxu — skorunuzun ən ağır çəkili komponentidir.",
    options: [
      { value: "<5", label: "5 saatdan az", sub: "Bərpa üçün kritik azdır", emoji: "🥱" },
      { value: "5-6", label: "5–6 saat", sub: "Minimumun altında", emoji: "😪" },
      { value: "7-8", label: "7–8 saat", sub: "Optimal aralıq", emoji: "😌" },
      { value: "8+", label: "8 saatdan çox", sub: "Bol bərpa", emoji: "😴" },
    ],
  },
  {
    kind: "scale",
    id: "sleepQuality",
    title: "Yuxunuzun keyfiyyətini necə qiymətləndirirsiniz?",
    sub: "Saat sayı deyil, oyananda necə hiss etdiyiniz.",
    emojis: ["😫", "😕", "😐", "🙂", "😌"],
    captions: ["Çox pis", "Əla"],
  },
  {
    kind: "scale",
    id: "mood",
    title: "Son 2 həftədə əhvalınız ümumilikdə necə olub?",
    sub: "Doğru cavab yoxdur — dürüstlük planınızın keyfiyyətidir.",
    emojis: ["🌧️", "🌥️", "⛅", "🌤️", "☀️"],
    captions: ["Ağır", "İşıqlı"],
  },
  {
    kind: "single",
    id: "anxietyFreq",
    title: "Narahatlıq və ya gərginlik nə qədər tez-tez olur?",
    sub: "Emosional sağlamlıq fiziki sağlamlıq qədər plana daxildir.",
    options: [
      { value: "hec", label: "Demək olar heç vaxt", emoji: "🕊️" },
      { value: "bezen", label: "Bəzən olur", emoji: "🌊" },
      { value: "tez", label: "Tez-tez hiss edirəm", emoji: "🌪️" },
    ],
  },
  {
    kind: "single",
    id: "activity",
    title: "Gündəlik hərəkət səviyyəniz?",
    options: [
      { value: "sedentary", label: "Əsasən oturaq", sub: "Masa arxası gün", emoji: "🪑" },
      { value: "light", label: "Yüngül", sub: "Gündəlik gəzintilər", emoji: "🚶‍♀️" },
      { value: "moderate", label: "Orta", sub: "Həftədə 2–3 məşq", emoji: "🏃‍♀️" },
      { value: "active", label: "Aktiv", sub: "Müntəzəm idman", emoji: "💪" },
    ],
  },
  {
    kind: "single",
    id: "mealRegularity",
    title: "Qida rejiminiz necədir?",
    options: [
      { value: "regular", label: "Sabit — gündə 3 dəfə", emoji: "⏰" },
      { value: "partial", label: "Dəyişkən — bəzən ötürürəm", emoji: "🌗" },
      { value: "chaotic", label: "Xaotik — vaxt tapanda", emoji: "🌪️" },
    ],
  },
  {
    kind: "single",
    id: "waterIntake",
    title: "Gündə təxminən nə qədər su içirsiniz?",
    options: [
      { value: "1-3", label: "1–3 stəkan", emoji: "🥛" },
      { value: "4-6", label: "4–6 stəkan", emoji: "💧" },
      { value: "7-8", label: "7–8 stəkan", emoji: "💦" },
      { value: "8+", label: "8-dən çox", emoji: "🌊" },
    ],
  },
  {
    kind: "single",
    id: "support",
    title: "Bu yolda yanınızda kim var?",
    sub: "Dəstək sisteminiz tövsiyələrin tonunu müəyyən edir.",
    options: [
      { value: "partner", label: "Partnyorumla birlikdəyik", emoji: "💑" },
      { value: "family", label: "Ailəm yaxınımdadır", emoji: "👨‍👩‍👧" },
      { value: "alone", label: "Əsasən özüməm", emoji: "🤍" },
      { value: "pro", label: "Peşəkar dəstəyim var", emoji: "🩺" },
    ],
  },
  { kind: "multi", id: "focus", title: "", options: [] }, // options resolved per goal at render time
  { kind: "custom", id: "rhythm" },
  { kind: "custom", id: "notifications" },
];

/* ---------------- conditional fact card ---------------- */

export interface FactContent {
  emoji: string;
  title: string;
  text: string;
  source: string;
}

export function resolveFact(p: NoirProfile): FactContent {
  const supplements = p.supplements ?? [];
  const conditions = p.conditions ?? [];
  const takesFolic = supplements.includes("folic") || supplements.includes("multi");

  if ((p.goal === "pregnant" || p.goal === "ttc") && !takesFolic) {
    return {
      emoji: "🧠",
      title: "Sizin üçün vacib: fol turşusu",
      text: "Körpənin beyin və onurğa beyninin təməli hamiləliyin ilk 28 günündə qoyulur. Gündəlik 400 mkq fol turşusu nevral boru qüsurları riskini 70%-ə qədər azaldır. Cavablarınıza əsasən bunu planınızın 1 nömrəli addımı etdik.",
      source: "ÜST tövsiyəsi əsasında · həkiminizlə təsdiqləyin",
    };
  }
  if (conditions.includes("anemia")) {
    return {
      emoji: "🔩",
      title: "Anemiya qeyd etdiniz — dəmir strategiyası",
      text: "Dəmir C vitamini ilə birlikdə 2–3 dəfə yaxşı sorulur, çay və qəhvə isə sorulmanı 60%-ə qədər azaldır. Dəmir mənbələrini sitrus ilə birləşdirin, çayı yeməkdən 1 saat sonraya saxlayın. Planınızda buna aid ayrıca blok olacaq.",
      source: "Klinik qidalanma araşdırmaları · həkiminizlə təsdiqləyin",
    };
  }
  switch (p.goal) {
    case "baby":
      return {
        emoji: "🧬",
        title: "Bilirdiniz?",
        text: "Körpə beyni ilk ildə həcmini 2 dəfə artırır və saniyədə 1 milyondan çox yeni sinaps qurur. Gündəlik 15 dəqiqəlik oxu və 'danışıq vannası' bu şəbəkənin ən güclü stimulyatorudur — planınıza daxil etdik.",
        source: "Harvard Center on the Developing Child",
      };
    case "cycle":
      return {
        emoji: "🩺",
        title: "Sikliniz — 5-ci vital göstəricidir",
        text: "Amerika Ginekoloqlar Kolleci menstrual sikli hərarət və nəbz kimi vital göstərici sayır: onun dəyişiklikləri ümumi sağlamlıq haqqında erkən siqnal verir. Müntəzəm izləmə bu siqnalları görünən edir.",
        source: "ACOG Committee Opinion",
      };
    case "ttc":
      return {
        emoji: "⏳",
        title: "90 gün qaydası",
        text: "Yumurta hüceyrə ovulyasiyadan təxminən 90 gün əvvəl yetişməyə başlayır. Bu o deməkdir ki, bu günkü yuxu, qidalanma və stress səviyyəniz 3 ay sonrakı fertilliyə təsir edir. Hazırlıq planınız məhz bu pəncərə üzərində qurulub.",
        source: "Reproduktiv endokrinologiya ədəbiyyatı",
      };
    default:
      return {
        emoji: "💧",
        title: "Bilirdiniz?",
        text: "Amniotik maye hər 3 saatdan bir tam yenilənir — və bunun əsas xammalı sizin içdiyiniz sudur. Gündəlik 8–10 stəkan su bu dövriyyəni dəstəkləyir, yorğunluğu və başağrısını azaldır.",
        source: "Perinatal fiziologiya dərslikləri",
      };
  }
}
