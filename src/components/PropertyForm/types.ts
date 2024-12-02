import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

type PropertyType = Database["public"]["Enums"]["property_type"];
type PropertyStatus = Database["public"]["Enums"]["property_status"];
type EnergyRating = Database["public"]["Enums"]["energy_rating"];

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  property_media: Database["public"]["Tables"]["property_media"]["Row"][];
  property_features: {
    features: Database["public"]["Tables"]["features"]["Row"];
  }[];
};

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  property_type: z.enum([
    "apartment",
    "penthouse",
    "villa",
    "house",
    "townhouse",
    "commercial",
    "land",
  ] as const satisfies readonly PropertyType[]),
  status: z.enum([
    "available",
    "under_contract",
    "sold",
    "rented",
    "off_market",
  ] as const satisfies readonly PropertyStatus[]).optional(),
  size_sqm: z.number().min(0).optional(),
  plot_size_sqm: z.number().min(0).optional(),
  floor_number: z.number().min(0).optional(),
  total_floors: z.number().min(0).optional(),
  total_rooms: z.number().min(0).optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  energy_rating: z.enum(["A", "B", "C", "D", "E", "F", "G"] as const satisfies readonly EnergyRating[]).optional(),
  property_tax_year: z.number().min(0).optional(),
  community_fee_month: z.number().min(0).optional(),
  dropbox_link: z.string().optional(),
  featured: z.boolean().optional(),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postal_code: z.string().optional(),
  region: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export interface PropertyFormProps {
  initialData?: Partial<PropertyFormValues>;
  propertyId?: string;
  property?: Property;
  onSubmit: (values: PropertyFormValues) => void;
  onImagesUpdated?: () => void;
}