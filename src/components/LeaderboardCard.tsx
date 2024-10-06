import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Heading, Text } from './ui/Text';

interface LeaderboardCardProps {
  username: string;
  position: number;
  numberOfSteps: number;
  totalStepsInRace: number;
  avatarUrl: string;
}

export function LeaderboardCard({
  username,
  position,
  numberOfSteps,
  totalStepsInRace,
  avatarUrl,
}: LeaderboardCardProps) {
  return (
    <View style={styles.container}>
      <Text>{position}</Text>
      <Image source={avatarUrl} />
      <View>
        <Heading>{username}</Heading>
        <View></View>
      </View>
      <Text>{numberOfSteps} steps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});
