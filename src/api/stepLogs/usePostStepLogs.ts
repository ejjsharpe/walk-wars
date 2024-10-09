import { useCurrentRace } from '@/contexts/CurrentRaceContext';
import { queryClient } from '@/lib/reactQuery';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getHourlyStepLogs } from '../health/getHourlyStepLogs/getHourlyStepLogs';
import { useRace } from '../race/useRace';
import { useUser } from '../user/useUser';
import { getStepLogs } from './useStepCount';

export const generateAndUploadLogs = async ({
  userId,
  raceId,
  raceStartTime,
}: {
  userId: string;
  raceId: string;
  raceStartTime: string;
}) => {
  const logs = await getStepLogs({ userId, raceId });
  const mostRecentLogEndTimestamp = logs[0]?.end_timestamp;

  const generatedLogs = await getHourlyStepLogs({
    from: new Date(mostRecentLogEndTimestamp || raceStartTime),
    to: new Date(),
  });

  const { data, error } = await supabase.rpc('addsteplogs', {
    steplogsarray: generatedLogs,
    raceid: raceId,
    userid: userId,
  });

  if (error) throw error;

  return data;
};

export const usePostStepLogs = () => {
  const { id } = useCurrentRace();
  const { user } = useUser();
  const { race } = useRace({ raceId: id });

  if (!user) throw new Error('cannot post step logs with no user');
  if (!race) throw new Error('cannot post step logs with no race');
  if (!race.started_at) {
    throw new Error('cannot post logs for a race that has not started');
  }

  const {
    isPending: isPostStepLogsPending,
    data,
    mutate: postStepLogs,
  } = useMutation({
    mutationFn: () =>
      generateAndUploadLogs({
        userId: user.id,
        raceId: race.id,
        raceStartTime: race.started_at as string,
      }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['userRaceDetails'] });
    },
    // TODO: handle if logging steps fails
  });

  useEffect(() => {
    postStepLogs();
  }, [postStepLogs]);

  return { isPostStepLogsPending, data, postStepLogs };
};
