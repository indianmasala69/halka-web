'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { useState } from 'react';

interface NavProps {
  onQuiz: () => void;
}

export default function Nav({ onQuiz }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.border}`,
      padding: "0 24px",
      height: "64px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    } as any}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "28px",
          color: C.textPrimary,
          letterSpacing: "-1px",
        }}>
          halka
        </span>
        <span style={{
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: C.saffron,
          marginTop: "2px",
        }}>
          हल्का
        </span>
        <span style={{
          fontSize: "10px",
          fontWeight: 600,
          color: C.textMuted,
          textTransform: "uppercase" as const,
          letterSpacing: "0.5px",
          marginLeft: "4px",
          padding: "2px 6px",
          background: C.borderLight,
          borderRadius: "4px",
          marginTop: "2px",
        }}>
          by doctors
        </span>
      </div>

      {/* Desktop CTA */}
      <button
        onClick={onQuiz}
        style={{
          background: C.saffron,
          color: C.white,
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "14px",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: "all 0.2s ease",
          minHeight: "44px",
        } as any}
      >
        Start Assessment
      </button>
    </nav>
  );
}
