'use client';

import { useState, useRef, useEffect } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  'Log my meal',
  'Medication reminder',
  'Exercise plan',
  'Track my weight',
  'Diet tips',
];

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();

  if (/meal|food|eat|diet/.test(lower)) {
    return `Here's a sample Indian meal plan for today:\n\nBreakfast: Moong dal chilla with mint chutney + 1 boiled egg (approx 250 kcal)\n\nMid-morning: A small bowl of papaya or guava (80 kcal)\n\nLunch: 1 roti + palak paneer + cucumber raita + salad (400 kcal)\n\nEvening snack: Roasted chana or makhana (100 kcal)\n\nDinner: Grilled fish or tofu tikka + sauteed vegetables + dal soup (350 kcal)\n\nTotal: ~1,180 kcal. Adjust portions based on your daily target. Want me to tailor this to your preferences?`;
  }

  if (/medication|medicine|dose/.test(lower)) {
    return `Here are some general medication guidelines:\n\n- Take your GLP-1 medication at the same time each week (for weekly doses) or daily as prescribed.\n- Store injectable medications in the refrigerator (2-8 C).\n- Start with the lowest dose and increase gradually as your doctor recommends.\n- Take it with or without food, but be consistent.\n- If you miss a dose, take it as soon as you remember within the allowed window.\n\nAlways follow your prescribing doctor's specific instructions. Would you like to set a medication reminder?`;
  }

  if (/exercise|workout|gym/.test(lower)) {
    return `Here is a beginner-friendly exercise plan:\n\nMonday: 30 min brisk walk + 10 min bodyweight squats and lunges\nTuesday: 20 min yoga or stretching\nWednesday: 30 min cycling or swimming\nThursday: Rest or light walk\nFriday: 30 min strength training (resistance bands or light weights)\nSaturday: 40 min walk or outdoor activity\nSunday: Rest\n\nStart slow and increase intensity over 4 weeks. Aim for 150 minutes of moderate activity per week. Want a more specific plan based on your fitness level?`;
  }

  if (/weight|progress|track/.test(lower)) {
    return `Great that you want to track your progress! Consistent tracking is one of the biggest predictors of weight loss success.\n\nTips for accurate tracking:\n- Weigh yourself at the same time each day (morning, after using the bathroom)\n- Track weekly averages rather than daily fluctuations\n- Take progress photos every 2 weeks\n- Measure waist circumference monthly\n\nWhat is your current weight today? I will log it for you.`;
  }

  if (/side effect/.test(lower)) {
    return `Common GLP-1 medication side effects include:\n\n- Nausea (most common, usually improves in 2-4 weeks)\n- Reduced appetite (this is expected and part of how the medication works)\n- Mild stomach discomfort or bloating\n- Occasional headache or fatigue\n\nContact your doctor immediately if you experience:\n- Severe or persistent vomiting\n- Sharp abdominal pain\n- Signs of pancreatitis\n- Allergic reactions (rash, swelling, difficulty breathing)\n\nMost side effects are mild and temporary. Eating smaller meals and staying hydrated can help.`;
  }

  return 'I can help you with meal planning, medication guidance, exercise tips, and progress tracking. What would you like to know?';
}

// SVG Icons
function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CoachAvatar() {
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: C.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 105.1 2H5a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-.1a.2.2 0 10.3.3" />
        <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" />
        <circle cx="20" cy="10" r="2" />
        <path d="M12 15v7" />
        <path d="M9 22h6" />
      </svg>
    </div>
  );
}

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 1.5l-8 8a4.95 4.95 0 107 7l8-8a4.95 4.95 0 10-7-7z" />
      <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
    </svg>
  );
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {collapsed ? (
        <polyline points="9 18 15 12 9 6" />
      ) : (
        <polyline points="15 18 9 12 15 6" />
      )}
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      padding: '4px 0',
      animation: 'fadeInUp 0.3s ease',
    }}>
      <CoachAvatar />
      <div style={{
        background: C.bgPrimary,
        borderRadius: '16px 16px 16px 4px',
        padding: '12px 16px',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
      }}>
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="typing-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function CoachPage() {
  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'ai',
    text: "Hi! I'm your Halka health coach. I can help you with meal planning, medication questions, exercise tips, and tracking your progress. What would you like to talk about?",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: getMockResponse(messageText),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: C.bgPrimary,
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${C.textMuted};
          display: inline-block;
          animation: bounce 1.2s infinite;
        }
        .quick-btn:hover {
          background: ${C.saffronLight} !important;
          border-color: ${C.saffron} !important;
          color: ${C.saffron} !important;
        }
        .send-btn:hover {
          background: ${C.saffronHover} !important;
        }
        .sidebar-link:hover {
          background: ${C.bgPrimary} !important;
        }
        .msg-appear {
          animation: fadeInUp 0.3s ease;
        }
        @media (max-width: 768px) {
          .coach-sidebar { display: none !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .coach-sidebar { width: ${sidebarCollapsed ? '0px' : '280px'} !important; }
        }
        ::selection { background: ${C.saffron}; color: white; }
        input::placeholder { color: ${C.textMuted}; }
      `}</style>

      {/* Main Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}>
        {/* Header */}
        <header style={{
          padding: '16px 24px',
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexShrink: 0,
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            color: C.textSecondary,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <BackArrow />
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: C.textPrimary,
              margin: 0,
              lineHeight: 1.2,
            }}>
              Your AI Health Coach
            </h1>
            <p style={{
              fontSize: 13,
              color: C.textMuted,
              margin: 0,
              marginTop: 2,
              lineHeight: 1.3,
            }}>
              Get instant guidance on diet, medication, exercise, and your weight loss journey
            </p>
          </div>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: C.green,
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Online</span>
        </header>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 24px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="msg-appear"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'ai' && <CoachAvatar />}
              <div style={{ maxWidth: '70%' }}>
                <div style={{
                  background: msg.role === 'user' ? C.saffron : C.white,
                  color: msg.role === 'user' ? C.textInverse : C.textPrimary,
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  padding: '12px 16px',
                  fontSize: 14,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  boxShadow: C.shadowSm,
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: 11,
                  color: C.textMuted,
                  marginTop: 4,
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  paddingLeft: msg.role === 'ai' ? 4 : 0,
                  paddingRight: msg.role === 'user' ? 4 : 0,
                }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div style={{
          padding: '8px 24px',
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          flexShrink: 0,
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              className="quick-btn"
              onClick={() => handleSend(action)}
              disabled={isTyping}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                color: C.textSecondary,
                cursor: isTyping ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.15s ease',
                opacity: isTyping ? 0.5 : 1,
                flexShrink: 0,
              }}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{
          padding: '12px 24px 24px',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            gap: 8,
            background: C.white,
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            padding: '6px 6px 6px 16px',
            alignItems: 'center',
            boxShadow: C.shadowSm,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your health coach anything..."
              disabled={isTyping}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: C.textPrimary,
                background: 'transparent',
                padding: '8px 0',
              }}
            />
            <button
              className="send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: 'none',
                background: (!input.trim() || isTyping) ? C.border : C.saffron,
                color: C.white,
                cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              <SendIcon />
            </button>
          </div>
          <p style={{
            fontSize: 11,
            color: C.textMuted,
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 0,
          }}>
            This is an AI assistant. Always consult your doctor for medical advice.
          </p>
        </div>
      </div>

      {/* Sidebar (desktop only) */}
      <aside
        className="coach-sidebar"
        style={{
          width: sidebarCollapsed ? 0 : 300,
          borderLeft: sidebarCollapsed ? 'none' : `1px solid ${C.border}`,
          background: C.white,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.25s ease',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: 'absolute',
            top: 20,
            left: sidebarCollapsed ? -32 : -16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: C.white,
            border: `1px solid ${C.border}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: C.shadowSm,
            color: C.textSecondary,
          }}
        >
          <CollapseIcon collapsed={sidebarCollapsed} />
        </button>

        {!sidebarCollapsed && (
          <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
            {/* Your Stats Card */}
            <div style={{
              background: C.bgPrimary,
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: C.textPrimary,
                margin: '0 0 16px 0',
              }}>
                Your Stats
              </h3>
              {[
                { label: 'Current weight', value: '82 kg' },
                { label: 'Goal weight', value: '70 kg' },
                { label: 'Days on program', value: '23' },
                { label: 'Next appointment', value: 'Apr 18' },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 3 ? `1px solid ${C.borderLight}` : 'none',
                }}>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{stat.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div style={{
              background: C.bgPrimary,
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: C.textPrimary,
                margin: '0 0 12px 0',
              }}>
                Progress
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                color: C.textMuted,
                marginBottom: 6,
              }}>
                <span>82 kg</span>
                <span>Goal: 70 kg</span>
              </div>
              <div style={{
                height: 8,
                borderRadius: 4,
                background: C.borderLight,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '25%',
                  height: '100%',
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${C.green}, ${C.saffron})`,
                }} />
              </div>
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 8, marginBottom: 0 }}>
                3 kg lost so far
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: C.textPrimary,
                margin: '0 0 12px 0',
              }}>
                Quick Links
              </h3>
              {[
                { icon: <CalendarIcon />, label: 'Book appointment', href: '/booking' },
                { icon: <ChartIcon />, label: 'View diet plan', href: '/dashboard' },
                { icon: <PillIcon />, label: 'Track medication', href: '/dashboard' },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="sidebar-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: C.textSecondary,
                    fontSize: 13,
                    fontWeight: 500,
                    transition: 'background 0.15s ease',
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
