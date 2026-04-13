'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ─── Inline SVG Icons ─── */

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
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

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Data ─── */

const problemItems = [
  {
    label: 'Food Noise',
    accent: C.green,
    bg: C.greenLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
  {
    label: 'Metabolic Resistance',
    accent: C.saffron,
    bg: '#FFF5F0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-3.5 7-7.58 7-12a7 7 0 0 0-14 0c0 4.42 3 8.5 7 12z" />
        <path d="M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      </svg>
    ),
  },
  {
    label: 'Hormonal Imbalance',
    accent: C.info,
    bg: '#F0F4FF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M6 7l-4 8h8L6 7z" />
        <path d="M18 7l-4 8h8l-4-8z" />
        <path d="M6 7h12" />
      </svg>
    ),
  },
  {
    label: 'Yo-Yo Cycle',
    accent: C.warning,
    bg: '#FFF8EE',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
    ),
  },
];

const glpFlow = [
  { label: 'Reduces appetite', accent: C.saffron, bg: C.saffronLight },
  { label: 'Slows digestion', accent: C.green, bg: C.greenLight },
  { label: 'Regulates blood sugar', accent: C.navy, bg: '#E8ECF3' },
];

const medications = [
  {
    name: 'Semaglutide',
    frequency: 'Weekly injection',
    weightLoss: '15-17%',
    highlight: 'Most prescribed globally',
    accent: C.green,
    accentBg: C.greenLight,
  },
  {
    name: 'Liraglutide',
    frequency: 'Daily injection',
    weightLoss: '8-10%',
    highlight: 'Proven safety record since 2014',
    accent: C.info,
    accentBg: '#EBF2FF',
  },
];

const sideEffects = [
  { text: 'Most common: mild nausea (usually resolves in 1-2 weeks)', icon: InfoIcon },
  { text: 'Your Halka doctor monitors and adjusts dosage to minimize side effects', icon: ShieldIcon },
  { text: 'Gradual dose titration ensures your body adjusts comfortably', icon: CheckIcon },
];

/* ─── Component ─── */

export default function TheScience() {
  const [sideEffectsOpen, setSideEffectsOpen] = useState(false);

  return (
    <section className="ts-section" style={{ background: C.bgPrimary, padding: '80px 24px' }}>
      <style>{`
        .ts-section * { box-sizing: border-box; }
        .ts-problem-item:hover { transform: translateY(-2px); box-shadow: ${C.shadowMd} !important; }
        .ts-med-card:hover { transform: translateY(-3px); box-shadow: ${C.shadowLg} !important; }
        .ts-side-toggle:hover { background: ${C.borderLight} !important; }
        @media (max-width: 767px) {
          .ts-section { padding: 48px 16px !important; }
          .ts-header { text-align: center !important; }
          .ts-problem-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .ts-glp-flow { flex-direction: column !important; align-items: center !important; }
          .ts-flow-arrow-h { display: none !important; }
          .ts-flow-arrow-v { display: block !important; }
          .ts-med-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .ts-problem-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* ── Header (right-aligned) ── */}
        <div className="ts-header" style={{ textAlign: 'right' as const, marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: C.greenLight,
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '14px',
            fontSize: '12px',
            fontWeight: 700,
            color: C.green,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textTransform: 'uppercase' as const,
            letterSpacing: '1px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            The Science
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4.5vw, 44px)',
            color: C.textPrimary,
            letterSpacing: '-1.2px',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}>
            The science behind halka
          </h2>
          <p style={{
            fontSize: '16px',
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.6,
            margin: 0,
            marginLeft: 'auto',
            maxWidth: '480px',
          }}>
            GLP-1 medications work with your body&#39;s biology, not against it.
          </p>
        </div>

        {/* ── First Half: The Problem (compact strip) ── */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: C.textPrimary,
            marginBottom: '16px',
            lineHeight: 1.5,
          }}>
            Weight gain is driven by biology — not discipline.
          </p>
          <div
            className="ts-problem-strip"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {problemItems.map((item, i) => (
              <div
                key={i}
                className="ts-problem-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: C.white,
                  borderRadius: '14px',
                  padding: '14px 16px',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowSm,
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: item.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.accent,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  color: C.textPrimary,
                  lineHeight: 1.3,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Second Half: The Solution ── */}

        {/* GLP-1 horizontal flow */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            color: C.textPrimary,
            marginBottom: '20px',
          }}>
            How GLP-1 Works
          </h3>
          <div
            className="ts-glp-flow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
            }}
          >
            {glpFlow.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: step.bg,
                  borderRadius: '12px',
                  padding: '12px 18px',
                  border: `1.5px solid ${step.accent}20`,
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '8px',
                    background: C.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '13px',
                    color: step.accent,
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    color: C.textPrimary,
                    whiteSpace: 'nowrap' as const,
                  }}>
                    {step.label}
                  </span>
                </div>

                {/* Horizontal arrow */}
                {i < glpFlow.length - 1 && (
                  <svg className="ts-flow-arrow-h" width="36" height="20" viewBox="0 0 36 20" fill="none" style={{ flexShrink: 0, margin: '0 2px' }}>
                    <line x1="2" y1="10" x2="26" y2="10" stroke={C.border} strokeWidth="2" strokeDasharray="5 3" />
                    <polyline points="22,5 30,10 22,15" fill="none" stroke={C.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}

                {/* Vertical arrow (mobile) */}
                {i < glpFlow.length - 1 && (
                  <svg className="ts-flow-arrow-v" width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ display: 'none', margin: '4px auto' }}>
                    <line x1="10" y1="2" x2="10" y2="20" stroke={C.border} strokeWidth="2" strokeDasharray="5 3" />
                    <polyline points="5,16 10,24 15,16" fill="none" stroke={C.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medication comparison cards (compact) */}
        <div className="ts-med-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}>
          {medications.map((med) => (
            <div
              key={med.name}
              className="ts-med-card"
              style={{
                background: C.white,
                borderRadius: '16px',
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ height: '3px', background: med.accent }} />
              <div style={{ padding: '20px 20px 18px' }}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '20px',
                  color: C.textPrimary,
                  marginBottom: '12px',
                }}>
                  {med.name}
                </h4>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    flex: 1,
                    background: med.accentBg,
                    borderRadius: '10px',
                    padding: '10px 12px',
                    textAlign: 'center' as const,
                  }}>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '11px',
                      color: med.accent,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      marginBottom: '2px',
                    }}>
                      Frequency
                    </div>
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: C.textPrimary,
                    }}>
                      {med.frequency}
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    background: med.accentBg,
                    borderRadius: '10px',
                    padding: '10px 12px',
                    textAlign: 'center' as const,
                  }}>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '11px',
                      color: med.accent,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      marginBottom: '2px',
                    }}>
                      Avg. Weight Loss
                    </div>
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
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
                  padding: '5px 12px',
                  borderRadius: '16px',
                }}>
                  <CheckIcon color={C.green} />
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    color: C.green,
                  }}>
                    {med.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side effects accordion */}
        <div style={{
          background: C.white,
          borderRadius: '14px',
          border: `1px solid ${C.borderLight}`,
          boxShadow: C.shadowSm,
          marginBottom: '24px',
          overflow: 'hidden',
        }}>
          <button
            className="ts-side-toggle"
            onClick={() => setSideEffectsOpen(!sideEffectsOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 22px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <InfoIcon color={C.textSecondary} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: C.textPrimary,
              }}>
                What about side effects?
              </span>
            </div>
            <ChevronDown open={sideEffectsOpen} />
          </button>

          <div style={{
            maxHeight: sideEffectsOpen ? '320px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{
              padding: '0 22px 20px',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '10px',
            }}>
              {sideEffects.map((se, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: C.bgPrimary,
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}>
                  <span style={{ marginTop: '1px', flexShrink: 0 }}>
                    <se.icon color={C.green} />
                  </span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '14px',
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
          padding: '18px 24px',
          background: C.greenLight,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <ShieldIcon color={C.green} />
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            color: C.greenDark,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.5,
          }}>
            All medications prescribed by licensed Indian doctors. Your doctor will recommend the right option.
          </p>
        </div>
      </div>
    </section>
  );
}
