import { useSignIn } from '@/api/auth/useSignIn';
import { useSignUp } from '@/api/auth/useSignUp';
import { RunnnigManSvg } from '@/components/svg/RunningManSvg';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { Nikeflix } from '@/constants/Fonts';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, signInWithEmail } = useSignIn();
  const { signUpWithEmail } = useSignUp();

  return (
    <View style={[styles.container]}>
      <View style={styles.headerTop}>
        <Text style={[styles.headerText, styles.walk]}>WALK</Text>
        <RunnnigManSvg style={styles.mirror} />
      </View>
      <View style={styles.headerBottom}>
        <RunnnigManSvg />
        <Text style={[styles.headerText, styles.wars]}>WARS</Text>
      </View>
      <Spacer height={56} />
      <View style={styles.contentContainer}>
        <Input placeholder="email" value={email} onChangeText={setEmail} />
        <Spacer height={12} />
        <Input
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
        <Spacer height={12} />
        <Button onPress={() => signInWithEmail({ email, password })}>
          sign in with email
        </Button>
        <Spacer height={12} />
        <Button onPress={() => signUpWithEmail({ email, password })}>
          sign up
        </Button>
        <Spacer height={24} />
        <Text style={{ fontSize: 24 }}>or</Text>
        <Spacer height={24} />
        <Button onPress={signInWithGoogle}>sign in with google</Button>
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
    backgroundColor: Colors.secondary,
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
  },
});