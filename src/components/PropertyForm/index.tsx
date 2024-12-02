import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Save } from "lucide-react";
import { BasicInfoForm } from "./BasicInfoForm";
import { DetailsForm } from "./DetailsForm";
import { LocationForm } from "./LocationForm";
import { ImageUpload } from "./ImageUpload";
import { propertySchema, type PropertyFormValues } from "./types";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  property_media: Database["public"]["Tables"]["property_media"]["Row"][];
};

interface PropertyFormProps {
  initialData?: Partial<PropertyFormValues>;
  propertyId?: string;
  property?: Property;
  onSubmit: (values: PropertyFormValues) => void;
  onImagesUpdated?: () => void;
}

export const PropertyForm = ({
  initialData,
  propertyId,
  property,
  onSubmit,
  onImagesUpdated,
}: PropertyFormProps) => {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      property_type: "apartment",
      status: "available",
      size_sqm: 0,
      plot_size_sqm: 0,
      floor_number: 0,
      total_floors: 0,
      total_rooms: 0,
      bedrooms: 0,
      bathrooms: 0,
      property_tax_year: 0,
      community_fee_month: 0,
      featured: false,
      city: "",
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoForm form={form} />
        <DetailsForm form={form} />
        <LocationForm form={form} />
        
        {propertyId && (
          <ImageUpload
            propertyId={propertyId}
            existingMedia={property?.property_media || []}
            onImagesUpdated={onImagesUpdated || (() => {})}
          />
        )}

        <Button type="submit" className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
};