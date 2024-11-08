import { supabase } from '@/lib/supabase';
import { useCurrentRace, useCurrentRaceStore } from '@/stores/currentRaceStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

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
  const {
    data: race,
    isPending: isRacePending,
    isError: isRaceError,
  } = useQuery({
    queryKey: ['race', raceId],
    queryFn: () => fetchRace({ raceId: raceId as string }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!raceId,
    refetchInterval,
  });

  const setCurrentRace = useCurrentRaceStore((state) => state.setCurrentRaceId);

  useEffect(() => {
    if (race?.id) {
      setCurrentRace({ id: race?.id });
    }
  }, [race?.id, setCurrentRace]);

  return { race, isRacePending, isRaceError };
};

export const useLoadedRace = () => {
  const { raceId } = useCurrentRace();
  const { race } = useRace({ raceId });

  if (!race) {
    throw new Error(
      'use loaded race: calling hook without previously loading race data'
    );
  }

  return { race };
};
