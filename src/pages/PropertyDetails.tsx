import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type PropertyType = Database["public"]["Enums"]["property_type"];

const propertySchema = z.object({
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
  ] as const),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  size_sqm: z.number().min(0).optional(),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      property_type: "apartment",
      bedrooms: 0,
      bathrooms: 0,
      size_sqm: 0,
      address: "",
      city: "",
    },
  });

  // Update form when property data is loaded
  useState(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description || "",
        price: property.price,
        property_type: property.property_type,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        size_sqm: property.size_sqm || 0,
        address: property.address || "",
        city: property.city,
      });
    }
  }, [property, form]);

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

  const mainImage = property.property_media?.find((media: any) => media.is_main)?.url || 
    property.property_media?.[0]?.url ||
    "/placeholder.svg";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={property.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full">
              €{property.price.toLocaleString()}
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">{property.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p>{property.address}</p>
                  <p>{property.city}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Details</h3>
                  <p>{property.bedrooms} Bedrooms</p>
                  <p>{property.bathrooms} Bathrooms</p>
                  <p>{property.size_sqm}m²</p>
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => updateMutation.mutate(values))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="property_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size_sqm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size (m²)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </Form>
          )}
        </div>

        <div className="space-y-6">
          {property.property_features?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {property.property_features.map((pf: any) => (
                  <div
                    key={pf.features.id}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span>{pf.features.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;