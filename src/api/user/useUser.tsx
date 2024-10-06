import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../auth/useSession';

const fetchUser = async ({ userId }: { userId: string }) => {
  let { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId);

  if (error) throw error;
  if (!users?.[0]) throw new Error('Unable to find user');

  return users[0];
};

export const useUser = () => {
  const { session } = useSession();

  if (!session?.user.id) {
    throw new Error('User being fetched with no session data');
  }

  const {
    data: user,
    isPending: isUserPending,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser({ userId: session.user.id }),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    user,
    isUserPending,
    isError,
  };
};

export const useLoadedUser = () => {
  const { user } = useUser();

  if (!user) {
    throw new Error(
      'use loaded user: hook used without user being previously loaded'
    );
  }

  return { user };
};
