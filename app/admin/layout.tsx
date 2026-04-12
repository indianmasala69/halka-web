'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: '◻', href: '/admin' },
  { label: 'Users', icon: '👤', href: '/admin/users' },
  { label: 'Bookings', icon: '📅', href: '/admin/bookings' },
  { label: 'Revenue', icon: '₹', href: '/admin/revenue' },
  { label: 'Blog', icon: '✎', href: '/admin/blog' },
  { label: 'Settings', icon: '⚙', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bgPrimary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '240px',
          background: C.navy,
          zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Branding */}
        <div style={{ padding: '24px 20px', borderBottom: `1px solid ${C.navyLight}` }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '22px',
            color: C.white,
            letterSpacing: '-0.5px',
          }}>
            halka
          </span>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: C.saffron,
            marginLeft: '8px',
            textTransform: 'uppercase' as const,
            letterSpacing: '1px',
          }}>
            admin
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                color: i === 0 ? C.white : 'rgba(255,255,255,0.6)',
                background: i === 0 ? C.navyLight : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: i === 0 ? 600 : 500,
                marginBottom: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' as const }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 20px', borderTop: `1px solid ${C.navyLight}` }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            Halka Health Admin v1.0
          </div>
        </div>
      </aside>

      {/* Desktop sidebar (always visible) */}
      <style>{`
        @media (min-width: 769px) {
          aside { transform: translateX(0) !important; }
        }
      `}</style>

      {/* Main content */}
      <div style={{
        flex: 1,
        marginLeft: '0px',
        minHeight: '100vh',
      }}>
        <style>{`
          @media (min-width: 769px) {
            .admin-main-content { margin-left: 240px !important; }
          }
        `}</style>

        {/* Top bar */}
        <header
          className="admin-main-content"
          style={{
            height: '60px',
            background: C.white,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Hamburger for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              fontSize: '20px',
              color: C.textPrimary,
            }}
          >
            <span style={{ display: 'none' }} className="desktop-hide">&#9776;</span>
            <style>{`
              @media (max-width: 768px) {
                .desktop-hide { display: inline !important; }
              }
              @media (min-width: 769px) {
                .desktop-hide { display: none !important; }
              }
            `}</style>
            <span className="desktop-hide">&#9776;</span>
          </button>

          {/* Admin user */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: C.saffronLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: C.saffron,
            }}>
              A
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: C.textPrimary }}>Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-main-content" style={{ padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
