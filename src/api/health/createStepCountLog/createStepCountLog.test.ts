import {
  HKQuantityTypeIdentifier,
  queryQuantitySamples,
} from '@kingstinct/react-native-healthkit';
import { createStepCountLog } from './createStepCountLog';

jest.mock('@kingstinct/react-native-healthkit', () => ({
  HKQuantityTypeIdentifier: {
    stepCount: 'HKQuantityTypeIdentifierStepCount',
  },
  queryQuantitySamples: jest.fn(),
}));

describe('generateStepCountLogBetweenDates', () => {
  const mockedQueryQuantitySamples =
    queryQuantitySamples as jest.MockedFunction<typeof queryQuantitySamples>;

  beforeEach(() => {
    mockedQueryQuantitySamples.mockReset();
  });

  it('should return the total steps between two dates', async () => {
    const from = new Date('2023-10-01T12:00:00Z');
    const to = new Date('2023-10-01T13:00:00Z');

    const mockLogs = [
      { quantity: 1000 },
      { quantity: 2000 },
      { quantity: 1500 },
    ];
    //@ts-expect-error testing
    mockedQueryQuantitySamples.mockResolvedValue(mockLogs);

    const result = await createStepCountLog({ from, to });

    expect(mockedQueryQuantitySamples).toHaveBeenCalledWith(
      HKQuantityTypeIdentifier.stepCount,
      {
        from,
        to,
        ascending: true,
      }
    );

    expect(result).toEqual({
      start_timestamp: from.toISOString(),
      end_timestamp: to.toISOString(),
      step_count: 4500,
    });
  });

  it('should handle empty logs and return zero steps', async () => {
    const from = new Date('2023-10-01T14:00:00Z');
    const to = new Date('2023-10-01T15:00:00Z');

    mockedQueryQuantitySamples.mockResolvedValue([]);

    const result = await createStepCountLog({ from, to });

    expect(result).toEqual({
      start_timestamp: from.toISOString(),
      end_timestamp: to.toISOString(),
      step_count: 0,
    });
  });

  it('should handle logs with zero quantities', async () => {
    const from = new Date('2023-10-01T16:00:00Z');
    const to = new Date('2023-10-01T17:00:00Z');

    const mockLogs = [{ quantity: 0 }, { quantity: 0 }];

    //@ts-expect-error testing
    mockedQueryQuantitySamples.mockResolvedValue(mockLogs);

    const result = await createStepCountLog({ from, to });

    expect(result).toEqual({
      start_timestamp: from.toISOString(),
      end_timestamp: to.toISOString(),
      step_count: 0,
    });
  });

  it('should not modify the original from and to dates', async () => {
    const from = new Date('2023-10-01T22:00:00Z');
    const to = new Date('2023-10-01T23:00:00Z');

    const originalFromTime = from.getTime();
    const originalToTime = to.getTime();

    mockedQueryQuantitySamples.mockResolvedValue([]);

    await createStepCountLog({ from, to });

    expect(from.getTime()).toBe(originalFromTime);
    expect(to.getTime()).toBe(originalToTime);
  });

  it('should handle when queryQuantitySamples rejects with an error', async () => {
    const from = new Date('2023-10-01T22:00:00Z');
    const to = new Date('2023-10-01T23:00:00Z');

    mockedQueryQuantitySamples.mockRejectedValue(new Error('HealthKit error'));

    await expect(createStepCountLog({ from, to })).rejects.toThrow(
      'HealthKit error'
    );
  });
});
