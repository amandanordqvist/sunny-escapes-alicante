import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bath, BedDouble, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties"> & {
  property_media: Tables<"property_media">[];
};

export const FeaturedProperties = () => {
  const navigate = useNavigate();
  
  const { data: properties, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_media(*)
        `)
        .eq("featured", true)
        .eq("status", "available")
        .limit(3);

      if (error) throw error;
      return data as Property[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Properties</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in the most sought-after locations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!properties?.length) {
    return null;
  }

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Properties</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Explore our handpicked selection of premium properties in the most sought-after locations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card 
              key={property.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in"
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={property.property_media?.[0]?.url || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                <p className="text-2xl font-bold text-primary">€{property.price.toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    <span>{property.size_sqm}m²</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};