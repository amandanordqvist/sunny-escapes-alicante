import type { Database } from "@/integrations/supabase/types";
import { Star, Share2, BedDouble, Bath, Grid, CarFront } from "lucide-react";
import { useState } from "react";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  property_media: Database["public"]["Tables"]["property_media"]["Row"][];
  property_features: {
    features: Database["public"]["Tables"]["features"]["Row"];
  }[];
};

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo = ({ property }: PropertyInfoProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const sortedMedia = [...(property.property_media || [])].sort((a, b) => {
    if (a.is_main && !b.is_main) return -1;
    if (!a.is_main && b.is_main) return 1;
    return 0;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              4.5 Review
            </span>
            <span>|</span>
            <span>{property.city}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-accent">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div className="relative">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
            <img
              src={sortedMedia[selectedImageIndex]?.url || "/placeholder.svg"}
              alt={sortedMedia[selectedImageIndex]?.title || property.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute top-4 right-4 bg-black/75 text-white px-4 py-2 rounded-full z-10">
            €{property.price.toLocaleString()}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-2 h-full">
          {sortedMedia.slice(0, 4).map((media, index) => (
            <button
              key={media.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-[4/3] rounded-lg overflow-hidden relative group ${
                index > 3 ? "hidden" : ""
              }`}
            >
              <img
                src={media.url}
                alt={media.title || `Property image ${index + 1}`}
                className="object-cover w-full h-full group-hover:opacity-90 transition-opacity"
              />
              {index === 3 && sortedMedia.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                  +{sortedMedia.length - 4} more
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-accent/50 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <BedDouble className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{property.bedrooms} Bedrooms</p>
              <p className="text-sm text-muted-foreground">Comfortable Space</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bath className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{property.bathrooms} Bathrooms</p>
              <p className="text-sm text-muted-foreground">Luxury Fitted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Grid className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{property.size_sqm}m²</p>
              <p className="text-sm text-muted-foreground">Living Area</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CarFront className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Parking</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Property Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Property ID</p>
              <p className="font-medium">{property.internal_id || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Property Type</p>
              <p className="font-medium capitalize">{property.property_type.replace("_", " ")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Property Status</p>
              <p className="font-medium capitalize">{property.status.replace("_", " ")}</p>
            </div>
            {property.energy_rating && (
              <div>
                <p className="text-muted-foreground">Energy Rating</p>
                <p className="font-medium">{property.energy_rating}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Additional Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {property.property_tax_year && (
              <div>
                <p className="text-muted-foreground">Property Tax (Year)</p>
                <p className="font-medium">€{property.property_tax_year}</p>
              </div>
            )}
            {property.community_fee_month && (
              <div>
                <p className="text-muted-foreground">Community Fee (Month)</p>
                <p className="font-medium">€{property.community_fee_month}</p>
              </div>
            )}
            {property.plot_size_sqm && (
              <div>
                <p className="text-muted-foreground">Plot Size</p>
                <p className="font-medium">{property.plot_size_sqm}m²</p>
              </div>
            )}
            {property.total_rooms && (
              <div>
                <p className="text-muted-foreground">Total Rooms</p>
                <p className="font-medium">{property.total_rooms}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {property.property_features?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Features & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.property_features.map((pf) => (
              <div
                key={pf.features.id}
                className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg"
              >
                <span>{pf.features.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
