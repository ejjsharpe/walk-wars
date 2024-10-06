import { LeaderboardIconSvg } from '@/components/svg/LeaderboardIconSvg';
import { ProfileIconSvg } from '@/components/svg/ProfileIconSvg';
import { RunnerManSvg } from '@/components/svg/RunnerIconSvg';
import * as Colors from '@/constants/Colors';
import { CurrentRaceProvider } from '@/contexts/CurrentRaceContext';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { LeaderboardScreen } from '@/screens/tabs/LeaderboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthenticatedStackParamList } from './AuthenticatedStack';

export type MainTabsParamsList = {
  Home: undefined;
  Leaderboard: undefined;
  Profile: { isTab: boolean };
} & { [key: string]: undefined };

const Tab = createBottomTabNavigator<MainTabsParamsList>();

export const MainTabs = () => {
  const { params } =
    useRoute<RouteProp<AuthenticatedStackParamList, 'Main Tabs'>>();

  return (
    <CurrentRaceProvider raceId={params.raceId}>
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
    </CurrentRaceProvider>
  );
};
