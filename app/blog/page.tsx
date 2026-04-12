'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { useState } from 'react';

const categories = ['All', 'Weight Loss', 'Nutrition', 'GLP-1', 'Exercise', 'Mental Health'];

const blogPosts = [
  {
    title: 'Understanding GLP-1 Medications: A Complete Guide',
    author: 'Dr. Anand Sharma',
    readTime: '8 min read',
    category: 'Weight Loss',
    excerpt: 'GLP-1 receptor agonists have revolutionized weight management. Learn how these medications work, who they are best suited for, and what to expect during treatment.',
    gradient: `linear-gradient(135deg, ${C.saffron} 0%, ${C.saffronDark} 100%)`,
    date: 'April 8, 2026',
  },
  {
    title: 'Why Indian Diets Make Weight Loss Harder (And How to Fix It)',
    author: 'Dr. Priya Nair',
    readTime: '6 min read',
    category: 'Nutrition',
    excerpt: 'From high-carb staples to sugar-laden chai, Indian dietary patterns present unique challenges. Here are evidence-based strategies tailored to desi food habits.',
    gradient: `linear-gradient(135deg, ${C.green} 0%, #0D9B5F 100%)`,
    date: 'April 3, 2026',
  },
  {
    title: 'PCOS and Weight: What Every Indian Woman Should Know',
    author: 'Dr. Priya Nair',
    readTime: '10 min read',
    category: 'Weight Loss',
    excerpt: 'Polycystic ovary syndrome affects 1 in 5 Indian women. Understand the hormonal links between PCOS and weight gain, and discover treatment approaches that work.',
    gradient: `linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)`,
    date: 'March 28, 2026',
  },
  {
    title: 'The Science Behind Metabolic Health',
    author: 'Dr. Meenakshi Iyer',
    readTime: '7 min read',
    category: 'GLP-1',
    excerpt: 'Metabolic health goes beyond weight on the scale. Learn about insulin resistance, metabolic syndrome, and how GLP-1 therapies target root causes of weight gain.',
    gradient: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
    date: 'March 22, 2026',
  },
  {
    title: '5 Breakfast Ideas That Actually Help You Lose Weight',
    author: 'Nutrition Team',
    readTime: '5 min read',
    category: 'Nutrition',
    excerpt: 'Ditch the sugary cereals and parathas dripping in ghee. These five high-protein, fiber-rich breakfast ideas keep you full until lunch without spiking blood sugar.',
    gradient: `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)`,
    date: 'March 15, 2026',
  },
  {
    title: 'Exercise vs. Medication: Finding the Right Balance',
    author: 'Dr. Anand Sharma',
    readTime: '8 min read',
    category: 'Exercise',
    excerpt: 'Should you rely on exercise, medication, or both? We break down the evidence for combining lifestyle changes with pharmacotherapy for optimal, lasting results.',
    gradient: `linear-gradient(135deg, #EC4899 0%, #BE185D 100%)`,
    date: 'March 10, 2026',
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding: '80px 24px 60px',
        textAlign: 'center' as const,
      }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '42px',
          fontWeight: 800,
          color: C.white,
          margin: '0 0 16px',
          letterSpacing: '-1px',
        }}>
          Health & Wellness Blog
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Expert insights from our doctors on weight loss, nutrition, and metabolic health
        </p>
      </section>

      {/* Search + Filters */}
      <section style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '32px 24px 0',
      }}>
        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 16px',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: 'none',
              background: C.white,
              boxSizing: 'border-box' as const,
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                background: activeCategory === cat ? C.saffron : C.borderLight,
                color: activeCategory === cat ? C.white : C.textSecondary,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 24px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          <style>{`
            @media (max-width: 900px) {
              .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .blog-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {filtered.map((post, i) => (
            <a
              key={i}
              href="#"
              className="blog-grid"
              style={{
                background: C.white,
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: C.shadowSm,
                border: `1px solid ${C.borderLight}`,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = C.shadowMd;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = C.shadowSm;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Image placeholder */}
              <div style={{
                height: '180px',
                background: post.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Category badge */}
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: C.white,
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '20px',
                } as any}>
                  {post.category}
                </span>
                {/* Visual icon placeholder */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>&#9998;</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '17px',
                  fontWeight: 700,
                  color: C.textPrimary,
                  margin: '0 0 10px',
                  lineHeight: 1.4,
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: C.textSecondary,
                  lineHeight: 1.7,
                  margin: '0 0 16px',
                  flex: 1,
                }}>
                  {post.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${C.borderLight}`,
                  paddingTop: '14px',
                }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: C.textPrimary }}>
                      {post.author}
                    </div>
                    <div style={{ fontSize: '11px', color: C.textMuted, marginTop: '2px' }}>
                      {post.date}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: C.saffron,
                    background: C.saffronLight,
                    padding: '4px 10px',
                    borderRadius: '12px',
                  }}>
                    {post.readTime}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center' as const,
            padding: '60px 20px',
            color: C.textMuted,
            fontSize: '14px',
          }}>
            No articles found matching your search.
          </div>
        )}

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: `1px solid ${C.borderLight}`,
        }}>
          <button style={{
            background: 'none',
            border: `1px solid ${C.border}`,
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: C.textMuted,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            &larr; Previous
          </button>
          <span style={{ fontSize: '13px', color: C.textMuted }}>Page 1 of 1</span>
          <button style={{
            background: 'none',
            border: `1px solid ${C.border}`,
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: C.textMuted,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Next &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
