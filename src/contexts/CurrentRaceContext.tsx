import { Race } from '@/api/race/types';
import { useRace } from '@/api/race/useRace';
import { Heading } from '@/components/ui/Text';
import { createContext, ReactNode, useContext } from 'react';

export const CurrentRaceContext = createContext<Race | undefined | null>(null);

export const useCurrentRaceContext = () => {
  const race = useContext(CurrentRaceContext);

  if (!race) throw new Error('current race context: no value provided');

  return race;
};

export const CurrentRaceProvider = ({
  raceId,
  children,
}: {
  raceId: string;
  children: ReactNode;
}) => {
  const { race, isRacePending, isRaceError } = useRace({ raceId });

  if (isRacePending) {
    return <Heading>Loading...</Heading>;
  }

  if (isRaceError) {
    return <Heading>Error</Heading>;
  }

  return (
    <CurrentRaceContext.Provider value={race}>
      {children}
    </CurrentRaceContext.Provider>
  );
};
