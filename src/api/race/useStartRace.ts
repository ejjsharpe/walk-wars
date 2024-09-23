import { queryClient } from '@/lib/reactQuery';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const _startRace = async ({ raceId }: { raceId: string }) => {
  await supabase
    .from('races')
    .update({ started_at: new Date().toISOString() })
    .eq('id', raceId);
};

export const useStartRace = () => {
  const { mutate: startRace } = useMutation({
    mutationKey: ['race'],
    mutationFn: _startRace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['race'] });
    },
  });

  return { startRace };
};
