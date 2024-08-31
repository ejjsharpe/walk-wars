import { queryClient } from '@/lib/reactQuery';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { User } from './types';
import { useUser } from './useUser';

const updateUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: Partial<User>;
}) => {
  const res = await supabase.from('users').update(data).eq('id', userId);

  return res.data;
};

export const useMutateUser = () => {
  const { user } = useUser();
  const { mutate: mutateUser, mutateAsync: mutateUserAsync } = useMutation({
    mutationKey: ['user'],
    mutationFn: (data: Partial<User>) =>
      updateUser({ userId: (user as User).id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    mutateUser,
    mutateUserAsync,
  };
};
