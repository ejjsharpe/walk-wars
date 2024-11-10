import { useUser } from '@/api/user/useUser';
import { Heading } from '@/components/ui/Text';
import { MainTabs } from '@/navigation/MainTabs';
import { CreateRaceScreen } from '@/screens/CreateRaceScreen';
import { InvitationsScreen } from '@/screens/InvitationsScreen';
import { Loading } from '@/screens/Loading';
import { LobbyScreen } from '@/screens/LobbyScreen';
import { NoRaceScreen } from '@/screens/NoRaceScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RaceCompleteScreen } from '@/screens/RaceCompleteScreen';
import { ResultsScreen } from '@/screens/ResultsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthenticatedStackParamList = {
  Loading: undefined;
  'Main Tabs': { raceId: string; userId: string };
  Profile: undefined;
  'No Race': undefined;
  'Create Race': undefined;
  Invitations: undefined;
  Lobby: { raceId: string; raceName: string };
  'Race Complete': undefined;
  Results: undefined;
} & { [key: string]: undefined };

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

export const AuthenticatedStack = () => {
  const { isUserPending, isError } = useUser();

  if (isUserPending) {
    return <Heading>Loading...</Heading>;
  }

  if (isError) {
    return <Heading>Error</Heading>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 225,
      }}
    >
      <Stack.Screen name="Loading" component={Loading} />
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
      <Stack.Screen
        name="Race Complete"
        component={RaceCompleteScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};
