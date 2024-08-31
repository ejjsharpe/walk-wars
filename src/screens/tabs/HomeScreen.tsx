import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <View style={{ width: 350 }}>
        <PrimaryButton>Hello</PrimaryButton>
      </View>
    </View>
  );
};
