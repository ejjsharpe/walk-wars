import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../user/useUser';

export const getStepLogs = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('step_logs')
    .select('*')
    .eq('user_id', userId)
    .order('end_timestamp');

  if (error) throw error;

  return data;
};

export const useStepLogs = () => {
  const { user } = useUser();

  if (!user) throw new Error('Step logs being fetched with no current user');

  const { isPending: isStepLogsPending, data: stepLogs } = useQuery({
    queryKey: ['stepLogs'],
    queryFn: () => getStepLogs({ userId: user.id }),
  });

  return { isStepLogsPending, stepLogs };
};
