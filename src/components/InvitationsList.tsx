import { Invitation as InvitationType } from '@/api/invitations/types';
import { FlashList } from '@shopify/flash-list';
import { Fragment, useCallback } from 'react';
import { Invitation } from './Invitation';
import { Separator } from './ui/Separator';

export const InvitationsList = ({
  invitations,
}: {
  invitations: InvitationType[];
}) => {
  const renderInvitation = useCallback(
    ({ item, index }: { item: InvitationType; index: number }) => {
      return (
        <Fragment key={item.id}>
          <Invitation
            receivedAt={new Date(item.created_at)}
            senderName={item.sender.display_name as string}
            title={item.race.name}
          />
          {index !== invitations.length - 1 && <Separator />}
        </Fragment>
      );
    },
    [invitations.length]
  );

  return (
    <FlashList
      data={invitations}
      renderItem={renderInvitation}
      estimatedItemSize={80}
    />
  );
};
