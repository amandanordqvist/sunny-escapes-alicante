import type { Database } from "@/integrations/supabase/types";

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
  return (
    <div className="space-y-6">
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <img
          src={
            property.property_media?.find((media) => media.is_main)?.url ||
            property.property_media?.[0]?.url ||
            "/placeholder.svg"
          }
          alt={property.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full">
          €{property.price.toLocaleString()}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">{property.description}</p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Basic Information</h3>
            <p>Status: {property.status}</p>
            <p>Type: {property.property_type}</p>
            <p>Size: {property.size_sqm}m²</p>
            {property.plot_size_sqm && <p>Plot Size: {property.plot_size_sqm}m²</p>}
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Total Rooms: {property.total_rooms}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Location</h3>
            <p>{property.address}</p>
            <p>{property.city}</p>
            {property.postal_code && <p>Postal Code: {property.postal_code}</p>}
            {property.region && <p>Region: {property.region}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Building Details</h3>
            {property.floor_number !== null && (
              <p>Floor: {property.floor_number}</p>
            )}
            {property.total_floors !== null && (
              <p>Total Floors: {property.total_floors}</p>
            )}
            {property.energy_rating && (
              <p>Energy Rating: {property.energy_rating}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Fees</h3>
            {property.property_tax_year && (
              <p>Property Tax (Year): €{property.property_tax_year}</p>
            )}
            {property.community_fee_month && (
              <p>Community Fee (Month): €{property.community_fee_month}</p>
            )}
          </div>
        </div>

        {property.property_features?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.property_features.map((pf) => (
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
  );
};