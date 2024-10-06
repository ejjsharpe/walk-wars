import { User } from '@/api/user/types';
import { useUser } from '@/api/user/useUser';
import { Heading } from '@/components/ui/Text';
import { createContext, ReactNode, useContext } from 'react';

const CurrentUserContext = createContext<User | undefined | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isUserPending, isError } = useUser();

  if (isUserPending) {
    return <Heading>Loading...</Heading>;
  }

  if (isError) {
    return <Heading>Error</Heading>;
  }

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const user = useContext(CurrentUserContext);

  if (!user) throw new Error('current user context: no value');

  return user;
};
