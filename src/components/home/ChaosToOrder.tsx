import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Chaos items: the old way ─────────────────────────────────
const CHAOS = [
  {
    id: "whatsapp",
    label: "וואטסאפ",
    bg: "#E8F8EF",
    color: "#128C7E",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: "excel",
    label: "אקסל",
    bg: "#EAF4EE",
    color: "#217346",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#217346">
        <path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12 9.93 8.72H8.13L7 10.87 5.87 8.72H4.1L6 12 4.07 15.28H5.86M14 19.5V17H9V19.5M14 13.5V10.5H9V13.5M14 9.5V7H9V9.5M21 19.5V17H15V19.5M21 13.5V10.5H15V13.5M21 9.5V7H15V9.5Z"/>
      </svg>
    ),
  },
  {
    id: "phone",
    label: "טלפונים",
    bg: "#F0F4FF",
    color: "#3B82F6",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#3B82F6" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
  },
  {
    id: "email",
    label: "מיילים",
    bg: "#FEF2F2",
    color: "#DC2626",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#DC2626" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "note",
    label: "פתקים",
    bg: "#FFFBEB",
    color: "#D97706",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#FCD34D">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <line x1="7" y1="8" x2="17" y2="8" stroke="#D97706" strokeWidth="1.5"/>
        <line x1="7" y1="12" x2="14" y2="12" stroke="#D97706" strokeWidth="1.5"/>
        <line x1="7" y1="16" x2="12" y2="16" stroke="#D97706" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "folder",
    label: "תיקיות",
    bg: "#F5F3FF",
    color: "#7C3AED",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#7C3AED" strokeWidth="1.8">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    id: "sms",
    label: "הודעות SMS",
    bg: "#ECFDF5",
    color: "#059669",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#059669" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

// ─── Order items: the 4 systems ──────────────────────────────
const ORDER = [
  {
    id: "maintenance",
    name: "מערכת תחזוקה",
    desc: "כל קריאה מקבלת כתובת ואחראי",
    color: "#E8843A",
    bg: "#FFF5EE",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    id: "procurement",
    name: "מערכת רכש",
    desc: "בקשות, אישורים ותקציב מסודר",
    color: "#2E9E6B",
    bg: "#F0FBF5",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    id: "salary",
    name: "דיווחי שעות",
    desc: "דיווח, מסמכים ובקרה חודשית",
    color: "#4A6FD4",
    bg: "#EEF2FF",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    id: "tasks",
    name: "מערכת משימות",
    desc: "כל משימה יודעת מי אחראי עליה",
    color: "#7C5CBF",
    bg: "#F3F0FF",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
];

// ─── Initial positions for chaos items (as %) ────────────────
const CHAOS_POSITIONS = [
  { x: 8, y: 10, r: -18 },
  { x: 68, y: 5, r: 14 },
  { x: 20, y: 62, r: -8 },
  { x: 74, y: 55, r: 20 },
  { x: 44, y: 18, r: -22 },
  { x: 10, y: 38, r: 12 },
  { x: 80, y: 28, r: -10 },
];

export default function ChaosToOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const chaosItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelBeforeRef = useRef<HTMLDivElement>(null);
  const labelAfterRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always show section header
    gsap.from(headRef.current, {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: headRef.current, start: "top 80%" },
    });

    if (prefersReduced) {
      // Just fade everything in without animation
      gsap.set(chaosItemRefs.current, { opacity: 0 });
      gsap.set(orderCardRefs.current, { opacity: 1 });
      return;
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: simple fade transition (no pin)
      gsap.from(chaosItemRefs.current, {
        opacity: 0, scale: 0.8, stagger: 0.07,
        scrollTrigger: { trigger: pinRef.current, start: "top 80%" },
      });
      gsap.from(orderCardRefs.current, {
        opacity: 0, y: 20, stagger: 0.08,
        scrollTrigger: { trigger: pinRef.current, start: "top 60%" },
      });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Set initial states ──
      gsap.set(orderCardRefs.current, { opacity: 0, scale: 0.85, y: 20 });
      gsap.set(labelAfterRef.current, { opacity: 0 });
      gsap.set(arrowRef.current, { opacity: 0 });

      // ── Initial float animation for chaos items (before scroll) ──
      chaosItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `${Math.sin(i * 1.4) * 10}`,
          rotation: `${CHAOS_POSITIONS[i].r + Math.sin(i) * 4}`,
          duration: 1.8 + i * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });

      // ── ScrollTrigger timeline with pin ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 → 0.35): chaos items converge toward center
      tl.to(chaosItemRefs.current, {
        x: () => {
          const field = pinRef.current?.querySelector(".cto-field") as HTMLElement;
          const w = field?.offsetWidth ?? 600;
          return w / 2;
        },
        y: () => {
          const field = pinRef.current?.querySelector(".cto-field") as HTMLElement;
          const h = field?.offsetHeight ?? 400;
          return h / 2;
        },
        scale: 0.7,
        opacity: 0.6,
        rotation: 0,
        stagger: { each: 0.04, from: "random" },
        duration: 0.35,
        ease: "power2.inOut",
      }, 0);

      // Phase 2 (0.35 → 0.55): chaos items fade out + arrow appears
      tl.to(chaosItemRefs.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
      }, 0.35)
      .to(arrowRef.current, { opacity: 1, duration: 0.1 }, 0.4)
      .to(labelBeforeRef.current, { opacity: 0, y: -10, duration: 0.15 }, 0.38)
      .to(labelAfterRef.current, { opacity: 1, y: 0, duration: 0.2 }, 0.48);

      // Phase 3 (0.55 → 1): order cards appear
      tl.to(orderCardRefs.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.35,
        ease: "back.out(1.2)",
      }, 0.55);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cto-section">
      {/* Static header — outside the pinned area */}
      <div ref={headRef} className="cto-head container">
        <div className="accent-line" style={{ marginBottom: "1.25rem" }} />
        <h2 className="section-title cto-title">
          כאן מתחיל השינוי
        </h2>
        <p className="section-subtitle" style={{ marginTop: "0.75rem" }}>
          בגלילה תראו איך כלים מפוזרים הופכים לתהליך אחד מסודר.
        </p>
      </div>

      {/* Pinned visual area */}
      <div ref={pinRef} className="cto-pin">
        <div className="cto-field-wrap">
          {/* State labels */}
          <div ref={labelBeforeRef} className="cto-state-label cto-state-label--chaos">
            <span className="cto-dot cto-dot--red" />
            ככה מנהלים היום
          </div>
          <div
            ref={labelAfterRef}
            className="cto-state-label cto-state-label--order"
            style={{ opacity: 0 }}
          >
            <span className="cto-dot cto-dot--green" />
            ככה נראה עם SHC
          </div>

          {/* Transition arrow */}
          <div ref={arrowRef} className="cto-arrow" style={{ opacity: 0 }} aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
              <circle cx="20" cy="20" r="19" stroke="#00AFC6" strokeWidth="1.5"/>
              <path d="M24 20H16M20 15l-5 5 5 5" stroke="#00AFC6" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* The field */}
          <div className="cto-field">
            {/* Chaos items */}
            {CHAOS.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { chaosItemRefs.current[i] = el; }}
                className="cto-chaos-item"
                style={{
                  top: `${CHAOS_POSITIONS[i].y}%`,
                  left: `${CHAOS_POSITIONS[i].x}%`,
                  transform: `rotate(${CHAOS_POSITIONS[i].r}deg)`,
                  background: item.bg,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.icon}
                <span className="cto-chaos-label" style={{ color: item.color }}>{item.label}</span>
              </div>
            ))}

            {/* Order cards — 2x2 grid, centered */}
            <div className="cto-order-grid">
              {ORDER.map((sys, i) => (
                <div
                  key={sys.id}
                  ref={(el) => { orderCardRefs.current[i] = el; }}
                  className="cto-order-card"
                  style={{ "--c": sys.color, "--cb": sys.bg } as React.CSSProperties}
                >
                  <div className="cto-order-icon" style={{ background: sys.bg, color: sys.color }}>
                    {sys.icon}
                  </div>
                  <div className="cto-order-text">
                    <strong className="cto-order-name">{sys.name}</strong>
                    <span className="cto-order-desc">{sys.desc}</span>
                  </div>
                  <div className="cto-order-check" style={{ background: `${sys.color}18`, color: sys.color }}>
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint text */}
        <p className="cto-scroll-hint" aria-hidden="true">
          גללו למטה לראות את השינוי
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </p>
      </div>

      <style>{`
        .cto-section {
          background: #FFFFFF;
        }

        .cto-head {
          padding-block: 5rem 2.5rem;
        }

        .cto-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
        }

        /* ── Pinned area ── */
        .cto-pin {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-block: 2rem;
          position: relative;
        }

        .cto-field-wrap {
          position: relative;
          width: 100%;
          max-width: 820px;
          margin-inline: auto;
          padding-inline: 1.5rem;
        }

        /* State labels */
        .cto-state-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          transition: opacity 0.3s ease;
        }
        .cto-state-label--chaos {
          background: #FEF2F2;
          color: #DC2626;
          border: 1px solid #FECACA;
        }
        .cto-state-label--order {
          position: absolute;
          top: 0;
          right: 1.5rem;
          background: rgba(0,175,198,0.1);
          color: #0B7FD3;
          border: 1px solid rgba(0,175,198,0.25);
        }

        .cto-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cto-dot--red { background: #EF4444; }
        .cto-dot--green { background: #10B981; }

        /* Arrow */
        .cto-arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
        }

        /* Field */
        .cto-field {
          position: relative;
          width: 100%;
          height: 420px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 1.25rem;
          overflow: hidden;
        }

        /* Chaos items */
        .cto-chaos-item {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          padding: 0.875rem 0.75rem;
          border-radius: 0.875rem;
          border: 1.5px solid transparent;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          width: 92px;
          cursor: default;
          user-select: none;
          background: #FFFFFF;
          z-index: 10;
        }

        .cto-chaos-label {
          font-size: 0.62rem;
          font-weight: 600;
          text-align: center;
          line-height: 1.2;
        }

        /* Order cards grid */
        .cto-order-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1.5rem;
          align-items: center;
          z-index: 5;
        }

        .cto-order-card {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1.125rem 1.25rem;
          background: #FFFFFF;
          border-radius: 1rem;
          border: 1.5px solid rgba(0,0,0,0.06);
          box-shadow:
            0 4px 16px rgba(11,37,69,0.08),
            0 0 0 1px var(--c, #00AFC6) inset;
          border-inline-start: 3px solid var(--c, #00AFC6);
        }

        .cto-order-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cto-order-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }

        .cto-order-name {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0B2545;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cto-order-desc {
          font-size: 0.7rem;
          color: #718096;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cto-order-check {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Scroll hint */
        .cto-scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8rem;
          color: #A0AEC0;
          margin-top: 1.25rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .cto-pin {
            height: auto;
            padding-block: 2rem;
          }
          .cto-field {
            height: 500px;
          }
          .cto-chaos-item {
            width: 78px;
            padding: 0.625rem;
          }
          .cto-chaos-item svg {
            width: 20px; height: 20px;
          }
          .cto-order-grid {
            grid-template-columns: 1fr;
            gap: 0.625rem;
            padding: 1rem;
          }
          .cto-scroll-hint {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .cto-field { height: 560px; }
          .cto-order-card { padding: 0.75rem; }
          .cto-order-icon { width: 36px; height: 36px; }
          .cto-order-name { font-size: 0.78rem; }
        }
      `}</style>
    </section>
  );
}
