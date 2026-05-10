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
