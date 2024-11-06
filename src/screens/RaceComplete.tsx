import { useUserRaceDetails } from '@/api/race/useUserRaceDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Rive from 'rive-react-native';
import { Text } from '@/components/ui/Text';

// function RiveDemo() {
//   return (
//     <Rive
//       url={'../assets/riveAnimations/race-end-animation.riv'}
//       artboardName="Avatar 1"
//       stateMachineName="avatar"
//       style={{ width: 400, height: 400 }}
//     />
//   );
// }

export function RaceComplete() {
  // const { race } = useUserRaceDetails();

  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}
