import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { UseLoadedRace } from './types';

const fetchRace = async ({ raceId }: { raceId: string }) => {
  const { data: races, error: racesError } = await supabase
    .from('races')
    .select('*')
    .eq('id', raceId);
  if (racesError) throw racesError;
  if (!races[0]) throw new Error('No race for this user');

  return races[0];
};

export const useRace = ({
  raceId,
  refetchInterval,
}: {
  raceId: string | undefined;
  refetchInterval?: number;
}) => {
  const { data: race, isPending: isRacePending } = useQuery({
    queryKey: ['race', raceId],
    queryFn: () => fetchRace({ raceId: raceId as string }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!raceId,
    refetchInterval,
  });

  return { race, isRacePending };
};

export const useLoadedRace = useRace as UseLoadedRace;
