import { queryClient } from '@/lib/reactQuery';
import { supabase } from '@/lib/supabase';
import { useCurrentRace } from '@/stores/currentRaceStore';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getHourlyStepLogs } from '../health/getHourlyStepLogs/getHourlyStepLogs';
import { useLoadedRace, useRace } from '../race/useRace';
import { useLoadedUser, useUser } from '../user/useUser';
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

  const { data, error } = await supabase.rpc('add_step_logs', {
    steplogsarray: generatedLogs,
    raceid: raceId,
    userid: userId,
  });

  if (error) throw error;

  return data;
};

export const usePostStepLogs = () => {
  const { user } = useLoadedUser();
  const { race } = useLoadedRace();

  if (!race.start_timestamp) {
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
        raceStartTime: race.start_timestamp as string,
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
