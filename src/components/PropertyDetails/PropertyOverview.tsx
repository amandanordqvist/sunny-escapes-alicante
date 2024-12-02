import { BedDouble, Bath, Grid, CarFront } from "lucide-react";

interface PropertyOverviewProps {
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
}

export const PropertyOverview = ({
  bedrooms,
  bathrooms,
  sizeSqm,
}: PropertyOverviewProps) => {
  return (
    <div className="bg-accent/50 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <BedDouble className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{bedrooms} Bedrooms</p>
            <p className="text-sm text-muted-foreground">Comfortable Space</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bath className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{bathrooms} Bathrooms</p>
            <p className="text-sm text-muted-foreground">Luxury Fitted</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Grid className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{sizeSqm}m²</p>
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
  );
};