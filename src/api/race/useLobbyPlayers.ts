import { supabase } from '@/lib/supabase';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchLobbyPlayers = async ({ raceId }: { raceId: number }) => {
  const { data, error } = await supabase.rpc('get_lobby_players', {
    raceid: raceId,
  });

  if (error) throw error;

  return data;
};

export const useLobbyPlayersSuspense = ({ raceId }: { raceId: number }) => {
  const { data: lobbyPlayers, error } = useSuspenseQuery({
    queryKey: ['lobby_players', raceId],
    queryFn: () => fetchLobbyPlayers({ raceId }),
    refetchInterval: 5000,
  });

  console.log({ error });

  return { lobbyPlayers };
};
