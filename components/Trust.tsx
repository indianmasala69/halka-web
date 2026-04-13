'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const trustItems = [
  {
    label: "Data encrypted",
    iconPath: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  },
  {
    label: "Free delivery",
    iconPath: "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  },
  {
    label: "Money-back guarantee",
    iconPath: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    label: "Discreet packaging",
    iconPath: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  },
];

export default function Trust() {
  return (
    <section className="halka-trust-strip" style={{
      background: C.bgPrimary,
      borderTop: `1px solid ${C.borderLight}`,
      borderBottom: `1px solid ${C.borderLight}`,
      padding: "20px 24px",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .halka-trust-strip { padding: 16px 16px !important; }
          .halka-trust-row { gap: 20px !important; }
          .halka-trust-label { font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .halka-trust-row {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 16px 24px !important;
          }
        }
      `}</style>
      <div className="halka-trust-row" style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
      }}>
        {trustItems.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.green}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.iconPath} />
            </svg>
            <span className="halka-trust-label" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: C.textSecondary,
              whiteSpace: "nowrap" as const,
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
