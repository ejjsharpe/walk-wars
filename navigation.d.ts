import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './App.tsx';

declare module '@react-navigation/native' {
  function useNavigation<T = NavigationProp<RootStackParamList>>(): T;
}
