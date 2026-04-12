'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface FinalCTAProps {
  onQuiz: () => void;
}

export default function FinalCTA({ onQuiz }: FinalCTAProps) {
  return (
    <section style={{ background: C.navy, padding: "80px 24px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 40px)",
          color: C.white,
          letterSpacing: "-0.5px",
          marginBottom: "16px",
          lineHeight: 1.2,
        }}>
          Your healthier self is 5 minutes away
        </h2>

        <p style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.65)",
          maxWidth: "460px",
          margin: "0 auto 32px",
          lineHeight: 1.7,
        }}>
          Take our free assessment and get a personalized plan from a licensed doctor
        </p>

        <button
          onClick={onQuiz}
          style={{
            background: C.white,
            color: C.navy,
            border: "none",
            padding: "16px 40px",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "16px",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            minHeight: "48px",
          }}
        >
          Start Free Assessment →
        </button>

        <div style={{
          marginTop: "28px",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          {[
            "No credit card required",
            "5-minute assessment",
            "Doctor consultation included",
          ].map((t, i) => (
            <span key={i} style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{ color: C.saffron }}>✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
