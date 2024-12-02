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
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

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

  const updateMutation = useMutation({
    mutationFn: async (values: PropertyFormValues) => {
      if (!id) throw new Error("No property ID provided");
      
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
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    },
  });

  const handleImagesUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["property", id] });
  };

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
        {!isEditing ? (
          <>
            <div className="flex justify-end mb-6">
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Property
              </Button>
            </div>
            <PropertyInfo property={property} />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Edit Property</h1>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <PropertyForm
              initialData={property}
              onSubmit={(values) => updateMutation.mutate(values)}
              onImagesUpdated={handleImagesUpdated}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;