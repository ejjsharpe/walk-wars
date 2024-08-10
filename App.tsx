import { useSession } from '@/api/auth/useSession';
import { DefaultTheme } from '@/constants/Colors';
import { ReactQueryProvider } from '@/lib/reactQuery';
import SignInScreen from '@/screens/SignIn';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main Tabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="Sign In" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
}

function RootNavigation() {
  const { isAuthLoading } = useSession();

  if (isAuthLoading) return null;

  return <RootStack />;
}

export default function App() {
  return (
    <ReactQueryProvider>
      <NavigationContainer theme={DefaultTheme}>
        <RootNavigation />
      </NavigationContainer>
    </ReactQueryProvider>
  );
}
