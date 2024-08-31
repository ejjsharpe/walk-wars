import { Database } from '../../../database.types';
import { useUser } from './useUser';

export type User = Database['public']['Tables']['users']['Row'];

interface UseLoadedUserReturn extends ReturnType<typeof useUser> {
  user: User;
}
export type UseLoadedUser = (
  ...args: Parameters<typeof useUser>
) => UseLoadedUserReturn;
