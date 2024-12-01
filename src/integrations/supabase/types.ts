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
      features: {
        Row: {
          category: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
          property_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          community_fee_month: number | null
          created_at: string | null
          description: string | null
          dropbox_link: string | null
          energy_rating: Database["public"]["Enums"]["energy_rating"] | null
          featured: boolean | null
          floor_number: number | null
          id: string
          internal_id: string | null
          latitude: number | null
          longitude: number | null
          owner_id: string | null
          plot_size_sqm: number | null
          postal_code: string | null
          price: number
          property_tax_year: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          region: string | null
          size_sqm: number | null
          status: Database["public"]["Enums"]["property_status"] | null
          title: string
          total_floors: number | null
          total_rooms: number | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          address?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          community_fee_month?: number | null
          created_at?: string | null
          description?: string | null
          dropbox_link?: string | null
          energy_rating?: Database["public"]["Enums"]["energy_rating"] | null
          featured?: boolean | null
          floor_number?: number | null
          id?: string
          internal_id?: string | null
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          plot_size_sqm?: number | null
          postal_code?: string | null
          price: number
          property_tax_year?: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          region?: string | null
          size_sqm?: number | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title: string
          total_floors?: number | null
          total_rooms?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          address?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          community_fee_month?: number | null
          created_at?: string | null
          description?: string | null
          dropbox_link?: string | null
          energy_rating?: Database["public"]["Enums"]["energy_rating"] | null
          featured?: boolean | null
          floor_number?: number | null
          id?: string
          internal_id?: string | null
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          plot_size_sqm?: number | null
          postal_code?: string | null
          price?: number
          property_tax_year?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          region?: string | null
          size_sqm?: number | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title?: string
          total_floors?: number | null
          total_rooms?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      property_features: {
        Row: {
          feature_id: string
          property_id: string
        }
        Insert: {
          feature_id: string
          property_id: string
        }
        Update: {
          feature_id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_media: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_main: boolean | null
          media_type: string | null
          position: number | null
          property_id: string | null
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_main?: boolean | null
          media_type?: string | null
          position?: number | null
          property_id?: string | null
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_main?: boolean | null
          media_type?: string | null
          position?: number | null
          property_id?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_media_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      energy_rating: "A" | "B" | "C" | "D" | "E" | "F" | "G"
      property_status:
        | "available"
        | "under_contract"
        | "sold"
        | "rented"
        | "off_market"
      property_type:
        | "apartment"
        | "penthouse"
        | "villa"
        | "house"
        | "townhouse"
        | "commercial"
        | "land"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
