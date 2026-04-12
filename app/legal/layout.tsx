'use client';

import Link from 'next/link';
import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: C.white }}>
      {/* Fixed Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              color: C.textSecondary,
              fontSize: 14,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke={C.textSecondary}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>
          <div style={{ flex: 1 }} />
          <Link
            href="/"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.saffron,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            halka
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: '24px 20px',
          background: C.bgPrimary,
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            color: C.textMuted,
          }}
        >
          <span>&copy; {new Date().getFullYear()} Halka Health. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/legal/terms" style={{ color: C.textMuted, textDecoration: 'none' }}>
              Terms
            </Link>
            <Link href="/legal/privacy" style={{ color: C.textMuted, textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="/legal/disclaimer" style={{ color: C.textMuted, textDecoration: 'none' }}>
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
