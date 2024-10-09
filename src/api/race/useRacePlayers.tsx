import { useCurrentRace } from '@/contexts/CurrentRaceContext';
import { supabase } from '@/lib/supabase';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchRacePlayers = async ({ raceId }: { raceId: string }) => {
  const { data, error } = await supabase.from('users_races').select(
    `finish_position, 
    total_step_count,
    adjusted_step_count,
    finish_position,
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
        ...userData,
      };
    })
    .sort(
      (userA, userB) => userA.adjusted_step_count - userB.adjusted_step_count
    );

  return formattedData;
};

export const useRacePlayers = () => {
  const { id } = useCurrentRace();
  const { data: racePlayers } = useSuspenseQuery({
    queryKey: ['racePlayers'],
    queryFn: () => fetchRacePlayers({ raceId: id }),
  });

  return { racePlayers };
};
