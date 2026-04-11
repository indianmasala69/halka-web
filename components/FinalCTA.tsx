'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface FinalCTAProps {
  onQuiz: () => void;
}

const btnPrimary = {
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "18px 48px",
  borderRadius: "60px",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  boxShadow: "0 0 40px rgba(232,145,58,0.3)",
};

export default function FinalCTA({ onQuiz }: FinalCTAProps) {
  return (
    <section style={{ background: C.cream, padding: "100px 24px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          background: C.charcoal,
          borderRadius: "32px",
          padding: "72px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,145,58,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(28px, 5vw, 44px)", color: C.white, letterSpacing: "-1.5px", marginBottom: "16px", lineHeight: 1.15, position: "relative" }}>
          Ready to feel <span style={{ color: C.saffron }}>halka</span>?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
          Take the free 5-minute assessment. Get matched with a doctor. See results in weeks, not months.
        </p>
        <button onClick={onQuiz} style={btnPrimary as any}>
          Take Free Assessment →
        </button>
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "28px", flexWrap: "wrap" }}>
          {["Doctor-led plans", "Free shipping", "No hidden fees", "Cancel anytime"].map((t, i) => (
            <span key={i} style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: C.saffron }}>✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
