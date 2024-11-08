import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const getSession = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();

  return data.session;
};

export const useSession = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  useEffect(() => {
    // TODO: test whether this signs the user out when session is gone
    if (!isPending) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          queryClient.setQueryData(['session'], session ? session : null);
        }
      );
      return () => {
        data.subscription.unsubscribe();
      };
    }
  }, [isPending, queryClient]);

  return { session: data, isAuthenticated: !!data, isAuthPending: isPending };
};
