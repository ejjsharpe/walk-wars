import { supabase } from '@/lib/supabase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoadedUser } from '../user/useUser';
import { Invitation } from './types';

export const fetchInvitations = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase.rpc('get_invitations_by_recipient', {
    user_id: userId,
  });
  if (error) throw error;

  return data as unknown as Invitation[];
};

export const useInvitationsSuspense = () => {
  const { user } = useLoadedUser();

  const { data: invitations } = useSuspenseQuery({
    queryKey: ['invitations'],
    queryFn: () => fetchInvitations({ userId: user.id }),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { invitations };
};
