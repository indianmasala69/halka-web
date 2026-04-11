'use client';

import { useState } from 'react';
import QuizModal from './QuizModal';
import Nav from './Nav';
import Hero from './Hero';
import Categories from './Categories';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
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
      <Categories onQuiz={() => setQuiz(true)} />
      <HowItWorks />
      <Testimonials />
      <Pricing onQuiz={() => setQuiz(true)} />
      <Trust />
      <FinalCTA onQuiz={() => setQuiz(true)} />
      <Footer />
      {quiz && <QuizModal onClose={() => setQuiz(false)} user={user} />}
    </div>
  );
}
