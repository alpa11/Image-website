import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  org: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('sending');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submission:', data);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="contact-inner">
          <div className="ci-inf fade-up">
            <div className="eyebrow" style={{ color: 'oklch(65% 0.14 220)' }}>צור קשר</div>
            <h2 className="h2" style={{ color: '#fff' }}>מוכנים לשמוע על הכאוס שלכם</h2>
            <p className="sub" style={{ marginTop: 14, color: 'oklch(68% 0.05 224)' }}>
              שיחת אפיון ראשונה — בלי מחויבות.
            </p>

            <div className="cdet">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@shc.co.il
            </div>

            <div className="cdet">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.73 17z" />
              </svg>
              052-000-0000
            </div>
          </div>

          <div className="cform fade-up">
            {status === 'sent' ? (
              <div className="sent-state">
                <svg className="sent-icon" viewBox="0 0 48 48" fill="none" width="52" height="52" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
                  <path d="M15 24.5l6 6 13-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>תודה. נחזור אליכם תוך 24 שעות.</h3>
                <p>קיבלנו את הפנייה שלכם ונשמח לקבוע שיחת היכרות.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="fg">
                  <label className="flbl">שם מלא</label>
                  <input
                    type="text"
                    className={`fi${errors.name ? ' fi-err' : ''}`}
                    placeholder="ישראל ישראלי"
                    {...register('name', { required: true })}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">שם המוסד / ארגון</label>
                  <input
                    type="text"
                    className={`fi${errors.org ? ' fi-err' : ''}`}
                    placeholder="בית ספר · עמותה · ארגון"
                    {...register('org', { required: true })}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">טלפון</label>
                  <input
                    type="tel"
                    className="fi"
                    placeholder="050-000-0000"
                    {...register('phone')}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">ספר לנו על הכאוס שלך</label>
                  <textarea
                    className="fi"
                    placeholder="מה התהליכים שגורמים לבעיה?"
                    {...register('message')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'שולח...' : 'שלח — נחזור תוך 24 שעות'}
                </button>

                {status === 'error' && (
                  <p className="err-msg">שגיאה בשליחה — נסה שנית או צור קשר ישירות.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { padding: 96px 0; background: #0D1420; color: #fff; }
        .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: oklch(50% 0.17 224); margin-bottom: 12px; }
        .h2 { font-size: clamp(28px,3.5vw,44px); font-weight: 800; letter-spacing: -.5px; line-height: 1.15; }
        .sub { font-size: 17px; line-height: 1.75; }
        .fade-up { opacity: 0; transform: translateY(30px); }
        .cdet { display: flex; gap: 12px; align-items: center; margin-top: 20px; font-size: 15px; color: oklch(72% 0.05 224); }
        .cform { background: oklch(18% 0.03 224); border-radius: 16px; padding: 32px; border: 1px solid oklch(28% 0.04 224); }
        .fg { margin-bottom: 14px; }
        .flbl { display: block; font-size: 13px; font-weight: 600; color: oklch(68% 0.04 224); margin-bottom: 6px; }
        .fi { width: 100%; padding: 12px 14px; border-radius: 8px; background: oklch(23% 0.03 224); border: 1px solid oklch(28% 0.04 224); color: #fff; font-family: 'Heebo', sans-serif; font-size: 15px; outline: none; transition: border-color .2s; box-sizing: border-box; }
        .fi:focus { border-color: oklch(65% 0.14 220); }
        .fi::placeholder { color: oklch(48% 0.04 224); }
        .fi-err { border-color: #ff3b30 !important; }
        textarea.fi { height: 100px; resize: vertical; }
        .submit-btn { width: 100%; justify-content: center; margin-top: 4px; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; font-family: 'Heebo', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; text-decoration: none; border: none; }
        .btn-primary { background: oklch(50% 0.17 224); color: #fff; }
        .btn-primary:hover:not(:disabled) { background: oklch(42% 0.17 224); transform: translateY(-2px); }
        .err-msg { color: #ff6b6b; font-size: 13px; margin-top: 8px; text-align: center; }
        .sent-state { text-align: center; padding: 20px 0; }
        .sent-icon { color: oklch(57% 0.13 207); margin-bottom: 16px; }
        .sent-state h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; }
        .sent-state p { font-size: 14px; color: oklch(68% 0.04 224); }

        @media (max-width: 900px) {
          .contact-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
