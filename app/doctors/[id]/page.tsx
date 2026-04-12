'use client';

import { useParams } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { doctors } from '@/lib/doctors';

export default function DoctorProfile() {
  const params = useParams();
  const doctor = doctors.find(d => d.id === params.id);

  if (!doctor) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Outfit'", fontSize: "24px", marginBottom: "8px" }}>Doctor not found</h1>
          <a href="/" style={{ color: C.saffron, fontWeight: 600 }}>← Back to home</a>
        </div>
      </div>
    );
  }

  const d = doctor;

  return (
    <div style={{ minHeight: "100vh", background: C.bgPrimary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 767px) {
          .dp-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .dp-hero-photo { margin: 0 auto !important; }
          .dp-hero-stats { justify-content: center !important; }
          .dp-hero-actions { justify-content: center !important; }
          .dp-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        background: C.white,
        borderBottom: `1px solid ${C.borderLight}`,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky" as const,
        top: 0,
        zIndex: 50,
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
          <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "22px", color: C.charcoal, letterSpacing: "-0.5px" }}>halka</span>
          <span style={{ fontFamily: "'Noto Sans Devanagari'", fontWeight: 600, fontSize: "12px", color: C.saffron }}>हल्का</span>
        </a>
        <a href="/booking" style={{
          background: C.saffron,
          color: C.white,
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "13px",
          textDecoration: "none",
        }}>
          Book Consultation
        </a>
      </nav>

      {/* Back link */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "20px 24px 0" }}>
        <a href="/#doctors" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: C.textMuted,
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Doctors
        </a>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "32px 24px 0" }}>
        <div
          className="dp-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "40px",
            alignItems: "start",
            background: C.white,
            borderRadius: "24px",
            padding: "40px",
            border: `1px solid ${C.border}`,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          } as any}
        >
          {/* Photo */}
          <div className="dp-hero-photo" style={{ position: "relative" as const }}>
            <img
              src={d.photo}
              alt={d.name}
              style={{
                width: "200px",
                height: "240px",
                borderRadius: "20px",
                objectFit: "cover" as const,
                objectPosition: "top",
                display: "block",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            />
            {/* Rating overlay */}
            <div style={{
              position: "absolute" as const,
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              background: C.white,
              borderRadius: "12px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              border: `1px solid ${C.borderLight}`,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: "14px" }}>{d.rating}</span>
              <span style={{ fontSize: "12px", color: C.textMuted }}>({d.reviews} reviews)</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" as const }}>
              <h1 style={{
                fontFamily: "'Outfit'",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 36px)",
                color: C.textPrimary,
                letterSpacing: "-1px",
                margin: 0,
              }}>
                {d.name}
              </h1>
              <div style={{
                background: C.greenLight,
                color: C.green,
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "6px",
              }}>
                ✓ Verified
              </div>
            </div>
            <p style={{ fontSize: "15px", color: C.textSecondary, marginBottom: "2px" }}>{d.credentials}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: "14px", color: C.textMuted }}>{d.hospital}</span>
            </div>

            {/* Stats */}
            <div
              className="dp-hero-stats"
              style={{
                display: "flex",
                gap: "24px",
                marginBottom: "24px",
                flexWrap: "wrap" as const,
              } as any}
            >
              {[
                { val: `${d.experience}+`, label: "Years Experience" },
                { val: `${(d.patients / 1000).toFixed(1)}k+`, label: "Patients Treated" },
                { val: d.languages.join(", "), label: "Languages" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: C.bgPrimary,
                  borderRadius: "12px",
                  padding: "14px 20px",
                  border: `1px solid ${C.borderLight}`,
                  minWidth: "120px",
                }}>
                  <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "18px", color: C.textPrimary }}>{s.val}</div>
                  <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="dp-hero-actions" style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const } as any}>
              <a href="/booking" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: C.saffron,
                color: C.white,
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: `0 4px 16px rgba(255,107,44,0.3)`,
              }}>
                Book Consultation — Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 20px",
                borderRadius: "12px",
                border: `1.5px solid ${C.green}`,
                color: C.green,
                fontWeight: 600,
                fontSize: "14px",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.green,
                  boxShadow: `0 0 6px ${C.green}`,
                }} />
                Next: {d.nextAvailable}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div
          className="dp-content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "32px",
            alignItems: "start",
          } as any}
        >
          {/* Left: Main content */}
          <div>
            {/* Quote */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "32px",
              border: `1px solid ${C.border}`,
              marginBottom: "24px",
              position: "relative" as const,
            }}>
              <div style={{
                position: "absolute" as const,
                top: "20px",
                left: "28px",
                fontSize: "48px",
                fontFamily: "Georgia, serif",
                color: C.saffronLight,
                lineHeight: 1,
              }}>&ldquo;</div>
              <p style={{
                fontSize: "18px",
                color: C.textSecondary,
                lineHeight: 1.7,
                fontStyle: "italic",
                paddingLeft: "20px",
                margin: 0,
              }}>
                {d.quote}
              </p>
            </div>

            {/* About */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "32px",
              border: `1px solid ${C.border}`,
              marginBottom: "24px",
            }}>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.textPrimary, marginBottom: "16px" }}>
                About {d.name.split(' ').slice(0, 2).join(' ')}
              </h2>
              <p style={{ fontSize: "15px", color: C.textSecondary, lineHeight: 1.8, margin: 0 }}>
                {d.bio}
              </p>
            </div>

            {/* Education */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "32px",
              border: `1px solid ${C.border}`,
              marginBottom: "24px",
            }}>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.textPrimary, marginBottom: "20px" }}>
                Education & Training
              </h2>
              {d.education.map((edu, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  marginBottom: i < d.education.length - 1 ? "16px" : 0,
                  paddingBottom: i < d.education.length - 1 ? "16px" : 0,
                  borderBottom: i < d.education.length - 1 ? `1px solid ${C.borderLight}` : "none",
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: C.saffronLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{edu}</p>
                </div>
              ))}
            </div>

            {/* Specializations */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "32px",
              border: `1px solid ${C.border}`,
            }}>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.textPrimary, marginBottom: "20px" }}>
                Areas of Expertise
              </h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                {d.specializations.map((spec, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    background: C.bgPrimary,
                    borderRadius: "12px",
                    border: `1px solid ${C.borderLight}`,
                  }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: "6px",
                      background: C.greenLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span style={{ fontSize: "14px", color: C.textPrimary, fontWeight: 500 }}>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div>
            {/* Booking card */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "28px",
              border: `1px solid ${C.border}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              position: "sticky" as const,
              top: "80px",
            }}>
              <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "18px", color: C.textPrimary, marginBottom: "6px" }}>
                Book a consultation
              </h3>
              <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px", lineHeight: 1.5 }}>
                25-min video call. Get a personalized treatment plan.
              </p>

              <div style={{
                background: C.bgPrimary,
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px",
                border: `1px solid ${C.borderLight}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: C.textMuted }}>Consultation fee</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: C.green }}>FREE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: C.textMuted }}>Duration</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: C.textPrimary }}>25 minutes</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: C.textMuted }}>Mode</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: C.textPrimary }}>Video call</span>
                </div>
              </div>

              <a href="/booking" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                background: C.saffron,
                color: C.white,
                padding: "14px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: `0 4px 16px rgba(255,107,44,0.3)`,
                marginBottom: "12px",
              }}>
                Book Free Consultation
              </a>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.green,
                  boxShadow: `0 0 6px ${C.green}`,
                }} />
                <span style={{ fontSize: "12px", color: C.green, fontWeight: 600 }}>
                  Next available: {d.nextAvailable}
                </span>
              </div>

              {/* Trust signals */}
              <div style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: `1px solid ${C.borderLight}`,
                display: "flex",
                flexDirection: "column" as const,
                gap: "10px",
              }}>
                {[
                  "No credit card required",
                  "Cancel or reschedule anytime",
                  "Prescription included",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span style={{ fontSize: "12px", color: C.textMuted }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{
              background: C.white,
              borderRadius: "20px",
              padding: "24px",
              border: `1px solid ${C.border}`,
              marginTop: "20px",
            }}>
              <h4 style={{ fontFamily: "'Outfit'", fontWeight: 600, fontSize: "14px", color: C.textMuted, marginBottom: "12px", textTransform: "uppercase" as const, letterSpacing: "1px" }}>
                Specialties
              </h4>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                {d.tags.map((tag, i) => (
                  <span key={i} style={{
                    background: C.bgPrimary,
                    color: C.textSecondary,
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${C.borderLight}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: C.white,
        borderTop: `1px solid ${C.borderLight}`,
        padding: "24px",
        textAlign: "center" as const,
      }}>
        <p style={{ fontSize: "12px", color: C.textMuted }}>
          © 2024 Halka Health Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
