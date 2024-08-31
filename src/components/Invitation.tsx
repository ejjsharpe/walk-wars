import * as Colors from '@/constants/Colors';
import { getTimePassed } from '@/utils/getTimePassed';
import { StyleSheet, View } from 'react-native';
import { Heading, Text } from './ui/Text';
import { CrossButton } from './ui/buttons/CrossButton';
import { TickButton } from './ui/buttons/TickButton';

interface InvitationProps {
  title: string;
  senderName: string;
  receivedAt: Date;
}

export const Invitation = ({
  title,
  senderName,
  receivedAt,
}: InvitationProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Heading style={styles.title}>{title}</Heading>
        <Text style={styles.invitationFromText}>
          Invitation from{' '}
          <Text style={[styles.invitationFromText, styles.senderName]}>
            {senderName}
          </Text>
        </Text>
        <Text style={styles.receivedAtText}>{getTimePassed(receivedAt)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TickButton />
        <View style={{ width: 8 }} />
        <CrossButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    color: Colors.pumpkinOrange,
  },
  invitationFromText: {
    fontSize: 20,
  },
  senderName: {
    color: Colors.pictonBlue,
  },
  receivedAtText: {
    fontSize: 16,
    opacity: 0.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
