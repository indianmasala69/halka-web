'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function Footer() {
  return (
    <footer style={{ background: C.cream, padding: "48px 24px 32px", borderTop: `1px solid ${C.borderLight}` }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", marginBottom: "40px" }}>
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "22px", color: C.charcoal }}>halka</span>
              <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: "12px", color: C.saffron }}>हल्का</span>
            </div>
            <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.6 }}>Doctor-led weight loss for India. Licensed doctors, proven treatments, real results.</p>
          </div>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[
              { title: "Programs", links: ["Weight Loss", "GLP-1 Therapy", "Pricing"] },
              { title: "Support", links: ["WhatsApp Us", "FAQ", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms", "Medical Consent"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: C.charcoal, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>{col.title}</div>
                {col.links.map((l, j) => <div key={j} style={{ fontSize: "13px", color: C.textMuted, marginBottom: "10px", cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: "20px", fontSize: "11px", color: C.textMuted, lineHeight: 1.8 }}>
          <p>Medical consultations provided by independent licensed practitioners following Telemedicine Practice Guidelines 2020.</p>
          <p style={{ marginTop: "8px" }}>© 2026 Halka Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
