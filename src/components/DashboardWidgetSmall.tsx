import * as Colors from '@/constants/Colors';
import { useWindowDimensions, View } from 'react-native';
import { Heading, Text } from './ui/Text';

interface DashboardWidgetSmallProps {
  value: string;
  unit: string;
  subheader?: string;
  Icon: JSX.Element;
}
export const DashboardWidgetSmall = ({
  value,
  unit,
  subheader,
  Icon,
}: DashboardWidgetSmallProps) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: Colors.squidInkLight,
        width: (width - 60) / 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
      }}
    >
      {Icon}
      <View style={{ width: 12 }} />
      <View>
        <Heading style={{ color: Colors.pumpkinOrange }}>
          {value}
          <Heading>{' ' + unit}</Heading>
        </Heading>
        {subheader && <Text>{subheader}</Text>}
      </View>
    </View>
  );
};
