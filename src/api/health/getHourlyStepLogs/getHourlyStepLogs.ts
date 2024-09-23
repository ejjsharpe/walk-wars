import { createStepCountLog } from '../createStepCountLog/createStepCountLog';

export const getHourlyStepLogs = async ({
  from,
  to,
}: {
  from: Date;
  to: Date;
}) => {
  const promises = [];
  let currentFrom = new Date(from);

  while (currentFrom < to) {
    let currentTo = new Date(currentFrom);
    currentTo.setMinutes(0, 0, 0);
    currentTo.setHours(currentTo.getHours() + 1);

    if (currentTo > to) {
      break;
    }

    promises.push(
      createStepCountLog({
        from: new Date(currentFrom),
        to: new Date(currentTo),
      })
    );

    currentFrom = new Date(currentTo);
  }

  const logs = await Promise.all(promises);

  return logs;
};
