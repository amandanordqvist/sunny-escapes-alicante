import { HeroSection } from "@/components/Landing/HeroSection";
import { FeaturedProperties } from "@/components/Landing/FeaturedProperties";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <FeaturesSection />
    </div>
  );
};

export default Landing;