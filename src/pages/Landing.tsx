import HeroSection from "@/components/Landing/HeroSection";
import AboutSection from "@/components/Landing/AboutSection";
import { FeaturedProperties } from "@/components/Landing/FeaturedProperties";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";
import { StatsSection } from "@/components/Landing/StatsSection";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturedProperties />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default Landing;