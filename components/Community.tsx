'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const cards = [
  {
    title: "Private Community",
    desc: "Connect with fellow Halka members in our moderated WhatsApp groups. Share recipes, tips, and motivation.",
    iconBg: C.greenLight,
    iconColor: C.green,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    title: "Weekly Live Sessions",
    desc: "Join live Q&A sessions with our doctors every week. Get your questions answered in real-time.",
    iconBg: C.saffronLight,
    iconColor: C.saffron,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: "Success Stories",
    desc: "Read real transformation stories from members who have been where you are.",
    iconBg: "#FFF3E0",
    iconColor: C.warning,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const stats = [
  { value: "2,400+", label: "active members" },
  { value: "150+", label: "success stories" },
  { value: "Weekly", label: "live sessions" },
];

export default function Community() {
  return (
    <section className="halka-community" style={{
      background: C.cream,
      padding: "100px 24px",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .halka-community { padding: 60px 16px !important; }
          .halka-community-grid { grid-template-columns: 1fr !important; }
          .halka-community-stats { flex-direction: column !important; gap: 16px !important; }
          .halka-community-stats > div { border-right: none !important; border-bottom: 1px solid ${C.borderLight} !important; padding: 12px 0 !important; }
          .halka-community-stats > div:last-child { border-bottom: none !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.greenLight,
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "16px",
            fontSize: "13px",
            fontWeight: 600,
            color: C.green,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Community
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.textPrimary,
            letterSpacing: "-0.5px",
            marginBottom: "14px",
          }}>
            You're not alone in this
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "17px",
            color: C.textSecondary,
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            Join thousands of Indians on their weight loss journey. Share tips, celebrate wins, and stay motivated together.
          </p>
        </div>

        {/* Cards */}
        <div className="halka-community-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "48px",
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: C.white,
              borderRadius: "18px",
              padding: "32px 24px",
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowMd,
              transition: "all 0.25s ease",
            }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "14px",
                background: card.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.iconColor,
                marginBottom: "20px",
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: C.textPrimary,
                marginBottom: "10px",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                color: C.textSecondary,
                lineHeight: 1.7,
                margin: 0,
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          background: C.white,
          borderRadius: "16px",
          border: `1px solid ${C.borderLight}`,
          boxShadow: C.shadowSm,
          padding: "8px 0",
          marginBottom: "40px",
        }}>
          <div className="halka-community-stats" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: "center",
                padding: "20px 24px",
                borderRight: i < stats.length - 1 ? `1px solid ${C.borderLight}` : "none",
              }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  color: C.saffron,
                  marginBottom: "4px",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  color: C.textMuted,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://chat.whatsapp.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: C.green,
              color: C.white,
              border: "none",
              borderRadius: "12px",
              padding: "16px 32px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = C.greenDark}
            onMouseLeave={(e) => e.currentTarget.style.background = C.green}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Join the Halka Community
          </a>
        </div>
      </div>
    </section>
  );
}
