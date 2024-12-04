import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Home, Bath, BedDouble, Ruler, LayoutGrid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [region, setRegion] = useState("all");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", sortBy, propertyType, priceRange, region],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_media(*)
        `)
        .eq("status", "available");

      // Apply property type filter
      if (propertyType !== "all") {
        query = query.eq("property_type", propertyType);
      }

      // Apply region filter
      if (region !== "all") {
        query = query.eq("region", region);
      }

      // Apply price range filter
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          query = query.gte("price", min).lte("price", max);
        } else {
          query = query.gte("price", min);
        }
      }

      // Apply sorting
      switch (sortBy) {
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "price-asc":
          query = query.order("price", { ascending: true });
          break;
        case "price-desc":
          query = query.order("price", { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const PropertyCard = ({ property, isList = false }: { property: any; isList?: boolean }) => {
    const mainImage = property.property_media?.find((media: any) => media.is_main)?.url || 
      property.property_media?.[0]?.url ||
      "/placeholder.svg";

    return (
      <motion.div 
        className={`
          bg-white rounded-2xl overflow-hidden hover:shadow-xl
          transition-all duration-500 cursor-pointer
          border border-black/5
          ${isList ? 'flex flex-row' : ''}
        `}
        onClick={() => navigate(`/properties/${property.id}`)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`relative ${isList ? 'w-72' : ''}`}>
          {/* Image Container */}
          <div className={`
            relative overflow-hidden
            ${isList ? 'h-full' : 'aspect-[4/3]'}
          `}>
            <motion.img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            {/* Price Tag */}
            <div className="
              absolute top-4 right-4 
              bg-white/90 backdrop-blur-sm
              px-4 py-2 rounded-full
              shadow-lg border border-white/20
              font-semibold text-[#101726]
            ">
              €{property.price.toLocaleString()}
            </div>
            {/* Region Tag */}
            <div className="
              absolute bottom-4 left-4
              bg-black/40 backdrop-blur-sm
              px-3 py-1.5 rounded-full
              text-sm text-white/90
              border border-white/10
            ">
              {property.region?.replace(/_/g, ' ').split(' ').map((word: string) => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {/* Title and Location */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-[#101726] mb-2 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-sm text-[#101726]/70 line-clamp-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#FFB800]"></span>
              {property.address}, {property.city}
            </p>
          </div>

          {/* Property Features */}
          <div className="flex flex-wrap gap-6 text-sm text-[#101726]/70 mb-4">
            {property.bedrooms && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#101726]/5 rounded-lg">
                  <BedDouble className="h-4 w-4" />
                </div>
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#101726]/5 rounded-lg">
                  <Bath className="h-4 w-4" />
                </div>
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.size_sqm && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#101726]/5 rounded-lg">
                  <Ruler className="h-4 w-4" />
                </div>
                <span>{property.size_sqm}m²</span>
              </div>
            )}
          </div>

          {/* Property Type Tag */}
          <div className="flex items-center gap-2 text-sm">
            <div className="p-2 bg-[#101726]/5 rounded-lg">
              <Home className="h-4 w-4 text-[#101726]/70" />
            </div>
            <span className="text-[#101726]/70 capitalize">
              {property.property_type.replace('_', ' ')}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="container mx-auto p-6 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-[#101726]">Available Properties</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-black/5">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded ${view === "grid" ? "bg-[#101726] text-white" : "text-[#101726]/70 hover:bg-[#101726]/5"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded ${view === "list" ? "bg-[#101726] text-white" : "text-[#101726]/70 hover:bg-[#101726]/5"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[160px] bg-white border-black/5 shadow-sm">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[160px] bg-white border-black/5 shadow-sm">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="alicante_city">Alicante City</SelectItem>
                <SelectItem value="san_juan">San Juan</SelectItem>
                <SelectItem value="el_campello">El Campello</SelectItem>
                <SelectItem value="santa_pola">Santa Pola</SelectItem>
                <SelectItem value="gran_alacant">Gran Alacant</SelectItem>
                <SelectItem value="torrevieja">Torrevieja</SelectItem>
                <SelectItem value="orihuela_costa">Orihuela Costa</SelectItem>
                <SelectItem value="guardamar">Guardamar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[160px] bg-white border-black/5 shadow-sm">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-100000">Up to €100,000</SelectItem>
                <SelectItem value="100000-250000">€100,000 - €250,000</SelectItem>
                <SelectItem value="250000-500000">€250,000 - €500,000</SelectItem>
                <SelectItem value="500000-1000000">€500,000 - €1,000,000</SelectItem>
                <SelectItem value="1000000">€1,000,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] bg-white border-black/5 shadow-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={view === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "flex flex-col space-y-8"
        }>
          {properties?.map((property: any) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              isList={view === "list"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
