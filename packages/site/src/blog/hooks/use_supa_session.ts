import { createClient, Session } from '@supabase/supabase-js';
import { SUPABASE } from '@/constants';
import { useEffect, useMemo, useState } from 'react';
import { BBKingSession } from '@/types/supabase';

export const useSupabaseSession = (): BBKingSession | null => {
  const supabase = useMemo(() => createClient(SUPABASE.URL, SUPABASE.ANNO), []);

  const extendSess = (sess: Session | null) => {
    if (!sess) {
      return sess;
    }
    return {
      ...sess,
      isKing: sess.user?.id === SUPABASE.BB_KING_ID,
      isQueen: sess.user?.id === SUPABASE.BB_QUEEN_ID,
    };
  };

  const [session, setSession] = useState(extendSess(supabase.auth.session()));

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(extendSess(session));
      }
    });
    return () => subscription?.unsubscribe();
  }, [supabase]);

  return session;
};
