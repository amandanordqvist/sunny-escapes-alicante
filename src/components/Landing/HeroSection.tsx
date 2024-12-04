import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingState } from './Hero/LoadingState';
import { VideoBackground } from './Hero/VideoBackground';
import { HeroContent } from './Hero/HeroContent';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/common/ScrollReveal';
import { scrollTo } from '@/hooks/useScrollTo';

const HeroSection = () => {
  const navigate = useNavigate();
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
        {isVideoLoaded && (
          <motion.div 
            className="relative container mx-auto min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-5xl mx-auto text-center">
              {/* Enhanced Main Heading */}
              <ScrollReveal delay={0.5}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 md:mb-8 tracking-tight leading-[1.1]">
                  Your Dream Home <br />
                  <span className="relative inline-block">
                    in <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-transparent bg-clip-text font-bold">Alicante</span> Awaits
                    <motion.div 
                      className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <div className="h-[2px] md:h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full opacity-90" />
                      <div className="h-px mt-[2px] md:mt-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent rounded-full" />
                    </motion.div>
                  </span>
                </h1>
              </ScrollReveal>

              {/* Enhanced Subheading */}
              <ScrollReveal delay={0.7}>
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 md:mb-14 max-w-2xl mx-auto font-light leading-relaxed px-4 tracking-wide">
                  Discover luxury properties in Spain's most 
                  <span className="relative inline-block px-2">
                    beautiful
                    <div className="absolute inset-0 bg-luxury-200/10 rounded-lg -rotate-1"></div>
                  </span> 
                  coastal paradise
                </p>
              </ScrollReveal>

              {/* Enhanced CTA Section */}
              <ScrollReveal delay={0.9}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 px-4 sm:px-0">
                  {/* Primary CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/properties')}
                    className="
                      relative group
                      px-6 py-3
                      bg-white
                      text-gray-900
                      rounded-xl
                      font-medium text-base
                      flex items-center justify-center gap-2.5
                      shadow-[0_0_0_1.5px_rgba(255,255,255,0.1)]
                      hover:shadow-[0_0_0_1.5px_rgba(255,255,255,0.2)]
                      transition-all duration-300
                      overflow-hidden
                      w-full sm:w-[180px]
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      <FaSearch className="w-4 h-4" />
                      <span>Explore</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/contact')}
                    className="
                      relative group
                      px-6 py-3
                      border border-white/20
                      text-white
                      rounded-xl
                      font-medium text-base
                      flex items-center justify-center gap-2.5
                      backdrop-blur-sm
                      hover:border-white/30
                      hover:bg-white/5
                      transition-all duration-300
                      overflow-hidden
                      w-full sm:w-[180px]
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      Contact
                      <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </motion.button>
                </div>
              </ScrollReveal>

              {/* Trust Indicators */}
              <ScrollReveal delay={1.1}>
                <div className="mt-12 sm:mt-16 md:mt-20 text-white/70 flex flex-col items-center px-4">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs sm:text-sm font-light tracking-wider">
                    <span className="uppercase">Trusted by</span>
                    <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="font-medium">200+ Happy Homeowners</span>
                    <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="uppercase">Since 2013</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Modernized Scroll Indicator */}
              <ScrollReveal delay={1.3}>
                <motion.button
                  onClick={() => scrollTo('about')}
                  className="
                    absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2
                    flex flex-col items-center
                    cursor-pointer
                    group
                  "
                >
                  <span className="
                    text-[10px] sm:text-xs
                    uppercase tracking-[0.2em]
                    text-white/60 group-hover:text-white/90
                    transition-colors duration-300
                    mb-3
                    font-medium
                  ">
                    Scroll
                  </span>
                  
                  <motion.div 
                    className="relative w-[1px] h-8 overflow-hidden"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/40 via-white to-white/40"
                      style={{ height: '200%' }}
                      animate={{ 
                        y: ["0%", "100%"]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </motion.button>
              </ScrollReveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;