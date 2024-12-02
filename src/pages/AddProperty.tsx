import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PropertyForm } from "@/components/PropertyForm";
import type { PropertyFormValues } from "@/components/PropertyForm";
import { useToast } from "@/components/ui/use-toast";

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (values: PropertyFormValues) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert({
          ...values,
          title: values.title,
          city: values.city,
          price: values.price,
          property_type: values.property_type,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property created successfully",
      });

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <PropertyForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProperty;