'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { doctors } from '@/lib/doctors';

export default function Doctors() {
  return (
    <section style={{ background: C.white, padding: "100px 24px", overflow: "hidden" }}>
      <style>{`
        .doc-card {
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .doc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12) !important;
        }
        .doc-card:hover .doc-photo {
          transform: scale(1.05);
        }
        .doc-card .doc-cta {
          background: ${C.white};
          color: ${C.textPrimary};
          border-color: ${C.border};
        }
        .doc-card:hover .doc-cta {
          background: ${C.saffron} !important;
          color: #fff !important;
          border-color: ${C.saffron} !important;
        }
        @media (max-width: 767px) {
          .doc-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .doc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.greenLight,
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "16px",
            fontSize: "13px",
            fontWeight: 700,
            color: C.green,
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Your Care Team
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            color: C.textPrimary,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            Meet the doctors who<br />will guide your journey
          </h2>
          <p style={{
            fontSize: "17px",
            color: C.textSecondary,
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Board-certified physicians with 10+ years of experience in metabolic health and obesity medicine
          </p>
        </div>

        {/* Doctor cards */}
        <div
          className="doc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          } as any}
        >
          {doctors.map((d, i) => (
            <a
              key={i}
              href={`/doctors/${d.id}`}
              className="doc-card"
              style={{
                background: C.white,
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column" as const,
                cursor: "pointer",
              }}
            >
              {/* Photo section */}
              <div style={{
                position: "relative" as const,
                overflow: "hidden",
                height: "260px",
                background: `linear-gradient(135deg, ${C.bgPrimary}, ${C.borderLight})`,
              }}>
                <img
                  className="doc-photo"
                  src={d.photo}
                  alt={d.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover" as const,
                    objectPosition: "top center",
                    display: "block",
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute" as const,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "100px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                }} />
                {/* Rating badge */}
                <div style={{
                  position: "absolute" as const,
                  top: "16px",
                  right: "16px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "10px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: "13px", color: C.textPrimary }}>{d.rating}</span>
                  <span style={{ fontSize: "11px", color: C.textMuted }}>({d.reviews})</span>
                </div>
                {/* Available badge */}
                <div style={{
                  position: "absolute" as const,
                  bottom: "16px",
                  left: "16px",
                  background: "rgba(11,122,75,0.9)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#4ADE80",
                    boxShadow: "0 0 6px #4ADE80",
                  }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>
                    {d.nextAvailable}
                  </span>
                </div>
              </div>

              {/* Info section */}
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" as const }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: C.textPrimary,
                  marginBottom: "4px",
                }}>
                  {d.name}
                </h3>
                <p style={{ fontSize: "13px", color: C.textSecondary, marginBottom: "2px" }}>
                  {d.credentials}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ fontSize: "13px", color: C.textMuted }}>{d.hospital}</span>
                </div>

                {/* Stats row */}
                <div style={{
                  display: "flex",
                  gap: "16px",
                  padding: "14px 0",
                  borderTop: `1px solid ${C.borderLight}`,
                  borderBottom: `1px solid ${C.borderLight}`,
                  marginBottom: "16px",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "18px", color: C.textPrimary }}>{d.experience}+</div>
                    <div style={{ fontSize: "11px", color: C.textMuted }}>Years exp.</div>
                  </div>
                  <div style={{ width: "1px", background: C.borderLight }} />
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "18px", color: C.textPrimary }}>{(d.patients / 1000).toFixed(1)}k</div>
                    <div style={{ fontSize: "11px", color: C.textMuted }}>Patients</div>
                  </div>
                  <div style={{ width: "1px", background: C.borderLight }} />
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "18px", color: C.textPrimary }}>{d.languages.length}</div>
                    <div style={{ fontSize: "11px", color: C.textMuted }}>Languages</div>
                  </div>
                </div>

                {/* Tags — fixed height for alignment */}
                <div style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap" as const,
                  marginBottom: "20px",
                  flex: 1,
                  alignContent: "flex-start",
                  minHeight: "32px",
                  maxHeight: "32px",
                  overflow: "hidden",
                }}>
                  {d.tags.slice(0, 3).map((tag, j) => (
                    <span key={j} style={{
                      background: C.bgPrimary,
                      color: C.textSecondary,
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: `1px solid ${C.borderLight}`,
                      whiteSpace: "nowrap" as const,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA — always at bottom */}
                <div
                  className="doc-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: "12px",
                    border: `1.5px solid ${C.border}`,
                    fontWeight: 600,
                    fontSize: "14px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "all 0.3s ease",
                    marginTop: "auto",
                  }}
                >
                  View Profile
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
