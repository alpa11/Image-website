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
