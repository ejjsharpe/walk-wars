import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const acceptInvitation = async ({ invitationId }: { invitationId: string }) => {
  const { data, error } = await supabase.rpc('accept_invitation', {
    invitation_id: invitationId,
  });

  if (error) throw error;

  return data;
};

export const useAcceptInvitation = () => {
  const { mutate } = useMutation({
    mutationFn: acceptInvitation,
    mutationKey: ['invitations'],
  });

  return { acceptInvitation: mutate };
};
