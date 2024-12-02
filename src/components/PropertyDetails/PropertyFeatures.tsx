import type { Database } from "@/integrations/supabase/types";

type PropertyFeature = {
  features: Database["public"]["Tables"]["features"]["Row"];
};

interface PropertyFeaturesProps {
  features: PropertyFeature[];
}

export const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  if (!features?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Features & Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((pf) => (
          <div
            key={pf.features.id}
            className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg"
          >
            <span>{pf.features.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};