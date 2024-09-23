import {
  HKQuantityTypeIdentifier,
  queryQuantitySamples,
  useHealthkitAuthorization,
} from '@kingstinct/react-native-healthkit';

export const useStepCountAuth = () => {
  const [authorizationStatus, requestAuthorization] = useHealthkitAuthorization(
    [HKQuantityTypeIdentifier.stepCount]
  );

  return {
    authorizationStatus,
    requestAuthorization,
  };
};
