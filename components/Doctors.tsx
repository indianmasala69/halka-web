'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const doctors = [
  {
    name: "Dr. Anand Sharma",
    photo: "/images/doctors/doctor-2.jpg",
    credentials: "MBBS, MD (Internal Medicine)",
    hospital: "Apollo Hospital, Delhi",
    experience: "15 years experience",
    quote: "I believe in treating the root cause, not just symptoms.",
    tags: ["Internal Medicine", "Metabolic Health"],
  },
  {
    name: "Dr. Priya Nair",
    photo: "/images/doctors/doctor-3.jpg",
    credentials: "MBBS, MD (Endocrinology)",
    hospital: "Manipal Hospital, Bangalore",
    experience: "12 years experience",
    quote: "Every patient deserves a personalized treatment plan.",
    tags: ["Endocrinology", "PCOS"],
  },
  {
    name: "Dr. Vikram Patel",
    photo: "/images/doctors/doctor-1.jpg",
    credentials: "MBBS, DNB (Medicine)",
    hospital: "Kokilaben Hospital, Mumbai",
    experience: "18 years experience",
    quote: "Evidence-based medicine combined with compassionate care.",
    tags: ["General Medicine", "GLP-1 Therapy"],
  },
];

export default function Doctors() {
  return (
    <section style={{ background: C.bgPrimary, padding: "80px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 40px)",
            color: C.textPrimary,
            letterSpacing: "-0.5px",
            marginBottom: "12px",
          }}>
            Your care team
          </h2>
          <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            Licensed physicians with 10+ years of experience in metabolic health
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {doctors.map((d, i) => (
            <div key={i} style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "32px 24px",
              boxShadow: C.shadowSm,
              textAlign: "center",
            }}>
              {/* Photo */}
              <img
                src={d.photo}
                alt={d.name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover" as const,
                  border: "3px solid #E2E8F0",
                  margin: "0 auto 16px",
                  display: "block",
                }}
              />

              {/* Name */}
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: C.textPrimary,
                marginBottom: "4px",
              }}>
                {d.name}
              </h3>

              {/* Credentials */}
              <p style={{ fontSize: "13px", color: C.textSecondary, marginBottom: "4px" }}>
                {d.credentials}
              </p>
              <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "4px" }}>
                {d.hospital}
              </p>
              <p style={{ fontSize: "12px", color: C.green, fontWeight: 600, marginBottom: "16px" }}>
                {d.experience}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
                {d.tags.map((tag, j) => (
                  <span key={j} style={{
                    background: C.bgPrimary,
                    color: C.textSecondary,
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: `1px solid ${C.borderLight}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: "14px",
                color: C.textMuted,
                fontStyle: "italic",
                lineHeight: 1.6,
                borderTop: `1px solid ${C.borderLight}`,
                paddingTop: "16px",
              }}>
                &ldquo;{d.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button style={{
            background: C.saffron,
            color: C.white,
            border: "none",
            padding: "14px 32px",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            minHeight: "48px",
          }}>
            Meet your doctor →
          </button>
        </div>
      </div>
    </section>
  );
}
