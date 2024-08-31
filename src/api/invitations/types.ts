export type Invitation = {
  id: number;
  created_at: string;
  sender: { id: string; display_name: string | null };
  race: { id: number; name: string };
};
