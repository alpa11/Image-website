import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Chaos items: tools people use before the system
const chaosItems = [
  { id: "whatsapp", label: "וואטסאפ", color: "#25D366", x: "8%", y: "15%", rotate: -15 },
  { id: "excel", label: "אקסל", color: "#217346", x: "72%", y: "8%", rotate: 12 },
  { id: "phone", label: "שיחות טלפון", color: "#6B7280", x: "25%", y: "65%", rotate: -8 },
  { id: "email", label: "מייל", color: "#EA4335", x: "62%", y: "58%", rotate: 18 },
  { id: "note", label: "פתקים", color: "#F59E0B", x: "45%", y: "20%", rotate: -20 },
  { id: "folder", label: "תיקיות", color: "#8B5CF6", x: "15%", y: "40%", rotate: 10 },
  { id: "calendar", label: "לוח שנה ידני", color: "#3B82F6", x: "78%", y: "38%", rotate: -5 },
];

// Order items: the 4 systems
const orderItems = [
  {
    id: "maintenance",
    label: "תחזוקה",
    color: "#E8843A",
    bg: "#FFF5EE",
    icon: "wrench",
  },
  {
    id: "procurement",
    label: "רכש",
    color: "#2E9E6B",
    bg: "#F0FBF5",
    icon: "cart",
  },
  {
    id: "salary",
    label: "שעות",
    color: "#4A6FD4",
    bg: "#EEF2FF",
    icon: "clock",
  },
  {
    id: "tasks",
    label: "משימות",
    color: "#7C5CBF",
    bg: "#F3F0FF",
    icon: "check",
  },
];

function ChaosIcon({ id, label, color }: { id: string; label: string; color: string }) {
  const icons: Record<string, JSX.Element> = {
    whatsapp: (
      <svg viewBox="0 0 24 24" fill={color} width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    excel: (
      <svg viewBox="0 0 24 24" fill={color} width="28" height="28">
        <path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12 9.93 8.72H8.13L7 10.87 5.87 8.72H4.1L6 12 4.07 15.28H5.86M14 19.5V17H9V19.5M14 13.5V10.5H9V13.5M14 9.5V7H9V9.5M21 19.5V17H15V19.5M21 13.5V10.5H15V13.5M21 9.5V7H15V9.5Z"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width="28" height="28">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width="28" height="28">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill={color} width="28" height="28">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h7v2H7v-2z"/>
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width="28" height="28">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width="28" height="28">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  };

  return icons[id] ?? null;
}

function SystemIcon({ id }: { id: string }) {
  const icons: Record<string, JSX.Element> = {
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="28" height="28">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  };
  return icons[id] ?? null;
}

export default function ChaosToOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Section title entrance
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Chaos items: float in randomly, then on scroll→ fly to their order card
      gsap.from(itemRefs.current, {
        opacity: 0,
        scale: 0.5,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: chaosRef.current,
          start: "top 80%",
        },
      });

      // Chaotic idle float animation
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `${Math.sin(i) * 12}px`,
          x: `${Math.cos(i) * 6}px`,
          rotation: `${Math.sin(i + 1) * 5}`,
          duration: 2 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });

      // Order cards entrance
      gsap.from(".order-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: orderRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="chaos-section">
      <div className="container">
        {/* Label */}
        <div ref={labelRef} className="chaos-label">
          <div className="accent-line" style={{ marginBottom: "1.25rem" }} />
          <h2 className="section-title chaos-title">
            מכאוס תפעולי<br />
            <span className="gradient-text">למערכת מסודרת</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            רוב המוסדות מנהלים תהליכים קריטיים דרך וואטסאפ, אקסל ושיחות טלפון.
            אנחנו בונים מערכת שמחליפה את הכאוס הזה בתהליך אחד ברור.
          </p>
        </div>

        {/* Two panels */}
        <div className="chaos-panels">
          {/* BEFORE: Chaos */}
          <div className="chaos-panel chaos-panel--before">
            <div className="chaos-panel-header">
              <span className="chaos-panel-label chaos-panel-label--bad">לפני</span>
              <h3 className="chaos-panel-title">איך מנהלים היום</h3>
            </div>

            <div ref={chaosRef} className="chaos-field">
              {chaosItems.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="chaos-item"
                  style={{
                    top: item.y,
                    left: item.x,
                    transform: `rotate(${item.rotate}deg)`,
                  }}
                >
                  <ChaosIcon id={item.id} label={item.label} color={item.color} />
                  <span className="chaos-item-label">{item.label}</span>
                </div>
              ))}
              {/* Noise overlay */}
              <div className="chaos-noise" aria-hidden="true" />
            </div>
          </div>

          {/* Arrow */}
          <div className="chaos-arrow" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
              <circle cx="24" cy="24" r="23" stroke="#E2E8F0" strokeWidth="1.5"/>
              <path d="M30 24H18M24 18l-6 6 6 6" stroke="#00AFC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* AFTER: Order */}
          <div className="chaos-panel chaos-panel--after">
            <div className="chaos-panel-header">
              <span className="chaos-panel-label chaos-panel-label--good">אחרי</span>
              <h3 className="chaos-panel-title">איך זה נראה עם SHC</h3>
            </div>

            <div ref={orderRef} className="order-field">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="order-card card"
                  style={{ "--accent": item.color, "--accent-bg": item.bg } as React.CSSProperties}
                >
                  <div className="order-card-icon" style={{ background: item.bg, color: item.color }}>
                    <SystemIcon id={item.icon} />
                  </div>
                  <div>
                    <p className="order-card-name">{item.label}</p>
                    <p className="order-card-sub">מסודר. מנוהל. שקוף.</p>
                  </div>
                  <div className="order-card-dot" style={{ background: item.color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chaos-section {
          padding-block: 6rem;
          background: #FFFFFF;
          overflow: hidden;
        }

        .chaos-label {
          max-width: 560px;
          margin-bottom: 4rem;
        }

        .chaos-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
        }

        .chaos-panels {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: start;
        }

        .chaos-panel {
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid #E2E8F0;
        }

        .chaos-panel--before {
          background: #FAFAFA;
        }

        .chaos-panel--after {
          background: #F7FBFC;
        }

        .chaos-panel-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chaos-panel-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
        }

        .chaos-panel-label--bad {
          background: #FEE2E2;
          color: #DC2626;
        }

        .chaos-panel-label--good {
          background: rgba(0, 175, 198, 0.12);
          color: #0B7FD3;
        }

        .chaos-panel-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #4A5568;
        }

        .chaos-field {
          position: relative;
          height: 320px;
        }

        .chaos-item {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          padding: 0.75rem;
          background: #FFFFFF;
          border-radius: 0.75rem;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          cursor: default;
          user-select: none;
          width: 90px;
        }

        .chaos-item-label {
          font-size: 0.65rem;
          font-weight: 500;
          color: #6B7280;
          text-align: center;
          line-height: 1.2;
        }

        .chaos-noise {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(0,0,0,0.012) 40px,
            rgba(0,0,0,0.012) 80px
          );
          pointer-events: none;
        }

        .chaos-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 8rem;
          flex-shrink: 0;
        }

        .order-field {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.25rem;
        }

        .order-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .order-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .order-card-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0B2545;
        }

        .order-card-sub {
          font-size: 0.75rem;
          color: #718096;
          margin-top: 0.125rem;
        }

        .order-card-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: auto;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .chaos-panels {
            grid-template-columns: 1fr;
          }
          .chaos-arrow {
            transform: rotate(90deg);
            padding-top: 0;
          }
          .chaos-field {
            height: 280px;
          }
        }

        @media (max-width: 540px) {
          .chaos-item {
            width: 72px;
            padding: 0.5rem;
          }
          .chaos-item svg {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </section>
  );
}
