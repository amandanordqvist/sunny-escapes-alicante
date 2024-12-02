import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bath, BedDouble, Ruler, Star, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

type Property = Tables<"properties"> & {
  property_media: Tables<"property_media">[];
};

const PropertyBadge = ({ type, text }: { type: 'new' | 'featured' | 'sold'; text: string }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'new':
        return 'bg-emerald-500 text-white';
      case 'featured':
        return 'bg-amber-500 text-white';
      case 'sold':
        return 'bg-rose-500 text-white';
      default:
        return 'bg-sky-500 text-white';
    }
  };

  return (
    <div className={`
      ${getBadgeStyles()}
      px-3 py-1
      rounded-lg
      text-sm font-medium
      shadow-lg
      backdrop-blur-sm
      flex items-center gap-1
    `}>
      {type === 'new' && <Clock className="w-3 h-3" />}
      {type === 'featured' && <Star className="w-3 h-3" />}
      {type === 'sold' && <Heart className="w-3 h-3" />}
      {text}
    </div>
  );
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
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Properties</h2>
            <Button variant="outline" onClick={() => navigate("/properties")}>
              View all properties
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-9 bg-muted rounded"></div>
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
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Featured Properties
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/properties")}
              className="group"
            >
              View all properties
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="
                  group
                  overflow-hidden 
                  hover:shadow-xl 
                  transition-all 
                  duration-300 
                  cursor-pointer
                  relative
                  bg-white
                "
                onClick={() => navigate(`/properties/${property.id}`)}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {property.created_at && 
                      new Date(property.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <PropertyBadge type="new" text="New Listing" />
                    )}
                    {property.featured && (
                      <PropertyBadge type="featured" text="Featured" />
                    )}
                    {property.status === "sold" && (
                      <PropertyBadge type="sold" text="Sold" />
                    )}
                  </div>

                  {/* Image with Zoom Effect */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-black/50 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    z-[1]
                  " />
                  <img
                    src={property.property_media?.[0]?.url || "/placeholder.jpg"}
                    alt={property.title}
                    className="
                      w-full h-full 
                      object-cover 
                      group-hover:scale-110 
                      transition-transform 
                      duration-700
                      ease-out
                    "
                  />
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors duration-300">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold text-sky-600 mb-4 flex items-baseline gap-2">
                    €{property.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">
                      {property.size_sqm && `${(property.price / property.size_sqm).toFixed(0)}€/m²`}
                    </span>
                  </p>

                  {/* Property Features */}
                  <div className="
                    flex justify-between 
                    text-sm text-gray-500 
                    mb-6
                    p-3
                    bg-gray-50
                    rounded-xl
                    group-hover:bg-sky-50
                    transition-colors
                    duration-300
                  ">
                    <div className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4 text-sky-500" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-sky-500" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4 text-sky-500" />
                      <span>{property.size_sqm}m²</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="
                      w-full 
                      bg-white 
                      hover:bg-sky-500 
                      hover:text-white
                      group-hover:border-sky-500
                      transition-all 
                      duration-300
                    "
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};