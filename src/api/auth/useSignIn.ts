import { supabase } from '@/lib/supabase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const _signInWithGoogle = async () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    iosClientId:
      '676537199244-t6qn94qnmntib9a875gh7ind23j826hh.apps.googleusercontent.com',
  });

  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  if (userInfo.idToken) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: userInfo.idToken,
    });

    if (error) throw error;

    return data;
  } else {
    throw new Error('no ID token present!');
  }
};

const _signInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;

  return data;
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  const { mutate: signInWithGoogle, isPending: isSignInWithGooglePending } =
    useMutation({
      mutationKey: ['session'],
      mutationFn: _signInWithGoogle,
      onSuccess: (data) => {
        if (data?.session) {
          queryClient.setQueryData(['session'], data.session);
        }
      },
    });

  const { mutate: signInWithEmail, isPending: isSignInWithEmailPending } =
    useMutation({
      mutationKey: ['session'],
      mutationFn: _signInWithEmail,
      onSuccess: (data) => {
        if (data?.session) {
          queryClient.setQueryData(['session'], data.session);
        }
      },
    });

  return {
    signInWithGoogle,
    signInWithEmail,
    isPending: isSignInWithGooglePending || isSignInWithEmailPending,
  };
};
