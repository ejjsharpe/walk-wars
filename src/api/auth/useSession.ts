import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const getSession = async () => {
  const { data } = await supabase.auth.getSession();

  return data.session || null;
};

export const useSession = () => {
  const { data, isPending } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return { isAuthenticated: !!data, isAuthLoading: isPending };
};
