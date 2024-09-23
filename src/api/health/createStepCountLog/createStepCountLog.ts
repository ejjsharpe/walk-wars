import {
  HKQuantityTypeIdentifier,
  queryQuantitySamples,
} from '@kingstinct/react-native-healthkit';

export const createStepCountLog = async ({
  from,
  to,
}: {
  from: Date;
  to: Date;
}) => {
  let totalSteps = 0;
  const logs = await queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, {
    from,
    to,
    ascending: true,
  });

  logs.forEach((log) => (totalSteps += log.quantity));

  return {
    start_timestamp: from.toISOString(),
    end_timestamp: to.toISOString(),
    step_count: totalSteps,
  };
};
