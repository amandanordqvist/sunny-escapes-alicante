import type { Database } from "@/integrations/supabase/types";
import { PropertyHeader } from "./PropertyHeader";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyOverview } from "./PropertyOverview";
import { PropertyFeatures } from "./PropertyFeatures";
import { PropertyDetails } from "./PropertyDetails";
import { ContactForm } from "./ContactForm";

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
    <div className="space-y-8 max-w-7xl mx-auto">
      <PropertyHeader title={property.title} city={property.city} />
      
      <PropertyGallery 
        media={property.property_media || []}
        price={property.price}
      />
      
      <PropertyOverview
        bedrooms={property.bedrooms || 0}
        bathrooms={property.bathrooms || 0}
        sizeSqm={property.size_sqm || 0}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>

      <PropertyDetails
        internalId={property.internal_id}
        propertyType={property.property_type}
        status={property.status}
        energyRating={property.energy_rating}
        propertyTaxYear={property.property_tax_year}
        communityFeeMonth={property.community_fee_month}
        plotSizeSqm={property.plot_size_sqm}
        totalRooms={property.total_rooms}
      />

      <PropertyFeatures features={property.property_features} />

      <ContactForm propertyId={property.id} propertyTitle={property.title} />
    </div>
  );
};