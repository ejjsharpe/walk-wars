import { useSession } from '@/api/auth/useSession';
import type { Race } from '@/api/race/types';
import { LeaderboardIconSvg } from '@/components/svg/LeaderboardIconSvg';
import { ProfileIconSvg } from '@/components/svg/ProfileIconSvg';
import { RunnerManSvg } from '@/components/svg/RunnerIconSvg';
import * as Colors from '@/constants/Colors';
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
import { LeaderboardScreen } from '@/screens/tabs/LeaderboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export interface RootStackParamList {
  Loading: undefined;
  'Main Tabs': { raceId: string };
  'Sign In': undefined;
  Profile: undefined;
  'No Race': undefined;
  'Create Race': undefined;
  Invitations: undefined;
  Lobby: {
    raceId: string;
    raceName: string;
    hostId: string;
  };
}
export type RootStackParams = RootStackParamList & { [key: string]: undefined };

interface MainTabsParamsList {
  Home: { raceId: string };
  Leaderboard: undefined;
  Profile: { isTab: boolean };
}

export type MainTabsParams = MainTabsParamsList & { [key: string]: undefined };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams, MainTabsParams {}
  }
}

const Stack = createNativeStackNavigator<
  RootStackParamList & { [key: string]: undefined }
>();
const Tab = createBottomTabNavigator<
  MainTabsParamsList & { [key: string]: undefined }
>();

function MainTabs() {
  const { params } =
    useRoute<
      RouteProp<RootStackParamList & { [key: string]: undefined }, 'Main Tabs'>
    >();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 8, paddingBottom: 8 },
        tabBarShowLabel: false,
        animation: 'fade',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused }) => (
            <RunnerManSvg
              color={focused ? Colors.pictonBlue : Colors.paynesGrey}
              width={36}
              height={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <LeaderboardIconSvg
              color={focused ? Colors.pictonBlue : Colors.paynesGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ isTab: true }}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIconSvg
              color={focused ? Colors.pictonBlue : Colors.paynesGrey}
            />
          ),
        }}
      />
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
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="Main Tabs"
            component={MainTabs}
            options={{ animation: 'fade' }}
          />
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
