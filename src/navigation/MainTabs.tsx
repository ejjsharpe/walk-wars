import { useRace } from '@/api/race/useRace';
import { LeaderboardIconSvg } from '@/components/svg/LeaderboardIconSvg';
import { ProfileIconSvg } from '@/components/svg/ProfileIconSvg';
import { RunnerManSvg } from '@/components/svg/RunnerIconSvg';
import { Heading } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { LeaderboardScreen } from '@/screens/tabs/LeaderboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { isBefore } from 'date-fns';
import { useEffect } from 'react';
import { AuthenticatedStackParamList } from './AuthenticatedStack';

export type MainTabsParamsList = {
  Home: undefined;
  Leaderboard: undefined;
  Profile: { isTab: boolean };
} & { [key: string]: undefined };

const Tab = createBottomTabNavigator<MainTabsParamsList>();

export const MainTabs = () => {
  const route = useRoute<RouteProp<AuthenticatedStackParamList, 'Main Tabs'>>();
  const { raceId } = route.params;
  const { reset } = useNavigation();
  const { race, isRacePending, isRaceError } = useRace({ raceId });

  useEffect(() => {
    if (
      race &&
      race.end_timestamp &&
      isBefore(new Date(race.end_timestamp), Date.now())
    ) {
      reset({
        routes: [{ name: 'Race Complete' }],
      });
    }
  }, [race, reset]);

  if (isRacePending) {
    return <Heading>Loading...</Heading>;
  }

  if (isRaceError) {
    return <Heading>Error</Heading>;
  }

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
};
