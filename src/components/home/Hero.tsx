import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryUrl: string;
  ctaSecondaryUrl: string;
}

// ─── Abstract Dashboard Mockup ────────────────────────────────
function DashboardMockup() {
  return (
    <div className="db-frame">
      {/* Window chrome */}
      <div className="db-chrome">
        <div className="db-dots">
          <span style={{ background: "#FF5F57" }} />
          <span style={{ background: "#FEBC2E" }} />
          <span style={{ background: "#28C840" }} />
        </div>
        <div className="db-chrome-title">SHC · לוח בקרה</div>
        <div className="db-chrome-actions">
          <div className="db-icon-btn" />
          <div className="db-icon-btn" />
        </div>
      </div>

      <div className="db-body">
        {/* Sidebar */}
        <nav className="db-sidebar">
          {["ראשי", "קריאות", "רכש", "שעות", "משימות"].map((item, i) => (
            <div key={item} className={`db-nav-item ${i === 0 ? "db-nav-item--active" : ""}`}>
              <div className="db-nav-dot" />
              <span>{item}</span>
            </div>
          ))}
        </nav>

        {/* Main content */}
        <div className="db-main">
          {/* Stats row */}
          <div className="db-stats">
            <div className="db-stat-card" style={{ "--c": "#E8843A" } as React.CSSProperties}>
              <div className="db-stat-bar" />
              <div className="db-stat-num">24</div>
              <div className="db-stat-label">קריאות פתוחות</div>
            </div>
            <div className="db-stat-card" style={{ "--c": "#2E9E6B" } as React.CSSProperties}>
              <div className="db-stat-bar" />
              <div className="db-stat-num">₪ 84k</div>
              <div className="db-stat-label">תקציב פעיל</div>
            </div>
            <div className="db-stat-card" style={{ "--c": "#4A6FD4" } as React.CSSProperties}>
              <div className="db-stat-bar" />
              <div className="db-stat-num">18/24</div>
              <div className="db-stat-label">דיווחים הוגשו</div>
            </div>
          </div>

          {/* Section header */}
          <div className="db-section-hd">
            <span className="db-section-title">קריאות אחרונות</span>
            <span className="db-section-badge">24 פתוחות</span>
          </div>

          {/* Table rows */}
          <div className="db-table">
            {[
              { id: "#2341", desc: "תקלת מזגן קומה 3", status: "בטיפול", color: "#F59E0B", user: "א" },
              { id: "#2340", desc: "ברז נזילה — שירותים", status: "פתוח", color: "#EF4444", user: "מ" },
              { id: "#2339", desc: "תאורה שבורה", status: "נסגר", color: "#10B981", user: "ד" },
            ].map((row) => (
              <div key={row.id} className="db-row">
                <span className="db-row-id">{row.id}</span>
                <span className="db-row-desc">{row.desc}</span>
                <span className="db-row-status">
                  <span className="db-status-dot" style={{ background: row.color }} />
                  {row.status}
                </span>
                <span className="db-avatar" style={{ background: `${row.color}22`, color: row.color }}>
                  {row.user}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="db-progress-wrap">
            <div className="db-progress-label">
              <span>השלמת דיווחי חודש ינואר</span>
              <span className="db-progress-pct">75%</span>
            </div>
            <div className="db-progress-track">
              <div className="db-progress-fill" style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="db-notification">
        <div className="db-notif-dot" />
        <span>קריאה חדשה נפתחה · #2342</span>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryUrl,
  ctaSecondaryUrl,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Text: slide in from right (RTL — text is on the right)
      tl.from(".hero-badge", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 28, duration: 0.75 }, "-=0.25")
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.6 }, "-=0.45")
        .from(".hero-ctas", { opacity: 0, y: 14, duration: 0.5 }, "-=0.35")
        .from(".hero-kpi", { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, "-=0.3");

      // Mockup: float in from the left with slight perspective
      tl.from(mockupRef.current, {
        opacity: 0,
        x: -40,
        rotateY: 8,
        duration: 0.9,
        ease: "power2.out",
      }, 0.15);

      // Mockup elements: staggered reveal
      tl.from(".db-stat-card, .db-row, .db-progress-wrap", {
        opacity: 0,
        y: 8,
        stagger: 0.06,
        duration: 0.4,
      }, 0.65);

      // Notification popup
      tl.from(".db-notification", {
        opacity: 0,
        y: 16,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.5)",
      }, 1.1);

      // Subtle float of mockup on scroll
      gsap.to(mockupRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-root">
      {/* Background elements */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-blob hero-bg-blob--1" />
        <div className="hero-bg-blob hero-bg-blob--2" />
        <svg className="hero-bg-grid" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,175,198,0.06)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)"/>
        </svg>
      </div>

      <div className="hero-container">
        {/* ── Text side ── */}
        <div ref={textRef} className="hero-text">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-pulse" />
            מערכות ניהול למוסדות חינוך ועמותות
          </div>

          {/* Title */}
          <h1 className="hero-title">
            מכאוס תפעולי
            <br />
            <span className="hero-title-accent">למערכת מסודרת</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub">{subtitle}</p>

          {/* CTAs */}
          <div className="hero-ctas">
            <a href={ctaPrimaryUrl} className="btn-primary hero-btn-primary">
              {ctaPrimary}
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
                <path d="M11 8H5M8 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
            <a href={ctaSecondaryUrl} className="hero-btn-ghost">
              {ctaSecondary}
            </a>
          </div>

          {/* KPIs */}
          <div className="hero-kpis">
            <div className="hero-kpi">
              <strong>4</strong>
              <span>מערכות פעילות</span>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi">
              <strong>100%</strong>
              <span>מותאם אישית</span>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi">
              <strong>0</strong>
              <span>אקסלים נדרשים</span>
            </div>
          </div>
        </div>

        {/* ── Mockup side ── */}
        <div ref={mockupRef} className="hero-mockup-wrap" aria-hidden="true">
          <DashboardMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-track">
          <div className="hero-scroll-thumb" />
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .hero-root {
          position: relative;
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #F7FBFC;
        }

        /* ── Background ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .hero-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .hero-bg-blob--1 {
          width: 700px; height: 700px;
          top: -300px; right: -150px;
          background: radial-gradient(circle, rgba(0,175,198,0.13) 0%, transparent 65%);
        }
        .hero-bg-blob--2 {
          width: 500px; height: 500px;
          bottom: -200px; left: 20%;
          background: radial-gradient(circle, rgba(11,127,211,0.09) 0%, transparent 65%);
        }
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
        }

        /* ── Layout ── */
        .hero-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin-inline: auto;
          padding-inline: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4rem;
          align-items: center;
          padding-block: 5rem;
        }

        /* ── Text ── */
        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.875rem;
          background: rgba(0,175,198,0.1);
          border: 1px solid rgba(0,175,198,0.22);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0B7FD3;
          margin-bottom: 1.75rem;
        }

        .hero-badge-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00AFC6;
          flex-shrink: 0;
          animation: heroPulse 2s infinite;
        }

        @keyframes heroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,175,198,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 5px rgba(0,175,198,0); }
        }

        .hero-title {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #0B2545;
          margin-bottom: 1.5rem;
        }

        .hero-title-accent {
          background: linear-gradient(135deg, #00AFC6 0%, #0B7FD3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #4A5568;
          max-width: 46ch;
          margin-bottom: 2.25rem;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-direction: row-reverse;
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, #00AFC6 0%, #0B7FD3 100%);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,175,198,0.3);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 8px 28px rgba(0,175,198,0.42);
          transform: translateY(-1px);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 1.5rem;
          color: #4A5568;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 0.5rem;
          border: 1.5px solid #E2E8F0;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .hero-btn-ghost:hover {
          border-color: #00AFC6;
          color: #0B2545;
          background: rgba(0,175,198,0.05);
        }

        .hero-kpis {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid #E2E8F0;
        }

        .hero-kpi {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .hero-kpi strong {
          font-size: 1.6rem;
          font-weight: 900;
          color: #0B2545;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .hero-kpi span {
          font-size: 0.75rem;
          color: #718096;
          font-weight: 500;
        }

        .hero-kpi-sep {
          width: 1px;
          height: 32px;
          background: #E2E8F0;
          flex-shrink: 0;
        }

        /* ── Mockup wrapper ── */
        .hero-mockup-wrap {
          perspective: 1200px;
        }

        /* ── Dashboard Frame ── */
        .db-frame {
          position: relative;
          background: #FFFFFF;
          border-radius: 14px;
          box-shadow:
            0 0 0 1px rgba(11,37,69,0.08),
            0 24px 64px rgba(11,37,69,0.14),
            0 4px 16px rgba(0,175,198,0.08);
          overflow: hidden;
          transform: rotate(-1deg) rotateY(-4deg) rotateX(2deg);
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
        }
        .db-frame:hover {
          transform: rotate(0deg) rotateY(0deg) rotateX(0deg);
        }

        /* Chrome bar */
        .db-chrome {
          height: 40px;
          background: #0B2545;
          display: flex;
          align-items: center;
          padding-inline: 1rem;
          gap: 0.75rem;
        }
        .db-dots {
          display: flex;
          gap: 5px;
        }
        .db-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .db-chrome-title {
          flex: 1;
          text-align: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
        }
        .db-chrome-actions {
          display: flex;
          gap: 6px;
        }
        .db-icon-btn {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          background: rgba(255,255,255,0.08);
        }

        /* Body */
        .db-body {
          display: grid;
          grid-template-columns: 100px 1fr;
          min-height: 280px;
        }

        /* Sidebar */
        .db-sidebar {
          background: #F8FAFC;
          border-left: 1px solid #E2E8F0;
          padding: 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .db-nav-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.4rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.65rem;
          font-weight: 500;
          color: #718096;
          cursor: default;
        }
        .db-nav-item--active {
          background: rgba(0,175,198,0.1);
          color: #0B7FD3;
          font-weight: 700;
        }
        .db-nav-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
          flex-shrink: 0;
        }
        .db-nav-item--active .db-nav-dot {
          opacity: 1;
          background: #00AFC6;
        }

        /* Main content */
        .db-main {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Stats */
        .db-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .db-stat-card {
          background: #F7FBFC;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          overflow: hidden;
          padding: 0.6rem;
        }
        .db-stat-bar {
          height: 3px;
          width: 100%;
          background: var(--c, #00AFC6);
          border-radius: 9999px;
          margin-bottom: 0.5rem;
        }
        .db-stat-num {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0B2545;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .db-stat-label {
          font-size: 0.55rem;
          color: #718096;
          font-weight: 500;
        }

        /* Section header */
        .db-section-hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-section-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: #0B2545;
        }
        .db-section-badge {
          font-size: 0.55rem;
          font-weight: 600;
          background: rgba(239,68,68,0.1);
          color: #DC2626;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
        }

        /* Table */
        .db-table {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .db-row {
          display: grid;
          grid-template-columns: 36px 1fr auto 22px;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.5rem;
          border-radius: 0.35rem;
          font-size: 0.6rem;
          background: #FAFBFC;
          border: 1px solid transparent;
          transition: border-color 0.15s;
        }
        .db-row:hover {
          border-color: #E2E8F0;
        }
        .db-row-id {
          color: #00AFC6;
          font-weight: 700;
          font-size: 0.58rem;
        }
        .db-row-desc {
          color: #4A5568;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .db-row-status {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #4A5568;
          white-space: nowrap;
        }
        .db-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .db-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          font-weight: 700;
        }

        /* Progress */
        .db-progress-wrap {
          padding-top: 0.25rem;
        }
        .db-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.58rem;
          color: #718096;
          margin-bottom: 0.3rem;
          font-weight: 500;
        }
        .db-progress-pct {
          color: #4A6FD4;
          font-weight: 700;
        }
        .db-progress-track {
          height: 5px;
          background: #EEF2FF;
          border-radius: 9999px;
          overflow: hidden;
        }
        .db-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4A6FD4, #7C5CBF);
          border-radius: 9999px;
        }

        /* Floating notification */
        .db-notification {
          position: absolute;
          bottom: -1px;
          right: 12px;
          background: #0B2545;
          color: white;
          font-size: 0.6rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px 9999px 0 0;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          box-shadow: 0 -4px 16px rgba(11,37,69,0.2);
        }
        .db-notif-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00AFC6;
          animation: heroPulse 1.5s infinite;
        }

        /* Scroll hint */
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-scroll-track {
          width: 2px;
          height: 44px;
          background: #E2E8F0;
          border-radius: 9999px;
          overflow: hidden;
        }
        .hero-scroll-thumb {
          width: 100%;
          height: 50%;
          background: #00AFC6;
          border-radius: 9999px;
          animation: scrollThumb 1.8s ease-in-out infinite;
        }
        @keyframes scrollThumb {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            padding-block: 3rem;
          }
          .hero-mockup-wrap {
            order: -1;
          }
          .db-frame {
            transform: none;
          }
          .db-body {
            grid-template-columns: 80px 1fr;
          }
        }
        @media (max-width: 540px) {
          .hero-sub { max-width: unset; }
          .hero-kpis { gap: 1.25rem; }
          .hero-kpi strong { font-size: 1.3rem; }
          .db-sidebar { display: none; }
          .db-body { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
