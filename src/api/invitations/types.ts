export type Invitation = {
  id: string;
  created_at: string;
  sender: { id: string; display_name: string | null };
  race: { id: string; name: string };
};
