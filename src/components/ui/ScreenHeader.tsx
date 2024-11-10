import { Heading } from '@/components/ui/Text';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { BackButton } from './buttons/BackButton';

export const ScreenHeader = ({
  children,
  hideBackButton,
}: {
  children: string;
  hideBackButton?: boolean;
}) => {
  const { canGoBack } = useNavigation();
  const showBackButton = !hideBackButton && canGoBack();

  return (
    <View
      style={[
        styles.screenHeadingContainer,
        !showBackButton && { justifyContent: 'center' },
      ]}
    >
      {showBackButton && <BackButton style={{ width: 40, height: 40 }} />}
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
  screenTitle: { fontSize: 32, lineHeight: 40 },
  headerRight: {
    height: 40,
    width: 40,
  },
});
