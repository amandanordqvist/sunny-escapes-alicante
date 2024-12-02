import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  property_media: Database["public"]["Tables"]["property_media"]["Row"][];
  property_features: {
    features: Database["public"]["Tables"]["features"]["Row"];
  }[];
};

export interface PropertyFormValues extends Omit<Property, "id" | "created_at" | "updated_at" | "property_media" | "property_features"> {
  features?: string[];
}

export interface PropertyFormProps {
  initialData?: Property;
  propertyId?: string;
  property?: Property;
  onSubmit: (values: PropertyFormValues) => void;
  onImagesUpdated?: () => void;
}