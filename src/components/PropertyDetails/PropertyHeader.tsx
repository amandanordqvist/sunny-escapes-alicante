import { Star, Share2 } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  city: string;
}

export const PropertyHeader = ({ title, city }: PropertyHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            4.5 Review
          </span>
          <span>|</span>
          <span>{city}</span>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-accent">
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
};