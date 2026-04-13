'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const stats = [
  {
    value: "2,847+",
    label: "Patients treated",
    accent: C.saffron,
    bg: C.saffronLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "94%",
    label: "See results in 8 weeks",
    accent: C.green,
    bg: C.greenLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    value: "4.8/5",
    label: "Patient satisfaction",
    accent: C.saffron,
    bg: C.saffronLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={C.saffron} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    value: "3",
    label: "Specialist doctors",
    accent: C.green,
    bg: C.greenLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <section className="halka-stats-section" style={{
      background: C.white,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      padding: "48px 24px",
    }}>
      <style>{`
        @media (min-width: 768px) {
          .halka-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .halka-stats-section { padding: 36px 16px !important; }
          .halka-stats-grid { gap: 24px 12px !important; }
          .halka-stat-divider { display: none !important; }
        }
        @media (max-width: 480px) {
          .halka-stats-section { padding: 28px 12px !important; }
        }
      `}</style>
      <div
        className="halka-stats-grid"
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "32px 16px",
        } as any}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              position: "relative" as const,
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "8px",
              textAlign: "center",
              padding: i % 2 === 1 ? "12px 0 12px 16px" : "12px 16px 12px 0",
            } as any}
          >
            {/* Vertical divider between odd/even pairs on desktop */}
            {i % 2 === 1 && i < stats.length && (
              <div
                className="halka-stat-divider"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "10%",
                  height: "80%",
                  width: "1px",
                  background: `linear-gradient(to bottom, transparent, ${C.border}, transparent)`,
                }}
              />
            )}
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: stat.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {stat.icon}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: stat.accent,
              lineHeight: 1.1,
              marginBottom: "2px",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "13px",
              color: C.textMuted,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
