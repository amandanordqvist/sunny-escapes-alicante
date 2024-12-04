import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingState } from './Hero/LoadingState';
import { VideoBackground } from './Hero/VideoBackground';
import { HeroContent } from './Hero/HeroContent';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section id="hero" className="relative min-h-[100svh] md:min-h-screen w-full overflow-hidden bg-luxury-900">
      <AnimatePresence>
        {!isVideoLoaded && <LoadingState />}
      </AnimatePresence>

      <VideoBackground 
        onLoadedData={handleVideoLoad}
        isVideoLoaded={isVideoLoaded}
        isMobile={isMobile}
      />

      <AnimatePresence mode="wait">
        {isVideoLoaded && <HeroContent />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;