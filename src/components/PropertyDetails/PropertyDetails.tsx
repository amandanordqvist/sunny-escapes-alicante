interface PropertyDetailsProps {
  internalId?: string;
  propertyType: string;
  status: string;
  energyRating?: string;
  propertyTaxYear?: number;
  communityFeeMonth?: number;
  plotSizeSqm?: number;
  totalRooms?: number;
}

export const PropertyDetails = ({
  internalId,
  propertyType,
  status,
  energyRating,
  propertyTaxYear,
  communityFeeMonth,
  plotSizeSqm,
  totalRooms,
}: PropertyDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Property Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Property ID</p>
            <p className="font-medium">{internalId || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Property Type</p>
            <p className="font-medium capitalize">{propertyType.replace("_", " ")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Property Status</p>
            <p className="font-medium capitalize">{status.replace("_", " ")}</p>
          </div>
          {energyRating && (
            <div>
              <p className="text-muted-foreground">Energy Rating</p>
              <p className="font-medium">{energyRating}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Additional Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {propertyTaxYear && (
            <div>
              <p className="text-muted-foreground">Property Tax (Year)</p>
              <p className="font-medium">€{propertyTaxYear}</p>
            </div>
          )}
          {communityFeeMonth && (
            <div>
              <p className="text-muted-foreground">Community Fee (Month)</p>
              <p className="font-medium">€{communityFeeMonth}</p>
            </div>
          )}
          {plotSizeSqm && (
            <div>
              <p className="text-muted-foreground">Plot Size</p>
              <p className="font-medium">{plotSizeSqm}m²</p>
            </div>
          )}
          {totalRooms && (
            <div>
              <p className="text-muted-foreground">Total Rooms</p>
              <p className="font-medium">{totalRooms}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};