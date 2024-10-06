import { useCurrentRaceContext } from '@/contexts/CurrentRaceContext';
import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { supabase } from '@/lib/supabase';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { isToday } from 'date-fns';
import { useUser } from '../user/useUser';

export const getStepLogs = async ({
  userId,
  raceId,
}: {
  userId: string;
  raceId: string;
}) => {
  const { data, error } = await supabase
    .from('step_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('race_id', raceId)
    .order('end_timestamp');

  if (error) throw error;

  return data;
};

export const useStepCount = () => {
  const { id: raceId } = useCurrentRaceContext();
  const { id: userId } = useCurrentUser();

  const { isPending: isStepLogsPending, data: stepLogs } = useSuspenseQuery({
    queryKey: ['stepLogs'],
    queryFn: () => getStepLogs({ userId, raceId }),
    select: (data) => {
      let steps = 0;
      let totalSteps = 0;

      data.forEach((log) => {
        totalSteps += log.step_count;

        if (isToday(log.start_timestamp)) {
          steps += log.step_count;
        }
      });

      return { stepLogs: data, stepsToday: steps, totalSteps };
    },
  });

  return {
    isStepLogsPending,
    stepLogs: stepLogs?.stepLogs,
    stepsToday: stepLogs?.stepsToday,
    totalSteps: stepLogs?.totalSteps,
  };
};
