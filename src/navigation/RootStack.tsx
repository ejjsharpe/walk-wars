import { useSession } from '@/api/auth/useSession';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthenticatedStack } from './AuthenticatedStack';
import { UnauthenticatedStack } from './UnauthenticatedStack';

export const RootStack = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const { isAuthenticated } = useSession();

  return isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};
