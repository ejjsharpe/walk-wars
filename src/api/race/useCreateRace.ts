import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { useLoadedUser } from '../user/useUser';

const _createRace = async ({
  name,
  distance,
  endCondition,
  userId,
}: {
  name: string;
  distance: number;
  endCondition: 'winner_finished' | 'all_finished';
  userId: string;
}) => {
  const { data, error } = await supabase.rpc('create_race', {
    name,
    distance,
    end_condition: endCondition,
    user_id: userId,
  });

  if (error) throw error;
  return data;
};

export const useCreateRace = () => {
  const { user } = useLoadedUser();
  const {
    mutate: createRace,
    mutateAsync: createRaceAsync,
    isPending: isCreateRacePending,
  } = useMutation({
    mutationKey: ['races'],
    mutationFn: (arg: {
      name: string;
      distance: number;
      endCondition: 'winner_finished' | 'all_finished';
    }) => _createRace({ ...arg, userId: user.id }),
  });

  return { createRace, createRaceAsync, isCreateRacePending };
};
