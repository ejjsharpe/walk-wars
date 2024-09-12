import { Database } from '../../../database.types';
import { useRace } from './useRace';

export type Race = Database['public']['Tables']['races']['Row'];

interface UseLoadedRaceReturn extends ReturnType<typeof useRace> {
  race: Race;
}
export type UseLoadedRace = (
  ...args: Parameters<typeof useRace>
) => UseLoadedRaceReturn;
