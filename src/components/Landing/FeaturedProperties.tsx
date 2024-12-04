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

const PropertyBadge = () => {
  return (
    <div className={`
      bg-[#FFB800]
      px-2.5 py-1
      rounded-md
      text-white
      text-xs font-bold
      shadow-md
      backdrop-blur-sm
      flex items-center gap-1.5
      uppercase tracking-wider
    `}>
      <Star className="w-3 h-3 text-white" />
      Featured
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-[#101726] leading-tight"
            >
              Featured Listings
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button 
                variant="outline" 
                onClick={() => navigate("/properties")}
                className="group border-[#101726] text-[#101726] hover:bg-[#101726] hover:text-white transition-all duration-300"
              >
                View all properties
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
                <CardContent className="p-8">
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#101726] font-medium tracking-wider mb-4 block uppercase text-sm">
              Our Properties
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#101726] leading-tight">
              Featured Listings
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/properties")}
              className="group border-[#101726] text-[#101726] hover:bg-[#101726] hover:text-white transition-all duration-300"
            >
              View all properties
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  hover:shadow-2xl 
                  transition-all 
                  duration-500 
                  cursor-pointer
                  relative
                  bg-white
                  border-0
                  rounded-2xl
                "
                onClick={() => navigate(`/properties/${property.id}`)}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  {/* Badge */}
                  {property.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <PropertyBadge />
                    </div>
                  )}

                  {/* Image with Zoom Effect */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-[#101726]/60 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
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
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-2 text-[#101726] group-hover:text-[#101726]/80 transition-colors duration-300">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold text-[#101726] mb-6 flex items-baseline gap-2">
                    €{property.price.toLocaleString()}
                    <span className="text-sm font-normal text-[#101726]/60">
                      {property.size_sqm && `${(property.price / property.size_sqm).toFixed(0)}€/m²`}
                    </span>
                  </p>

                  {/* Property Features */}
                  <div className="
                    flex justify-between 
                    text-sm
                    mb-6
                    p-4
                    bg-[#101726]/5
                    rounded-xl
                    group-hover:bg-[#101726]/10
                    transition-colors
                    duration-300
                  ">
                    <div className="flex items-center gap-2 text-[#101726]">
                      <BedDouble className="h-4 w-4" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#101726]">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#101726]">
                      <Ruler className="h-4 w-4" />
                      <span>{property.size_sqm}m²</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="
                      w-full 
                      bg-transparent 
                      border-[#101726]
                      text-[#101726]
                      hover:bg-[#101726] 
                      hover:text-white
                      transition-all 
                      duration-300
                      font-medium
                      rounded-lg
                    "
                  >
                    View Details
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
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