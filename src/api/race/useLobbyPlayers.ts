import { useCurrentRaceContext } from '@/contexts/CurrentRaceContext';
import { supabase } from '@/lib/supabase';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchLobbyPlayers = async ({ raceId }: { raceId: string }) => {
  const { data, error } = await supabase.rpc('get_lobby_players', {
    raceid: raceId,
  });

  if (error) throw error;

  return data;
};

export const useLobbyPlayersSuspense = () => {
  const { id } = useCurrentRaceContext();

  const { data: lobbyPlayers } = useSuspenseQuery({
    queryKey: ['lobby_players', id],
    queryFn: () => fetchLobbyPlayers({ raceId: id }),
    refetchInterval: 5000,
  });

  return { lobbyPlayers };
};
