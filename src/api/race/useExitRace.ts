import { supabase } from '@/lib/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoadedUser } from '../user/useUser';

const _exitRace = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('users_races')
    .update({ has_exited: true })
    .eq('user_id', userId);

  if (error) throw error;

  return data;
};

export const useExitRace = () => {
  const { user } = useLoadedUser();
  const queryClient = useQueryClient();
  const { mutate: exitRace, mutateAsync: exitRaceAsync } = useMutation({
    mutationFn: async () => {
      await _exitRace({ userId: user.id });
      queryClient.invalidateQueries({ queryKey: ['userRaceDetails'] });
    },
  });

  return { exitRace, exitRaceAsync };
};
