'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ─── SVG Icons ─── */

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={C.saffron} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2h12v6a6 6 0 11-12 0V2z" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <path d="M6 4H3a1 1 0 00-1 1v1a4 4 0 004 4" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <path d="M18 4h3a1 1 0 011 1v1a4 4 0 01-4 4" stroke={C.saffron} strokeWidth="1.8" fill="none" />
      <line x1="12" y1="14" x2="12" y2="18" stroke={C.saffron} strokeWidth="1.8" />
      <rect x="8" y="18" width="8" height="3" rx="1" stroke={C.saffron} strokeWidth="1.8" fill="none" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: 'transform 0.25s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Data ─── */

const rewardTiers = [
  {
    count: 1,
    label: '1 referral',
    reward: '\u20B9500 off your next package',
    highlight: false,
  },
  {
    count: 3,
    label: '3 referrals',
    reward: '\u20B92,000 off + priority scheduling',
    highlight: false,
  },
  {
    count: 5,
    label: '5 referrals',
    reward: 'Free follow-up consultation',
    highlight: true,
  },
  {
    count: 10,
    label: '10 referrals',
    reward: 'Ambassador status + 20% off all packages',
    highlight: true,
  },
];

const mockReferrals = [
  { name: 'Amit K.', city: 'Mumbai', status: 'Joined' as const },
  { name: 'Priya S.', city: 'Delhi', status: 'Pending' as const },
];

const faqs = [
  {
    q: 'How do I share my referral code?',
    a: 'You can share your unique referral code via WhatsApp, email, or by copying the link directly. When your friend signs up and enters your code during checkout, the referral is tracked automatically.',
  },
  {
    q: 'When do I receive my referral reward?',
    a: 'Your reward is credited to your account within 48 hours after your friend completes their first package purchase. You will receive a notification via WhatsApp and email once the credit is applied.',
  },
  {
    q: 'Is there a limit to how many people I can refer?',
    a: 'There is no limit. The more friends you refer, the higher your reward tier. Once you reach 10 successful referrals, you unlock Ambassador status with ongoing 20% off all packages.',
  },
];

/* ─── Page Component ─── */

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const referralCode = 'HALKA-XXXX';
  const referralLink = `https://halka.health/r/${referralCode}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hey! I've been using Halka for my weight loss journey and it's been incredible. Use my referral code ${referralCode} to get \u20B9500 off your first package. Sign up here: ${referralLink}`
  );

  const emailSubject = encodeURIComponent('Join me on Halka - Get \u20B9500 off!');
  const emailBody = encodeURIComponent(
    `Hi,\n\nI've been using Halka for my weight loss journey and wanted to share it with you. It's a doctor-led program with personalized treatment plans.\n\nUse my referral code ${referralCode} to get \u20B9500 off your first package.\n\nSign up here: ${referralLink}\n\nBest regards`
  );

  return (
    <div style={{ background: C.cream, minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        ::selection { background: ${C.saffron}; color: white; }
        .referral-share-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .referral-share-btn:hover { transform: translateY(-2px); }
        .referral-tier-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .referral-tier-card:hover { transform: translateY(-3px); box-shadow: ${C.shadowLg}; }
        @media (max-width: 768px) {
          .referral-share-row { flex-direction: column !important; }
          .referral-tiers-grid { grid-template-columns: 1fr !important; }
          .referral-table-wrap { overflow-x: auto; }
        }
        @media (max-width: 480px) {
          .referral-hero-padding { padding: 60px 20px 40px !important; }
          .referral-section-padding { padding: 48px 20px !important; }
        }
      `}</style>

      {/* Back Nav */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '20px 24px 0',
        }}
      >
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            color: C.textSecondary,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <ArrowLeftIcon />
          Back to Halka
        </a>
      </div>

      {/* Hero */}
      <section
        className="referral-hero-padding"
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: C.saffronLight,
              color: C.saffron,
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              padding: '6px 16px',
              borderRadius: '100px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase' as const,
              marginBottom: '24px',
            }}
          >
            <TrophyIcon />
            Referral Program
          </div>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 52px)',
              color: C.textPrimary,
              letterSpacing: '-0.8px',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            Share Halka, Earn Rewards
          </h1>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '18px',
              color: C.textSecondary,
              lineHeight: 1.65,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Every friend you refer saves {'\u20B9'}500 on their first package, and you earn {'\u20B9'}500 in credits. The more you share, the more you save.
          </p>
        </div>
      </section>

      {/* Referral Code Card */}
      <section
        className="referral-section-padding"
        style={{ padding: '0 24px 60px' }}
      >
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            background: C.white,
            borderRadius: '24px',
            padding: '48px 32px',
            border: `1px solid ${C.border}`,
            boxShadow: C.shadowMd,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              color: C.textMuted,
              marginBottom: '8px',
              marginTop: 0,
              fontWeight: 500,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.6px',
            }}
          >
            Your referral code
          </p>

          {/* Large Code Display */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              background: C.saffronLight,
              border: `2px dashed ${C.saffron}`,
              borderRadius: '16px',
              padding: '20px 32px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 36px)',
                color: C.saffron,
                letterSpacing: '3px',
              }}
            >
              {referralCode}
            </span>
            <button
              onClick={handleCopyCode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: copied ? C.green : C.saffron,
                color: C.white,
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'background 0.2s ease',
                whiteSpace: 'nowrap' as const,
              }}
            >
              {copied ? <CheckSmallIcon /> : <CopyIcon />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Share Buttons */}
          <div
            className="referral-share-row"
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="referral-share-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: C.white,
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
              }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>

            <button
              onClick={handleCopyLink}
              className="referral-share-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: copiedLink ? C.green : C.textPrimary,
                color: C.white,
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'background 0.2s ease',
                boxShadow: '0 4px 14px rgba(26, 26, 46, 0.15)',
              }}
            >
              {copiedLink ? <CheckSmallIcon /> : <LinkIcon />}
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </button>

            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="referral-share-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: C.white,
                color: C.textPrimary,
                border: `1.5px solid ${C.border}`,
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: 'none',
              }}
            >
              <EmailIcon />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section
        className="referral-section-padding"
        style={{
          padding: '60px 24px',
          background: `linear-gradient(180deg, ${C.cream} 0%, ${C.bgWarm} 100%)`,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(26px, 4vw, 38px)',
                color: C.textPrimary,
                letterSpacing: '-0.5px',
                marginBottom: '12px',
              }}
            >
              Reward Tiers
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '16px',
                color: C.textSecondary,
                lineHeight: 1.6,
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              The more friends you refer, the bigger the rewards
            </p>
          </div>

          <div
            className="referral-tiers-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            {rewardTiers.map((tier, i) => (
              <div
                key={i}
                className="referral-tier-card"
                style={{
                  background: C.white,
                  borderRadius: '16px',
                  padding: '28px 24px',
                  border: tier.highlight
                    ? `2px solid ${C.saffron}`
                    : `1px solid ${C.border}`,
                  boxShadow: tier.highlight
                    ? `0 4px 20px rgba(255, 107, 44, 0.1), ${C.shadowSm}`
                    : C.shadowSm,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: tier.highlight
                      ? `linear-gradient(90deg, ${C.saffron}, ${C.saffronHover})`
                      : `linear-gradient(90deg, ${C.saffronLight}, ${C.saffron}40)`,
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: tier.highlight ? C.saffronLight : C.bgPrimary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '18px',
                        color: tier.highlight ? C.saffron : C.textSecondary,
                      }}
                    >
                      {tier.count}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: '16px',
                        color: C.textPrimary,
                        marginBottom: '4px',
                      }}
                    >
                      {tier.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '14px',
                        color: tier.highlight ? C.saffronDark : C.textSecondary,
                        lineHeight: 1.5,
                        fontWeight: tier.highlight ? 600 : 400,
                      }}
                    >
                      {tier.reward}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Referrals */}
      <section
        className="referral-section-padding"
        style={{
          padding: '60px 24px',
          background: C.cream,
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 32px)',
              color: C.textPrimary,
              letterSpacing: '-0.4px',
              marginBottom: '24px',
            }}
          >
            Your Referrals
          </h2>

          <div
            className="referral-table-wrap"
            style={{
              background: C.white,
              borderRadius: '16px',
              border: `1px solid ${C.border}`,
              boxShadow: C.shadowSm,
              overflow: 'hidden',
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 120px',
                padding: '14px 24px',
                background: C.bgPrimary,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {['Name', 'City', 'Status'].map((h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: C.textMuted,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.6px',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {mockReferrals.map((ref, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 120px',
                  padding: '16px 24px',
                  borderBottom: i < mockReferrals.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '15px',
                    color: C.textPrimary,
                    fontWeight: 600,
                  }}
                >
                  {ref.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '14px',
                    color: C.textSecondary,
                  }}
                >
                  {ref.city}
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '100px',
                      background: ref.status === 'Joined' ? C.greenLight : C.saffronLight,
                      color: ref.status === 'Joined' ? C.green : C.saffronDark,
                    }}
                  >
                    {ref.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="referral-section-padding"
        style={{
          padding: '60px 24px',
          background: C.bgPrimary,
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 32px)',
              color: C.textPrimary,
              letterSpacing: '-0.4px',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Referral FAQ
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '15px',
              color: C.textSecondary,
              textAlign: 'center',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Common questions about the referral program
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: C.white,
                    borderRadius: '14px',
                    border: `1px solid ${isOpen ? C.saffron + '40' : C.border}`,
                    boxShadow: C.shadowSm,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '18px 24px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: C.textPrimary,
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 18px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '14px',
                          color: C.textSecondary,
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section
        className="referral-section-padding"
        style={{
          padding: '40px 24px 80px',
          background: C.bgPrimary,
        }}
      >
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            background: C.warmWhite,
            borderRadius: '14px',
            padding: '24px 28px',
            border: `1px solid ${C.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              color: C.textPrimary,
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            Terms and Conditions
          </h3>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              color: C.textSecondary,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Referral rewards are applied as credits to your account. Both you and your friend must have an active package. Credits cannot be converted to cash and expire 6 months after issue. Halka reserves the right to modify or discontinue the referral program at any time. Ambassador status is reviewed quarterly based on active referrals.
          </p>
        </div>
      </section>
    </div>
  );
}
