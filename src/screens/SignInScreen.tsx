import { useSignIn } from '@/api/auth/useSignIn';
import { useSignUp } from '@/api/auth/useSignUp';
import { RunningManSvg } from '@/components/svg/RunningManSvg';
import { Input } from '@/components/ui/Input';
import { VSpace } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { SignInWithAppleButton } from '@/components/ui/buttons/SignInWithAppleButton';
import { SignInWithGoogleButton } from '@/components/ui/buttons/SignInWithGoogleButton';
import * as Colors from '@/constants/Colors';
import { Nikeflix } from '@/constants/Fonts';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, signInWithEmail } = useSignIn();
  const { signUpWithEmail } = useSignUp();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <View style={styles.headerTop}>
        <Text style={[styles.headerText, styles.walk]}>WALK</Text>
        <RunningManSvg style={styles.mirror} />
      </View>
      <View style={styles.headerBottom}>
        <RunningManSvg />
        <Text style={[styles.headerText, styles.wars]}>WARS</Text>
      </View>
      <VSpace height={24} />
      <View style={[styles.contentContainer, { marginBottom: bottom }]}>
        <Input placeholder="email" value={email} onChangeText={setEmail} />
        <VSpace height={12} />
        <Input
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
        <VSpace height={12} />
        <PrimaryButton onPress={() => signInWithEmail({ email, password })}>
          sign in with email
        </PrimaryButton>
        <VSpace height={12} />
        <PrimaryButton onPress={() => signUpWithEmail({ email, password })}>
          sign up
        </PrimaryButton>
        <VSpace height={24} />
        <Text style={{ fontSize: 24 }}>or</Text>
        <VSpace height={24} />
        <SignInWithGoogleButton onPress={signInWithGoogle} />
        <VSpace height={12} />
        <SignInWithAppleButton onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTop: {
    height: 200,
    backgroundColor: Colors.pumpkinOrange,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 12,
  },
  headerBottom: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
  },
  headerText: {
    fontSize: 72,
    fontFamily: Nikeflix,
    lineHeight: 72,
  },
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  walk: {
    marginRight: 8,
  },
  wars: {
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
