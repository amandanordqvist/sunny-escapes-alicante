import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Enjoy Living
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto">
              Find your perfect home in Alicante. Browse through our curated selection of premium properties.
            </p>
            <Button 
              onClick={() => navigate('/properties')}
              className="bg-black/20 backdrop-blur-sm border border-white/50 text-white hover:bg-black/30 hover:border-white transition-all duration-300 text-base px-6 py-2"
            >
              View Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;