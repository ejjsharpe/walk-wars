import { supabase } from '@/lib/supabase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { isToday } from 'date-fns';
import { useLoadedRace } from '../race/useRace';
import { useLoadedUser } from '../user/useUser';

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
  const { race } = useLoadedRace();
  const { user } = useLoadedUser();

  const { isPending: isStepLogsPending, data: stepLogs } = useSuspenseQuery({
    queryKey: ['stepLogs'],
    queryFn: () => getStepLogs({ userId: user.id, raceId: race.id }),
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
