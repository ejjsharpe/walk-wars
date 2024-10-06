import { CurrentUserProvider } from '@/contexts/CurrentUserContext';
import { MainTabs } from '@/navigation/MainTabs';
import { CreateRaceScreen } from '@/screens/CreateRaceScreen';
import { InvitationsScreen } from '@/screens/InvitationsScreen';
import { Loading } from '@/screens/Loading';
import { LobbyScreen } from '@/screens/LobbyScreen';
import { NoRaceScreen } from '@/screens/NoRaceScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthenticatedStackParamList = {
  Loading: undefined;
  'Main Tabs': { raceId: string; userId: string };
  Profile: undefined;
  'No Race': undefined;
  'Create Race': undefined;
  Invitations: undefined;
  Lobby: undefined;
} & { [key: string]: undefined };

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

export const AuthenticatedStack = () => {
  return (
    <CurrentUserProvider>
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
      </Stack.Navigator>
    </CurrentUserProvider>
  );
};
