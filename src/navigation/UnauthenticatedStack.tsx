import SignInScreen from '@/screens/SignInScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type UnauthenticatedStackParamList = {
  'Sign In': undefined;
} & { [key: string]: undefined };

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 225,
      }}
    >
      <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
  );
};
