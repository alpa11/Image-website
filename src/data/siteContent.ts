// TODO: Replace with Firestore fetch from collection "siteContent" document "global"

export const siteContent = {
  brand: {
    name: "SHC",
    tagline: "מערכות ניהול שמכניסות סדר למוסדות",
    logoPath: "/logo/shc-logo.svg",
  },

  hero: {
    title: "מערכות ניהול שמכניסות סדר למוסדות",
    subtitle: "SHC בונה מערכות מותאמות שמחליפות וואטסאפ, אקסלים, טלפונים וניהול ידני — בתהליכים ברורים, שקופים ומבוקרים.",
    ctaPrimary: "לתיאום שיחת אפיון",
    ctaSecondary: "צפייה במערכות",
    ctaPrimaryUrl: "#contact",
    ctaSecondaryUrl: "#systems",
  },

  about: {
    title: "אנחנו לא בונים תוכנה — אנחנו בונים סדר",
    body: "SHC מתמחה במערכות ניהול מותאמות למוסדות חינוך, ארגונים ועמותות. אנחנו מבינים שכל מוסד עובד אחרת, ולכן לא מכריחים אתכם להתאים את עצמכם לתבנית. אנחנו בונים את המערכת סביב התהליך שלכם.",
    values: [
      { title: "מותאם אישית", body: "לא template. כל מערכת בנויה לפי הצרכים האמיתיים של המוסד." },
      { title: "פשוט לשימוש", body: "מערכת שאנשים משתמשים בה — לא מחסן שנפתח פעם בשנה." },
      { title: "ליווי מתמשך", body: "לא נעלמים אחרי הקמה. משפרים, מסייעים ומתפתחים יחד." },
    ],
  },

  process: {
    title: "כך אנחנו עובדים",
    subtitle: "לא מתחילים לכתוב קוד לפני שהבנו איך המוסד שלכם עובד.",
    steps: [
      { number: "01", title: "שיחת אפיון", body: "מבינים את הארגון, הצרכים והכאבים האמיתיים." },
      { number: "02", title: "מיפוי תהליכים", body: "מזהים איפה יש כאוס ואיפה יש פוטנציאל לשיפור." },
      { number: "03", title: "UX/UI ואבטיפוס", body: "בונים מסכים אמיתיים לפני שורת קוד אחת." },
      { number: "04", title: "פיתוח", body: "בונים מערכת מדויקת ומותאמת לפי האפיון." },
      { number: "05", title: "הטמעה וליווי", body: "מלווים את ההטמעה ומשפרים לפי שימוש אמיתי." },
    ],
  },

  contact: {
    title: "מוכנים להפסיק לנהל בוואטסאפ?",
    subtitle: "שאלו אותנו שאלה, ספרו לנו על הכאב שלכם, או פשוט קבעו שיחת היכרות.",
    email: null, // TODO: Add real email - e.g. "info@shc.co.il"
    phone: null, // TODO: Add real phone number
    whatsapp: null, // TODO: Add WhatsApp link
  },

  footer: {
    tagline: "מכאוס תפעולי למערכת מסודרת.",
    links: [
      { label: "בית", href: "/" },
      { label: "מערכות", href: "#systems" },
      { label: "תהליך עבודה", href: "#process" },
      { label: "יצירת קשר", href: "#contact" },
    ],
    copyright: `© ${new Date().getFullYear()} SHC. כל הזכויות שמורות.`,
  },
};
