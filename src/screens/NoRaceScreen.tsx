import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { VSpace } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export const NoRaceScreen = () => {
  const user = useCurrentUser();
  const { navigate } = useNavigation();

  const onPressCreateRace = () => {
    navigate('Create Race');
  };

  const onPressViewInvitations = () => {
    navigate('Invitations');
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>
        HI{' '}
        <Heading style={[styles.title, styles.displayName]}>
          {user.display_name}
        </Heading>
        !
      </Heading>
      <VSpace height={40} />
      <Text style={styles.body}>
        Find some friends to race. You can either join their race or you can
        start one of your own.{' '}
      </Text>
      <VSpace height={20} />
      <Text style={styles.body}>Would you like to</Text>
      <VSpace height={36} />
      <PrimaryButton onPress={onPressCreateRace}>CREATE RACE</PrimaryButton>
      <VSpace height={20} />
      <Text>or</Text>
      <VSpace height={20} />
      <PrimaryButton onPress={onPressViewInvitations}>
        VIEW INVITATIONS
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    lineHeight: 48,
  },
  displayName: {
    color: Colors.pumpkinOrange,
  },
  body: {
    fontSize: 20,
    textAlign: 'center',
  },
});
