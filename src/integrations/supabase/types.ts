export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          created_at: string
          event: string
          id: string
          payload: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          event: string
          id?: string
          payload?: Json
          user_id: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          payload?: Json
          user_id?: string
        }
        Relationships: []
      }
      assessment_answers: {
        Row: {
          ai_feedback: string | null
          answer: string
          assessment_id: string
          id: string
          is_correct: boolean | null
          max_score: number
          question_id: string
          score: number
          seconds_spent: number
          skill: string
          transfer: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_feedback?: string | null
          answer?: string
          assessment_id: string
          id?: string
          is_correct?: boolean | null
          max_score?: number
          question_id: string
          score?: number
          seconds_spent?: number
          skill: string
          transfer?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_feedback?: string | null
          answer?: string
          assessment_id?: string
          id?: string
          is_correct?: boolean | null
          max_score?: number
          question_id?: string
          score?: number
          seconds_spent?: number
          skill?: string
          transfer?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          day: number | null
          finished_at: string | null
          grade: number
          id: string
          kind: string
          max_score: number | null
          question_ids: Json
          skill_scores: Json | null
          started_at: string
          status: string
          total_score: number | null
          user_id: string
        }
        Insert: {
          day?: number | null
          finished_at?: string | null
          grade?: number
          id?: string
          kind?: string
          max_score?: number | null
          question_ids?: Json
          skill_scores?: Json | null
          started_at?: string
          status?: string
          total_score?: number | null
          user_id: string
        }
        Update: {
          day?: number | null
          finished_at?: string | null
          grade?: number
          id?: string
          kind?: string
          max_score?: number | null
          question_ids?: Json
          skill_scores?: Json | null
          started_at?: string
          status?: string
          total_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          day: number | null
          id: string
          lesson_id: string
          max_score: number | null
          practice: Json
          score: number | null
          stage: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          day?: number | null
          id?: string
          lesson_id: string
          max_score?: number | null
          practice?: Json
          score?: number | null
          stage?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          day?: number | null
          id?: string
          lesson_id?: string
          max_score?: number | null
          practice?: Json
          score?: number | null
          stage?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          archived: boolean
          cost: string
          country: string
          created_at: string
          deadline: string | null
          deadline_note: string
          format: string
          grades: number[]
          id: string
          last_checked: string
          level: string
          official_url: string
          organizer: string
          region: string | null
          registration_open: boolean
          registration_url: string | null
          requirements: string
          selection_path: string
          source_name: string
          subject: string
          title: string
        }
        Insert: {
          archived?: boolean
          cost?: string
          country?: string
          created_at?: string
          deadline?: string | null
          deadline_note?: string
          format?: string
          grades?: number[]
          id?: string
          last_checked?: string
          level?: string
          official_url: string
          organizer: string
          region?: string | null
          registration_open?: boolean
          registration_url?: string | null
          requirements?: string
          selection_path?: string
          source_name: string
          subject?: string
          title: string
        }
        Update: {
          archived?: boolean
          cost?: string
          country?: string
          created_at?: string
          deadline?: string | null
          deadline_note?: string
          format?: string
          grades?: number[]
          id?: string
          last_checked?: string
          level?: string
          official_url?: string
          organizer?: string
          region?: string | null
          registration_open?: boolean
          registration_url?: string | null
          requirements?: string
          selection_path?: string
          source_name?: string
          subject?: string
          title?: string
        }
        Relationships: []
      }
      opportunity_clicks: {
        Row: {
          clicked_at: string
          id: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          clicked_at?: string
          id?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          clicked_at?: string
          id?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_clicks_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string
          connection_quality: string
          country: string
          created_at: string
          daily_minutes: number
          goal: string
          grade: number
          has_mentor: boolean
          id: string
          language: string
          name: string
          onboarded: boolean
          org_code: string | null
          school: string | null
          self_level: string
          updated_at: string
        }
        Insert: {
          city?: string
          connection_quality?: string
          country?: string
          created_at?: string
          daily_minutes?: number
          goal?: string
          grade?: number
          has_mentor?: boolean
          id: string
          language?: string
          name?: string
          onboarded?: boolean
          org_code?: string | null
          school?: string | null
          self_level?: string
          updated_at?: string
        }
        Update: {
          city?: string
          connection_quality?: string
          country?: string
          created_at?: string
          daily_minutes?: number
          goal?: string
          grade?: number
          has_mentor?: boolean
          id?: string
          language?: string
          name?: string
          onboarded?: boolean
          org_code?: string | null
          school?: string | null
          self_level?: string
          updated_at?: string
        }
        Relationships: []
      }
      route_days: {
        Row: {
          completed_at: string | null
          created_at: string
          day: number
          difficulty: string
          duration_min: number
          goal: string
          id: string
          kind: string
          lesson_id: string | null
          outcome: string
          reason: string
          score: number | null
          skill: string
          status: string
          topic: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          day: number
          difficulty?: string
          duration_min?: number
          goal?: string
          id?: string
          kind?: string
          lesson_id?: string | null
          outcome?: string
          reason?: string
          score?: number | null
          skill: string
          status?: string
          topic: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          day?: number
          difficulty?: string
          duration_min?: number
          goal?: string
          id?: string
          kind?: string
          lesson_id?: string | null
          outcome?: string
          reason?: string
          score?: number | null
          skill?: string
          status?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string
          id: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_states: {
        Row: {
          attempts: number
          base_correct: number
          base_total: number
          error_types: Json
          id: string
          last_checked_at: string | null
          mastery: number
          no_ai_score: number | null
          skill: string
          status: string
          transfer_correct: number
          transfer_total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          base_correct?: number
          base_total?: number
          error_types?: Json
          id?: string
          last_checked_at?: string | null
          mastery?: number
          no_ai_score?: number | null
          skill: string
          status?: string
          transfer_correct?: number
          transfer_total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          base_correct?: number
          base_total?: number
          error_types?: Json
          id?: string
          last_checked_at?: string | null
          mastery?: number
          no_ai_score?: number | null
          skill?: string
          status?: string
          transfer_correct?: number
          transfer_total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          org_name: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_name?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          org_name?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "org" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "org", "admin"],
    },
  },
} as const
