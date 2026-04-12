'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav onQuiz={() => {}} />
      <main style={{ paddingTop: '64px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
