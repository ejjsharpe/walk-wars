import { View } from 'react-native';

export const VSpace = ({ height }: { height: number }) => (
  <View style={{ height, width: '100%' }}></View>
);

export const HSpace = ({ width }: { width: number }) => (
  <View style={{ height: '100%', width }} />
);
