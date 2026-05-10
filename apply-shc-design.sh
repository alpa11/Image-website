#!/bin/bash
# Apply SHC homepage design export into alpa11/Image-website
# Usage from repo root:
#   bash apply-shc-design.sh
#
# Then:
#   npm install
#   npm run build
#   npm run dev

set -e

echo "Creating SHC design files..."

mkdir -p src/styles src/pages src/data
mkdir -p src/components/layout src/components/home

cat > src/styles/global.css <<'ENDOFFILE'
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');

@import "tailwindcss";

/* Design Tokens */
@theme {
  --color-bg: #F5F8FC;
  --color-surface: #FFFFFF;
  --color-text: #0D1420;
  --color-text-2: #44546A;
  --color-text-3: #8EA3BB;
  --color-blue: oklch(50% 0.17 224);
  --color-blue-d: oklch(42% 0.17 224);
  --color-blue-l: oklch(65% 0.14 220);
  --color-border: oklch(88% 0.025 224);
  --color-border-l: oklch(93% 0.015 224);
  --color-s1: oklch(50% 0.17 232);
  --color-s2: oklch(53% 0.15 218);
  --color-s3: oklch(57% 0.13 207);
  --color-s4: oklch(55% 0.14 196);
  --font-family-sans: 'Heebo', 'Arial Hebrew', sans-serif;
  --nav-height: 68px;
}

/* Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  direction: rtl;
  scroll-behavior: smooth;
}

body {
  font-family: 'Heebo', 'Arial Hebrew', sans-serif;
  color: #0D1420;
  background-color: #F5F8FC;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Shared layout utils */
.wrap {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 3rem;
}

.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: oklch(50% 0.17 224);
  margin-bottom: 12px;
}

.h2 {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.15;
}

.sub {
  font-size: 17px;
  color: #44546A;
  line-height: 1.75;
}

.fade-up {
  opacity: 0;
  transform: translateY(30px);
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: oklch(50% 0.17 224);
  color: white;
  font-family: 'Heebo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.25s;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary:hover {
  background: oklch(42% 0.17 224);
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: transparent;
  color: #0D1420;
  font-family: 'Heebo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  border: 1.5px solid oklch(88% 0.025 224);
  cursor: pointer;
  transition: all 0.25s;
  text-decoration: none;
  white-space: nowrap;
}

.btn-secondary:hover {
  border-color: oklch(50% 0.17 224);
  color: oklch(50% 0.17 224);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  .fade-up {
    opacity: 1 !important;
    transform: none !important;
  }
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #F5F8FC; }
::-webkit-scrollbar-thumb { background: oklch(50% 0.17 224); border-radius: 9999px; }

::selection {
  background: oklch(50% 0.17 224 / 0.18);
  color: #0D1420;
}

@media (max-width: 900px) {
  .wrap { padding-inline: 1.25rem; }
}
ENDOFFILE

cat > src/components/layout/BaseLayout.astro <<'ENDOFFILE'
---
import Navbar from "./Navbar.astro";
import Footer from "./Footer.astro";
import "../../styles/global.css";

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "SHC — מערכות לארגונים ומוסדות",
  description = "SHC בונה מערכות ניהול מותאמות אישית לארגונים ומוסדות — תחזוקה, רכש, שעות ומשימות.",
} = Astro.props;
---

<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/png" href="/logo/LOGOSHC.PNG" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
ENDOFFILE

cat > src/data/siteContent.ts <<'ENDOFFILE'
// TODO: Replace with Firestore fetch from collection "siteContent" document "global"

export const siteContent = {
  meta: {
    title: "SHC — מערכות לארגונים ומוסדות",
    description: "SHC בונה מערכות ניהול מותאמות אישית לארגונים ומוסדות — תחזוקה, רכש, שעות ומשימות.",
  },

  brand: {
    name: "SHC",
    tagline: "מערכות לארגונים ומוסדות",
    logoPath: "/logo/LOGOSHC.PNG",
  },

  hero: {
    title: 'תהליכים מבולגנים.<br><span style="color:oklch(50% 0.17 224)">מערכת שעובדת.</span>',
    subtitle: "SHC לוקחת את הכאוס הניהולי של המוסד שלכם ובונה ממנו תשתית דיגיטלית מדויקת — לכל מחלקה, לכל תפקיד, לכל תהליך.",
    ctaPrimary: "ראה את הטרנספורמציה ↓",
    ctaSecondary: "דבר עם הצוות",
    ctaPrimaryUrl: "#chaos",
    ctaSecondaryUrl: "#contact",
  },

  about: {
    title: "אנחנו לא בונים תוכנה — אנחנו בונים סדר",
    body: "SHC מתמחה במערכות ניהול מותאמות למוסדות חינוך, ארגונים ועמותות. אנחנו מבינים שכל מוסד עובד אחרת, ולכן לא מכריחים אתכם להתאים את עצמכם לתבנית. אנחנו בונים את המערכת סביב התהליך שלכם.",
  },

  contact: {
    title: "מוכנים לשמוע על הכאוס שלכם",
    subtitle: "שיחת אפיון ראשונה — בלי מחויבות.",
    email: "info@shc.co.il",
    phone: "052-000-0000",
    whatsapp: null,
  },

  footer: {
    tagline: "מערכות לארגונים ומוסדות",
    links: [
      { label: "מערכות", href: "#systems" },
      { label: "תהליך", href: "#process" },
      { label: "עבודות", href: "#portfolio" },
      { label: "צור קשר", href: "#contact" },
    ],
    copyright: `© ${new Date().getFullYear()} SHC · מערכות לארגונים ומוסדות`,
  },
};
ENDOFFILE

cat > src/data/dataLayer.ts <<'ENDOFFILE'
import { siteContent } from "./siteContent";

export function getSiteContent() {
  return siteContent;
}
ENDOFFILE

cat > src/components/layout/Navbar.astro <<'ENDOFFILE'
---
import { getSiteContent } from "../../data/dataLayer";
const content = getSiteContent();
---

<header id="navbar" class="navbar-wrapper">
  <div class="navbar-inner">
    <a href="/" class="navbar-logo" aria-label="SHC - דף הבית">
      <img src={content.brand.logoPath} alt="SHC לוגו" width="100" height="38" />
    </a>

    <nav class="navbar-links" aria-label="ניווט ראשי">
      <a href="#systems" class="nav-link">מערכות</a>
      <a href="#process" class="nav-link">תהליך</a>
      <a href="#portfolio" class="nav-link">עבודות</a>
      <a href="#contact" class="nav-link">צור קשר</a>
    </nav>

    <a href="#contact" class="btn-primary navbar-btn">דבר איתנו</a>

    <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="פתח תפריט" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div id="mobile-menu" class="mobile-menu" hidden>
    <nav class="mobile-nav" aria-label="ניווט נייד">
      <a href="#systems" class="mobile-nav-link">מערכות</a>
      <a href="#process" class="mobile-nav-link">תהליך</a>
      <a href="#portfolio" class="mobile-nav-link">עבודות</a>
      <a href="#contact" class="mobile-nav-link">צור קשר</a>
    </nav>
  </div>
</header>

<style>
  .navbar-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
    height: 68px;
    background: rgba(245,248,252,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid oklch(93% 0.015 224);
    transition: box-shadow 0.3s;
  }

  .navbar-wrapper.scrolled {
    box-shadow: 0 2px 20px oklch(50% 0.17 224 / 0.08);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 3rem;
    height: 100%;
    gap: 2rem;
  }

  .navbar-logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .navbar-logo img {
    height: 38px;
    width: auto;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    font-size: 15px;
    font-weight: 500;
    color: #44546A;
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: oklch(50% 0.17 224);
  }

  .navbar-btn {
    padding: 10px 22px !important;
    font-size: 14px !important;
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .mobile-menu-btn span {
    display: block;
    width: 22px;
    height: 2px;
    background: #0D1420;
    border-radius: 2px;
    transition: all 0.3s;
  }

  .mobile-menu {
    background: rgba(245,248,252,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid oklch(93% 0.015 224);
    padding: 20px 24px 28px;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-nav-link {
    font-size: 17px;
    font-weight: 500;
    color: #0D1420;
    text-decoration: none;
    padding: 10px 0;
    border-bottom: 1px solid oklch(93% 0.015 224);
    display: block;
  }

  @media (max-width: 900px) {
    .navbar-inner { padding-inline: 1.25rem; }
    .navbar-links { display: none; }
    .navbar-btn { display: none !important; }
    .mobile-menu-btn { display: flex; }
  }
</style>

<script>
  const navbar = document.getElementById("navbar");
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) navbar?.classList.add("scrolled");
    else navbar?.classList.remove("scrolled");
  });

  btn?.addEventListener("click", () => {
    const isOpen = menu && !menu.hidden;
    if (menu) menu.hidden = isOpen ?? true;
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  menu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (menu) menu.hidden = true;
      btn?.setAttribute("aria-expanded", "false");
    });
  });
</script>
ENDOFFILE

cat > src/components/layout/Footer.astro <<'ENDOFFILE'
---
import { getSiteContent } from "../../data/dataLayer";
const content = getSiteContent();
const year = new Date().getFullYear();
---

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src={content.brand.logoPath} alt="SHC" />
      <span class="footer-copy">© {year} SHC · מערכות לארגונים ומוסדות</span>
    </div>

    <nav class="footer-links">
      <a href="#systems">מערכות</a>
      <a href="#process">תהליך</a>
      <a href="#portfolio">עבודות</a>
      <a href="#contact">צור קשר</a>
    </nav>
  </div>
</footer>

<style>
  .site-footer {
    background: #0D1420;
    border-top: 1px solid oklch(22% 0.03 224);
    padding: 28px 48px;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin-inline: auto;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .footer-brand img {
    height: 28px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.5;
  }

  .footer-copy {
    font-size: 13px;
    color: oklch(45% 0.04 224);
  }

  .footer-links {
    display: flex;
    gap: 24px;
  }

  .footer-links a {
    font-size: 13px;
    color: oklch(52% 0.05 224);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: oklch(65% 0.14 220);
  }

  @media (max-width: 900px) {
    .site-footer {
      padding: 24px 20px;
    }

    .footer-inner {
      flex-direction: column;
      gap: 14px;
      text-align: center;
    }
  }
</style>
ENDOFFILE

cat > src/pages/index.astro <<'ENDOFFILE'
---
import BaseLayout from "../components/layout/BaseLayout.astro";
import Hero from "../components/home/Hero";
import ChaosToOrder from "../components/home/ChaosToOrder";
import SystemsSection from "../components/home/SystemsSection";
import ProcessSection from "../components/home/ProcessSection.astro";
import PortfolioSection from "../components/home/PortfolioSection.astro";
import ContactSection from "../components/home/ContactSection";
import { getSiteContent } from "../data/dataLayer";

const content = getSiteContent();
---

<BaseLayout
  title={content.meta?.title ?? "SHC — מערכות לארגונים ומוסדות"}
  description={content.meta?.description ?? "SHC בונה מערכות ניהול מותאמות אישית לארגונים ומוסדות."}
>
  <Hero
    client:load
    title={content.hero.title}
    subtitle={content.hero.subtitle}
    ctaPrimary={content.hero.ctaPrimary}
    ctaSecondary={content.hero.ctaSecondary}
    ctaPrimaryUrl={content.hero.ctaPrimaryUrl}
    ctaSecondaryUrl={content.hero.ctaSecondaryUrl}
  />

  <ChaosToOrder client:load />
  <SystemsSection client:load />
  <ProcessSection />
  <PortfolioSection />
  <ContactSection client:load />
</BaseLayout>
ENDOFFILE

cat > src/components/home/Hero.tsx <<'ENDOFFILE'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const s1 = 'oklch(50% 0.17 232)';
const s2 = 'oklch(53% 0.15 218)';
const s3 = 'oklch(57% 0.13 207)';
const s4 = 'oklch(55% 0.14 196)';

function HeroPanels() {
  return (
    <div className="hero-panels" id="hero-panels">
      <div className="hp" id="hp1">
        <div className="hp-hd">
          <div className="hp-dot" style={{ background: s1 }} />
          <span className="hp-nm">תחזוקה</span>
        </div>
        <div className="hp-row"><span>מזגן קומה 3</span><span className="badge badge-yellow">פתוח</span></div>
        <div className="hp-row"><span>דלת כניסה ראשית</span><span className="badge badge-blue">בטיפול</span></div>
        <div className="hp-row"><span>חלון מעבדה ב׳</span><span className="badge badge-green">סגור</span></div>
      </div>

      <div className="hp" id="hp2">
        <div className="hp-hd">
          <div className="hp-dot" style={{ background: s2 }} />
          <span className="hp-nm">רכש</span>
        </div>
        <div className="hp-bar-bg"><div className="hp-bar" style={{ width: '68%', background: s2 }} /></div>
        <div className="hp-label">₪68,400 / ₪100,000 · 68%</div>
        <div className="hp-row"><span>בקשת רכש #42</span><span className="badge badge-yellow">ממתין</span></div>
      </div>

      <div className="hp" id="hp3">
        <div className="hp-hd">
          <div className="hp-dot" style={{ background: s3 }} />
          <span className="hp-nm">דיווחי שעות</span>
        </div>
        <div className="hp-label">שבוע נוכחי</div>
        <div className="hp-grid">
          <div className="hp-cell" style={{ background: s3 }} />
          <div className="hp-cell" style={{ background: s3 }} />
          <div className="hp-cell" style={{ background: s3, opacity: 0.6 }} />
          <div className="hp-cell" />
          <div className="hp-cell" />
        </div>
        <div className="hp-label" style={{ marginTop: 4 }}>3/5 ימים דווחו</div>
      </div>

      <div className="hp" id="hp4">
        <div className="hp-hd">
          <div className="hp-dot" style={{ background: s4 }} />
          <span className="hp-nm">משימות</span>
        </div>
        <div className="hp-row"><span>דוח רבעוני</span><span className="badge badge-yellow">מחר</span></div>
        <div className="hp-row"><span>עדכון לוחות</span><span className="badge badge-blue">יום ה׳</span></div>
        <div className="hp-row"><span>הצעת מחיר</span><span className="badge badge-green">הושלם</span></div>
      </div>
    </div>
  );
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaPrimaryUrl?: string;
  ctaSecondary?: string;
  ctaSecondaryUrl?: string;
}

export default function Hero({
  title = 'תהליכים מבולגנים.<br><span style="color:oklch(50% 0.17 224)">מערכת שעובדת.</span>',
  subtitle = 'SHC לוקחת את הכאוס הניהולי של המוסד שלכם ובונה ממנו תשתית דיגיטלית מדויקת — לכל מחלקה, לכל תפקיד, לכל תהליך.',
  ctaPrimary = 'ראה את הטרנספורמציה ↓',
  ctaPrimaryUrl = '#chaos',
  ctaSecondary = 'דבר עם הצוות',
  ctaSecondaryUrl = '#contact',
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('#hp1', { x: 60, y: -45, rotate: 5 });
      gsap.set('#hp2', { x: -45, y: -60, rotate: -4 });
      gsap.set('#hp3', { x: 55, y: 50, rotate: -3 });
      gsap.set('#hp4', { x: -60, y: 42, rotate: 4 });

      gsap.timeline({ delay: 0.3 })
        .to('.hero-fade', { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' })
        .to(['#hp1', '#hp2'], { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(['#hp3', '#hp4'], { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-inner">
        <div className="hero-text">
          <div className="eyebrow hero-fade" style={{ opacity: 0, transform: 'translateY(30px)' }}>מערכות תוכנה לארגונים ומוסדות</div>
          <h1 className="hero-title hero-fade" style={{ opacity: 0, transform: 'translateY(30px)' }} dangerouslySetInnerHTML={{ __html: title }} />
          <p className="hero-sub hero-fade" style={{ opacity: 0, transform: 'translateY(30px)' }}>{subtitle}</p>
          <div className="hero-ctas hero-fade" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <a href={ctaPrimaryUrl} className="btn btn-primary">{ctaPrimary}</a>
            <a href={ctaSecondaryUrl} className="btn btn-secondary">{ctaSecondary}</a>
          </div>
        </div>
        <HeroPanels />
      </div>

      <style>{`
        .hero-section { min-height: 100vh; padding-top: var(--nav-height, 68px); display: flex; align-items: center; background: #F5F8FC; background-image: radial-gradient(circle, oklch(50% 0.17 224 / 0.055) 1px, transparent 1px); background-size: 28px 28px; overflow: hidden; }
        .hero-inner { display: grid; grid-template-columns: 55% 45%; gap: 40px; align-items: center; width: 100%; max-width: 1200px; margin-inline: auto; padding: 60px 48px; }
        .hero-title { font-size: clamp(44px, 5.5vw, 76px); font-weight: 900; line-height: 1.05; letter-spacing: -2.5px; margin-bottom: 22px; }
        .hero-sub { font-size: 18px; color: #44546A; line-height: 1.75; max-width: 480px; margin-bottom: 36px; }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hp { background: #fff; border: 1px solid oklch(88% 0.025 224); border-radius: 14px; padding: 14px; box-shadow: 0 4px 24px oklch(50% 0.17 224 / 0.09); opacity: 0; font-size: 12px; will-change: transform; }
        .hp-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid oklch(93% 0.015 224); }
        .hp-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .hp-nm { font-weight: 700; font-size: 13px; color: #0D1420; }
        .hp-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid oklch(93% 0.015 224); font-size: 11px; color: #44546A; }
        .hp-row:last-child { border-bottom: none; }
        .hp-bar-bg { background: oklch(93% 0.015 224); border-radius: 4px; height: 6px; overflow: hidden; margin: 4px 0; }
        .hp-bar { height: 100%; border-radius: 4px; }
        .hp-label { font-size: 10px; color: #8EA3BB; margin-bottom: 6px; }
        .hp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; margin-top: 4px; }
        .hp-cell { height: 18px; border-radius: 2px; background: oklch(93% 0.015 224); }
        .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-yellow { background: oklch(96% 0.05 82); color: oklch(48% 0.18 78); }
        .badge-blue { background: oklch(93% 0.05 224); color: oklch(50% 0.17 224); }
        .badge-green { background: oklch(93% 0.05 158); color: oklch(40% 0.15 155); }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; font-family: 'Heebo', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; text-decoration: none; border: none; }
        .btn-primary { background: oklch(50% 0.17 224); color: #fff; }
        .btn-primary:hover { background: oklch(42% 0.17 224); transform: translateY(-2px); }
        .btn-secondary { background: transparent; color: #0D1420; border: 1.5px solid oklch(88% 0.025 224); }
        .btn-secondary:hover { border-color: oklch(50% 0.17 224); color: oklch(50% 0.17 224); }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
        @media (max-width: 900px) { .hero-inner { grid-template-columns: 1fr; padding: 48px 20px; } .hero-panels { margin-top: 32px; } }
      `}</style>
    </section>
  );
}
ENDOFFILE

cat > src/components/home/ChaosToOrder.tsx <<'ENDOFFILE'
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ChaosCardConfig {
  id: string;
  style: React.CSSProperties;
  headerBg?: string;
  title?: string;
  badge?: string;
  rows?: { name: string; text: string; cls?: string }[];
  isEmail?: boolean;
  isExcel?: boolean;
  isSticky?: boolean;
  isCalls?: boolean;
  isFiles?: boolean;
  icon?: React.ReactNode;
}

const CARDS: ChaosCardConfig[] = [
  {
    id: 'ce1',
    style: { top: '9%', right: '6%' },
    headerBg: '#128C7E',
    title: 'צוות תחזוקה',
    badge: '47',
    rows: [
      { name: 'יוסי ב׳:', text: 'מי בדק את המזגן בקומה 3?', cls: '' },
      { name: 'ליאת כ.:', text: 'אני לא יודעת, שאלו את מוטי', cls: '' },
      { name: 'מוטי ל.:', text: 'שוב? זה פעם שלישית החודש', cls: 'new' },
    ],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
        <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.8 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.3s-.2-.2-.5-.3z" />
        <path d="M12 1C5.9 1 1 5.9 1 12c0 2 .5 3.8 1.4 5.4L1 23l5.8-1.5C8.3 22.5 10.1 23 12 23c6.1 0 11-4.9 11-11S18.1 1 12 1zm0 20c-1.9 0-3.7-.5-5.2-1.4l-.4-.2-3.4.9.9-3.3-.3-.4C2.5 15.7 2 13.9 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
      </svg>
    ),
  },
  {
    id: 'ce2',
    style: { top: '6%', left: '7%', width: 240 },
    headerBg: '#1a73e8',
    title: 'Gmail',
    badge: '12',
    isEmail: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: 'ce3',
    style: { top: '38%', right: '3%' },
    headerBg: '#217346',
    title: 'דיווחי_שעות_ינואר_v3_סופי.xlsx',
    isExcel: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2z" />
      </svg>
    ),
  },
  { id: 'ce4', style: { bottom: '22%', right: '17%', width: 150 }, isSticky: true },
  {
    id: 'ce5',
    style: { bottom: '20%', left: '7%' },
    headerBg: 'oklch(48% 0.15 280)',
    title: 'שיחות שהוחמצו',
    badge: '6',
    isCalls: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C3.4 21 3 13.6 3 12c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6l-2-1z" />
      </svg>
    ),
  },
  {
    id: 'ce6',
    style: { top: '44%', left: '4%' },
    headerBg: 'oklch(52% 0.14 45)',
    title: 'מסמכים אחרונים',
    isFiles: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
];

function ChaosCard({ card }: { card: ChaosCardConfig }) {
  if (card.isSticky) {
    return (
      <div id={card.id} className="ce ce-sticky" style={card.style}>
        <div className="ce-b" style={{ background: '#FFF9C4', padding: 14 }}>
          <div className="sticky-h">לא לשכוח:</div>
          <div className="sticky-row"><span>•</span><span>לרכוש כסאות ×12</span></div>
          <div className="sticky-row"><span>•</span><span>להזמין את הציוד</span></div>
          <div className="sticky-row"><span>•</span><span style={{ color: '#aaa' }}>לדבר עם האחראי</span></div>
          <div className="sticky-row" style={{ marginTop: 6, fontSize: 9, color: '#aaa' }}>מתי זה קורה?</div>
        </div>
      </div>
    );
  }

  return (
    <div id={card.id} className="ce" style={card.style}>
      <div className="ce-h" style={{ background: card.headerBg }}>
        {card.icon}
        <span className="ce-title" style={card.id === 'ce3' ? { fontSize: 10, overflow: 'hidden', whiteSpace: 'nowrap' } : {}}>
          {card.title}
        </span>
        {card.badge && <span className="ce-badge">{card.badge}</span>}
      </div>
      <div className="ce-b">
        {card.rows?.map((r, i) => (
          <div key={i} className={`ce-row ${r.cls || ''}`}>
            <span className="name">{r.name}</span> {r.text}
          </div>
        ))}

        {card.isEmail && (
          <>
            <div className="ce-subject">RE:RE:FW: תקציב ינואר 2026</div>
            <div className="ce-meta">ד"ר שמשון · לפני 3 שעות</div>
            <div className="ce-row" style={{ marginTop: 6, color: '#666' }}>ראה את מה שצירפתי — חשוב לפגישה...</div>
            <div className="ce-row" style={{ color: '#aaa' }}>RE: בנוגע לפגישה מחר עם הוועדה</div>
            <div className="ce-row" style={{ color: '#aaa' }}>FWD: נושאים לדיון — טיוטה 3</div>
          </>
        )}

        {card.isExcel && (
          <div className="ce-xls">
            <div className="xls-cell head">שם</div><div className="xls-cell head">שעות</div><div className="xls-cell head">סטטוס</div>
            <div className="xls-cell">רחל כ.</div><div className="xls-cell">42</div><div className="xls-cell ok">תקין</div>
            <div className="xls-cell">דוד מ.</div><div className="xls-cell err">חסר</div><div className="xls-cell err">בדיקה</div>
            <div className="xls-cell">מרים ל.</div><div className="xls-cell">38</div><div className="xls-cell ok">תקין</div>
            <div className="xls-cell">יוסי ב.</div><div className="xls-cell err">חסר</div><div className="xls-cell err">בדיקה</div>
          </div>
        )}

        {card.isCalls && (
          <>
            {['יעל קורסי', 'הנהלה', 'ועדת רכש'].map((name, i) => (
              <div key={name} className="ce-call-row">
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className="missed-dot" />{name}</span>
                <span style={{ color: '#ff3b30', fontWeight: 700, fontSize: 10 }}>×{i === 0 ? 3 : i === 1 ? 2 : 1}</span>
              </div>
            ))}
          </>
        )}

        {card.isFiles && (
          <>
            {['תקציב_2026_FINAL_v2.xlsx', 'דוח_רבעוני_חדש_אמיתי.docx', 'טבלה_עדכון_סופי_2.xlsx', 'דוח_ישן_v1_לא_רלוונטי.xlsx'].map((file, i) => (
              <div key={file} className="ce-file-row" style={i === 3 ? { color: '#aaa' } : {}}>
                <span className="ficon">DOC</span>{file}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const RESULT_CARDS = [
  { color: 'oklch(50% 0.17 232)', label: 'תחזוקה', kpis: [{ val: 3, text: ' תקלות פתוחות' }, { val: 94, text: '% SLA' }, { val: 1, text: ' בטיפול כעת' }] },
  { color: 'oklch(53% 0.15 218)', label: 'רכש', kpis: [{ val: 68, text: '% תקציב בשימוש' }, { val: 2, text: ' בקשות פתוחות' }, { val: 4, text: ' ספקים פעילים' }] },
  { color: 'oklch(57% 0.13 207)', label: 'שעות', kpis: [{ val: 12, text: '/15 דיווחו' }, { val: 3, text: ' ממתינים אישור' }, { val: 284, text: ' שעות השבוע' }] },
  { color: 'oklch(55% 0.14 196)', label: 'משימות', kpis: [{ val: 7, text: ' פתוחות' }, { val: 3, text: ' הושלמו היום' }, { val: 2, text: ' איחורים' }] },
];

export default function ChaosToOrder() {
  useEffect(() => {
    const isMob = window.innerWidth < 900;
    const rots = [-8, 6, -4, 12, -10, 5];
    const ces = document.querySelectorAll<HTMLElement>('.ce');

    ces.forEach((el, i) => gsap.set(el, { rotate: rots[i] }));

    const floats = [...ces].map((el, i) =>
      gsap.to(el, { y: `+=${6 + i * 2}`, duration: 2.2 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    );

    const vcx = window.innerWidth / 2;
    const vcy = window.innerHeight / 2;
    const targets: { dx: number; dy: number }[] = [];

    ces.forEach(el => {
      const r = el.getBoundingClientRect();
      targets.push({ dx: vcx - (r.left + r.width / 2), dy: vcy - (r.top + r.height / 2) });
    });

    if (!isMob) {
      gsap.set('#cresult', { scale: 0.82, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#chaos',
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          onEnter: () => floats.forEach(f => f.kill()),
        },
      });

      tl.to('#chaos-title-area', { opacity: 0, y: -20, duration: 0.4 }, 0);
      tl.to('#ct1', { opacity: 1, y: 0, duration: 0.35 }, 0.08);

      ces.forEach((el, i) => {
        tl.to(el, { x: targets[i].dx, y: targets[i].dy, rotate: 0, scale: 0.88, duration: 1, ease: 'power2.in' }, 0.15 + i * 0.05);
      });

      tl.to('#ct1', { opacity: 0, duration: 0.2 }, 0.55);
      tl.to('#ct2', { opacity: 1, y: 0, duration: 0.25 }, 0.6);
      tl.to('#cglow', { scale: 1.8, opacity: 1, duration: 0.6 }, 0.5);
      tl.to('#ct2', { opacity: 0, duration: 0.2 }, 0.88);
      tl.to('#cflash', { opacity: 0.92, duration: 0.04 }, 0.82);
      tl.to('#cflash', { opacity: 0, duration: 0.3 }, 0.86);
      tl.to(ces, { opacity: 0, scale: 0.45, duration: 0.2, stagger: 0.025 }, 0.82);
      tl.to('#cglow', { opacity: 0, scale: 0.5, duration: 0.3 }, 0.84);
      tl.set('#cresult', { display: 'grid' }, 0.87);
      tl.to('#cresult', { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }, 0.87);

      tl.call(() => {
        document.querySelectorAll<HTMLElement>('.kpi-num').forEach(el => {
          const t = parseInt(el.dataset.t || '0', 10);
          gsap.to(el, { innerText: t, duration: 0.9, snap: { innerText: 1 }, ease: 'power2.out' });
        });
      }, undefined, 0.9);

      tl.to('#ct3', { opacity: 1, y: 0, duration: 0.4 }, 0.96);
    } else {
      gsap.from(ces, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: { trigger: '#chaos', start: 'top 75%' },
      });

      ScrollTrigger.create({
        trigger: '#chaos',
        start: 'center 60%',
        onEnter: () => {
          gsap.to(ces, { opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.04 });
          setTimeout(() => {
            const r = document.getElementById('cresult');
            if (r) {
              r.style.display = 'grid';
              gsap.from(r, { opacity: 0, y: 20, duration: 0.5 });
              gsap.to('#ct3', { opacity: 1, duration: 0.4, delay: 0.3 });
              document.querySelectorAll<HTMLElement>('.kpi-num').forEach(el => {
                gsap.to(el, { innerText: parseInt(el.dataset.t || '0', 10), duration: 0.8, snap: { innerText: 1 }, ease: 'power2.out', delay: 0.5 });
              });
            }
          }, 600);
        },
      });
    }

    return () => {
      floats.forEach(f => f.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="chaos" id="chaos">
      <div className="chaos-wrap" id="cwrap">
        <div className="chaos-bg-grid" />
        <div className="chaos-bg-glow" id="cglow" />

        <div className="chaos-title-area" id="chaos-title-area">
          <div className="eyebrow" style={{ color: 'oklch(65% 0.14 220)' }}>הטרנספורמציה</div>
          <h2 className="h2" style={{ color: '#fff', fontSize: 'clamp(26px,3vw,40px)' }}>
            מהכאוס שמנהלים —<br />
            <span style={{ color: 'oklch(65% 0.14 220)' }}>לארכיטקטורה שעובדת</span>
          </h2>
        </div>

        {CARDS.map(card => <ChaosCard key={card.id} card={card} />)}

        <div className="chaos-flash" id="cflash" />

        <div id="cresult" style={{ display: 'none' }}>
          {RESULT_CARDS.map((rc, i) => (
            <div key={i} className="cr-card">
              <div className="cr-h" style={{ background: rc.color }}>
                <div className="cr-h-dot" />
                <span>{rc.label}</span>
              </div>
              <div className="cr-b">
                {rc.kpis.map((kpi, j) => (
                  <div key={j} className="cr-kpi">
                    <span className="kpi-num" data-t={kpi.val}>0</span>
                    <span>{kpi.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="narrative" id="ct1">ככה נראה הניהול של המוסד שלכם היום.</div>
        <div className="narrative" id="ct2">כולם עסוקים. שום דבר לא מסודר. שום דבר לא נראה.</div>
        <div className="narrative nb" id="ct3">SHC הופכת את הכאוס לארכיטקטורה שעובדת.</div>
      </div>

      <style>{`
        .chaos { background: #0D1420; position: relative; overflow: hidden; }
        .chaos-wrap { width: 100%; height: 100vh; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .chaos-bg-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(100,160,255,.08) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .chaos-bg-glow { position: absolute; top: 50%; left: 50%; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, oklch(50% 0.17 224 / .12) 0%, transparent 70%); transform: translate(-50%,-50%); pointer-events: none; }
        .chaos-title-area { position: absolute; top: 8%; width: 100%; text-align: center; z-index: 10; padding: 0 20px; pointer-events: none; }
        .ce { position: absolute; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,.35); width: 220px; z-index: 20; will-change: transform; direction: rtl; }
        .ce-h { display: flex; align-items: center; gap: 8px; padding: 10px 12px; color: #fff; }
        .ce-title { font-size: 12px; font-weight: 700; flex: 1; color: #fff; }
        .ce-badge { background: #ff3b30; color: #fff; border-radius: 10px; padding: 1px 7px; font-size: 10px; font-weight: 800; min-width: 22px; text-align: center; }
        .ce-b { padding: 10px 12px; background: #fff; font-size: 11px; }
        .ce-row { padding: 4px 0; border-bottom: 1px solid #f5f5f5; color: #555; font-size: 11px; line-height: 1.4; }
        .ce-row:last-child { border-bottom: none; }
        .ce-row .name { font-weight: 600; color: #222; }
        .ce-row.new { color: #25D366; font-weight: 600; }
        .ce-meta { font-size: 10px; color: #999; margin-top: 2px; }
        .ce-subject { font-weight: 700; color: #222; margin-bottom: 3px; }
        .ce-xls { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; font-size: 9px; font-family: monospace; direction: ltr; }
        .xls-cell { padding: 3px 4px; background: #f8f8f8; border: 1px solid #e0e0e0; text-align: center; color: #333; }
        .xls-cell.err { background: #ffeaea; color: #cc0000; border-color: #ffcccc; font-weight: 700; }
        .xls-cell.ok { color: green; font-weight: 700; }
        .xls-cell.head { background: #217346; color: #fff; font-weight: 700; }
        .ce-sticky { background: #FFF9C4; border: none; }
        .sticky-h { font-weight: 800; font-size: 12px; color: #444; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #e8e49a; }
        .sticky-row { font-size: 11px; color: #555; padding: 3px 0; display: flex; gap: 6px; align-items: flex-start; }
        .ce-file-row { font-size: 10px; color: #555; padding: 3px 0; border-bottom: 1px solid #f0f0f0; display: flex; gap: 6px; align-items: center; direction: ltr; text-align: left; }
        .ce-file-row:last-child { border-bottom: none; }
        .ficon { font-size: 9px; border: 1px solid #ddd; border-radius: 3px; padding: 1px 3px; color: #777; }
        .ce-call-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid #f5f5f5; font-size: 11px; }
        .ce-call-row:last-child { border-bottom: none; }
        .missed-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff3b30; flex-shrink: 0; display: inline-block; }
        .chaos-flash { position: absolute; inset: 0; background: #fff; opacity: 0; z-index: 50; pointer-events: none; }
        .narrative { position: absolute; bottom: 10%; width: 100%; text-align: center; color: #fff; font-size: clamp(16px,2vw,22px); font-weight: 700; opacity: 0; z-index: 30; pointer-events: none; padding: 0 20px; transform: translateY(8px); }
        .narrative.nb { color: oklch(65% 0.14 220); }
        #cresult { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); grid-template-columns: 1fr 1fr; gap: 16px; z-index: 40; }
        .cr-card { background: #fff; border-radius: 14px; overflow: hidden; width: 210px; box-shadow: 0 8px 40px rgba(0,0,0,.3); }
        .cr-h { padding: 12px 16px; display: flex; align-items: center; gap: 8px; }
        .cr-h-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; opacity: .8; flex-shrink: 0; }
        .cr-h span { font-size: 14px; font-weight: 800; color: #fff; }
        .cr-b { padding: 12px 16px; font-size: 12px; }
        .cr-kpi { display: flex; gap: 6px; align-items: baseline; padding: 4px 0; border-bottom: 1px solid oklch(93% 0.015 224); color: #44546A; }
        .cr-kpi:last-child { border-bottom: none; }
        .kpi-num { font-size: 22px; font-weight: 900; line-height: 1; color: #0D1420; }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
        .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
        @media (max-width: 900px) { #cresult { grid-template-columns: 1fr 1fr; } .cr-card { width: 170px; } .ce { width: 180px; } }
      `}</style>
    </section>
  );
}
ENDOFFILE

cat > src/components/home/SystemsSection.tsx <<'ENDOFFILE'
import { Fragment, useState } from 'react';
import gsap from 'gsap';

const TABS = [
  { id: 'maint', label: 'תחזוקה' },
  { id: 'proc', label: 'רכש' },
  { id: 'hours', label: 'שעות' },
  { id: 'tasks', label: 'משימות' },
] as const;

type TabId = typeof TABS[number]['id'];

const s1 = 'oklch(50% 0.17 232)';
const s2 = 'oklch(53% 0.15 218)';
const s3 = 'oklch(57% 0.13 207)';
const s4 = 'oklch(55% 0.14 196)';

function MaintenanceMockup() {
  return (
    <div className="sys-win">
      <div className="win-hd"><div className="win-dot" style={{ background: s1 }} /><span className="win-tit">ניהול תחזוקה · ינואר 2026</span></div>
      <div className="win-b">
        <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
          <span className="badge badge-yellow">3 פתוחות</span>
          <span className="badge badge-blue">1 בטיפול</span>
          <span className="badge badge-green">12 נסגרו</span>
        </div>
        <div className="win-row"><span>מזגן קומה 3 · לפני שעתיים</span><span className="badge badge-yellow">פתוח</span></div>
        <div className="win-row"><span>שבירת חלון מעבדה ב׳</span><span className="badge badge-blue">בטיפול</span></div>
        <div className="win-row"><span>תקלת תאורה מסדרון</span><span className="badge badge-yellow">פתוח</span></div>
        <div className="win-row"><span>כיסא מנהל · יחידה 4</span><span className="badge badge-green">נסגר</span></div>
      </div>
    </div>
  );
}

function ProcurementMockup() {
  return (
    <div className="sys-win">
      <div className="win-hd"><div className="win-dot" style={{ background: s2 }} /><span className="win-tit">תקציב · ינואר 2026</span></div>
      <div className="win-b">
        {[
          { label: 'ציוד משרדי', amount: '₪8,400', pct: 84 },
          { label: 'תחזוקה שוטפת', amount: '₪6,200', pct: 62 },
          { label: 'ספרים וחומרים', amount: '₪4,800', pct: 48 },
        ].map(b => (
          <div key={b.label} className="brow">
            <div className="brow-top"><span>{b.label}</span><span>{b.amount}</span></div>
            <div className="brow-bg"><div className="brow-fill" style={{ width: `${b.pct}%`, background: s2 }} /></div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid oklch(93% 0.015 224)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700 }}>
          <span style={{ color: '#44546A' }}>סה״כ מנוצל</span>
          <span style={{ color: s2 }}>₪19,400 / ₪30,000 · 65%</span>
        </div>
      </div>
    </div>
  );
}

function HoursMockup() {
  const days = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳'];
  const employees = [
    { name: 'רחל כ.', days: [true, true, true, true, false] },
    { name: 'דוד מ.', days: [true, true, false, true, true] },
    { name: 'מרים ל.', days: [false, true, true, true, false] },
  ];

  return (
    <div className="sys-win">
      <div className="win-hd"><div className="win-dot" style={{ background: s3 }} /><span className="win-tit">שבוע 3 · ינואר 2026</span></div>
      <div className="win-b">
        <div className="wgr">
          <div className="wgl"></div>
          {days.map(d => <div key={d} className="wgh">{d}</div>)}
          {employees.map(e => (
            <Fragment key={e.name}>
              <div className="wgl">{e.name}</div>
              {e.days.map((filled, i) => (
                <div key={`${e.name}-${i}`} className="wgc" style={{ background: filled ? s3 : 'oklch(93% 0.015 224)' }} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="win-row"><span>12 עובדים דיווחו השבוע</span><span className="badge badge-green">מאושר</span></div>
        <div className="win-row"><span>3 ממתינים אישור מנהל</span><span className="badge badge-yellow">ממתין</span></div>
      </div>
    </div>
  );
}

function TasksMockup() {
  return (
    <div className="sys-win">
      <div className="win-hd"><div className="win-dot" style={{ background: s4 }} /><span className="win-tit">משימות · הצוות שלי</span></div>
      <div className="win-b">
        <div className="win-row"><span>הכנת דוח רבעוני</span><span className="badge badge-yellow">מחר</span></div>
        <div className="win-row"><span>עדכון לוחות זמנים</span><span className="badge badge-blue">יום ה׳</span></div>
        <div className="win-row"><span>פגישה עם ספק ציוד</span><span className="badge badge-yellow">בבדיקה</span></div>
        <div className="win-row"><span>שליחת הצעת מחיר</span><span className="badge badge-green">הושלם</span></div>
        <div className="win-row"><span>בדיקת מלאי ספרייה</span><span className="badge badge-green">הושלם</span></div>
      </div>
    </div>
  );
}

const PANELS = {
  maint: {
    color: s1,
    eyebrow: 'מערכת תחזוקה',
    title: 'כל תקלה — מדווחת,\nמטופלת, נסגרת.',
    tagline: 'עובדים מדווחים תקלות מהנייד. מנהל תחזוקה מקבל בזמן אמת. כלום לא נופל בין הכיסאות.',
    caps: ['דיווח תקלות עם תמונה, מיקום וסיווג', 'הפצה אוטומטית לאיש הרלוונטי', 'מעקב זמן טיפול ו-SLA לכל נכס', 'היסטוריה מלאה ודוחות תקופתיים'],
    Mockup: MaintenanceMockup,
  },
  proc: {
    color: s2,
    eyebrow: 'מערכת רכש ותקציבים',
    title: 'כל הוצאה — מאושרת,\nמתועדת, בתקציב.',
    tagline: 'תהליך רכש שלם ממקום אחד. בקשה → אישור → הזמנה → קבלה → תשלום. ללא WhatsApp, ללא Excel.',
    caps: ['בקשות רכש עם תהליך אישור מוגדר', 'מעקב תקציב בזמן אמת לפי מחלקה', 'ניהול ספקים, חוזים וחשבוניות', 'דוחות כספיים לבעלי תפקיד'],
    Mockup: ProcurementMockup,
  },
  hours: {
    color: s3,
    eyebrow: 'מערכת דיווחי שעות',
    title: 'כל שעה — מדווחת,\nמאושרת, שקופה.',
    tagline: 'עובדים מדווחים מהנייד. מנהלים מאשרים בלחיצה. מנהלת שכר מקבלת קובץ מוכן. אפס ניירת.',
    caps: ['דיווח יומי מהנייד בשניות', 'אישור מנהל ומעקב חריגות', 'ייצוא אוטומטי לחישוב שכר', 'ניתוח עומסים ותפוקות לאורך זמן'],
    Mockup: HoursMockup,
  },
  tasks: {
    color: s4,
    eyebrow: 'מערכת משימות ומטלות',
    title: 'כל מטלה — מוקצית,\nבמועד, ניתנת למעקב.',
    tagline: 'לכל משימה יש בעלים, תאריך ועדיפות. המנהל רואה הכל. כלום לא נשכח.',
    caps: ['יצירת משימות אישיות ושיתופיות', 'תאריכי יעד, עדיפויות ותזכורות', 'מעקב התקדמות בזמן אמת', 'דשבורד מנהל עם תצוגה כוללת'],
    Mockup: TasksMockup,
  },
};

export default function SystemsSection() {
  const [active, setActive] = useState<TabId>('maint');

  const switchTab = (id: TabId) => {
    setActive(id);

    requestAnimationFrame(() => {
      const panel = document.querySelector('.spanel.on');
      if (panel) {
        gsap.fromTo([...panel.children], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' });
      }
    });
  };

  const panel = PANELS[active];
  const Mockup = panel.Mockup;

  return (
    <section className="systems-section" id="systems">
      <div className="wrap">
        <div className="fade-up">
          <div className="eyebrow">ארבע מערכות</div>
          <h2 className="h2">מוצרים שבנינו — לא הבטחות</h2>
          <p className="sub" style={{ marginTop: 12 }}>כל מערכת פותחה מתוך הבנה עמוקה של הכאב הספציפי שהיא פותרת.</p>
        </div>

        <div className="sys-tabs fade-up">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`stab${active === t.id ? ' on' : ''}`}
              onClick={() => switchTab(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="spanel on">
          <div>
            <div className="eyebrow" style={{ color: panel.color }}>{panel.eyebrow}</div>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>
              {panel.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </h2>
            <p className="s-tagline">{panel.tagline}</p>
            <div className="s-caps">
              {panel.caps.map((cap, i) => <div key={i} className="s-cap">{cap}</div>)}
            </div>
          </div>

          <Mockup />
        </div>
      </div>

      <style>{`
        .systems-section { padding: 96px 0; background: #F5F8FC; }
        .sys-tabs { display: flex; gap: 4px; margin: 40px 0 0; background: #fff; padding: 6px; border-radius: 12px; border: 1px solid oklch(88% 0.025 224); width: fit-content; }
        .stab { padding: 10px 24px; border: none; background: transparent; font-family: 'Heebo', sans-serif; font-size: 14px; font-weight: 600; color: #44546A; border-radius: 8px; cursor: pointer; transition: all .25s; }
        .stab.on { background: #0D1420; color: #fff; }
        .stab:hover:not(.on) { color: #0D1420; background: oklch(93% 0.015 224); }
        .spanel.on { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 36px; }
        .s-tagline { font-size: 15px; color: #44546A; margin-bottom: 24px; line-height: 1.65; }
        .s-caps { display: flex; flex-direction: column; }
        .s-cap { font-size: 14px; color: #44546A; padding: 10px 0; border-bottom: 1px solid oklch(93% 0.015 224); display: flex; gap: 10px; }
        .s-cap:last-child { border-bottom: none; }
        .s-cap::before { content: '✓'; font-weight: 800; flex-shrink: 0; color: oklch(50% 0.17 224); }
        .sys-win { background: #fff; border: 1px solid oklch(88% 0.025 224); border-radius: 14px; overflow: hidden; box-shadow: 0 8px 40px oklch(50% 0.17 224 / .1); }
        .win-hd { background: #F5F8FC; padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid oklch(93% 0.015 224); }
        .win-dot { width: 10px; height: 10px; border-radius: 50%; }
        .win-tit { font-size: 12px; font-weight: 700; color: #44546A; }
        .win-b { padding: 16px; font-size: 12px; }
        .win-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 8px; border-bottom: 1px solid oklch(93% 0.015 224); border-radius: 6px; transition: background .15s; gap: 12px; }
        .win-row:last-child { border-bottom: none; }
        .win-row:hover { background: #F5F8FC; }
        .brow { margin-bottom: 10px; }
        .brow-top { display: flex; justify-content: space-between; font-size: 11px; color: #44546A; margin-bottom: 4px; }
        .brow-bg { background: oklch(93% 0.015 224); border-radius: 4px; height: 7px; overflow: hidden; }
        .brow-fill { height: 100%; border-radius: 4px; }
        .wgr { display: grid; grid-template-columns: 56px repeat(5,1fr); gap: 4px; align-items: center; margin-bottom: 12px; }
        .wgh { font-size: 10px; color: #8EA3BB; text-align: center; }
        .wgl { font-size: 10px; color: #44546A; font-weight: 600; }
        .wgc { height: 22px; border-radius: 3px; }
        .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .badge-yellow { background: oklch(96% 0.05 82); color: oklch(48% 0.18 78); }
        .badge-blue { background: oklch(93% 0.05 224); color: oklch(50% 0.17 224); }
        .badge-green { background: oklch(93% 0.05 158); color: oklch(40% 0.15 155); }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
        .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
        .sub { font-size: 17px; color: #44546A; line-height: 1.75; }
        .fade-up { opacity: 0; transform: translateY(30px); }
        @media (max-width: 900px) {
          .spanel.on { grid-template-columns: 1fr; gap: 40px; }
          .sys-tabs { width: 100%; overflow-x: auto; }
          .stab { white-space: nowrap; }
        }
      `}</style>
    </section>
  );
}
ENDOFFILE

cat > src/components/home/ProcessSection.astro <<'ENDOFFILE'
---
const steps = [
  { n: 1, title: 'שיחת אפיון', desc: 'מבינים לפני שבונים' },
  { n: 2, title: 'מיפוי תהליכים', desc: 'כל workflow קיים' },
  { n: 3, title: 'זיהוי כאבים', desc: 'הבעיה המדויקת' },
  { n: 4, title: 'UX/UI', desc: 'ממשק למשתמשים' },
  { n: 5, title: 'אב טיפוס', desc: 'Figma interactive' },
  { n: 6, title: 'פיתוח', desc: 'Stack מוסדי, RTL' },
  { n: 7, title: 'בדיקות', desc: 'QA מלא' },
  { n: 8, title: 'הטמעה', desc: 'העלאה + הדרכה' },
  { n: 9, title: 'ליווי', desc: 'לא נעלמים' },
];

const stepsMobile = [
  { n: 1, title: 'שיחת אפיון', desc: 'מבינים את הארגון לפני שפותחים Figma.' },
  { n: 2, title: 'מיפוי תהליכים', desc: 'מתעדים כל workflow קיים.' },
  { n: 3, title: 'זיהוי כאבים', desc: 'מגדירים בעיות בצורה מדויקת.' },
  { n: 4, title: 'UX/UI Design', desc: 'ממשק שמתאים למשתמשים האמיתיים.' },
  { n: 5, title: 'אב טיפוס', desc: 'Figma interactive לפני שורת קוד.' },
  { n: 6, title: 'פיתוח', desc: 'Stack מוסדי, RTL מלא, אבטחה.' },
  { n: 7, title: 'בדיקות', desc: 'QA פונקציונלי, עיצובי ו-UX.' },
  { n: 8, title: 'הטמעה', desc: 'העלאה לאוויר + הדרכה לצוות.' },
  { n: 9, title: 'ליווי ושיפור', desc: 'לא נעלמים אחרי ההשקה.' },
];
---

<section class="process-section" id="process">
  <div class="wrap">
    <div class="fade-up" style="text-align:center">
      <div class="eyebrow">תהליך העבודה</div>
      <h2 class="h2">לא מוכרים תוכנה — מלווים תהליך</h2>
      <p class="sub" style="margin:12px auto 0;max-width:520px">כל פרויקט מתחיל בהבנה ומסתיים בהטמעה שעובדת.</p>
    </div>

    <div class="ptl fade-up" id="ptl">
      <div class="pl"><div class="plf" id="plf"></div></div>
      {steps.map((s, i) => (
        <div class={`pstep${i === 0 ? ' on' : ''}`} data-index={i}>
          <div class="pnum">{s.n}</div>
          <div>
            <div class="ptit">{s.title}</div>
            <div class="pdesc">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>

    <div class="pm-list">
      {stepsMobile.map(s => (
        <div class="pm-step">
          <div class="pm-num">{s.n}</div>
          <div>
            <div class="pm-tit">{s.title}</div>
            <div class="pm-desc">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .process-section {
    padding: 96px 0;
    background: #fff;
    border-top: 1px solid oklch(88% 0.025 224);
  }

  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
  .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
  .sub { font-size: 17px; color: #44546A; line-height: 1.75; }
  .fade-up { opacity: 0; transform: translateY(30px); }
  .ptl { position: relative; display: flex; gap: 0; margin-top: 60px; }
  .pl { position: absolute; top: 23px; right: 24px; left: 24px; height: 2px; background: oklch(93% 0.015 224); z-index: 0; }
  .plf { height: 100%; width: 0; background: oklch(50% 0.17 224); border-radius: 2px; transition: width 1.2s; }
  .pstep { flex: 1; min-width: 90px; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 1; padding: 0 6px; }
  .pnum { width: 46px; height: 46px; border-radius: 50%; background: #fff; border: 2px solid oklch(88% 0.025 224); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; color: #8EA3BB; margin-bottom: 10px; flex-shrink: 0; transition: all .35s; }
  .pstep.on .pnum { background: oklch(50% 0.17 224); border-color: oklch(50% 0.17 224); color: #fff; }
  .ptit { font-size: 12px; font-weight: 700; color: #0D1420; margin-bottom: 3px; }
  .pdesc { font-size: 11px; color: #44546A; display: none; }
  .pstep.on .pdesc { display: block; }
  .pm-list { display: none; flex-direction: column; margin-top: 40px; }
  .pm-step { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid oklch(93% 0.015 224); align-items: flex-start; }
  .pm-step:last-child { border-bottom: none; }
  .pm-num { width: 40px; height: 40px; border-radius: 50%; background: #0D1420; color: #fff; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pm-tit { font-size: 15px; font-weight: 700; margin-bottom: 3px; }
  .pm-desc { font-size: 13px; color: #44546A; }

  @media (max-width: 900px) {
    .ptl { display: none; }
    .pm-list { display: flex; }
  }
</style>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.pstep').forEach((s, i) => {
    s.addEventListener('mouseenter', () => {
      document.querySelectorAll('.pstep').forEach(p => p.classList.remove('on'));
      s.classList.add('on');
      const f = document.getElementById('plf');
      if (f) f.style.width = ((i + 1) / 9 * 100) + '%';
    });
  });

  ScrollTrigger.create({
    trigger: '#ptl',
    start: 'top 72%',
    once: true,
    onEnter: () => {
      const f = document.getElementById('plf');
      if (f) gsap.to(f, { width: '100%', duration: 1.4, ease: 'power2.out', delay: 0.3 });
    },
  });

  gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
    });
  });
</script>
ENDOFFILE

cat > src/components/home/PortfolioSection.astro <<'ENDOFFILE'
---

---

<section class="portfolio-section" id="portfolio">
  <div class="wrap">
    <div class="fade-up">
      <div class="eyebrow">תיק עבודות</div>
      <h2 class="h2">עבודות שמדברות בעד עצמן</h2>
    </div>

    <div class="pgrid">
      <div class="pc pf fade-up">
        <div class="pc-bg" style="background:linear-gradient(135deg,oklch(18% 0.15 255) 0%,oklch(32% 0.18 230) 100%)">
          <div class="pltr">גביע</div>
        </div>
        <div class="pc-t">
          <div class="pc-nm">עיצוב גביע ישראל — מיתוג ו-UI</div>
          <div class="ptags">
            <span class="ptag">Brand Identity</span>
            <span class="ptag">Sports</span>
            <span class="ptag">UI Design</span>
          </div>
        </div>
      </div>

      <div class="pc fade-up">
        <div class="pc-bg" style="background:linear-gradient(135deg,oklch(22% 0.12 225) 0%,oklch(36% 0.14 205) 100%)">
          <div class="pltr" style="font-size:50px;opacity:.1">מוסד</div>
        </div>
        <div class="pc-t">
          <div class="pc-nm">מוסד חינוכי · מערכת ניהול שלמה</div>
          <div class="ptags">
            <span class="ptag">System Design</span>
            <span class="ptag">RTL</span>
          </div>
        </div>
      </div>

      <div class="pc fade-up">
        <div class="pc-bg" style="background:linear-gradient(135deg,oklch(26% 0.10 212) 0%,oklch(40% 0.12 195) 100%)">
          <div class="pltr" style="font-size:50px;opacity:.1">עמותה</div>
        </div>
        <div class="pc-t">
          <div class="pc-nm">עמותה · תהליכי רכש ותקציב</div>
          <div class="ptags">
            <span class="ptag">UX Research</span>
            <span class="ptag">Process</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .portfolio-section { padding: 96px 0; background: #F5F8FC; }
  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
  .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
  .fade-up { opacity: 0; transform: translateY(30px); }
  .pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 48px; }
  .pf { grid-column: 1 / -1; }
  .pc { border-radius: 16px; overflow: hidden; position: relative; display: flex; align-items: flex-end; cursor: pointer; transition: transform .3s; }
  .pc:hover { transform: translateY(-4px); }
  .pc-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .pc-t { position: absolute; inset: 0; padding: 28px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, oklch(0% 0 0 / .65) 0%, transparent 60%); color: #fff; }
  .pc-nm { font-size: clamp(17px,2vw,26px); font-weight: 800; line-height: 1.2; margin-bottom: 8px; }
  .ptags { display: flex; gap: 8px; flex-wrap: wrap; }
  .ptag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: oklch(100% 0 0 / .18); color: #fff; backdrop-filter: blur(4px); }
  .pltr { font-weight: 900; color: rgba(255,255,255,.1); font-size: clamp(50px,9vw,120px); letter-spacing: -5px; user-select: none; }
  .pc.pf { aspect-ratio: 21/9; }
  .pgrid > .pc:not(.pf) { aspect-ratio: 16/9; }

  @media (max-width: 900px) {
    .pgrid { grid-template-columns: 1fr; }
    .pf { grid-column: 1; }
  }
</style>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
    });
  });
</script>
ENDOFFILE

cat > src/components/home/ContactSection.tsx <<'ENDOFFILE'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  org: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('sending');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submission:', data);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="contact-inner">
          <div className="ci-inf fade-up">
            <div className="eyebrow" style={{ color: 'oklch(65% 0.14 220)' }}>צור קשר</div>
            <h2 className="h2" style={{ color: '#fff' }}>מוכנים לשמוע על הכאוס שלכם</h2>
            <p className="sub" style={{ marginTop: 14, color: 'oklch(68% 0.05 224)' }}>
              שיחת אפיון ראשונה — בלי מחויבות.
            </p>

            <div className="cdet">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@shc.co.il
            </div>

            <div className="cdet">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.73 17z" />
              </svg>
              052-000-0000
            </div>
          </div>

          <div className="cform fade-up">
            {status === 'sent' ? (
              <div className="sent-state">
                <svg className="sent-icon" viewBox="0 0 48 48" fill="none" width="52" height="52" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
                  <path d="M15 24.5l6 6 13-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>תודה. נחזור אליכם תוך 24 שעות.</h3>
                <p>קיבלנו את הפנייה שלכם ונשמח לקבוע שיחת היכרות.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="fg">
                  <label className="flbl">שם מלא</label>
                  <input
                    type="text"
                    className={`fi${errors.name ? ' fi-err' : ''}`}
                    placeholder="ישראל ישראלי"
                    {...register('name', { required: true })}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">שם המוסד / ארגון</label>
                  <input
                    type="text"
                    className={`fi${errors.org ? ' fi-err' : ''}`}
                    placeholder="בית ספר · עמותה · ארגון"
                    {...register('org', { required: true })}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">טלפון</label>
                  <input
                    type="tel"
                    className="fi"
                    placeholder="050-000-0000"
                    {...register('phone')}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">ספר לנו על הכאוס שלך</label>
                  <textarea
                    className="fi"
                    placeholder="מה התהליכים שגורמים לבעיה?"
                    {...register('message')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'שולח...' : 'שלח — נחזור תוך 24 שעות'}
                </button>

                {status === 'error' && (
                  <p className="err-msg">שגיאה בשליחה — נסה שנית או צור קשר ישירות.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { padding: 96px 0; background: #0D1420; color: #fff; }
        .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
        .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
        .sub { font-size: 17px; line-height: 1.75; }
        .fade-up { opacity: 0; transform: translateY(30px); }
        .cdet { display: flex; gap: 12px; align-items: center; margin-top: 20px; font-size: 15px; color: oklch(72% 0.05 224); }
        .cform { background: oklch(18% 0.03 224); border-radius: 16px; padding: 32px; border: 1px solid oklch(28% 0.04 224); }
        .fg { margin-bottom: 14px; }
        .flbl { display: block; font-size: 13px; font-weight: 600; color: oklch(68% 0.04 224); margin-bottom: 6px; }
        .fi { width: 100%; padding: 12px 14px; border-radius: 8px; background: oklch(23% 0.03 224); border: 1px solid oklch(28% 0.04 224); color: #fff; font-family: 'Heebo', sans-serif; font-size: 15px; outline: none; transition: border-color .2s; box-sizing: border-box; }
        .fi:focus { border-color: oklch(65% 0.14 220); }
        .fi::placeholder { color: oklch(48% 0.04 224); }
        .fi-err { border-color: #ff3b30 !important; }
        textarea.fi { height: 100px; resize: vertical; }
        .submit-btn { width: 100%; justify-content: center; margin-top: 4px; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; font-family: 'Heebo', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; text-decoration: none; border: none; }
        .btn-primary { background: oklch(50% 0.17 224); color: #fff; }
        .btn-primary:hover:not(:disabled) { background: oklch(42% 0.17 224); transform: translateY(-2px); }
        .err-msg { color: #ff6b6b; font-size: 13px; margin-top: 8px; text-align: center; }
        .sent-state { text-align: center; padding: 20px 0; }
        .sent-icon { color: oklch(57% 0.13 207); margin-bottom: 16px; }
        .sent-state h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; }
        .sent-state p { font-size: 14px; color: oklch(68% 0.04 224); }

        @media (max-width: 900px) {
          .contact-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
ENDOFFILE

rm -f src/components/home/SystemsGrid.tsx
rm -f src/components/home/AboutSection.astro

echo "SHC design files applied successfully."
echo "Next steps:"
echo "  npm install"
echo "  npm run build"
echo "  npm run dev"
