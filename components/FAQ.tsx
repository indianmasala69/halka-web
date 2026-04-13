'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

const faqs = [
  {
    q: "Is this safe?",
    a: "Yes. All medications are FDA-approved and prescribed by licensed Indian doctors after a thorough health assessment. We monitor your progress with regular check-ins and blood work.",
  },
  {
    q: "What is GLP-1 medication?",
    a: "GLP-1 receptor agonists are a class of FDA-approved medications that reduce appetite and help your body regulate blood sugar. They've been clinically proven to help patients lose 10-15% of body weight.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most patients notice reduced appetite within the first week. Visible weight loss typically begins within 2-4 weeks. On average, patients lose 5-7 kg in the first month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts. You can pause or cancel your subscription at any time through your dashboard.",
  },
  {
    q: "Is my information confidential?",
    a: "Absolutely. We follow strict HIPAA-equivalent privacy standards. Your medical data is encrypted and never shared with third parties.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes. We deliver medication to all major cities and most pin codes across India. Delivery is free for all plans.",
  },
  {
    q: "What if I have existing conditions like diabetes or thyroid?",
    a: "Our doctors specialize in metabolic health and regularly treat patients with diabetes, thyroid disorders, PCOS, and other conditions. Your treatment plan will be customized accordingly.",
  },
  {
    q: "How do the doctor consultations work?",
    a: "All consultations are via video call (Google Meet). Your first consultation is 25 minutes, follow-ups are 10 minutes. You'll also have unlimited WhatsApp access to your care team.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="halka-faq-section" style={{ background: C.white, padding: "80px 24px" }}>
      <style>{`
        @media (max-width: 767px) {
          .halka-faq-section { padding: 60px 16px !important; }
        }
        @media (max-width: 480px) {
          .halka-faq-section { padding: 48px 12px !important; }
          .halka-faq-btn { padding: 14px 16px !important; }
          .halka-faq-answer { padding: 0 16px 14px !important; }
        }
      `}</style>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <div className="halka-faq-header" style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "12px",
            marginBottom: "12px",
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: C.textPrimary,
              letterSpacing: "-0.5px",
              margin: 0,
            }}>
              Frequently asked questions
            </h2>
            <a
              href="https://wa.me/919876543210?text=Hi%20Halka%2C%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                color: "#25D366",
                textDecoration: "none",
                whiteSpace: "nowrap" as const,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.546 4.058 1.498 5.77L.058 23.5l5.862-1.41A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.876 0-3.653-.5-5.19-1.38l-.37-.22-3.84.923.97-3.712-.24-.384A9.69 9.69 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12s-4.365 9.75-9.75 9.75z" />
              </svg>
              Still have questions? Chat with us
            </a>
          </div>
          <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "440px", lineHeight: 1.6, margin: 0 }}>
            Everything you need to know about Halka
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: C.white,
                  border: `1px solid ${isOpen ? C.border : C.borderLight}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  className="halka-faq-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    minHeight: "48px",
                  }}
                >
                  <span style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    color: C.textPrimary,
                    paddingRight: "16px",
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: "20px",
                    color: C.textMuted,
                    fontWeight: 300,
                    flexShrink: 0,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="halka-faq-answer" style={{
                    padding: "0 20px 18px",
                  }}>
                    <p style={{
                      fontSize: "14px",
                      color: C.textSecondary,
                      lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
