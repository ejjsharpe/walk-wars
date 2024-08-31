import { formatDistance } from 'date-fns';

export const getTimePassed = (date: Date): string => {
  const difference = formatDistance(date, new Date());

  return `${difference} ago`;
};
