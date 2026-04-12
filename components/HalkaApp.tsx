'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuizModal from './QuizModal';
import Nav from './Nav';
import Hero from './Hero';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import BeforeAfter from './BeforeAfter';
import Testimonials from './Testimonials';
import Doctors from './Doctors';
import Pricing from './Pricing';
import Referral from './Referral';
import FAQ from './FAQ';
import Trust from './Trust';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import { COLOR_SYSTEM } from '@/lib/colors';

const C = COLOR_SYSTEM;

interface HalkaAppProps {
  user?: any;
}

export default function HalkaApp({ user }: HalkaAppProps) {
  const [quiz, setQuiz] = useState(false);

  return (
    <div style={{ background: C.cream, minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
        ::selection { background: ${C.saffron}; color: white; }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
      `}</style>
      <Nav onQuiz={() => setQuiz(true)} />
      <Hero onQuiz={() => setQuiz(true)} />
      <Stats />
      <HowItWorks />
      <BeforeAfter />
      <Testimonials />
      <Doctors />
      <Pricing onQuiz={() => setQuiz(true)} />
      <Referral />
      <FAQ />
      <Trust />
      <FinalCTA onQuiz={() => setQuiz(true)} />
      <Footer />
      {quiz && <QuizModal onClose={() => setQuiz(false)} user={user} />}

      {/* Floating AI Coach Button */}
      <Link
        href="/coach"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: C.saffron,
          color: C.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px rgba(255, 107, 44, 0.4)`,
          zIndex: 99,
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(255, 107, 44, 0.5)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(255, 107, 44, 0.4)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="12" y1="6" x2="12" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
