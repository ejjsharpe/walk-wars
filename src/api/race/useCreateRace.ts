import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const _createRace = async ({
  name,
  durationDays,
  userId,
}: {
  name: string;
  durationDays: number;
  userId: string;
}) => {
  const { data, error } = await supabase.rpc('create_race', {
    name,
    user_id: userId,
    duration_days: durationDays,
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
    mutationFn: (arg: { name: string; durationDays: number }) =>
      _createRace({ ...arg, userId: user.id }),
  });

  return { createRace, createRaceAsync, isCreateRacePending };
};
