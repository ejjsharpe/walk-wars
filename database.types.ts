export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applied_powers: {
        Row: {
          caster_id: string
          created_at: string
          end_time: string
          id: number
          power_id: number
          race_id: number
          start_time: string
          target_id: string | null
        }
        Insert: {
          caster_id: string
          created_at: string
          end_time: string
          id?: number
          power_id: number
          race_id: number
          start_time: string
          target_id?: string | null
        }
        Update: {
          caster_id?: string
          created_at?: string
          end_time?: string
          id?: number
          power_id?: number
          race_id?: number
          start_time?: string
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_powers_caster_id_fkey"
            columns: ["caster_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_powers_power_id_fkey"
            columns: ["power_id"]
            isOneToOne: false
            referencedRelation: "powers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_powers_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_powers_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      distance_logs: {
        Row: {
          created_at: string
          distance: number
          id: number
          partial: boolean
          race_id: number
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          distance: number
          id?: number
          partial?: boolean
          race_id: number
          timestamp: string
          user_id: string
        }
        Update: {
          created_at?: string
          distance?: number
          id?: number
          partial?: boolean
          race_id?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "distance_logs_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distance_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string
          id: number
          race_id: number
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          race_id: number
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: number
          race_id?: number
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      powers: {
        Row: {
          created_at: string
          description: string
          duration_hours: number | null
          effect: string
          id: number
          key: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          duration_hours?: number | null
          effect: string
          id?: number
          key: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          duration_hours?: number | null
          effect?: string
          id?: number
          key?: string
          name?: string
        }
        Relationships: []
      }
      races: {
        Row: {
          created_at: string
          distance: number | null
          end_condition: Database["public"]["Enums"]["end_condition"]
          ended_at: string | null
          host_id: string
          id: number
          name: string
          started_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          distance?: number | null
          end_condition?: Database["public"]["Enums"]["end_condition"]
          ended_at?: string | null
          host_id: string
          id?: number
          name: string
          started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          distance?: number | null
          end_condition?: Database["public"]["Enums"]["end_condition"]
          ended_at?: string | null
          host_id?: string
          id?: number
          name?: string
          started_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "races_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          color: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          color?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          color?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_races: {
        Row: {
          distance_travelled: number
          finish_position: number | null
          joined_race_at: string
          race_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          distance_travelled?: number
          finish_position?: number | null
          joined_race_at?: string
          race_id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          distance_travelled?: number
          finish_position?: number | null
          joined_race_at?: string
          race_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_races_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_races_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invitation: {
        Args: {
          invitation_id: number
        }
        Returns: {
          distance_travelled: number
          finish_position: number | null
          joined_race_at: string
          race_id: number
          updated_at: string
          user_id: string
        }
      }
      create_race: {
        Args: {
          user_id: string
          name: string
          distance: number
          end_condition: Database["public"]["Enums"]["end_condition"]
        }
        Returns: {
          created_at: string
          distance: number | null
          end_condition: Database["public"]["Enums"]["end_condition"]
          ended_at: string | null
          host_id: string
          id: number
          name: string
          started_at: string | null
          updated_at: string | null
        }
      }
      get_invitations_by_recipient: {
        Args: {
          user_id: string
        }
        Returns: {
          id: number
          sender: Json
          recipient_id: string
          race: Json
          created_at: string
        }[]
      }
      get_lobby_players: {
        Args: {
          raceid: number
        }
        Returns: {
          user_id: string
          display_name: string
          avatar: string
          color: string
          status: string
        }[]
      }
    }
    Enums: {
      end_condition: "winner_finished" | "all_finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never