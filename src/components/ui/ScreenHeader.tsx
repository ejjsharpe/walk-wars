import { Heading } from '@/components/ui/Text';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { BackButton } from './buttons/BackButton';

export const ScreenHeader = ({ children }: { children: string }) => {
  const { canGoBack } = useNavigation();
  const showBackButton = canGoBack();

  return (
    <View
      style={[
        styles.screenHeadingContainer,
        !showBackButton && { justifyContent: 'center' },
      ]}
    >
      {showBackButton && <BackButton />}
      <Heading style={styles.screenTitle}>{children}</Heading>
      {showBackButton && <View style={styles.headerRight} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screenHeadingContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  screenTitle: { fontSize: 40, lineHeight: 40 },
  headerRight: {
    height: 48,
    width: 48,
  },
});
