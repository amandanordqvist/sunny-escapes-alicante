import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PropertyForm } from "@/components/PropertyForm";
import type { PropertyFormValues } from "@/components/PropertyForm/types";

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (values: PropertyFormValues) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert(values)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property created successfully",
      });

      // Redirect to the new property's details page
      navigate(`/properties/${data.id}`);
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        title: "Error",
        description: "Failed to create property",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
        <PropertyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddProperty;