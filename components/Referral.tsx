'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

function ShareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="6" r="3.5" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <circle cx="8" cy="14" r="3.5" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <circle cx="20" cy="22" r="3.5" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <line x1="11.2" y1="15.6" x2="16.8" y2="20.4" stroke={C.saffron} strokeWidth="1.8" />
      <line x1="11.2" y1="12.4" x2="16.8" y2="7.6" stroke={C.saffron} strokeWidth="1.8" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="4.5" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <path d="M4 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={C.saffron} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="22" y1="8" x2="22" y2="16" stroke={C.saffron} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="12" x2="26" y2="12" stroke={C.saffron} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="22" height="13" rx="2" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <rect x="5" y="8" width="18" height="4" rx="1" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <line x1="14" y1="8" x2="14" y2="25" stroke={C.saffron} strokeWidth="1.8" />
      <path d="M14 8c0 0-2-4-5-4s-3 3 0 4" stroke={C.saffron} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M14 8c0 0 2-4 5-4s3 3 0 4" stroke={C.saffron} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const steps = [
  {
    icon: <ShareIcon />,
    title: 'Share your link',
    description: 'Send your unique referral code to friends and family',
  },
  {
    icon: <UserPlusIcon />,
    title: 'Friend joins',
    description: 'They sign up and purchase any Halka package',
  },
  {
    icon: <GiftIcon />,
    title: 'You both save',
    description: 'You get \u20B9500 off, they get \u20B9500 off their package',
  },
];

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'HALKA-XXXX';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hey! I've been using Halka for my weight loss journey and it's been amazing. Use my referral code ${referralCode} to get \u20B9500 off your first package. Check it out: https://halka.health`
  );

  return (
    <section
      id="referral"
      style={{
        background: C.bgWarm,
        padding: '100px 24px 80px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            }}
          >
            Referral Program
          </div>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 42px)',
              color: C.textPrimary,
              letterSpacing: '-0.5px',
              marginBottom: '14px',
              lineHeight: 1.15,
            }}
          >
            Refer a friend, earn rewards
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '17px',
              color: C.textSecondary,
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Share your transformation journey. When your friend joins Halka, you both save.
          </p>
        </div>

        {/* Steps */}
        <div
          className="referral-steps"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                borderRadius: '16px',
                padding: '32px 24px',
                textAlign: 'center',
                border: `1px solid ${C.border}`,
                boxShadow: C.shadowSm,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: C.saffronLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: C.saffron,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase' as const,
                  marginBottom: '8px',
                }}
              >
                Step {i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: C.textPrimary,
                  marginBottom: '8px',
                  marginTop: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '14px',
                  color: C.textSecondary,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Referral Code + Actions */}
        <div
          className="referral-code-box"
          style={{
            background: C.white,
            borderRadius: '20px',
            padding: '40px 32px',
            border: `1px solid ${C.border}`,
            boxShadow: C.shadowMd,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              color: C.textSecondary,
              marginBottom: '12px',
              marginTop: 0,
              fontWeight: 500,
            }}
          >
            Your referral code
          </p>

          {/* Code Box */}
          <div
            className="referral-code-inner"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: C.saffronLight,
              border: `2px dashed ${C.saffron}`,
              borderRadius: '12px',
              padding: '14px 24px',
              marginBottom: '24px',
            }}
          >
            <span
              className="referral-code-text"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '24px',
                color: C.saffron,
                letterSpacing: '2px',
              }}
            >
              {referralCode}
            </span>
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: copied ? C.green : C.saffron,
                color: C.white,
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'background 0.2s ease',
              }}
            >
              {copied ? <CheckSmallIcon /> : <CopyIcon />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div>
            <a
              className="referral-wa-btn"
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: C.white,
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                transition: 'transform 0.15s ease',
              }}
            >
              <WhatsAppIcon />
              Share on WhatsApp
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                color: C.saffron,
                marginBottom: '4px',
              }}
            >
              1,200+
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px',
                color: C.textSecondary,
                fontWeight: 500,
              }}
            >
              referrals made
            </div>
          </div>
          <div
            style={{
              width: '1px',
              background: C.border,
              alignSelf: 'stretch',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                color: C.saffron,
                marginBottom: '4px',
              }}
            >
              {'\u20B9'}6L+
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px',
                color: C.textSecondary,
                fontWeight: 500,
              }}
            >
              saved by patients
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 767px) {
          #referral { padding: 60px 16px 60px !important; }
          .referral-steps { grid-template-columns: 1fr !important; }
          .referral-code-box { padding: 28px 16px !important; }
          .referral-code-text { font-size: 18px !important; }
          .referral-code-inner { flex-direction: column !important; gap: 10px !important; }
          .referral-wa-btn { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
