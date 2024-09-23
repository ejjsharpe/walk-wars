import { createStepCountLog } from '../createStepCountLog/createStepCountLog';
import { getHourlyStepLogs } from './getHourlyStepLogs';

jest.mock(
  '../generateStepCountLogBetweenDates/generateStepCountLogBetweenDates',
  () => ({
    generateStepCountLogBetweenDates: jest.fn(),
  })
);

describe('getHourlyStepLogs', () => {
  const mockedGenerateStepCountLogBetweenDates =
    createStepCountLog as jest.MockedFunction<typeof createStepCountLog>;

  beforeEach(() => {
    mockedGenerateStepCountLogBetweenDates.mockReset();
  });

  it('should return logs for each complete hourly interval, starting at an arbitrary minute within the hour', async () => {
    const from = new Date('2023-10-01T12:33:00Z');
    const to = new Date('2023-10-01T15:49:00Z');

    mockedGenerateStepCountLogBetweenDates.mockImplementation(
      async ({ from, to }) => ({
        start_timestamp: from.toISOString(),
        end_timestamp: to.toISOString(),
        step_count: 1000,
      })
    );

    const logs = await getHourlyStepLogs({ from, to });

    expect(mockedGenerateStepCountLogBetweenDates).toHaveBeenCalledTimes(3);

    expect(mockedGenerateStepCountLogBetweenDates).toHaveBeenNthCalledWith(1, {
      from: new Date('2023-10-01T12:33:00Z'),
      to: new Date('2023-10-01T13:00:00Z'),
    });

    expect(mockedGenerateStepCountLogBetweenDates).toHaveBeenNthCalledWith(2, {
      from: new Date('2023-10-01T13:00:00Z'),
      to: new Date('2023-10-01T14:00:00Z'),
    });

    expect(mockedGenerateStepCountLogBetweenDates).toHaveBeenNthCalledWith(3, {
      from: new Date('2023-10-01T14:00:00Z'),
      to: new Date('2023-10-01T15:00:00Z'),
    });

    expect(logs).toEqual([
      {
        start_timestamp: new Date('2023-10-01T12:33:00Z').toISOString(),
        end_timestamp: new Date('2023-10-01T13:00:00Z').toISOString(),
        step_count: 1000,
      },
      {
        start_timestamp: new Date('2023-10-01T13:00:00Z').toISOString(),
        end_timestamp: new Date('2023-10-01T14:00:00Z').toISOString(),
        step_count: 1000,
      },
      {
        start_timestamp: new Date('2023-10-01T14:00:00Z').toISOString(),
        end_timestamp: new Date('2023-10-01T15:00:00Z').toISOString(),
        step_count: 1000,
      },
    ]);
  });

  it('does not return any logs for an incomplete hour', async () => {
    const from = new Date('2023-10-01T12:15:00Z');
    const to = new Date('2023-10-01T12:45:00Z');

    mockedGenerateStepCountLogBetweenDates.mockImplementation(
      async ({ from, to }) => ({
        start_timestamp: from.toISOString(),
        end_timestamp: to.toISOString(),
        step_count: 500,
      })
    );

    const logs = await getHourlyStepLogs({ from, to });

    expect(mockedGenerateStepCountLogBetweenDates).toHaveBeenCalledTimes(0);

    expect(logs).toEqual([]);
  });

  it('should return an empty array if from and to are the same', async () => {
    const from = new Date('2023-10-01T12:00:00Z');
    const to = new Date('2023-10-01T12:00:00Z');

    const logs = await getHourlyStepLogs({ from, to });

    expect(mockedGenerateStepCountLogBetweenDates).not.toHaveBeenCalled();
    expect(logs).toEqual([]);
  });

  it('should handle cases where from is after to by returning an empty array', async () => {
    const from = new Date('2023-10-01T15:00:00Z');
    const to = new Date('2023-10-01T12:00:00Z');

    const logs = await getHourlyStepLogs({ from, to });

    expect(mockedGenerateStepCountLogBetweenDates).not.toHaveBeenCalled();
    expect(logs).toEqual([]);
  });

  it('should not modify the original from and to dates', async () => {
    const from = new Date('2023-10-01T12:15:00Z');
    const to = new Date('2023-10-01T14:15:00Z');

    const originalFromTime = from.getTime();
    const originalToTime = to.getTime();

    mockedGenerateStepCountLogBetweenDates.mockImplementation(
      async ({ from, to }) => ({
        start_timestamp: from.toISOString(),
        end_timestamp: to.toISOString(),
        step_count: 700,
      })
    );

    await getHourlyStepLogs({ from, to });

    expect(from.getTime()).toBe(originalFromTime);
    expect(to.getTime()).toBe(originalToTime);
  });
});
