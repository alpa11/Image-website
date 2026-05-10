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

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryUrl,
  ctaSecondaryUrl,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Entrance sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, y: -16, duration: 0.6 })
        .from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
        .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(statsRef.current?.children ?? [], {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
        }, "-=0.3");

      // Parallax on scroll
      gsap.to(bgRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section" aria-label="פתיחה">
      {/* Background decoration */}
      <div ref={bgRef} className="hero-bg" aria-hidden="true">
        <div className="hero-bg-circle hero-bg-circle--1" />
        <div className="hero-bg-circle hero-bg-circle--2" />
        <div className="hero-bg-grid" />
      </div>

      <div className="container hero-content">
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge">
          <span className="hero-badge-dot" />
          מערכות ניהול למוסדות חינוך ועמותות
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="hero-title">
          {title.includes("מכניסות סדר") ? (
            <>
              מערכות ניהול שמכניסות{" "}
              <span className="gradient-text">סדר</span>
              {" "}למוסדות
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle">
          {subtitle}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="hero-ctas">
          <a href={ctaPrimaryUrl} className="btn-primary hero-cta-primary">
            {ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M11 8H5M8 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={ctaSecondaryUrl} className="btn-secondary">
            {ctaSecondary}
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">4</span>
            <span className="hero-stat-label">מערכות פעילות</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">מותאם אישית</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-value">0</span>
            <span className="hero-stat-label">אקסלים נדרשים</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #F7FBFC;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero-bg-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }

        .hero-bg-circle--1 {
          width: 600px;
          height: 600px;
          top: -200px;
          left: -200px;
          background: radial-gradient(circle, rgba(0, 175, 198, 0.12) 0%, transparent 70%);
        }

        .hero-bg-circle--2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          right: 10%;
          background: radial-gradient(circle, rgba(11, 127, 211, 0.08) 0%, transparent 70%);
        }

        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 175, 198, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 175, 198, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          padding-block: 5rem;
          max-width: 780px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          background: rgba(0, 175, 198, 0.1);
          border: 1px solid rgba(0, 175, 198, 0.25);
          border-radius: 9999px;
          font-size: 0.825rem;
          font-weight: 600;
          color: #0B7FD3;
          margin-bottom: 1.75rem;
        }

        .hero-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00AFC6;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0B2545;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.75;
          color: #4A5568;
          max-width: 58ch;
          margin-bottom: 2.5rem;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .hero-cta-primary {
          flex-direction: row-reverse;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #E2E8F0;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .hero-stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0B2545;
          line-height: 1;
        }

        .hero-stat-label {
          font-size: 0.8rem;
          color: #718096;
          font-weight: 500;
        }

        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: #E2E8F0;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, #00AFC6, transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        @media (max-width: 640px) {
          .hero-ctas {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-ctas .btn-primary,
          .hero-ctas .btn-secondary {
            justify-content: center;
          }
          .hero-stats {
            gap: 1.25rem;
          }
          .hero-stat-value {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}
