import { supabase } from '@/lib/supabase';
import { useCurrentRace } from '@/stores/currentRaceStore';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchRacePlayers = async ({ raceId }: { raceId: string }) => {
  const { data, error } = await supabase.from('users_races').select(
    `finish_position, 
    total_step_count,
    adjusted_step_count,
    finish_position,
    is_finished,
    users ( display_name, avatar, color, id )
    `
  );

  if (error) throw error;

  const formattedData = data
    .map((user) => {
      const userData = user.users;

      // TODO: fix it so the data is always there. User can't join race if they don't have a display name
      return {
        finish_position: user.finish_position,
        total_step_count: user.total_step_count,
        adjusted_step_count: user.adjusted_step_count,
        is_finished: user.is_finished,
        ...userData,
      };
    })
    .sort(
      (userA, userB) => userA.adjusted_step_count - userB.adjusted_step_count
    );

  return formattedData;
};

export const useRacePlayersSuspense = () => {
  const { raceId } = useCurrentRace();

  const { data: racePlayers } = useSuspenseQuery({
    queryKey: ['racePlayers'],
    queryFn: () => fetchRacePlayers({ raceId }),
  });

  return { racePlayers };
};
