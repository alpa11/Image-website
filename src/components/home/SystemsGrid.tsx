import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SystemData } from "../../data/systems";

gsap.registerPlugin(ScrollTrigger);

// ─── Mini Mockups — one per system (pure JSX/CSS, no images) ─

function MaintenanceMockup() {
  const rows = [
    { id: "#2341", desc: "מזגן קומה 3", status: "בטיפול", dot: "#F59E0B", user: "א" },
    { id: "#2340", desc: "ברז נזילה", status: "פתוח", dot: "#EF4444", user: "מ" },
    { id: "#2339", desc: "תאורה שרפה", status: "נסגר", dot: "#10B981", user: "ד" },
  ];
  return (
    <div className="mm-wrap">
      <div className="mm-header">
        <span className="mm-label" style={{ color: "#E8843A" }}>קריאות פתוחות</span>
        <span className="mm-badge" style={{ background: "#FFF5EE", color: "#E8843A" }}>12 פעילות</span>
      </div>
      <div className="mm-stat-row">
        <div className="mm-mini-stat" style={{ "--mc": "#E8843A" } as React.CSSProperties}>
          <strong>12</strong><span>פתוחות</span>
        </div>
        <div className="mm-mini-stat" style={{ "--mc": "#F59E0B" } as React.CSSProperties}>
          <strong>5</strong><span>בטיפול</span>
        </div>
        <div className="mm-mini-stat" style={{ "--mc": "#10B981" } as React.CSSProperties}>
          <strong>47</strong><span>נסגרו</span>
        </div>
      </div>
      <div className="mm-table">
        {rows.map(r => (
          <div key={r.id} className="mm-row">
            <span className="mm-row-id">{r.id}</span>
            <span className="mm-row-txt">{r.desc}</span>
            <span className="mm-row-status">
              <span className="mm-dot" style={{ background: r.dot }} />
              {r.status}
            </span>
            <span className="mm-avatar" style={{ background: `${r.dot}22`, color: r.dot }}>{r.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcurementMockup() {
  return (
    <div className="mm-wrap">
      <div className="mm-header">
        <span className="mm-label" style={{ color: "#2E9E6B" }}>תקציב רבעוני</span>
        <span className="mm-badge" style={{ background: "#F0FBF5", color: "#2E9E6B" }}>Q1 2025</span>
      </div>
      <div className="mm-budget-bar">
        <div className="mm-budget-meta">
          <span className="mm-budget-label">ניצול תקציב</span>
          <span className="mm-budget-pct" style={{ color: "#2E9E6B" }}>68%</span>
        </div>
        <div className="mm-bar-track">
          <div className="mm-bar-fill" style={{ width: "68%", background: "#2E9E6B" }} />
        </div>
        <div className="mm-budget-nums">
          <span style={{ color: "#4A5568" }}>₪ 57,120 נוצלו</span>
          <span style={{ color: "#A0AEC0" }}>מתוך ₪ 84,000</span>
        </div>
      </div>
      <div className="mm-table" style={{ marginTop: "0.5rem" }}>
        {[
          { desc: "ציוד משרדי", amount: "₪ 2,400", status: "אושר", dot: "#10B981" },
          { desc: "ריהוט כיתה", amount: "₪ 8,200", status: "ממתין", dot: "#F59E0B" },
          { desc: "תיקון מערכת", amount: "₪ 1,850", status: "אושר", dot: "#10B981" },
        ].map(r => (
          <div key={r.desc} className="mm-row">
            <span className="mm-row-txt" style={{ flex: 1 }}>{r.desc}</span>
            <span className="mm-row-amount">{r.amount}</span>
            <span className="mm-row-status">
              <span className="mm-dot" style={{ background: r.dot }} />
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalaryMockup() {
  const employees = [
    { name: "שרה כהן", submitted: true },
    { name: "דוד לוי", submitted: true },
    { name: "מיכל גרין", submitted: false },
    { name: "אמיר בן", submitted: true },
    { name: "רינה שרון", submitted: false },
  ];
  const submitted = employees.filter(e => e.submitted).length;
  const pct = Math.round((submitted / employees.length) * 100);

  return (
    <div className="mm-wrap">
      <div className="mm-header">
        <span className="mm-label" style={{ color: "#4A6FD4" }}>דיווחי ינואר 2025</span>
        <span className="mm-badge" style={{ background: "#EEF2FF", color: "#4A6FD4" }}>{submitted}/{employees.length} הגישו</span>
      </div>
      <div className="mm-budget-bar" style={{ marginBottom: "0.625rem" }}>
        <div className="mm-budget-meta">
          <span className="mm-budget-label">השלמת דיווחים</span>
          <span className="mm-budget-pct" style={{ color: "#4A6FD4" }}>{pct}%</span>
        </div>
        <div className="mm-bar-track">
          <div className="mm-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#4A6FD4,#7C5CBF)" }} />
        </div>
      </div>
      <div className="mm-table">
        {employees.map(e => (
          <div key={e.name} className="mm-row">
            <span className="mm-avatar" style={{ background: e.submitted ? "#EEF2FF" : "#FEF2F2", color: e.submitted ? "#4A6FD4" : "#DC2626" }}>
              {e.name[0]}
            </span>
            <span className="mm-row-txt">{e.name}</span>
            <span className="mm-row-status">
              {e.submitted ? (
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <circle cx="8" cy="8" r="7" fill="#DCFCE7"/><path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <circle cx="8" cy="8" r="7" fill="#FEE2E2"/><path d="M10 6L6 10M6 6l4 4" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              <span style={{ color: e.submitted ? "#10B981" : "#EF4444" }}>
                {e.submitted ? "הוגש" : "חסר"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksMockup() {
  const cols = [
    { title: "לביצוע", color: "#E2E8F0", tasks: ["עדכן מסמך", "שלח דוח"], count: 4 },
    { title: "בתהליך", color: "#FEF3C7", tasks: ["פגישת צוות", "סקירת קוד"], count: 2 },
    { title: "הושלם", color: "#DCFCE7", tasks: ["אישור תקציב"], count: 7 },
  ];
  return (
    <div className="mm-wrap">
      <div className="mm-header">
        <span className="mm-label" style={{ color: "#7C5CBF" }}>לוח משימות</span>
        <span className="mm-badge" style={{ background: "#F3F0FF", color: "#7C5CBF" }}>13 פעילות</span>
      </div>
      <div className="mm-kanban">
        {cols.map(col => (
          <div key={col.title} className="mm-kanban-col">
            <div className="mm-kanban-head" style={{ background: col.color }}>
              <span>{col.title}</span>
              <span className="mm-kanban-count">{col.count}</span>
            </div>
            {col.tasks.map(t => (
              <div key={t} className="mm-kanban-task">
                <div className="mm-task-dot" style={{ background: "#7C5CBF" }} />
                <span>{t}</span>
              </div>
            ))}
            <div className="mm-kanban-more" style={{ color: "#A0AEC0" }}>
              +{col.count - col.tasks.length} נוספות
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, React.ReactNode> = {
  maintenance: <MaintenanceMockup />,
  procurement: <ProcurementMockup />,
  "salary-reports": <SalaryMockup />,
  tasks: <TasksMockup />,
};

function SystemIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="26" height="26"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    "shopping-cart": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="26" height="26"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="26" height="26"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    "check-square": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="26" height="26"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  };
  return <>{icons[id]}</>;
}

interface SystemsGridProps {
  systems: SystemData[];
}

export default function SystemsGrid({ systems }: SystemsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".sg-header", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".sg-header", start: "top 80%" },
      });

      gsap.from(".sg-card", {
        opacity: 0, y: 50, stagger: 0.13, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".sg-grid", start: "top 80%" },
      });

      gsap.from(".sg-cta-strip", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".sg-cta-strip", start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="systems" ref={sectionRef} className="sg-section">
      {/* Section bg decoration */}
      <div className="sg-bg" aria-hidden="true">
        <div className="sg-bg-shape" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="sg-header">
          <div className="sg-eyebrow">
            <div className="sg-eyebrow-line" />
            <span>המערכות שלנו</span>
            <div className="sg-eyebrow-line" />
          </div>
          <h2 className="sg-title">
            ארבע מערכות.
            <br />
            <span className="gradient-text">תהליך אחד ברור.</span>
          </h2>
          <p className="sg-subtitle">
            כל מערכת פותרת בעיה ספציפית. כולן נבנות לפי הצרכים האמיתיים של המוסד שלכם.
          </p>
        </div>

        {/* Cards grid */}
        <div className="sg-grid">
          {systems.map((sys) => (
            <div
              key={sys.id}
              className="sg-card"
              style={{ "--accent": sys.accentColor, "--accent-bg": sys.accentBg } as React.CSSProperties}
            >
              {/* Card header */}
              <div className="sg-card-top">
                <div className="sg-card-icon-wrap" style={{ background: sys.accentBg, color: sys.accentColor }}>
                  <SystemIcon id={sys.icon} />
                </div>
                <div className="sg-card-meta">
                  <h3 className="sg-card-name">{sys.name}</h3>
                  <p className="sg-card-tagline">{sys.tagline}</p>
                </div>
                <div className="sg-card-accent-dot" style={{ background: sys.accentColor }} />
              </div>

              {/* Mini mockup */}
              <div className="sg-mockup">
                <div className="sg-mockup-chrome" style={{ background: sys.accentColor }}>
                  <span className="sg-mockup-title">{sys.shortTitle}</span>
                  <div className="sg-mockup-dots">
                    <span /><span /><span />
                  </div>
                </div>
                <div className="sg-mockup-body">
                  {MOCKUPS[sys.id] ?? (
                    <div className="sg-mockup-placeholder">
                      <p style={{ fontSize: "0.75rem", color: "#A0AEC0", textAlign: "center" }}>
                        כאן תיכנס תצוגה מקדימה
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card footer */}
              <div className="sg-card-footer">
                {sys.loginUrl ? (
                  <a
                    href={sys.loginUrl}
                    className="sg-card-link"
                    style={{ color: sys.accentColor }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    כניסה למערכת
                    <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                      <path d="M10 7H4M7 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </a>
                ) : (
                  <span className="sg-card-cta" style={{ color: "#718096" }}>
                    לפרטים — צרו קשר
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="sg-cta-strip">
          <p className="sg-cta-text">
            לא מצאתם מה שאתם צריכים?
            <strong> אנחנו בונים מערכות מותאמות אישית.</strong>
          </p>
          <a href="#contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "0.75rem 1.5rem" }}>
            נבנה אותה יחד
          </a>
        </div>
      </div>

      {/* ── Shared mini-mockup styles ── */}
      <style>{`
        .sg-section {
          position: relative;
          padding-block: 6rem;
          background: #0B2545;
          overflow: hidden;
        }

        .sg-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .sg-bg-shape {
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,175,198,0.08) 0%, transparent 65%);
          filter: blur(40px);
        }

        /* Header */
        .sg-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .sg-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .sg-eyebrow-line {
          height: 1px;
          width: 40px;
          background: rgba(0,175,198,0.4);
        }
        .sg-eyebrow span {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00AFC6;
        }
        .sg-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
        }
        .sg-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.55);
          max-width: 50ch;
          margin-inline: auto;
          line-height: 1.7;
        }

        /* Grid */
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        /* Card */
        .sg-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .sg-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: var(--accent, rgba(0,175,198,0.4));
          transform: translateY(-4px);
        }

        .sg-card-top {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem 1.5rem 1rem;
        }
        .sg-card-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0.95;
        }
        .sg-card-meta {
          flex: 1;
          min-width: 0;
        }
        .sg-card-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }
        .sg-card-tagline {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }
        .sg-card-accent-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
          opacity: 0.8;
        }

        /* Mockup container */
        .sg-mockup {
          margin: 0 1.5rem;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          flex: 1;
        }
        .sg-mockup-chrome {
          height: 30px;
          display: flex;
          align-items: center;
          padding-inline: 0.875rem;
          justify-content: space-between;
        }
        .sg-mockup-title {
          font-size: 0.62rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.05em;
        }
        .sg-mockup-dots {
          display: flex;
          gap: 4px;
        }
        .sg-mockup-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
        }
        .sg-mockup-body {
          background: #FFFFFF;
          padding: 0;
          min-height: 190px;
        }
        .sg-mockup-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 190px;
        }

        /* Card footer */
        .sg-card-footer {
          padding: 1rem 1.5rem 1.25rem;
          display: flex;
          align-items: center;
        }
        .sg-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.83rem;
          font-weight: 700;
          text-decoration: none;
          flex-direction: row-reverse;
          transition: opacity 0.15s;
        }
        .sg-card-link:hover { opacity: 0.75; }
        .sg-card-cta {
          font-size: 0.78rem;
          font-weight: 500;
        }

        /* Bottom strip */
        .sg-cta-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
        }
        .sg-cta-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.65);
        }
        .sg-cta-text strong {
          color: #FFFFFF;
          font-weight: 700;
        }

        /* ── Mini mockup shared styles ── */
        .mm-wrap {
          padding: 0.875rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .mm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.125rem;
        }
        .mm-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .mm-badge {
          font-size: 0.58rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }
        .mm-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.375rem;
        }
        .mm-mini-stat {
          padding: 0.4rem 0.5rem;
          background: #F8FAFC;
          border-radius: 0.375rem;
          border-top: 2px solid var(--mc, #00AFC6);
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .mm-mini-stat strong {
          font-size: 0.9rem;
          font-weight: 800;
          color: #0B2545;
          line-height: 1;
        }
        .mm-mini-stat span {
          font-size: 0.55rem;
          color: #718096;
        }
        .mm-table {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .mm-row {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.3rem 0.375rem;
          border-radius: 0.3rem;
          background: #FAFBFC;
          font-size: 0.62rem;
        }
        .mm-row:hover { background: #F0F4F8; }
        .mm-row-id {
          color: #00AFC6;
          font-weight: 700;
          min-width: 32px;
          font-size: 0.58rem;
        }
        .mm-row-txt {
          color: #4A5568;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mm-row-status {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #718096;
          white-space: nowrap;
          font-size: 0.6rem;
        }
        .mm-row-amount {
          color: #0B2545;
          font-weight: 700;
          font-size: 0.65rem;
          margin-inline-end: 0.375rem;
        }
        .mm-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .mm-avatar {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        /* Budget bar */
        .mm-budget-bar { display: flex; flex-direction: column; gap: 0.3rem; }
        .mm-budget-meta { display: flex; justify-content: space-between; }
        .mm-budget-label { font-size: 0.62rem; color: #718096; }
        .mm-budget-pct { font-size: 0.62rem; font-weight: 700; }
        .mm-budget-nums { display: flex; justify-content: space-between; font-size: 0.58rem; }
        .mm-bar-track { height: 6px; background: #E2E8F0; border-radius: 9999px; overflow: hidden; }
        .mm-bar-fill { height: 100%; border-radius: 9999px; transition: width 0.6s ease; }
        /* Kanban */
        .mm-kanban { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.375rem; }
        .mm-kanban-col { display: flex; flex-direction: column; gap: 0.25rem; }
        .mm-kanban-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.25rem 0.375rem;
          border-radius: 0.3rem;
          font-size: 0.58rem;
          font-weight: 700;
          color: #4A5568;
        }
        .mm-kanban-count {
          background: rgba(0,0,0,0.08);
          border-radius: 9999px;
          padding: 0 0.3rem;
          font-size: 0.55rem;
        }
        .mm-kanban-task {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.3rem 0.375rem;
          background: #FAFBFC;
          border-radius: 0.3rem;
          border: 1px solid #E2E8F0;
          font-size: 0.58rem;
          color: #4A5568;
        }
        .mm-task-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .mm-kanban-more {
          font-size: 0.55rem;
          text-align: center;
          padding: 0.15rem;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sg-grid { grid-template-columns: 1fr; }
          .sg-cta-strip { flex-direction: column; text-align: center; }
        }
        @media (max-width: 540px) {
          .sg-title { font-size: 1.85rem; }
          .sg-card-top { padding: 1.25rem 1.25rem 0.875rem; }
          .sg-mockup { margin: 0 1.25rem; }
          .sg-card-footer { padding: 0.875rem 1.25rem 1.125rem; }
        }
      `}</style>
    </section>
  );
}
