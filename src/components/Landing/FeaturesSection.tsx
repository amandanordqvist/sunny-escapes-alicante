import { Building2, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Home,
    title: "Apartments",
    description: "Modern apartments with stunning Mediterranean views",
  },
  {
    icon: Building2,
    title: "Villas",
    description: "Luxurious villas with private pools and gardens",
  },
  {
    icon: MapPin,
    title: "Beach Properties",
    description: "Beachfront properties steps away from the sea",
  },
];

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Explore Our Properties
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Find the perfect property that matches your lifestyle and preferences
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button
                variant="link"
                className="p-0 h-auto font-semibold group-hover:underline"
                onClick={() => navigate("/properties")}
              >
                View Properties
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};