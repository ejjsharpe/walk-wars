import { useLoadedUser } from '@/api/user/useUser';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Spacer } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export const NoRaceScreen = () => {
  const { user } = useLoadedUser();
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
      <Spacer height={40} />
      <Text style={styles.body}>
        Find some friends to race. You can either join their race or you can
        start one of your own.{' '}
      </Text>
      <Spacer height={20} />
      <Text style={styles.body}>Would you like to</Text>
      <Spacer height={36} />
      <PrimaryButton onPress={onPressCreateRace}>CREATE RACE</PrimaryButton>
      <Spacer height={20} />
      <Text>or</Text>
      <Spacer height={20} />
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
