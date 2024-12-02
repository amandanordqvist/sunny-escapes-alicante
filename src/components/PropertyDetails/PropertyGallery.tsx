import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type PropertyMedia = Database["public"]["Tables"]["property_media"]["Row"];

interface PropertyGalleryProps {
  media: PropertyMedia[];
  price: number;
}

export const PropertyGallery = ({ media, price }: PropertyGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const sortedMedia = [...media].sort((a, b) => {
    if (a.is_main && !b.is_main) return -1;
    if (!a.is_main && b.is_main) return 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Main Image */}
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
          <img
            src={sortedMedia[selectedImageIndex]?.url || "/placeholder.svg"}
            alt={sortedMedia[selectedImageIndex]?.title || "Property"}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 right-4 bg-black/75 text-white px-4 py-2 rounded-full">
            €{price.toLocaleString()}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2">
          {sortedMedia.slice(0, 8).map((media, index) => (
            <button
              key={media.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-[4/3] rounded-lg overflow-hidden relative group ${
                selectedImageIndex === index
                  ? "ring-2 ring-primary"
                  : "hover:opacity-90"
              }`}
            >
              <img
                src={media.url}
                alt={media.title || `Property image ${index + 1}`}
                className="object-cover w-full h-full"
              />
              {index === 7 && sortedMedia.length > 8 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                  +{sortedMedia.length - 8} more
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};