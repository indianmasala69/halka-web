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

function RingIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 } as any}
    >
      <circle cx="9" cy="9" r="7" stroke="#9333EA" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="5" r="2" fill="#9333EA" opacity="0.7" />
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
                className="halka-pricing-card"
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
                    ? `0 8px 32px rgba(255, 107, 44, 0.12), ${C.shadowMd}`
                    : C.shadowSm,
                  overflow: 'hidden',
                } as any}
              >
                {/* Top Accent Bar */}
                <div
                  style={{
                    height: '4px',
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
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: C.saffron,
                        color: C.white,
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        padding: '5px 12px',
                        borderRadius: '100px',
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase' as const,
                      } as any}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  {/* Pre-Wedding Tag */}
                  {isPreWedding && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: '#F3E8FF',
                        color: '#7C3AED',
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        padding: '5px 12px',
                        borderRadius: '100px',
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase' as const,
                      } as any}
                    >
                      <RingIcon />
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
                      paddingRight: isPopular || isPreWedding ? '110px' : '0',
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
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '13px',
                        color: C.textMuted,
                        marginTop: '6px',
                        marginBottom: 0,
                      } as any}
                    >
                      ~{'\u20B9'}{perWeek.toLocaleString('en-IN')}/week
                    </p>
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
                          marginBottom: j < pkg.features.length - 1 ? '11px' : 0,
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
                        : isPreWedding
                        ? 'linear-gradient(135deg, #7C3AED, #9333EA)'
                        : C.textPrimary,
                      color: C.white,
                      border: 'none',
                      padding: '15px 24px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      minHeight: '50px',
                      textAlign: 'center' as const,
                      letterSpacing: '0.2px',
                      boxShadow: isPopular
                        ? '0 4px 14px rgba(255, 107, 44, 0.3)'
                        : isPreWedding
                        ? '0 4px 14px rgba(147, 51, 234, 0.25)'
                        : '0 2px 8px rgba(26, 26, 46, 0.15)',
                    } as any}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '48px',
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
            All packages include a 7-day money-back guarantee
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
        @media (max-width: 768px) {
          #pricing > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
