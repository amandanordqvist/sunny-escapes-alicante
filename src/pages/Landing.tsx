import { ArrowRight, Building, Home, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find Your Dream Home in Alicante
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Discover beautiful properties along the Spanish Mediterranean coast
          </p>
          <div className="w-full max-w-2xl bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter location or property type..."
                className="flex-grow"
              />
              <Button
                size="lg"
                onClick={() => navigate("/properties")}
                className="w-full md:w-auto"
              >
                <Search className="mr-2 h-4 w-4" /> Search Properties
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <Home className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Apartments</h3>
            <p className="text-gray-600 mb-4">
              Modern apartments with stunning Mediterranean views
            </p>
            <Button variant="link" onClick={() => navigate("/properties")}>
              View Apartments <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <Building className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Villas</h3>
            <p className="text-gray-600 mb-4">
              Luxurious villas with private pools and gardens
            </p>
            <Button variant="link" onClick={() => navigate("/properties")}>
              View Villas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <MapPin className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Beach Properties</h3>
            <p className="text-gray-600 mb-4">
              Beachfront properties steps away from the sea
            </p>
            <Button variant="link" onClick={() => navigate("/properties")}>
              View Beach Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;