import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type PropertyMedia = Database["public"]["Tables"]["property_media"]["Row"];

interface ImageUploadProps {
  propertyId: string;
  existingMedia: PropertyMedia[];
  onImagesUpdated: () => void;
}

export const ImageUpload = ({
  propertyId,
  existingMedia,
  onImagesUpdated,
}: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${propertyId}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("Images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("Images")
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from("property_media")
          .insert({
            property_id: propertyId,
            url: publicUrl,
            media_type: "image",
            is_main: existingMedia.length === 0,
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });
      onImagesUpdated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId: string) => {
    try {
      const { error } = await supabase
        .from("property_media")
        .delete()
        .eq("id", mediaId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      onImagesUpdated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const setMainImage = async (mediaId: string) => {
    try {
      // First, set all images as non-main
      await supabase
        .from("property_media")
        .update({ is_main: false })
        .eq("property_id", propertyId);

      // Then set the selected image as main
      const { error } = await supabase
        .from("property_media")
        .update({ is_main: true })
        .eq("id", mediaId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Main image updated successfully",
      });
      onImagesUpdated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update main image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Property Images</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {existingMedia.map((media) => (
          <div
            key={media.id}
            className="relative group aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={media.url}
              alt={media.title || "Property image"}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => media.id && handleDelete(media.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {!media.is_main && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => media.id && setMainImage(media.id)}
                >
                  Set as Main
                </Button>
              )}
            </div>
            {media.is_main && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                Main
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};