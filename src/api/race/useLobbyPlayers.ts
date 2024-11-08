import { supabase } from '@/lib/supabase';
import { useCurrentRace } from '@/stores/currentRaceStore';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchLobbyPlayers = async ({ raceId }: { raceId: string }) => {
  const { data, error } = await supabase.rpc('get_lobby_players', {
    raceid: raceId,
  });

  if (error) throw error;

  return data;
};

export const useLobbyPlayersSuspense = () => {
  const { raceId } = useCurrentRace();

  const { data: lobbyPlayers } = useSuspenseQuery({
    queryKey: ['lobby_players', raceId],
    queryFn: () => fetchLobbyPlayers({ raceId }),
    refetchInterval: 5000,
  });

  return { lobbyPlayers };
};
