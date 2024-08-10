import { supabase } from '@/lib/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const _signUpWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw error;

  return data;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate: signUpWithEmail, isPending: isSignUpPending } = useMutation({
    mutationKey: ['session'],
    mutationFn: _signUpWithEmail,
    onSuccess: (data) => {
      if (data?.session) {
        queryClient.setQueryData(['session'], data.session);
      }
    },
  });

  return { signUpWithEmail, isSignUpPending };
};
