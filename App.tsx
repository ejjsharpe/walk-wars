import { useSession } from '@/api/auth/useSession';
import { DefaultTheme } from '@/constants/Colors';
import { ReactQueryProvider } from '@/lib/reactQuery';
import { RootStack } from '@/navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const AppEntry = () => {
  const { isAuthLoading } = useSession();

  if (isAuthLoading) return null;

  return <RootStack />;
};

export default function App() {
  return (
    <ReactQueryProvider>
      <NavigationContainer theme={DefaultTheme}>
        <AppEntry />
      </NavigationContainer>
    </ReactQueryProvider>
  );
}
