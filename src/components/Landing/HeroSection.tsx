import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-[80vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home in Alicante
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Discover beautiful properties along the Spanish Mediterranean coast
          </p>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter location or property type..."
                className="flex-grow"
              />
              <Button
                size="lg"
                onClick={() => navigate("/properties")}
                className="w-full md:w-auto group"
              >
                <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Search Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};