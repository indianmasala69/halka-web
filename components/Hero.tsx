'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface HeroProps {
  onQuiz: () => void;
}

const btnPrimary = {
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "16px 36px",
  borderRadius: "60px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.2s ease",
};

const btnSecondary = {
  background: "transparent",
  color: C.charcoal,
  border: `1.5px solid ${C.border}`,
  padding: "14px 32px",
  borderRadius: "60px",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

export default function Hero({ onQuiz }: HeroProps) {
  return (
    <section style={{
      background: C.cream,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "120px 24px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,145,58,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 480px", minWidth: "320px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: C.saffronLight, padding: "8px 18px", borderRadius: "50px",
            marginBottom: "28px", fontSize: "13px", fontWeight: 600, color: C.saffron,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s ease infinite" }} />
            Doctor-led weight loss, 100% online
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: "clamp(44px, 6.5vw, 68px)", lineHeight: 1.05,
            letterSpacing: "-2.5px", color: C.charcoal, marginBottom: "24px",
          }}>
            Feel{" "}
            <span style={{ color: C.saffron, position: "relative" }}>
              halka.
            </span>
            <br />
            Feel alive.
          </h1>

          <p style={{ fontSize: "18px", lineHeight: 1.7, color: C.textSecondary, maxWidth: "460px", marginBottom: "40px" }}>
            Clinically-proven weight loss treatments prescribed by licensed Indian doctors. Personalized plans, medication at your door, and a coach who actually cares.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
            <button onClick={onQuiz} style={btnPrimary as any}>Take Free Assessment →</button>
            <button style={btnSecondary as any}>How it works</button>
          </div>
        </div>
      </div>
    </section>
  );
}
