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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      headshots: {
        Row: {
          created_at: string | null
          generated_image_url: string | null
          id: string
          original_image_url: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          generated_image_url?: string | null
          id?: string
          original_image_url?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          generated_image_url?: string | null
          id?: string
          original_image_url?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      popup_settings: {
        Row: {
          accent_color: string | null
          background_color: string | null
          border_color: string | null
          created_at: string | null
          id: string
          position: string | null
          show_city: boolean | null
          text_color: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          background_color?: string | null
          border_color?: string | null
          created_at?: string | null
          id?: string
          position?: string | null
          show_city?: boolean | null
          text_color?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accent_color?: string | null
          background_color?: string | null
          border_color?: string | null
          created_at?: string | null
          id?: string
          position?: string | null
          show_city?: boolean | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      processed_videos: {
        Row: {
          created_at: string
          id: string
          subtitle_path: string | null
          user_id: string
          video_name: string | null
          video_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          subtitle_path?: string | null
          user_id: string
          video_name?: string | null
          video_url: string
        }
        Update: {
          created_at?: string
          id?: string
          subtitle_path?: string | null
          user_id?: string
          video_name?: string | null
          video_url?: string
        }
        Relationships: []
      }
      processing_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          job_type: string
          metadata: Json | null
          progress: number | null
          status: string
          updated_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          metadata?: Json | null
          progress?: number | null
          status: string
          updated_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          metadata?: Json | null
          progress?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "processing_jobs_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subtitle_styles: {
        Row: {
          background_color: string | null
          background_opacity: number | null
          border_style: string | null
          created_at: string | null
          font_color: string | null
          font_family: string | null
          font_size: number | null
          id: string
          position: string | null
          text_shadow: boolean | null
          updated_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          background_color?: string | null
          background_opacity?: number | null
          border_style?: string | null
          created_at?: string | null
          font_color?: string | null
          font_family?: string | null
          font_size?: number | null
          id?: string
          position?: string | null
          text_shadow?: boolean | null
          updated_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          background_color?: string | null
          background_opacity?: number | null
          border_style?: string | null
          created_at?: string | null
          font_color?: string | null
          font_family?: string | null
          font_size?: number | null
          id?: string
          position?: string | null
          text_shadow?: boolean | null
          updated_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtitle_styles_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: true
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      subtitles: {
        Row: {
          content: Json | null
          created_at: string | null
          file_path: string
          id: string
          is_original: boolean | null
          language: string
          processing_status: string | null
          public_url: string | null
          target_language: string | null
          translated_content: Json | null
          translation_status: string | null
          updated_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          file_path: string
          id?: string
          is_original?: boolean | null
          language: string
          processing_status?: string | null
          public_url?: string | null
          target_language?: string | null
          translated_content?: Json | null
          translation_status?: string | null
          updated_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          file_path?: string
          id?: string
          is_original?: boolean | null
          language?: string
          processing_status?: string | null
          public_url?: string | null
          target_language?: string | null
          translated_content?: Json | null
          translation_status?: string | null
          updated_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtitles_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          created_at: string | null
          id: string
          source_language: string
          status: string
          target_language: string
          updated_at: string | null
          user_id: string
          youtube_id: string
          youtube_url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          source_language?: string
          status?: string
          target_language: string
          updated_at?: string | null
          user_id: string
          youtube_id: string
          youtube_url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          source_language?: string
          status?: string
          target_language?: string
          updated_at?: string | null
          user_id?: string
          youtube_id?: string
          youtube_url?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number | null
          file_path: string
          file_size: number | null
          final_video_path: string | null
          final_video_url: string | null
          has_subtitles: boolean | null
          has_translated_subtitles: boolean | null
          id: string
          mime_type: string | null
          original_filename: string | null
          public_url: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path: string
          file_size?: number | null
          final_video_path?: string | null
          final_video_url?: string | null
          has_subtitles?: boolean | null
          has_translated_subtitles?: boolean | null
          id: string
          mime_type?: string | null
          original_filename?: string | null
          public_url?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path?: string
          file_size?: number | null
          final_video_path?: string | null
          final_video_url?: string | null
          has_subtitles?: boolean | null
          has_translated_subtitles?: boolean | null
          id?: string
          mime_type?: string | null
          original_filename?: string | null
          public_url?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
