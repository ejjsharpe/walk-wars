import { queryClient } from '@/lib/reactQuery';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const _startRace = async ({ raceId }: { raceId: string }) => {
  const { data, error } = await supabase.rpc('start_race', {
    race_id: raceId,
    start_time: new Date().toISOString(),
  });

  if (error) throw error;

  return data;
};

export const useStartRace = () => {
  const { mutate: startRace, error } = useMutation({
    mutationKey: ['race'],
    mutationFn: _startRace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['race'] });
    },
  });

  console.log({ error });

  return { startRace };
};
