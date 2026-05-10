export interface SystemFeature {
  title: string;
  description: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface SystemData {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  painPoints: string[];
  features: SystemFeature[];
  benefits: string[];
  roles: string[];
  beforeAfter: BeforeAfter[];
  loginUrl: string | null;
  demoCtaText: string;
  priceText: string | null;
  showPricing: boolean;
  accentColor: string;
  accentBg: string;
  icon: string;
  mockupPlaceholder: string;
  isActive: boolean;
  comingSoon: boolean;
}

// TODO: Replace with Firestore fetch: getSystems() from db collection "systems"
export const systems: SystemData[] = [
  {
    id: "maintenance",
    slug: "maintenance",
    name: "מערכת תחזוקה",
    shortTitle: "תחזוקה",
    tagline: "כל תקלה מקבלת כתובת, אחראי וסטטוס.",
    heroTitle: "תקלות שמטופלות, לא שנשכחות",
    heroSubtitle: "פתיחת קריאה, שיוך לאב בית, מעקב סטטוס ותיעוד טיפול — בלי וואטסאפ ובלי הפתעות.",
    description: "מערכת לניהול קריאות תחזוקה למוסדות וסניפים. כל תקלה מקבלת מספר, אחראי וסטטוס מעודכן.",
    painPoints: [
      "תקלות שנשלחות בוואטסאפ ונעלמות",
      "אין מי שיודע מה סטטוס הטיפול",
      "אב הבית לא יכול לעדכן בקלות",
      "אין תיעוד היסטורי של טיפולים",
    ],
    features: [
      { title: "פתיחת קריאות", description: "פתיחה מהירה עם תיאור, תמונה ומיקום" },
      { title: "שיוך לאב בית", description: "כל קריאה מגיעה לאחראי הנכון אוטומטית" },
      { title: "סטטוסים בזמן אמת", description: "פתוח, בטיפול, נסגר — גלוי לכולם" },
      { title: "היסטוריית טיפול", description: "כל עדכון מתועד עם תאריך ומבצע" },
      { title: "קבצים ותמונות", description: "צרף תיעוד ויזואלי לכל קריאה" },
      { title: "IVR טלפוני", description: "פתיחת קריאה בטלפון למי שלא מחובר" },
      { title: "דשבורד ניהול", description: "תמונת מצב של כל הקריאות הפתוחות" },
    ],
    benefits: [
      "אפס תקלות שנופלות בין הכיסאות",
      "שקיפות מלאה לכל הגורמים",
      "קיצור זמן טיפול ממוצע",
      "תיעוד מלא לביקורות ודיווחים",
    ],
    roles: ["אב בית", "מנהל סניף", "הנהלה", "עובד דיווח"],
    beforeAfter: [
      { before: "הודעת וואטסאפ שנעלמת בקבוצה", after: "קריאה עם מספר, אחראי וסטטוס" },
      { before: "אין מי שיודע אם טיפלו", after: "היסטוריית טיפול מלאה" },
      { before: "מנהל צריך להתקשר כדי לדעת מה קורה", after: "דשבורד גלוי בכל רגע" },
    ],
    loginUrl: null, // TODO: Set when system is deployed - e.g. "https://maintenance.shc.co.il"
    demoCtaText: "לתיאום הדגמה",
    priceText: null,
    showPricing: false,
    accentColor: "#E8843A",
    accentBg: "#FFF5EE",
    icon: "wrench",
    mockupPlaceholder: "כאן תיכנס הדמיה של מסך הקריאות",
    isActive: true,
    comingSoon: false,
  },
  {
    id: "procurement",
    slug: "procurement",
    name: "מערכת רכש ותקציבים",
    shortTitle: "רכש",
    tagline: "בקשות רכש, תקציב, אישור וספקים — בתהליך אחד מסודר.",
    heroTitle: "כל שקל מתוקצב, כל רכישה מאושרת",
    heroSubtitle: "מסלולי אישור, ניהול תקציב, ספקים וחשבוניות — בלי אקסלים ובלי מיילים שמסתובבים.",
    description: "מערכת לניהול תהליך הרכש המוסדי: מבקשת הרכישה ועד קבלת החשבונית.",
    painPoints: [
      "בקשות רכש בוואטסאפ ובמייל בלי מעקב",
      "מי אישר? מתי? בכמה? אין תשובה",
      "תקציב לא מנוהל, חורגים בלי לדעת",
      "ספקים ותנאי תשלום מפוזרים בכל מקום",
    ],
    features: [
      { title: "בקשות רכש", description: "הגשה מסודרת עם פירוט, ספק וסכום" },
      { title: "מסלולי אישור", description: "אישור לפי היררכיה מוגדרת מראש" },
      { title: "ניהול תקציב", description: "מעקב אחר תקציב פעיל ויתרה" },
      { title: "ניהול ספקים", description: "כרטיס ספק עם אנשי קשר ותנאים" },
      { title: "חשבוניות", description: "צרף חשבונית ועדכן סטטוס תשלום" },
      { title: "הרשאות לפי ישות", description: "כל מוסד רואה רק את שלו" },
      { title: "התאמה לישראל", description: "מע\"מ, ספקים מקומיים, הפרדת תקציבים" },
    ],
    benefits: [
      "שקיפות מלאה על כל הוצאה",
      "אין רכישה בלי אישור",
      "מניעת חריגות תקציביות",
      "ביקורת פנימית קלה ומהירה",
    ],
    roles: ["רכזת רכש", "מנהל כספים", "מנהל מוסד", "הנהלה ארגונית"],
    beforeAfter: [
      { before: "בקשה בוואטסאפ שמחכה לאישור שלא מגיע", after: "בקשה עם מסלול אישור ברור" },
      { before: "לא יודעים כמה נשאר בתקציב", after: "יתרת תקציב גלויה בכל רגע" },
      { before: "חשבוניות שמחפשים בתיקיות מייל", after: "חשבוניות צמודות לבקשה" },
    ],
    loginUrl: null, // TODO: Set when system is deployed
    demoCtaText: "לתיאום הדגמה",
    priceText: null,
    showPricing: false,
    accentColor: "#2E9E6B",
    accentBg: "#F0FBF5",
    icon: "shopping-cart",
    mockupPlaceholder: "כאן תיכנס הדמיה של מסך הרכש",
    isActive: true,
    comingSoon: false,
  },
  {
    id: "salary-reports",
    slug: "salary-reports",
    name: "מערכת דיווחי שעות",
    shortTitle: "שעות",
    tagline: "דיווחי שעות, מסמכים ותכנון מול ביצוע במקום אחד.",
    heroTitle: "דיווח מוגש, מסמך מצורף, מנהל מאשר",
    heroSubtitle: "מערכת דיווח שעות שמבינה איך מוסדות חינוך עובדים — מסלולים, מסמכים ובקרה חודשית.",
    description: "מערכת לניהול דיווחי שעות עבודה, מסמכים נדרשים ותכנון מול ביצוע לעובדי חינוך.",
    painPoints: [
      "דיווחי שעות בטפסי נייר ואקסל",
      "מסמכים שחסרים ולא מגיעים בזמן",
      "אין בקרה על מי השלים ומי לא",
      "תכנון שעות שלא תואם לביצוע",
    ],
    features: [
      { title: "דיווחים חודשיים", description: "דיווח שעות מסודר לפי חודש ומסלול" },
      { title: "מורות ועובדים", description: "ניהול פרופיל עובד עם מסלול ותפקיד" },
      { title: "מסמכים נדרשים", description: "רשימת מסמכים לפי סוג עובד" },
      { title: "בקרת השלמות", description: "מי הגיש? מה חסר? גלוי אחד לאחד" },
      { title: "תכנון מסלולים", description: "תכנון שעות צפוי מול ביצוע בפועל" },
      { title: "הרשאות לפי תפקיד", description: "מנהל רואה הכל, עובד רואה שלו בלבד" },
      { title: "יצוא ודוחות", description: "ייצוא לאקסל ודוחות לשכר" },
    ],
    benefits: [
      "אפס מסמכים חסרים בסוף חודש",
      "חיסכון בשעות עבודה אדמינסטרטיביות",
      "דיוק בתשלום שכר",
      "מוכנות לביקורת תמידית",
    ],
    roles: ["מורה / עובד", "מנהל מוסד", "רכזת משאבי אנוש", "חשבות"],
    beforeAfter: [
      { before: "טפסי נייר שמגיעים מאוחר או לא מגיעים", after: "דיווח דיגיטלי עם תזכורות אוטומטיות" },
      { before: "בקרה ידנית על מי השלים", after: "לוח בקרה עם סטטוס לכל עובד" },
      { before: "טעויות בחישוב שכר", after: "נתונים מדויקים מוכנים לחשבות" },
    ],
    loginUrl: null, // TODO: Set when system is deployed
    demoCtaText: "לתיאום הדגמה",
    priceText: null,
    showPricing: false,
    accentColor: "#4A6FD4",
    accentBg: "#EEF2FF",
    icon: "clock",
    mockupPlaceholder: "כאן תיכנס הדמיה של מסך הדיווחים",
    isActive: true,
    comingSoon: false,
  },
  {
    id: "tasks",
    slug: "tasks",
    name: "מערכת משימות ומטלות",
    shortTitle: "משימות",
    tagline: "משימות, אחריות והתקדמות — בלי שדברים נופלים בין הכיסאות.",
    heroTitle: "כל משימה יודעת מי אחראי עליה",
    heroSubtitle: "מרחבי עבודה, קנבן, לוח שנה ואוטומציות — כל צוות יודע מה צריך לעשות ומתי.",
    description: "מערכת ניהול משימות לצוותים ומוסדות: מרחבים, תתי-משימות, תצוגות ואוטומציות.",
    painPoints: [
      "משימות שנשלחות בוואטסאפ ונשכחות",
      "אין אחריות ברורה — כולם חשבו שמישהו אחר עושה",
      "אין מעקב התקדמות בזמן אמת",
      "תאריכי יעד שעוברים בלי שמישהו שם לב",
    ],
    features: [
      { title: "מרחבי עבודה", description: "ארגון לפי פרויקט, צוות או מחלקה" },
      { title: "משימות ותתי-משימות", description: "פירוק לצעדים ברורים עם בעלים" },
      { title: "שיוך אחראים", description: "כל משימה עם בעל ותאריך יעד" },
      { title: "קנבן ולוח שנה", description: "תצוגת זרימה, רשימה ולוח — בבחירה" },
      { title: "תצוגות שמורות", description: "כל אחד רואה את מה שרלוונטי לו" },
      { title: "התראות חכמות", description: "תזכורת לפני deadline, עדכון בשינוי" },
      { title: "אוטומציות", description: "כשמשימה נסגרת, פעולה קורה אוטומטית" },
    ],
    benefits: [
      "אפס משימות שנשכחות",
      "אחריות ברורה בכל רגע",
      "ראיית מצב אמת של הצוות",
      "פחות פגישות סטטוס, יותר עבודה",
    ],
    roles: ["מנהל צוות", "עובד", "מנהל מוסד", "מנהל פרויקט"],
    beforeAfter: [
      { before: "משימה שנשלחה בוואטסאפ ונשכחה", after: "משימה עם בעל, תאריך ותזכורת" },
      { before: "לא יודעים מי עובד על מה", after: "לוח קנבן שמראה הכל בשניה" },
      { before: "פגישה שבועית רק כדי לעדכן סטטוסים", after: "כולם מעודכנים בזמן אמת" },
    ],
    loginUrl: null, // TODO: Set when system is deployed
    demoCtaText: "לתיאום הדגמה",
    priceText: null,
    showPricing: false,
    accentColor: "#7C5CBF",
    accentBg: "#F3F0FF",
    icon: "check-square",
    mockupPlaceholder: "כאן תיכנס הדמיה של לוח הקנבן",
    isActive: true,
    comingSoon: false,
  },
];
