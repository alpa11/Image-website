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
