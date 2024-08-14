import React, { useEffect, useState, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '@/lib/supabase'; 
import { Session } from '@supabase/supabase-js';

type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });


    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Text>Please log in to view this content.</Text>;
  }


  return (
    <View>
      {/* content here */}
      {children}
    </View>
  );
}
