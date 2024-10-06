import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { User } from '../user/types';
import { useUser } from '../user/useUser';

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
  const { user } = useUser();

  const { data: userRaceDetails, isPending: isUserRaceDetailsPending } =
    useQuery({
      queryKey: ['userRaceDetails'],
      queryFn: () => fetchUsersRaceDetails({ userId: (user as User).id }),
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!user,
    });

  return { userRaceDetails, isUserRaceDetailsPending };
};
