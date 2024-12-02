import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Home, Bath, BedDouble, Ruler, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Index = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", sortBy, propertyType, priceRange],
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
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isList ? 'flex flex-row' : ''}`}>
        <div className={`relative ${isList ? 'w-72' : 'h-48'}`}>
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full">
            €{property.price.toLocaleString()}
          </div>
        </div>
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="line-clamp-1">{property.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {property.address}, {property.city}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <BedDouble className="h-4 w-4" />
                  <span>{property.bedrooms} beds</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} baths</span>
                </div>
              )}
              {property.size_sqm && (
                <div className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  <span>{property.size_sqm}m²</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground capitalize">
                {property.property_type.replace('_', ' ')}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Available Properties</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded ${view === "grid" ? "bg-background shadow" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded ${view === "list" ? "bg-background shadow" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-[160px]">
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

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-[160px]">
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
            <SelectTrigger className="w-[160px]">
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
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "flex flex-col gap-6"
      }>
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} isList={view === "list"} />
        ))}
      </div>
    </div>
  );
};

export default Index;