import { useInvitationsSuspense } from '@/api/invitations/useInvitations';
import { InvitationsList } from '@/components/InvitationsList';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const InvitationsScreen = () => {
  const { invitations } = useInvitationsSuspense();
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();

  const onPressCreateRace = () => {
    navigate('Create Race');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader>Invitations</ScreenHeader>
      <View style={[styles.container, { paddingBottom: insets.top }]}>
        <Suspense fallback={<Text>Loading</Text>}>
          {invitations.length > 0 ? (
            <InvitationsList invitations={invitations} />
          ) : (
            <>
              <Heading style={styles.title}>NO INVITATIONS</Heading>
              <VSpace height={40} />
              <Text style={styles.body}>
                Find some friends to race. You can either join their race or you
                can start one of your own.{' '}
              </Text>
              <VSpace height={20} />
              <Text style={styles.body}>Would you like to</Text>
              <VSpace height={36} />
              <PrimaryButton onPress={onPressCreateRace}>
                CREATE RACE
              </PrimaryButton>
              <VSpace height={36} />
              <Text style={styles.body}>instead?</Text>
            </>
          )}
        </Suspense>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
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
  exclamation: {
    color: Colors.pumpkinOrange,
  },
  body: {
    fontSize: 20,
    textAlign: 'center',
  },
});
