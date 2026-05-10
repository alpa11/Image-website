// TODO: Replace with Firestore fetch from collection "siteContent" document "global"

export const siteContent = {
  meta: {
    title: "SHC — מערכות לארגונים ומוסדות",
    description: "SHC בונה מערכות ניהול מותאמות אישית לארגונים ומוסדות — תחזוקה, רכש, שעות ומשימות.",
  },

  brand: {
    name: "SHC",
    tagline: "מערכות לארגונים ומוסדות",
    logoPath: "/logo/LOGOSHC.PNG",
  },

  hero: {
    title: 'תהליכים מבולגנים.<br><span style="color:oklch(50% 0.17 224)">מערכת שעובדת.</span>',
    subtitle: "SHC לוקחת את הכאוס הניהולי של המוסד שלכם ובונה ממנו תשתית דיגיטלית מדויקת — לכל מחלקה, לכל תפקיד, לכל תהליך.",
    ctaPrimary: "ראה את הטרנספורמציה ↓",
    ctaSecondary: "דבר עם הצוות",
    ctaPrimaryUrl: "#chaos",
    ctaSecondaryUrl: "#contact",
  },

  about: {
    title: "אנחנו לא בונים תוכנה — אנחנו בונים סדר",
    body: "SHC מתמחה במערכות ניהול מותאמות למוסדות חינוך, ארגונים ועמותות. אנחנו מבינים שכל מוסד עובד אחרת, ולכן לא מכריחים אתכם להתאים את עצמכם לתבנית. אנחנו בונים את המערכת סביב התהליך שלכם.",
  },

  contact: {
    title: "מוכנים לשמוע על הכאוס שלכם",
    subtitle: "שיחת אפיון ראשונה — בלי מחויבות.",
    email: "info@shc.co.il",
    phone: "052-000-0000",
    whatsapp: null,
  },

  footer: {
    tagline: "מערכות לארגונים ומוסדות",
    links: [
      { label: "מערכות", href: "#systems" },
      { label: "תהליך", href: "#process" },
      { label: "עבודות", href: "#portfolio" },
      { label: "צור קשר", href: "#contact" },
    ],
    copyright: `© ${new Date().getFullYear()} SHC · מערכות לארגונים ומוסדות`,
  },
};
