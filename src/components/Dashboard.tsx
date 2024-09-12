import * as Colors from '@/constants/Colors';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { DashboardWidgetSmall } from './DashboardWidgetSmall';
import { RunnerManSvg } from './svg/RunnerIconSvg';
import { TrophyIconSvg } from './svg/TrophyIconSvg';
import CircularProgressBar from './ui/CircularProgressBar';
import { Spacer } from './ui/Spacer';
import { Heading } from './ui/Text';

export const Dashboard = () => {
  const { width } = useWindowDimensions();
  const distanceTravelledToday = '7.5';

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
          <Spacer height={16} />
          <CircularProgressBar size={Math.round((width - 60) / 2 - 72)} />
          <Spacer height={12} />
          <Heading style={{ paddingBottom: 12 }}>PROGRESS</Heading>
        </View>
        <View style={{ width: 20 }}></View>
        <View>
          <DashboardWidgetSmall
            value={distanceTravelledToday}
            unit={'KM'}
            Icon={
              <RunnerManSvg width={48} height={48} color={Colors.pictonBlue} />
            }
            subheader={'today'}
          />
          <Spacer height={20} />
          <DashboardWidgetSmall
            Icon={
              <TrophyIconSvg width={48} height={48} color={Colors.pictonBlue} />
            }
            value="2nd"
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
