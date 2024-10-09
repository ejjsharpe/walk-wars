import * as Colors from '@/constants/Colors';
import { getOrdinal } from '@/utils/getOrdinal';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { DashboardWidgetSmall } from './DashboardWidgetSmall';
import { RunnerManSvg } from './svg/RunnerIconSvg';
import { TrophyIconSvg } from './svg/TrophyIconSvg';
import CircularProgressBar from './ui/CircularProgressBar';
import { VSpace } from './ui/Spacer';
import { Heading } from './ui/Text';

interface DashboardProps {
  stepsToday: number;
  percentComplete: number;
  racePosition: number;
}

// TODO: remove default arg and add loading state
export const Dashboard = ({
  stepsToday = 0,
  percentComplete,
  racePosition,
}: DashboardProps) => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            styles.progressContainer,
            {
              backgroundColor: Colors.squidInkLight,
              width: (width - 60) / 2,
            },
          ]}
        >
          <VSpace height={16} />
          <CircularProgressBar
            size={Math.round((width - 60) / 2 - 72)}
            percentComplete={percentComplete}
          />
          <VSpace height={12} />
          <Heading style={{ paddingBottom: 12 }}>PROGRESS</Heading>
        </View>
        <View style={{ width: 20 }}></View>
        <View>
          <DashboardWidgetSmall
            value={stepsToday.toString()}
            unit={'steps'}
            Icon={
              <RunnerManSvg width={48} height={48} color={Colors.pictonBlue} />
            }
            subheader={'today'}
          />
          <VSpace height={20} />
          <DashboardWidgetSmall
            Icon={
              <TrophyIconSvg width={48} height={48} color={Colors.pictonBlue} />
            }
            value={racePosition + getOrdinal(racePosition)}
            unit="place"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
