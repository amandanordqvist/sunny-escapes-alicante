import { Search, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Search,
    title: "Search Property",
    description: "Browse through our extensive collection of properties",
  },
  {
    icon: MessageCircle,
    title: "Meet Agent",
    description: "Connect with our experienced real estate agents",
  },
  {
    icon: Home,
    title: "Get Your Property",
    description: "Find and secure your dream property in Alicante",
  },
];

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">
          How It Works?
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Find and secure your dream property in just a few steps
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 p-4 bg-primary/10 rounded-full">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
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