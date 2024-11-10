import { useLoadedUser } from '@/api/user/useUser';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const fetchUsersRaceDetails = async ({ userId }: { userId: string }) => {
  const { data: userRaces, error: userRacesError } = await supabase
    .from('users_races')
    .select('*')
    .eq('user_id', userId)
    .order('joined_race_at');

  if (userRacesError) throw userRacesError;
  if (!userRaces || userRaces.length < 1) return null;

  return userRaces[0];
};

export const useUserRaceDetails = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const { data: userRaceDetails, isPending: isUserRaceDetailsPending } =
    useQuery({
      queryKey: ['userRaceDetails'],
      queryFn: () => fetchUsersRaceDetails({ userId: userId as string }),
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!userId,
    });

  return { userRaceDetails, isUserRaceDetailsPending };
};

export const useUserRaceDetailsSuspense = () => {
  const { user } = useLoadedUser();
  const { data: userRaceDetails, isPending: isUserRaceDetailsPending } =
    useQuery({
      queryKey: ['userRaceDetails'],
      queryFn: () => fetchUsersRaceDetails({ userId: user.id }),
      staleTime: Infinity,
      gcTime: Infinity,
    });

  return { userRaceDetails, isUserRaceDetailsPending };
};
