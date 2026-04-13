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
    <section id="faq" className="halka-faq-section" style={{ background: C.bgPrimary, padding: "80px 24px" }}>
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
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 40px)",
            color: C.textPrimary,
            letterSpacing: "-0.5px",
            marginBottom: "12px",
          }}>
            Frequently asked questions
          </h2>
          <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
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
