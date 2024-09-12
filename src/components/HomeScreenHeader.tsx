import * as Colors from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RunningManSvg } from './svg/RunningManSvg';
import { Heading } from './ui/Text';

export const HomeScreenHeader = ({ raceName }: { raceName: string }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <RunningManSvg height={60} width={48.47} />
      <Heading
        allowFontScaling={false}
        style={{ fontSize: 40, lineHeight: 40, padding: 28 }}
      >
        {raceName}
      </Heading>
      <RunningManSvg height={60} width={48.47} style={styles.mirror} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.pumpkinOrange,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  mirror: {
    transform: [{ scaleX: -1 }],
  },
});
