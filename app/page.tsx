'use client';

import { useEffect, useState } from 'react';
import HalkaApp from '@/components/HalkaApp';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#FBF7F0',
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#1A1A1A',
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return <HalkaApp user={user} />;
}
