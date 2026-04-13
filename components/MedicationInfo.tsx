'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ─── SVG Icon Components ─── */

function BrainIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a5 5 0 0 1 4.9 4A4.5 4.5 0 0 1 19 10.5a4.5 4.5 0 0 1-2 3.7V16a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1.8A4.5 4.5 0 0 1 5 10.5 4.5 4.5 0 0 1 7.1 6 5 5 0 0 1 12 2z" />
      <path d="M10 16v4" />
      <path d="M14 16v4" />
      <path d="M9 10h0" />
      <path d="M15 10h0" />
    </svg>
  );
}

function StomachIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z" />
      <path d="M12 14v4" />
      <path d="M8 20h8" />
    </svg>
  );
}

function BloodSugarIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l-4 8h8l-4 8" />
      <circle cx="12" cy="18" r="3" />
      <path d="M12 15v-1" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.textSecondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

/* ─── Data ─── */

const glpSteps = [
  {
    icon: BrainIcon,
    title: 'Reduces appetite',
    desc: 'GLP-1 acts on brain receptors to naturally reduce hunger and food cravings',
    accent: C.saffron,
    accentBg: C.saffronLight,
  },
  {
    icon: StomachIcon,
    title: 'Slows digestion',
    desc: 'Keeps you feeling full longer after meals, reducing overall calorie intake',
    accent: C.green,
    accentBg: C.greenLight,
  },
  {
    icon: BloodSugarIcon,
    title: 'Regulates blood sugar',
    desc: 'Improves insulin sensitivity, reducing fat storage and sugar cravings',
    accent: C.navy,
    accentBg: '#E8ECF3',
  },
];

const medications = [
  {
    name: 'Semaglutide',
    frequency: 'Weekly injection',
    weightLoss: '15-17%',
    highlight: 'Most prescribed globally',
    brands: 'Ozempic, Wegovy',
    accent: C.green,
    accentBg: C.greenLight,
    benefits: [
      'Once-weekly dosing for maximum convenience',
      'Clinically proven in large-scale trials',
      'Significant appetite reduction reported by patients',
      'Supports long-term weight management',
    ],
  },
  {
    name: 'Liraglutide',
    frequency: 'Daily injection',
    weightLoss: '8-10%',
    highlight: 'Proven safety record since 2014',
    brands: 'Saxenda',
    accent: C.info,
    accentBg: '#EBF2FF',
    benefits: [
      'Well-established safety and efficacy data',
      'Daily dosing allows fine-tuned control',
      'Effective for moderate weight loss goals',
      'Lower starting dose for sensitive patients',
    ],
  },
];

const sideEffects = [
  {
    text: 'Most common: mild nausea (usually resolves in 1-2 weeks)',
    icon: InfoIcon,
  },
  {
    text: 'Your Halka doctor monitors and adjusts dosage to minimize side effects',
    icon: ShieldIcon,
  },
  {
    text: 'Gradual dose titration ensures your body adjusts comfortably',
    icon: CheckIcon,
  },
];

/* ─── Component ─── */

export default function MedicationInfo() {
  const [sideEffectsOpen, setSideEffectsOpen] = useState(false);

  return (
    <section
      className="medinfo-section"
      style={{ background: C.bgPrimary, padding: '100px 24px', overflow: 'hidden' }}
    >
      <style>{`
        .medinfo-section a { text-decoration: none; }
        .medinfo-step:hover {
          transform: translateY(-4px);
          box-shadow: ${C.shadowLg} !important;
        }
        .medinfo-card:hover {
          transform: translateY(-4px);
          box-shadow: ${C.shadowLg} !important;
        }
        .medinfo-side-toggle:hover {
          background: ${C.borderLight} !important;
        }
        @media (max-width: 767px) {
          .medinfo-section { padding: 60px 16px !important; }
          .medinfo-steps-grid { flex-direction: column !important; align-items: center !important; }
          .medinfo-step { max-width: 360px !important; width: 100% !important; }
          .medinfo-step-wrapper { flex-direction: column !important; }
          .medinfo-connector { display: none !important; }
          .medinfo-connector-v { display: flex !important; }
          .medinfo-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .medinfo-section { padding: 48px 12px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: C.greenLight,
            padding: '8px 20px',
            borderRadius: '24px',
            marginBottom: '20px',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: C.green,
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: C.green,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
            }}>
              Your medication
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: C.textPrimary,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            Understanding your medication
          </h2>
          <p style={{
            fontSize: '17px',
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            FDA-approved GLP-1 medications that work with your body&#39;s natural systems.
          </p>
        </div>

        {/* ── How GLP-1 Works ── */}
        <div style={{ marginBottom: '72px' }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '24px',
            color: C.textPrimary,
            textAlign: 'center' as const,
            marginBottom: '40px',
          }}>
            How GLP-1 Works
          </h3>

          <div
            className="medinfo-steps-grid"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: '0px',
            }}
          >
            {glpSteps.map((step, i) => (
              <div key={i} className="medinfo-step-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                {/* Step card */}
                <div
                  className="medinfo-step"
                  style={{
                    background: C.white,
                    borderRadius: '20px',
                    padding: '36px 28px',
                    textAlign: 'center' as const,
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowMd,
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '280px',
                    minHeight: '240px',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    alignItems: 'center',
                    position: 'relative' as const,
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    position: 'absolute' as const,
                    top: '16px',
                    left: '16px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: step.accentBg,
                    color: step.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '13px',
                  }}>
                    {i + 1}
                  </div>

                  {/* Icon circle */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: step.accentBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <step.icon color={step.accent} />
                  </div>

                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: C.textPrimary,
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: C.textSecondary,
                    lineHeight: 1.7,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>

                {/* Horizontal connector arrow (desktop) */}
                {i < glpSteps.length - 1 && (
                  <div
                    className="medinfo-connector"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 4px',
                    }}
                  >
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                      <line x1="0" y1="12" x2="38" y2="12" stroke={C.border} strokeWidth="2" strokeDasharray="6 4" />
                      <polyline points="34,6 42,12 34,18" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Vertical connector arrow (mobile, hidden by default) */}
                {i < glpSteps.length - 1 && (
                  <div
                    className="medinfo-connector-v"
                    style={{
                      display: 'none',
                      justifyContent: 'center',
                      padding: '8px 0',
                    }}
                  >
                    <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                      <line x1="12" y1="0" x2="12" y2="30" stroke={C.border} strokeWidth="2" strokeDasharray="6 4" />
                      <polyline points="6,26 12,34 18,26" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Medication Comparison Cards ── */}
        <div style={{ marginBottom: '48px' }}>
          <div
            className="medinfo-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {medications.map((med) => (
              <div
                key={med.name}
                className="medinfo-card"
                style={{
                  background: C.white,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowMd,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column' as const,
                }}
              >
                {/* Top accent bar */}
                <div style={{ height: '4px', background: med.accent }} />

                <div style={{ padding: '32px 28px 28px' }}>
                  {/* Header */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: '24px',
                      color: C.textPrimary,
                      marginBottom: '6px',
                    }}>
                      {med.name}
                    </h4>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      color: C.textMuted,
                      margin: 0,
                    }}>
                      Common brand{med.brands.includes(',') ? 's' : ''}: {med.brands}
                    </p>
                  </div>

                  {/* Key stats */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px',
                  }}>
                    <div style={{
                      flex: 1,
                      background: med.accentBg,
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center' as const,
                    }}>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '14px',
                        color: med.accent,
                        marginBottom: '4px',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                      }}>
                        Frequency
                      </div>
                      <div style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: C.textPrimary,
                      }}>
                        {med.frequency}
                      </div>
                    </div>
                    <div style={{
                      flex: 1,
                      background: med.accentBg,
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center' as const,
                    }}>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '14px',
                        color: med.accent,
                        marginBottom: '4px',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                      }}>
                        Avg. Weight Loss
                      </div>
                      <div style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: C.textPrimary,
                      }}>
                        {med.weightLoss}
                      </div>
                    </div>
                  </div>

                  {/* Highlight badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: C.greenLight,
                    padding: '6px 14px',
                    borderRadius: '20px',
                    marginBottom: '20px',
                  }}>
                    <CheckIcon color={C.green} />
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: C.green,
                    }}>
                      {med.highlight}
                    </span>
                  </div>

                  {/* Benefits list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                    {med.benefits.map((b, j) => (
                      <li key={j} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: j < med.benefits.length - 1 ? '12px' : 0,
                      }}>
                        <span style={{
                          marginTop: '3px',
                          flexShrink: 0,
                        }}>
                          <CheckIcon color={C.green} />
                        </span>
                        <span style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '14px',
                          color: C.textSecondary,
                          lineHeight: 1.6,
                        }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Doctor note */}
                  <div style={{
                    background: C.bgPrimary,
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{ flexShrink: 0 }}>
                      <ShieldIcon color={C.green} />
                    </span>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      color: C.textSecondary,
                      lineHeight: 1.5,
                      fontStyle: 'italic' as const,
                    }}>
                      Your doctor will recommend the right option for you
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Side Effects (Collapsible) ── */}
        <div style={{
          background: C.white,
          borderRadius: '16px',
          border: `1px solid ${C.borderLight}`,
          boxShadow: C.shadowSm,
          marginBottom: '40px',
          overflow: 'hidden',
        }}>
          <button
            className="medinfo-side-toggle"
            onClick={() => setSideEffectsOpen(!sideEffectsOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 28px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <InfoIcon color={C.textSecondary} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '17px',
                color: C.textPrimary,
              }}>
                What about side effects?
              </span>
            </div>
            <ChevronDown open={sideEffectsOpen} />
          </button>

          <div
            style={{
              maxHeight: sideEffectsOpen ? '400px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div style={{
              padding: '0 28px 24px',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '16px',
            }}>
              {sideEffects.map((se, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: C.bgPrimary,
                  borderRadius: '12px',
                  padding: '16px 18px',
                }}>
                  <span style={{ marginTop: '1px', flexShrink: 0 }}>
                    <se.icon color={C.green} />
                  </span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '15px',
                    color: C.textSecondary,
                    lineHeight: 1.6,
                  }}>
                    {se.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Note ── */}
        <div style={{
          textAlign: 'center' as const,
          padding: '24px',
          background: C.greenLight,
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <ShieldIcon color={C.green} />
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px',
            color: C.greenDark,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.5,
          }}>
            All medications prescribed by licensed Indian doctors after thorough consultation.
          </p>
        </div>
      </div>
    </section>
  );
}
