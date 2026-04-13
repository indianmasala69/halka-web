'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const columns = [
  {
    title: "Packages",
    links: [
      { label: "Lose 5-10 kg", href: "/checkout?package=lose-5-10-kg" },
      { label: "Lose 10-20 kg", href: "/checkout?package=lose-10-20-kg" },
      { label: "Pre-Wedding", href: "/checkout?package=pre-wedding" },
      { label: "PCOS Management", href: "/checkout?package=pcos-weight-management" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "AI Health Coach", href: "/coach" },
      { label: "Book Consultation", href: "/booking" },
      { label: "Refer a Friend", href: "/referral" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Medical Disclaimer", href: "/legal/disclaimer" },
      { label: "Refund Policy", href: "/legal/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "WhatsApp", href: "https://wa.me/919876543210" },
      { label: "Instagram", href: "https://instagram.com/halkahealth" },
      { label: "Email", href: "mailto:hello@halka.health" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="halka-footer" style={{
      background: C.white,
      borderTop: `1px solid ${C.border}`,
      padding: "48px 24px 32px",
    }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Top: logo + columns */}
        <div className="halka-footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.5fr repeat(4, 1fr)",
          gap: "32px",
          marginBottom: "40px",
        }}>
          {/* Logo section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                color: C.textPrimary,
              }}>
                halka
              </span>
              <span style={{
                fontFamily: "'Noto Sans Devanagari'",
                fontSize: "12px",
                color: C.saffron,
              }}>
                हल्का
              </span>
            </div>
            <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.6, maxWidth: "220px" }}>
              Doctor-led weight loss for India
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <div style={{
                fontSize: "12px",
                fontWeight: 700,
                color: C.textPrimary,
                marginBottom: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>
                {col.title}
              </div>
              {col.links.map((link, j) => {
                const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
                return (
                  <a
                    key={j}
                    href={link.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      display: "block",
                      fontSize: "13px",
                      color: C.textMuted,
                      padding: "6px 0",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        {/* Responsive override for mobile: stack columns */}
        <style>{`
          @media (max-width: 767px) {
            .halka-footer { padding: 40px 16px 24px !important; }
            .halka-footer-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 24px !important;
            }
          }
          @media (max-width: 480px) {
            .halka-footer-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Medical disclaimer */}
        <div style={{
          borderTop: `1px solid ${C.borderLight}`,
          paddingTop: "20px",
          marginBottom: "16px",
        }}>
          <p style={{ fontSize: "11px", color: C.textMuted, lineHeight: 1.8 }}>
            halka is a telehealth platform. All medications are prescribed by licensed physicians.
            halka does not provide emergency medical services.
          </p>
        </div>

        {/* Copyright */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          <p style={{ fontSize: "11px", color: C.textMuted }}>
            © 2025 Halka Health Pvt. Ltd. All rights reserved.
          </p>
          <p style={{ fontSize: "11px", color: C.textMuted }}>
            CIN: U74999XX2024PTC000000
          </p>
        </div>
      </div>
    </footer>
  );
}
