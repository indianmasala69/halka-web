'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
interface NavProps {
  onQuiz: () => void;
}

export default function Nav({ onQuiz }: NavProps) {
  return (
    <nav className="halka-nav" style={{
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
      <style>{`
        @media (max-width: 767px) {
          .halka-nav { padding: 0 12px !important; height: 56px !important; }
          .halka-nav-cta { padding: 8px 14px !important; font-size: 13px !important; }
          .halka-nav-logo-feel { font-size: 22px !important; }
          .halka-nav-logo-halka { font-size: 24px !important; }
          .halka-nav-hindi { font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .halka-nav { padding: 0 10px !important; }
          .halka-nav-cta { padding: 7px 12px !important; font-size: 12px !important; min-height: 40px !important; }
        }
      `}</style>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span className="halka-nav-logo-feel" style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: "26px",
          color: C.textSecondary,
          letterSpacing: "-0.5px",
        }}>
          feel
        </span>
        <span className="halka-nav-logo-halka" style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "28px",
          color: C.textPrimary,
          letterSpacing: "-1px",
        }}>
          halka
        </span>
        <span className="halka-nav-hindi" style={{
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: C.saffron,
          marginTop: "2px",
        }}>
          हल्का
        </span>
      </div>

      {/* Desktop CTA */}
      <button
        className="halka-nav-cta"
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
          flexShrink: 0,
        } as any}
      >
        Start Assessment
      </button>
    </nav>
  );
}
