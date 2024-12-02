import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyInfo } from "@/components/PropertyDetails/PropertyInfo";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("No property ID provided");
      
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_media(*),
          property_features(
            features(*)
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <PropertyInfo property={property} />
      </div>
    </div>
  );
};

export default PropertyDetails;