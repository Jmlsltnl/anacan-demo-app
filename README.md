# Anacan — Demo App

Anacan prototipi: hamiləlik, körpə inkişafı və sikl izləmə tətbiqinin interaktiv demo versiyası (Next.js App Router). Bütün məlumatlar cihazda (`localStorage`) saxlanılır — backend yoxdur.

## Marşrutlar

| URL | Təsvir |
| --- | --- |
| `/` | → `/anacan` yönləndirmə |
| `/anacan` | Ana səhifə (buludlu #ffe7e1 tema, körpə izləmə paneli) |
| `/anacan/v3` | Ana səhifə + **premium konversiya qatı** (paywall, 24h endirim sayğacı, kilidli funksiyalar, exit-downsell) |
| `/anacan/landing` → `/login` → `/register` → `/onboarding` | Funnel v1: giriş, qeydiyyat, 12 addımlıq premium onboarding |
| `/anacan/noir/welcome` | **Noir Edition** — tünd-lüks konsept: OTP ilə şifrəsiz auth, 18 addımlıq klinik qiymətləndirmə, Anacan Skoru, 4 tab-lı funksional home (`/anacan/noir`) |
| `/anacan/period`, `/anacan/pregnancy`, `/anacan/ai`, `/anacan/community`, `/anacan/tools`, `/anacan/vaccines`, `/anacan/teething-tracker`, `/anacan/cry-analysis`, `/anacan/partners` | Modul ekranları |
| `/anacan/v2` | Alternativ "weather-style" konsept |

## Lokal işə salma

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy (Vercel)

Repo-nu Vercel-ə import edin — `vercel.json` framework preset-i təyin edir, əlavə konfiqurasiya lazım deyil.

> Qeyd: Məzmun maarifləndirmə məqsədlidir, tibbi məsləhət deyil.
