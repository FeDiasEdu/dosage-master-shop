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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      aura_custom_products: {
        Row: {
          created_at: string | null
          data: Json
          pname: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          pname: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          pname?: string
        }
        Relationships: []
      }
      aura_deleted: {
        Row: {
          deleted_at: string | null
          pname: string
        }
        Insert: {
          deleted_at?: string | null
          pname: string
        }
        Update: {
          deleted_at?: string | null
          pname?: string
        }
        Relationships: []
      }
      aura_interest: {
        Row: {
          count: number | null
          sku: string
          updated_at: string | null
        }
        Insert: {
          count?: number | null
          sku: string
          updated_at?: string | null
        }
        Update: {
          count?: number | null
          sku?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      aura_store_sku: {
        Row: {
          cost_price: number | null
          costprice: number | null
          price: number | null
          sku: string
          stock: number | null
          stock_min: number | null
          stockmin: number | null
          updated_at: string | null
        }
        Insert: {
          cost_price?: number | null
          costprice?: number | null
          price?: number | null
          sku: string
          stock?: number | null
          stock_min?: number | null
          stockmin?: number | null
          updated_at?: string | null
        }
        Update: {
          cost_price?: number | null
          costprice?: number | null
          price?: number | null
          sku?: string
          stock?: number | null
          stock_min?: number | null
          stockmin?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string | null
          id: string
          quantity: number
          sku: string
          updated_at: string | null
        }
        Insert: {
          cart_id: string
          created_at?: string | null
          id?: string
          quantity?: number
          sku: string
          updated_at?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string | null
          id?: string
          quantity?: number
          sku?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: Json | null
          cpf: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          address?: Json | null
          cpf?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          address?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_name: string
          quantity: number
          subtotal: number | null
          unit_price: number
          variant_id: string | null
          variant_label: string
        }
        Insert: {
          id?: string
          order_id: string
          product_name: string
          quantity?: number
          subtotal?: number | null
          unit_price: number
          variant_id?: string | null
          variant_label: string
        }
        Update: {
          id?: string
          order_id?: string
          product_name?: string
          quantity?: number
          subtotal?: number | null
          unit_price?: number
          variant_id?: string | null
          variant_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          notes: string | null
          paid_at: string | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          shipped_at: string | null
          shipping: number
          shipping_address: Json | null
          status: string
          subtotal: number
          total: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping?: number
          shipping_address?: Json | null
          status?: string
          subtotal?: number
          total?: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping?: number
          shipping_address?: Json | null
          status?: string
          subtotal?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt: string | null
          id: string
          product_id: string
          sort_order: number | null
          storage_path: string
          variant_id: string | null
        }
        Insert: {
          alt?: string | null
          id?: string
          product_id: string
          sort_order?: number | null
          storage_path: string
          variant_id?: string | null
        }
        Update: {
          alt?: string | null
          id?: string
          product_id?: string
          sort_order?: number | null
          storage_path?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          available: boolean | null
          created_at: string | null
          dosage_unit: string
          dosage_value: number
          id: string
          label: string
          price: number | null
          product_id: string
          sku: string
          stock_qty: number
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          dosage_unit: string
          dosage_value: number
          id?: string
          label: string
          price?: number | null
          product_id: string
          sku: string
          stock_qty?: number
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          dosage_unit?: string
          dosage_value?: number
          id?: string
          label?: string
          price?: number | null
          product_id?: string
          sku?: string
          stock_qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          basic_protocol: string | null
          benefits: string | null
          category: string
          created_at: string | null
          cycle: string | null
          description: string | null
          dosage: string | null
          guide_key: string | null
          half_life: string | null
          id: string
          mechanism_of_action: string | null
          name: string
          reconstitution_guide: string | null
          route: string | null
          scientific_name: string | null
          side_effects: string | null
          slug: string
          storage: string | null
        }
        Insert: {
          active?: boolean
          basic_protocol?: string | null
          benefits?: string | null
          category: string
          created_at?: string | null
          cycle?: string | null
          description?: string | null
          dosage?: string | null
          guide_key?: string | null
          half_life?: string | null
          id?: string
          mechanism_of_action?: string | null
          name: string
          reconstitution_guide?: string | null
          route?: string | null
          scientific_name?: string | null
          side_effects?: string | null
          slug: string
          storage?: string | null
        }
        Update: {
          active?: boolean
          basic_protocol?: string | null
          benefits?: string | null
          category?: string
          created_at?: string | null
          cycle?: string | null
          description?: string | null
          dosage?: string | null
          guide_key?: string | null
          half_life?: string | null
          id?: string
          mechanism_of_action?: string | null
          name?: string
          reconstitution_guide?: string | null
          route?: string | null
          scientific_name?: string | null
          side_effects?: string | null
          slug?: string
          storage?: string | null
        }
        Relationships: []
      }
      stock_movements: {
        Row: {
          balance_after: number | null
          created_at: string | null
          direction: number
          id: string
          mov_type: string
          notes: string | null
          product_name: string | null
          quantity: number
          sku: string
          unit_cost: number | null
          variant_label: string | null
        }
        Insert: {
          balance_after?: number | null
          created_at?: string | null
          direction: number
          id?: string
          mov_type: string
          notes?: string | null
          product_name?: string | null
          quantity: number
          sku: string
          unit_cost?: number | null
          variant_label?: string | null
        }
        Update: {
          balance_after?: number | null
          created_at?: string | null
          direction?: number
          id?: string
          mov_type?: string
          notes?: string | null
          product_name?: string | null
          quantity?: number
          sku?: string
          unit_cost?: number | null
          variant_label?: string | null
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          created_at: string | null
          id: string
          sku: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sku: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sku?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      interest_counts: {
        Row: {
          count: number | null
          sku: string | null
        }
        Relationships: []
      }
      store_catalog: {
        Row: {
          active: boolean | null
          basic_protocol: string | null
          benefits: string | null
          category: string | null
          guide_key: string | null
          half_life: string | null
          id: string | null
          mechanism_of_action: string | null
          name: string | null
          reconstitution_guide: string | null
          scientific_name: string | null
          side_effects: string | null
          slug: string | null
          variants: Json | null
        }
        Insert: {
          active?: boolean | null
          basic_protocol?: string | null
          benefits?: string | null
          category?: string | null
          guide_key?: string | null
          half_life?: string | null
          id?: string | null
          mechanism_of_action?: string | null
          name?: string | null
          reconstitution_guide?: string | null
          scientific_name?: string | null
          side_effects?: string | null
          slug?: string | null
          variants?: never
        }
        Update: {
          active?: boolean | null
          basic_protocol?: string | null
          benefits?: string | null
          category?: string | null
          guide_key?: string | null
          half_life?: string | null
          id?: string | null
          mechanism_of_action?: string | null
          name?: string | null
          reconstitution_guide?: string | null
          scientific_name?: string | null
          side_effects?: string | null
          slug?: string | null
          variants?: never
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
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
