import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const fetchUsersRaceDetails = async ({ userId }: { userId: string }) => {
  const { data: userRaces, error: userRacesError } = await supabase
    .from('users_races')
    .select('*')
    .eq('user_id', userId);

  if (userRacesError) throw userRacesError;
  if (!userRaces || userRaces.length < 1) return null;

  return userRaces[0];
};

export const useUserRaceDetails = () => {
  const { id } = useCurrentUser();

  const { data: userRaceDetails, isPending: isUserRaceDetailsPending } =
    useQuery({
      queryKey: ['userRaceDetails'],
      queryFn: () => fetchUsersRaceDetails({ userId: id }),
      staleTime: Infinity,
      gcTime: Infinity,
    });

  return { userRaceDetails, isUserRaceDetailsPending };
};
