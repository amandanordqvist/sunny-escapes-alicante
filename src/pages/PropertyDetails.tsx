import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyForm } from "@/components/PropertyForm";
import { PropertyInfo } from "@/components/PropertyDetails/PropertyInfo";
import type { PropertyFormValues } from "@/components/PropertyForm/types";

const PropertyDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `*, property_media(*), property_features(features(*))`
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: PropertyFormValues) => {
      const { error } = await supabase
        .from("properties")
        .update(values)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", id] });
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleImagesUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["property", id] });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Property
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Edit Property</h1>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <PropertyForm
          initialData={property}
          propertyId={id}
          property={property}
          onSubmit={(values) => updateMutation.mutate(values)}
          onImagesUpdated={handleImagesUpdated}
        />
      ) : (
        <PropertyInfo property={property} />
      )}
    </div>
  );
};

export default PropertyDetails;