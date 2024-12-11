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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          bio: string | null
          created_at: string
          current_project_id: string | null
          email: string
          id: string
          name: string
          phone: string | null
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          current_project_id?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          current_project_id?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_current_project_id_fkey"
            columns: ["current_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
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
      project_media: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_main: boolean | null
          media_type: string | null
          position: number | null
          project_id: string
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_main?: boolean | null
          media_type?: string | null
          position?: number | null
          project_id: string
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_main?: boolean | null
          media_type?: string | null
          position?: number | null
          project_id?: string
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          agent_id: string | null
          amenities: string[] | null
          completion_date: string | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          location: string | null
          price_range_max: number | null
          price_range_min: number | null
          status: string | null
          title: string
          total_units: number | null
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          amenities?: string[] | null
          completion_date?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          location?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          status?: string | null
          title: string
          total_units?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          amenities?: string[] | null
          completion_date?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          location?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          status?: string | null
          title?: string
          total_units?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string | null
          agent_id: string | null
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
          agent_id?: string | null
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
          agent_id?: string | null
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
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
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
      property_likes: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_likes_property_id_fkey"
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
      property_shares: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          share_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          share_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          share_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_shares_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      hello_world_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      hello_world_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      hello_world_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      wasm_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      wasm_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      wasm_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
    }
    Enums: {
      energy_rating: "A" | "B" | "C" | "D" | "E" | "F" | "G"
      inquiry_status: "new" | "in_progress" | "completed" | "cancelled"
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
