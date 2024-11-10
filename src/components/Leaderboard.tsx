import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { LeaderboardCard } from './LeaderboardCard';

interface RacePlayer {
  display_name?: string | null | undefined;
  avatar?: string | null | undefined;
  color?: string | null | undefined;
  id?: string | undefined;
  finish_position: number | null;
  total_step_count: number;
  adjusted_step_count: number;
  last_logged_steps_at: string | null;
}

interface LeaderboardProps {
  data: RacePlayer[];
}

export function Leaderboard({ data }: LeaderboardProps) {
  const renderItem = useCallback(
    ({ item, index }: { item: RacePlayer; index: number }) => {
      return (
        <LeaderboardCard
          avatarUrl={item.avatar!}
          numberOfSteps={item.adjusted_step_count}
          position={index + 1}
          username={item.display_name!}
          key={item.id}
          lastLoggedStepsAt={
            item.last_logged_steps_at
              ? new Date(item.last_logged_steps_at)
              : null
          }
        />
      );
    },
    []
  );
  return (
    <FlashList data={data} renderItem={renderItem} estimatedItemSize={200} />
  );
}
