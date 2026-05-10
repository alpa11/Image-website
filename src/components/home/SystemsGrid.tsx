import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SystemData } from "../../data/systems";

gsap.registerPlugin(ScrollTrigger);

function SystemIcon({ id, size = 28 }: { id: string; size?: number }) {
  const s = size;
  const icons: Record<string, JSX.Element> = {
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width={s} height={s}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    "shopping-cart": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width={s} height={s}>
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width={s} height={s}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    "check-square": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width={s} height={s}>
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  };
  return icons[id] ?? null;
}

interface SystemsGridProps {
  systems: SystemData[];
}

export default function SystemsGrid({ systems }: SystemsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      gsap.from(".sys-card", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="systems" ref={sectionRef} className="systems-section">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className="systems-head">
          <div className="accent-line" style={{ marginBottom: "1.25rem" }} />
          <h2 className="section-title">
            ארבע מערכות. תהליך אחד ברור.
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem", maxWidth: "52ch" }}>
            כל מערכת פותרת בעיה ספציפית. כולן נבנות לפי הצרכים האמיתיים של המוסד שלכם.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="systems-grid">
          {systems.map((sys) => (
            <div
              key={sys.id}
              className="sys-card card"
              style={{ "--accent": sys.accentColor, "--accent-bg": sys.accentBg } as React.CSSProperties}
            >
              {/* Top accent bar */}
              <div className="sys-card-bar" style={{ background: sys.accentColor }} />

              {/* Icon */}
              <div
                className="sys-card-icon"
                style={{ background: sys.accentBg, color: sys.accentColor }}
              >
                <SystemIcon id={sys.icon} size={30} />
              </div>

              {/* Content */}
              <div className="sys-card-body">
                <h3 className="sys-card-name">{sys.name}</h3>
                <p className="sys-card-tagline">{sys.tagline}</p>

                {/* Features list */}
                <ul className="sys-card-features">
                  {sys.features.slice(0, 4).map((f) => (
                    <li key={f.title} className="sys-card-feature">
                      <span
                        className="sys-card-feature-dot"
                        style={{ background: sys.accentColor }}
                      />
                      {f.title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="sys-card-footer">
                {sys.loginUrl ? (
                  <a
                    href={sys.loginUrl}
                    className="sys-card-btn"
                    style={{ color: sys.accentColor, borderColor: sys.accentColor }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    כניסה למערכת
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                      <path d="M11 8H5M8 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                ) : (
                  <span className="sys-card-coming">
                    <span className="sys-card-coming-dot" style={{ background: sys.accentColor }} />
                    {sys.comingSoon ? "בקרוב" : "לפרטים נוספים — צרו קשר"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="systems-cta">
          <p className="systems-cta-text">
            צריכים מערכת שלא מופיעה כאן?
          </p>
          <a href="#contact" className="btn-primary">
            נבנה אותה יחד
          </a>
        </div>
      </div>

      <style>{`
        .systems-section {
          padding-block: 6rem;
          background: #F4F6F8;
        }

        .systems-head {
          margin-bottom: 3rem;
        }

        .systems-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .sys-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .sys-card:hover {
          box-shadow: 0 16px 48px rgba(11, 37, 69, 0.12);
          transform: translateY(-4px);
        }

        .sys-card-bar {
          height: 4px;
          width: 100%;
        }

        .sys-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.75rem 1.75rem 0;
          flex-shrink: 0;
        }

        .sys-card-body {
          padding: 1.25rem 1.75rem;
          flex: 1;
        }

        .sys-card-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0B2545;
          margin-bottom: 0.375rem;
        }

        .sys-card-tagline {
          font-size: 0.875rem;
          color: #4A5568;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .sys-card-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sys-card-feature {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.85rem;
          color: #4A5568;
          font-weight: 500;
        }

        .sys-card-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .sys-card-footer {
          padding: 1rem 1.75rem 1.5rem;
          border-top: 1px solid #F0F4F8;
          margin-top: 1rem;
          display: flex;
          align-items: center;
        }

        .sys-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border: 1.5px solid;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: background 0.15s ease;
          flex-direction: row-reverse;
        }

        .sys-card-btn:hover {
          background: rgba(0,0,0,0.04);
        }

        .sys-card-coming {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #718096;
          font-weight: 500;
        }

        .sys-card-coming-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          opacity: 0.6;
        }

        .systems-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid #E2E8F0;
        }

        .systems-cta-text {
          font-size: 1rem;
          font-weight: 500;
          color: #4A5568;
        }

        @media (max-width: 720px) {
          .systems-grid {
            grid-template-columns: 1fr;
          }
          .systems-cta {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
