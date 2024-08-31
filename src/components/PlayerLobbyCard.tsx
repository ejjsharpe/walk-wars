import * as Colors from '@/constants/Colors';
import { Image, ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { StopWatchSvg } from './svg/StopWatchSvg';
import { TickSvg } from './svg/TickSvg';
import { Heading, Text } from './ui/Text';

interface PlayerLobbyCardProps {
  status: 'pending' | 'ready';
  playerName: string;
  playerColor: string;
  avatar: string | number | ImageSource | ImageSource[] | string[];
  isHost?: boolean;
}

export const PlayerLobbyCard = ({
  status = 'ready',
  playerName = 'TOny the tiget',
  playerColor = Colors.pumpkinOrange,
  avatar = 'https://i.pravatar.cc/68',
  isHost = false,
}: PlayerLobbyCardProps) => {
  const isReady = status === 'ready';
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.colorCircle, { backgroundColor: playerColor }]}>
          <Image source={avatar} style={styles.avatar} />
        </View>
        <View>
          <Heading
            style={[
              {
                color: isReady ? Colors.celestialBlue : Colors.pumpkinOrange,
              },
            ]}
          >
            {playerName}
          </Heading>
          <Text>{isReady ? 'ready' : 'invitation pending'}</Text>
        </View>
      </View>
      <View
        style={[
          styles.statusIndicator,
          {
            borderColor: isReady ? Colors.celestialBlue : Colors.pumpkinOrange,
            backgroundColor: isReady
              ? Colors.electricBlue
              : Colors.pumpkinOrangeDark,
          },
        ]}
      >
        {isReady ? <TickSvg /> : <StopWatchSvg />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.squidInkLight,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  colorCircle: {
    height: 68,
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 34,
    marginRight: 16,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  playerName: {
    color: Colors.pumpkinOrange,
  },
  statusIndicator: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
