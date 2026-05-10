import { useRef, useState } from "react";

// Interest options — can be managed via admin panel later
const interests = [
  "מערכת רכש ותקציבים",
  "מערכת תחזוקה",
  "מערכת דיווחי שעות",
  "מערכת משימות ומטלות",
  "מערכת מותאמת אישית",
  "לא בטוח, רוצה להתייעץ",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  organization: string;
  interest: string;
  notes: string;
}

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    organization: "",
    interest: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // TODO: Replace with Firestore write:
    // await db.collection("leads").add({ ...form, createdAt: serverTimestamp() })
    // For now, simulate success
    console.log("Lead submitted:", form);

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", organization: "", interest: "", notes: "" });
    }, 900);
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        {/* Left: CTA text */}
        <div className="contact-text">
          <div className="accent-line" style={{ marginBottom: "1.25rem" }} />
          <h2 className="section-title contact-title">
            מוכנים להפסיק לנהל<br />
            <span className="gradient-text">בוואטסאפ?</span>
          </h2>
          <p className="contact-subtitle">
            שאלו אותנו שאלה, ספרו לנו על הכאב שלכם,
            או פשוט קבעו שיחת היכרות.
          </p>

          <div className="contact-promises">
            {[
              "שיחה ראשונה ללא עלות",
              "נבין את התהליך שלכם לפני שנציע כלום",
              "לא מכריחים לרכוש, רק מסייעים להבין",
            ].map((p) => (
              <div key={p} className="contact-promise">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18" style={{ flexShrink: 0 }}>
                  <circle cx="10" cy="10" r="9" stroke="#00AFC6" strokeWidth="1.5"/>
                  <path d="M6 10l3 3 5-5" stroke="#00AFC6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-wrap">
          {status === "sent" ? (
            <div className="contact-success">
              <svg viewBox="0 0 48 48" fill="none" width="56" height="56">
                <circle cx="24" cy="24" r="23" stroke="#00AFC6" strokeWidth="2"/>
                <path d="M14 24l7 7 13-14" stroke="#00AFC6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>קיבלנו את הפנייה שלכם</h3>
              <p>נחזור אליכם בהקדם לתיאום שיחה.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">שם מלא *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="ישראל ישראלי"
                    autoComplete="name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone" className="form-label">טלפון *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="050-0000000"
                    dir="ltr"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">מייל</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="name@org.co.il"
                    dir="ltr"
                    autoComplete="email"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="organization" className="form-label">שם מוסד / ארגון *</label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    value={form.organization}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="עמותת / בית ספר / חברה"
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="interest" className="form-label">תחום עניין *</label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={form.interest}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="">בחרו תחום עניין</option>
                  {interests.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="notes" className="form-label">הערות / תיאור הצורך</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="ספרו לנו על הכאב שאתם מתמודדים איתו..."
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary contact-submit"
              >
                {status === "sending" ? "שולח..." : "שלח פנייה"}
                {status !== "sending" && (
                  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                    <path d="M11 8H5M8 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-section {
          padding-block: 6rem;
          background: #F4F6F8;
        }

        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }

        .contact-title {
          margin-bottom: 1.25rem;
        }

        .contact-subtitle {
          font-size: 1rem;
          color: #4A5568;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .contact-promises {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .contact-promise {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #4A5568;
          font-weight: 500;
        }

        .contact-form-wrap {
          background: #FFFFFF;
          border-radius: 1.25rem;
          padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(11, 37, 69, 0.08);
          border: 1px solid #E2E8F0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .form-label {
          font-size: 0.825rem;
          font-weight: 600;
          color: #0B2545;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1.5px solid #E2E8F0;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: #0B2545;
          background: #FAFAFA;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          width: 100%;
        }

        .form-input:focus {
          border-color: #00AFC6;
          box-shadow: 0 0 0 3px rgba(0, 175, 198, 0.12);
          background: #FFFFFF;
        }

        .form-input::placeholder {
          color: #A0AEC0;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%234A5568'%3E%3Cpath d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: left 0.75rem center;
          background-size: 1.25rem;
          padding-left: 2.5rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .contact-submit {
          width: 100%;
          justify-content: center;
          flex-direction: row-reverse;
          margin-top: 0.25rem;
          font-size: 1rem;
          padding-block: 1rem;
        }

        .contact-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          gap: 1rem;
          min-height: 300px;
        }

        .contact-success h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0B2545;
        }

        .contact-success p {
          color: #4A5568;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 540px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-form-wrap {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
