'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface NavProps {
  onQuiz: () => void;
}

const btnPrimary = {
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "10px 24px",
  borderRadius: "50px",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.2s ease",
};

export default function Nav({ onQuiz }: NavProps) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(251,247,240,0.9)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.borderLight}`,
      padding: "14px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "26px", color: C.charcoal, letterSpacing: "-1px" }}>
          halka
        </span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 600, fontSize: "14px", color: C.saffron, marginTop: "2px" }}>
          हल्का
        </span>
      </div>
      <button onClick={onQuiz} style={btnPrimary as any}>
        Start Free Assessment
      </button>
    </nav>
  );
}
