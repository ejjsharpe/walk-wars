import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const _createRace = async ({
  name,
  steps_to_finish,
  endCondition,
  userId,
}: {
  name: string;
  steps_to_finish: number;
  endCondition: 'winner_finished' | 'all_finished';
  userId: string;
}) => {
  const { data, error } = await supabase.rpc('create_race', {
    name,
    steps_to_finish,
    end_condition: endCondition,
    user_id: userId,
  });

  if (error) throw error;
  return data;
};

export const useCreateRace = () => {
  const user = useCurrentUser();
  const {
    mutate: createRace,
    mutateAsync: createRaceAsync,
    isPending: isCreateRacePending,
  } = useMutation({
    mutationKey: ['races'],
    mutationFn: (arg: {
      name: string;
      steps_to_finish: number;
      endCondition: 'winner_finished' | 'all_finished';
    }) => _createRace({ ...arg, userId: user.id }),
  });

  return { createRace, createRaceAsync, isCreateRacePending };
};
