import { getTimePassed } from '@/utils/getTimePassed';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { HSpace, VSpace } from './ui/Spacer';
import { Heading, Text } from './ui/Text';

interface LeaderboardCardProps {
  username: string;
  position: number;
  avatarUrl: string;
  numberOfSteps: number;
  lastLoggedStepsAt: Date | null;
}

export function LeaderboardCard({
  username,
  position,
  numberOfSteps,
  avatarUrl,
  lastLoggedStepsAt,
}: LeaderboardCardProps) {
  const stepsText = `${numberOfSteps} \n steps`;
  const timeSinceLastLog = lastLoggedStepsAt
    ? getTimePassed(lastLoggedStepsAt)
    : null;
  return (
    <View style={styles.container}>
      <Heading style={styles.position}>{position}</Heading>
      <Image
        source={avatarUrl}
        style={{ height: 54, width: 54, borderRadius: 27 }}
      />
      <HSpace width={20} />
      <View
        style={{
          flex: 1,
          paddingRight: 20,
          paddingVertical: 4,
        }}
      >
        <Heading style={{ height: '50%', flexGrow: 1 }}>{username}</Heading>
        <VSpace height={8} />
        {!!timeSinceLastLog && <Text>{timeSinceLastLog}</Text>}
      </View>
      <Text style={{ textAlign: 'center', fontSize: 16 }}>{stepsText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  position: {
    fontSize: 40,
    lineHeight: 40,
    paddingRight: 20,
  },
});
