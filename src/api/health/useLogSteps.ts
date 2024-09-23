import { supabase } from '@/lib/supabase';

export const getStepLogs = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('distance_logs')
    .select('*')
    .eq('user_id', userId)
    .order('end_timestamp');

  if (error) throw error;

  return data;
};

export const useLogSteps = () => {
  // get last log end_timestamp
  // if it exists, generate logs from this timestamp till now and upload
  // if it doesn't exist, generate logs from the start date and upload
};
