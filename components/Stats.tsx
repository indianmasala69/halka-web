'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const stats = [
  { value: "10,000+", label: "Patients treated" },
  { value: "200+", label: "Licensed doctors" },
  { value: "94%", label: "See results in 12 weeks" },
  { value: "4.8\u2605", label: "Patient satisfaction" },
];

export default function Stats() {
  return (
    <section style={{
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
              textAlign: "center",
              padding: "8px 0",
            } as any}
          >
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: C.saffron,
              lineHeight: 1.1,
              marginBottom: "6px",
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
