import { useSession } from '@/api/auth/useSession';
import type { Race } from '@/api/race/types';
import { DefaultTheme } from '@/constants/Colors';
import { ReactQueryProvider } from '@/lib/reactQuery';
import { CreateRaceScreen } from '@/screens/CreateRaceScreen';
import { InvitationsScreen } from '@/screens/InvitationsScreen';
import { Loading } from '@/screens/Loading';
import { LobbyScreen } from '@/screens/LobbyScreen';
import { NoRaceScreen } from '@/screens/NoRaceScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import SignInScreen from '@/screens/SignInScreen';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export interface RootStackParamList {
  Loading: undefined;
  'Main Tabs': undefined;
  'Sign In': undefined;
  Profile: undefined;
  'No Race': undefined;
  'Create Race': undefined;
  Invitations: undefined;
  Lobby: {
    raceId: Race['id'];
    raceName: Race['name'];
    hostId: Race['host_id'];
  };
}

interface MainTabsParamsList {
  Home: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, MainTabsParamsList {}
  }
}

const Stack = createNativeStackNavigator<
  RootStackParamList & { [key: string]: undefined }
>();
const Tab = createBottomTabNavigator<
  MainTabsParamsList & { [key: string]: undefined }
>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const { isAuthenticated } = useSession();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 225,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Main Tabs" component={MainTabs} />
          <Stack.Screen name="No Race" component={NoRaceScreen} />
          <Stack.Screen name="Create Race" component={CreateRaceScreen} />
          <Stack.Screen name="Invitations" component={InvitationsScreen} />
          <Stack.Screen name="Lobby" component={LobbyScreen} />
        </>
      ) : (
        <Stack.Screen name="Sign In" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthLoading } = useSession();

  if (isAuthLoading) return null;

  return <RootStack />;
}

export default function App() {
  return (
    <ReactQueryProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Navigation />
      </NavigationContainer>
    </ReactQueryProvider>
  );
}
