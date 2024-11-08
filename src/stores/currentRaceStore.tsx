import { create } from 'zustand';

interface CurrentRace {
  raceId: string | null;
  setCurrentRaceId: ({ id }: { id: string }) => void;
}

export const useCurrentRaceStore = create<CurrentRace>((set) => ({
  raceId: null,
  setCurrentRaceId: ({ id }) => set({ raceId: id }),
}));

export const useCurrentRace = () => {
  const { raceId } = useCurrentRaceStore();

  if (!raceId) {
    throw new Error(
      'useCurrentRace: trying to get current raceId without setting it to the current race store'
    );
  }

  return { raceId };
};
