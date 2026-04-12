'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { useState } from 'react';

const overviewCards = [
  { label: 'Total Users', value: '2,847', trend: '+12%', trendUp: true, period: 'vs last month' },
  { label: 'New This Week', value: '186', trend: '+23%', trendUp: true, period: 'vs last week' },
  { label: 'Active Subscriptions', value: '1,423', trend: '+8%', trendUp: true, period: 'vs last month' },
  { label: 'Revenue This Month', value: '₹18.4L', trend: '+15%', trendUp: true, period: 'vs last month' },
];

const mockUsers = [
  { name: 'Priya Mehta', email: 'priya.m@gmail.com', plan: 'GLP-1 Premium', status: 'Active', joined: '2026-03-15' },
  { name: 'Rajesh Kumar', email: 'rajesh.k@outlook.com', plan: 'Basic Plan', status: 'Active', joined: '2026-03-22' },
  { name: 'Anita Desai', email: 'anita.d@yahoo.com', plan: 'GLP-1 Premium', status: 'Pending', joined: '2026-04-01' },
  { name: 'Vikram Singh', email: 'vikram.s@gmail.com', plan: 'Metabolic Plan', status: 'Active', joined: '2026-04-05' },
  { name: 'Sunita Patel', email: 'sunita.p@gmail.com', plan: 'Basic Plan', status: 'Cancelled', joined: '2026-02-10' },
  { name: 'Arjun Reddy', email: 'arjun.r@hotmail.com', plan: 'GLP-1 Premium', status: 'Active', joined: '2026-04-10' },
];

const mockBookings = [
  { patient: 'Priya Mehta', doctor: 'Dr. Anand Sharma', date: '2026-04-13', time: '10:00 AM', status: 'Confirmed' },
  { patient: 'Rajesh Kumar', doctor: 'Dr. Priya Nair', date: '2026-04-13', time: '11:30 AM', status: 'Confirmed' },
  { patient: 'Anita Desai', doctor: 'Dr. Meenakshi Iyer', date: '2026-04-14', time: '2:00 PM', status: 'Pending' },
  { patient: 'Vikram Singh', doctor: 'Dr. Anand Sharma', date: '2026-04-14', time: '4:00 PM', status: 'Confirmed' },
  { patient: 'Arjun Reddy', doctor: 'Dr. Priya Nair', date: '2026-04-15', time: '9:00 AM', status: 'Rescheduled' },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Active: { bg: '#E6F5EE', color: '#0B7A4B' },
  Pending: { bg: '#FEF3C7', color: '#B45309' },
  Cancelled: { bg: '#FEE2E2', color: '#DC2626' },
  Confirmed: { bg: '#E6F5EE', color: '#0B7A4B' },
  Rescheduled: { bg: '#DBEAFE', color: '#2563EB' },
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(
    u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '28px',
          fontWeight: 700,
          color: C.textPrimary,
          margin: 0,
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: C.textMuted, marginTop: '4px' }}>
          Overview of your platform metrics
        </p>
      </div>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <style>{`
          @media (max-width: 900px) {
            .overview-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 540px) {
            .overview-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        {overviewCards.map((card, i) => (
          <div key={i} className="overview-grid" style={{
            background: C.white,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: C.shadowSm,
            border: `1px solid ${C.borderLight}`,
          }}>
            <div style={{ fontSize: '13px', color: C.textMuted, fontWeight: 500, marginBottom: '8px' }}>
              {card.label}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '32px',
              fontWeight: 700,
              color: C.textPrimary,
              lineHeight: 1.1,
            }}>
              {card.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: card.trendUp ? C.green : '#DC2626',
              }}>
                {card.trendUp ? '↑' : '↓'} {card.trend}
              </span>
              <span style={{ fontSize: '11px', color: C.textMuted }}>{card.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table Section */}
      <div style={{
        background: C.white,
        borderRadius: '12px',
        boxShadow: C.shadowSm,
        border: `1px solid ${C.borderLight}`,
        marginBottom: '32px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${C.borderLight}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            fontWeight: 600,
            color: C.textPrimary,
            margin: 0,
          }}>
            Users
          </h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 14px',
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: 'none',
              width: '220px',
              maxWidth: '100%',
              background: C.bgPrimary,
            }}
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            minWidth: '640px',
          }}>
            <thead>
              <tr style={{ background: C.bgPrimary }}>
                {['Name', 'Email', 'Plan', 'Status', 'Joined', 'Actions'].map((h, i) => (
                  <th key={i} style={{
                    padding: '12px 16px',
                    textAlign: 'left' as const,
                    fontWeight: 600,
                    color: C.textMuted,
                    fontSize: '11px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${C.borderLight}`,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => {
                const sc = statusColors[user.status] || { bg: '#F3F4F6', color: '#6B7280' };
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: C.textPrimary }}>{user.name}</td>
                    <td style={{ padding: '14px 16px', color: C.textSecondary }}>{user.email}</td>
                    <td style={{ padding: '14px 16px', color: C.textSecondary }}>{user.plan}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: sc.bg,
                        color: sc.color,
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: C.textMuted }}>{user.joined}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button style={{
                        background: 'none',
                        border: `1px solid ${C.border}`,
                        borderRadius: '6px',
                        padding: '5px 12px',
                        fontSize: '12px',
                        color: C.textSecondary,
                        cursor: 'pointer',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bookings + Revenue row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
      }}>
        <style>{`
          @media (max-width: 768px) {
            .two-col-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Bookings */}
        <div className="two-col-grid" style={{
          background: C.white,
          borderRadius: '12px',
          boxShadow: C.shadowSm,
          border: `1px solid ${C.borderLight}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${C.borderLight}`,
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              color: C.textPrimary,
              margin: 0,
            }}>
              Upcoming Bookings
            </h2>
          </div>
          <div style={{ padding: '8px 0' }}>
            {mockBookings.map((b, i) => {
              const sc = statusColors[b.status] || { bg: '#F3F4F6', color: '#6B7280' };
              return (
                <div key={i} style={{
                  padding: '14px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: i < mockBookings.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: C.textPrimary }}>
                      {b.patient}
                    </div>
                    <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>
                      {b.doctor} &middot; {b.date} at {b.time}
                    </div>
                  </div>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: sc.bg,
                    color: sc.color,
                  }}>
                    {b.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="two-col-grid" style={{
          background: C.white,
          borderRadius: '12px',
          boxShadow: C.shadowSm,
          border: `1px solid ${C.borderLight}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${C.borderLight}`,
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              color: C.textPrimary,
              margin: 0,
            }}>
              Revenue
            </h2>
          </div>
          <div style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '260px',
          }}>
            {/* Gradient bar chart placeholder */}
            <div style={{
              width: '100%',
              height: '180px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${C.saffronLight} 0%, ${C.greenLight} 50%, ${C.saffronLight} 100%)`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '0 16px 16px',
              position: 'relative',
            }}>
              {/* Fake bars */}
              {[40, 55, 35, 65, 80, 60, 75, 90, 70, 85, 95, 88].map((h, i) => (
                <div key={i} style={{
                  width: '6%',
                  height: `${h}%`,
                  borderRadius: '4px 4px 0 0',
                  background: `linear-gradient(180deg, ${C.saffron} 0%, ${C.saffronDark} 100%)`,
                  opacity: 0.7 + (i / 40),
                }} />
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '8px',
              padding: '0 8px',
            }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <span key={i} style={{ fontSize: '9px', color: C.textMuted }}>{m}</span>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: C.textMuted, marginTop: '12px' }}>
              Monthly Revenue (FY 2026-27)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
