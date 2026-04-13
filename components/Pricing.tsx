'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { packages } from '@/lib/packages';

interface PricingProps {
  onQuiz: () => void;
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, marginTop: '2px' } as any}
    >
      <circle cx="8" cy="8" r="8" fill={C.greenLight} />
      <path
        d="M5 8.2L7 10.2L11 6.2"
        stroke={C.green}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pricing({ onQuiz }: PricingProps) {
  return (
    <section
      id="pricing"
      style={{
        background: `linear-gradient(180deg, ${C.white} 0%, ${C.bgWarm} 100%)`,
        padding: '100px 24px 80px',
      } as any}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' } as any}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' } as any}>
          <div
            style={{
              display: 'inline-block',
              background: C.saffronLight,
              color: C.saffron,
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              padding: '6px 16px',
              borderRadius: '100px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase' as const,
              marginBottom: '20px',
            } as any}
          >
            Pricing
          </div>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(30px, 5vw, 44px)',
              color: C.textPrimary,
              letterSpacing: '-0.6px',
              marginBottom: '16px',
              lineHeight: 1.15,
            } as any}
          >
            Choose your transformation
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '17px',
              color: C.textSecondary,
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            } as any}
          >
            Goal-based packages. Everything included — doctor, medication, coaching.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="halka-pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            alignItems: 'start',
          } as any}
        >
          <style>{`
            .halka-pricing-card {
              transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .halka-pricing-card:hover {
              transform: translateY(-4px);
            }
            .halka-pricing-card--popular {
              transform: scale(1.02);
            }
            .halka-pricing-card--popular:hover {
              transform: scale(1.02) translateY(-4px);
            }
            .halka-pricing-cta {
              transition: background 0.2s ease, transform 0.15s ease;
            }
            .halka-pricing-cta:hover {
              transform: scale(1.015);
            }
          `}</style>

          {packages.map((pkg) => {
            const perWeek = Math.round(pkg.price / pkg.durationWeeks);
            const isPopular = pkg.popular;
            const isPreWedding = pkg.id === 'pre-wedding';

            return (
              <div
                key={pkg.id}
                className={`halka-pricing-card${isPopular ? ' halka-pricing-card--popular' : ''}`}
                style={{
                  background: C.white,
                  borderRadius: '20px',
                  padding: '0',
                  border: isPopular
                    ? `2px solid ${C.saffron}`
                    : isPreWedding
                    ? `1.5px solid #D8B4FE`
                    : `1px solid ${C.border}`,
                  position: 'relative',
                  boxShadow: isPopular
                    ? `0 12px 40px rgba(255, 107, 44, 0.18), 0 4px 16px rgba(255, 107, 44, 0.1)`
                    : C.shadowSm,
                  overflow: 'hidden',
                } as any}
              >
                {/* Top Accent Bar */}
                <div
                  style={{
                    height: isPopular ? '6px' : '4px',
                    background: isPopular
                      ? `linear-gradient(90deg, ${C.saffron}, ${C.saffronHover})`
                      : isPreWedding
                      ? 'linear-gradient(90deg, #9333EA, #C084FC)'
                      : pkg.id === 'pcos-weight-management'
                      ? 'linear-gradient(90deg, #E91E8C, #F472B6)'
                      : `linear-gradient(90deg, #3B82F6, #60A5FA)`,
                    width: '100%',
                  } as any}
                />

                <div style={{ padding: '32px 28px 28px' } as any}>
                  {/* Popular Badge */}
                  {isPopular && (
                    <div
                      style={{
                        display: 'inline-block',
                        background: C.saffron,
                        color: C.white,
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        padding: '5px 12px',
                        borderRadius: '100px',
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase' as const,
                        marginBottom: '10px',
                      } as any}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  {/* Pre-Wedding Tag */}
                  {isPreWedding && (
                    <div
                      style={{
                        display: 'inline-block',
                        background: '#F3E8FF',
                        color: '#7C3AED',
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        padding: '5px 12px',
                        borderRadius: '100px',
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase' as const,
                        marginBottom: '10px',
                      } as any}
                    >
                      LIMITED
                    </div>
                  )}

                  {/* Package Name */}
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '22px',
                      color: C.textPrimary,
                      marginBottom: '6px',
                      marginTop: 0,
                      lineHeight: 1.3,
                      paddingRight: '0',
                    } as any}
                  >
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '14px',
                      color: C.textMuted,
                      marginBottom: '24px',
                      lineHeight: 1.55,
                      marginTop: 0,
                    } as any}
                  >
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div
                    style={{
                      marginBottom: '24px',
                      paddingBottom: '24px',
                      borderBottom: `1px solid ${C.borderLight}`,
                    } as any}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' } as any}>
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 800,
                          fontSize: '34px',
                          color: C.textPrimary,
                          letterSpacing: '-0.5px',
                          lineHeight: 1,
                        } as any}
                      >
                        {pkg.priceDisplay}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '14px',
                          color: C.textSecondary,
                          fontWeight: 500,
                        } as any}
                      >
                        / {pkg.duration}
                      </span>
                    </div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '13px',
                        fontWeight: 600,
                        color: C.textSecondary,
                        marginTop: '8px',
                        background: C.saffronLight,
                        padding: '4px 10px',
                        borderRadius: '6px',
                      } as any}
                    >
                      ~{'\u20B9'}{perWeek.toLocaleString('en-IN')}/week
                    </span>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: '28px' } as any}>
                    {pkg.features.map((feature, j) => (
                      <div
                        key={j}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          marginBottom: j < pkg.features.length - 1 ? '12px' : 0,
                        } as any}
                      >
                        <CheckIcon />
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '13.5px',
                            color: C.textSecondary,
                            lineHeight: 1.5,
                          } as any}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={onQuiz}
                    className="halka-pricing-cta"
                    style={{
                      width: '100%',
                      background: isPopular
                        ? `linear-gradient(135deg, ${C.saffron}, ${C.saffronDark})`
                        : C.saffron,
                      color: C.white,
                      border: 'none',
                      padding: isPopular ? '16px 24px' : '15px 24px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: isPopular ? '16px' : '15px',
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      minHeight: '50px',
                      textAlign: 'center' as const,
                      letterSpacing: '0.2px',
                      boxShadow: isPopular
                        ? '0 4px 14px rgba(255, 107, 44, 0.3)'
                        : '0 2px 8px rgba(255, 107, 44, 0.15)',
                    } as any}
                  >
                    Start Free Assessment
                  </button>

                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '12px',
                      color: C.textMuted,
                      textAlign: 'center' as const,
                      marginTop: '12px',
                      marginBottom: 0,
                    } as any}
                  >
                    No hidden fees. Includes free delivery.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '48px',
          } as any}
        >
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              background: C.greenLight,
              borderRadius: '16px',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '12px',
            } as any}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7V12C3 17.25 6.75 22.03 12 23C17.25 22.03 21 17.25 21 12V7L12 2Z"
                fill={C.greenLight}
                stroke={C.green}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12.5L10.5 14.5L15.5 9.5"
                stroke={C.green}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                color: C.greenDark,
                margin: 0,
                lineHeight: 1.3,
              } as any}
            >
              30-Day Results Guarantee
            </h4>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                color: C.textSecondary,
                margin: 0,
                lineHeight: 1.6,
                maxWidth: '480px',
              } as any}
            >
              If you don&apos;t see measurable progress in 30 days with our program, we&apos;ll refund your money. No questions asked.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          } as any}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              color: C.textSecondary,
              margin: 0,
              fontWeight: 500,
            } as any}
          >
            All packages include a 30-day results guarantee
          </p>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              color: C.textMuted,
              margin: 0,
            } as any}
          >
            EMI options available. Prices inclusive of medication, consultations, and delivery.
          </p>
        </div>
      </div>

      {/* Responsive Override */}
      <style>{`
        @media (max-width: 767px) {
          #pricing { padding: 60px 16px 60px !important; }
          .halka-pricing-grid { grid-template-columns: 1fr !important; max-width: 420px !important; margin: 0 auto !important; }
          .halka-pricing-card--popular { transform: none !important; }
          .halka-pricing-card--popular:hover { transform: translateY(-4px) !important; }
        }
        @media (max-width: 480px) {
          #pricing { padding: 48px 12px 48px !important; }
          .halka-pricing-card > div:last-child { padding: 24px 18px 22px !important; }
        }
      `}</style>
    </section>
  );
}
