'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function TheScience() {
  const [sideEffectsOpen, setSideEffectsOpen] = useState(false);

  return (
    <section className="ts-section" style={{
      background: C.navy,
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        .ts-section { color: #E2E8F0; }
        .ts-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
        }
        .ts-med-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ts-med-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
        }
        .ts-side-toggle:hover { background: rgba(255,255,255,0.06) !important; }
        .ts-step-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          z-index: 0;
        }
        @media (max-width: 899px) {
          .ts-med-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
          .ts-hero-row { flex-direction: column !important; }
          .ts-hero-left { max-width: 100% !important; text-align: center !important; }
          .ts-hero-right { justify-content: center !important; }
        }
        @media (max-width: 767px) {
          .ts-section { padding: 64px 16px !important; }
          .ts-steps { flex-direction: column !important; gap: 0 !important; }
          .ts-step-line { display: none !important; }
          .ts-step-connector-h { display: none !important; }
          .ts-step-connector-v { display: flex !important; }
          .ts-problem-pills { flex-wrap: wrap !important; justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .ts-section { padding: 48px 12px !important; }
        }
      `}</style>

      {/* Background glows */}
      <div className="ts-glow" style={{ width: 500, height: 500, background: C.saffron, top: -100, right: -200 }} />
      <div className="ts-glow" style={{ width: 400, height: 400, background: C.green, bottom: -100, left: -150 }} />

      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Header Row: text left, problem pills right ── */}
        <div className="ts-hero-row" style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '48px',
          marginBottom: '72px',
        }}>
          <div className="ts-hero-left" style={{ maxWidth: '480px' }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '2px',
              color: C.saffron,
              marginBottom: '16px',
            }}>
              The Science
            </p>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              color: C.white,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
              Weight loss is biology.
              <br />
              <span style={{ color: C.saffron }}>Not willpower.</span>
            </h2>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '16px',
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: 0,
            }}>
              GLP-1 medications target the hormonal signals that drive weight gain — food noise, metabolic resistance, and the yo-yo cycle. Your doctor prescribes the right one for you.
            </p>
          </div>

          {/* Problem pills - compact, right side */}
          <div className="ts-hero-right" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '12px',
          }}>
            {[
              { label: 'Food Noise', desc: 'Constant hunger signals', color: C.saffron },
              { label: 'Metabolic Resistance', desc: 'Slowed metabolism from dieting', color: '#F59E0B' },
              { label: 'Hormonal Imbalance', desc: 'Insulin & leptin disruption', color: C.info },
              { label: 'Yo-Yo Cycle', desc: '80% regain after dieting', color: '#A78BFA' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '14px 20px',
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                  boxShadow: `0 0 12px ${item.color}60`,
                }} />
                <div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    color: C.white,
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    color: '#94A3B8',
                    marginLeft: '8px',
                  }}>
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How GLP-1 Works: 3 steps ── */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'uppercase' as const,
            letterSpacing: '2px',
            color: '#64748B',
            marginBottom: '28px',
          }}>
            How GLP-1 works
          </p>

          <div className="ts-steps" style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '16px',
            position: 'relative',
          }}>
            {[
              { num: '01', title: 'Reduces appetite', desc: 'Acts on brain receptors to naturally quiet hunger signals and cravings', accent: C.saffron },
              { num: '02', title: 'Slows digestion', desc: 'Keeps you feeling full longer, reducing overall calorie intake', accent: C.green },
              { num: '03', title: 'Regulates blood sugar', desc: 'Improves insulin sensitivity, reducing fat storage', accent: C.info },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  position: 'relative',
                }}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '36px',
                    color: step.accent,
                    opacity: 0.2,
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    lineHeight: 1,
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    width: 4,
                    height: 32,
                    borderRadius: 2,
                    background: step.accent,
                    marginBottom: '16px',
                  }} />
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: C.white,
                    marginBottom: '8px',
                  }}>
                    {step.title}
                  </h4>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '13px',
                    color: '#94A3B8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>

                {/* Connector arrow */}
                {i < 2 && (
                  <svg className="ts-step-connector-h" width="32" height="20" viewBox="0 0 32 20" fill="none" style={{ flexShrink: 0, margin: '0 -4px' }}>
                    <line x1="2" y1="10" x2="22" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />
                    <polyline points="20,5 28,10 20,15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {/* Vertical connector (mobile) */}
                {i < 2 && (
                  <div className="ts-step-connector-v" style={{
                    display: 'none',
                    justifyContent: 'center',
                    padding: '8px 0',
                  }}>
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <line x1="10" y1="2" x2="10" y2="16" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />
                      <polyline points="5,14 10,22 15,14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Medication Cards ── */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'uppercase' as const,
            letterSpacing: '2px',
            color: '#64748B',
            marginBottom: '20px',
          }}>
            Your medication options
          </p>

          <div className="ts-med-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {/* Semaglutide */}
            <div className="ts-med-card" style={{
              background: 'linear-gradient(135deg, rgba(11,122,75,0.12) 0%, rgba(255,255,255,0.04) 100%)',
              border: '1px solid rgba(11,122,75,0.25)',
              borderRadius: '20px',
              padding: '28px 24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '22px',
                    color: C.white,
                    marginBottom: '4px',
                  }}>
                    Semaglutide
                  </h4>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    color: '#94A3B8',
                    margin: 0,
                  }}>
                    Ozempic / Wegovy
                  </p>
                </div>
                <div style={{
                  background: C.green,
                  color: C.white,
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  padding: '5px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.3px',
                }}>
                  Most prescribed
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '24px', color: C.white }}>
                    Weekly
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    injection
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '24px', color: C.green }}>
                    15-17%
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    avg. weight loss
                  </div>
                </div>
              </div>

              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13px',
                color: '#94A3B8',
                lineHeight: 1.6,
                margin: 0,
              }}>
                The gold standard in GLP-1 therapy. Once-weekly dosing for maximum convenience and clinically proven results.
              </p>
            </div>

            {/* Liraglutide */}
            <div className="ts-med-card" style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(255,255,255,0.04) 100%)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '20px',
              padding: '28px 24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '22px',
                    color: C.white,
                    marginBottom: '4px',
                  }}>
                    Liraglutide
                  </h4>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    color: '#94A3B8',
                    margin: 0,
                  }}>
                    Saxenda
                  </p>
                </div>
                <div style={{
                  background: C.info,
                  color: C.white,
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  padding: '5px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.3px',
                }}>
                  Since 2014
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '24px', color: C.white }}>
                    Daily
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    injection
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '24px', color: C.info }}>
                    8-10%
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    avg. weight loss
                  </div>
                </div>
              </div>

              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13px',
                color: '#94A3B8',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Well-established safety profile. Daily dosing allows fine-tuned control. Ideal for those starting their GLP-1 journey.
              </p>
            </div>
          </div>
        </div>

        {/* ── Side Effects (collapsible) ── */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          marginBottom: '32px',
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
              padding: '18px 24px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              color: C.white,
            }}>
              What about side effects?
            </span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.3s ease', transform: sideEffectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div style={{
            maxHeight: sideEffectsOpen ? '280px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{ padding: '0 24px 20px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {[
                'Most common: mild nausea, usually resolves in 1-2 weeks',
                'Your doctor monitors and adjusts dosage to minimize discomfort',
                'Gradual dose titration ensures your body adjusts comfortably',
              ].map((text, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '10px',
                }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: C.green,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '14px',
                    color: '#94A3B8',
                    lineHeight: 1.5,
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Note ── */}
        <div style={{
          textAlign: 'center' as const,
          padding: '16px',
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            color: '#64748B',
            margin: 0,
          }}>
            All medications prescribed by licensed Indian doctors after thorough consultation.
            <br />
            Your doctor will recommend the right option for you.
          </p>
        </div>
      </div>
    </section>
  );
}
