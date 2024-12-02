import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { FaSearch, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const HeroSection = () => {
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.play().catch(console.error);
    };
    video.addEventListener('loadeddata', handleLoadedData);
    video.load();
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const videoSource = isMobile 
    ? '/videos/optimized/hero-mobile.mp4'
    : '/videos/optimized/hero.mp4';

  return (
    <section id="hero" className="relative min-h-[100svh] md:min-h-screen w-full overflow-hidden bg-gray-900">
      {/* Loading State */}
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20"
          >
            <div className="text-white/80 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-t-2 border-r-2 border-white rounded-full"
              />
              <span className="mt-4 text-sm font-light">Loading amazing views...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute w-full h-full object-cover scale-[1.02] transition-opacity duration-1000
            ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Enhanced Gradient Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-[1px]"
      />

      {/* Content Container */}
      <div className="relative container mx-auto min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20 md:py-24">
        <AnimatePresence mode="wait">
          {isVideoLoaded && (
            <motion.div 
              className="max-w-5xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced Main Heading */}
              <ScrollReveal delay={0.5}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Your Dream Home <br />
                  <span className="relative inline-block">
                    in <span className="text-amber-300 font-extrabold">Alicante</span> Awaits
                    <div className="absolute -bottom-4 left-0 w-full">
                      <div className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full" />
                      <div className="h-px mt-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-full" />
                    </div>
                  </span>
                </h1>
              </ScrollReveal>

              {/* Enhanced Subheading */}
              <ScrollReveal delay={0.7}>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
                  Discover luxury properties in Spain's most beautiful coastal paradise
                </p>
              </ScrollReveal>

              {/* Enhanced CTA Section */}
              <ScrollReveal delay={0.9}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  {/* Primary CTA */}
                  <button
                    onClick={() => navigate('/properties')}
                    className="
                      group
                      px-8 py-4
                      bg-sky-500 hover:bg-sky-600
                      text-white
                      rounded-xl
                      font-medium
                      flex items-center gap-3
                      shadow-lg shadow-sky-500/20
                      hover:shadow-xl hover:shadow-sky-500/30
                      transition-all duration-300
                      hover:-translate-y-1
                      min-w-[200px]
                    "
                  >
                    <FaSearch className="w-4 h-4" />
                    Explore Properties
                  </button>

                  {/* Secondary CTA */}
                  <button
                    onClick={() => navigate('/contact')}
                    className="
                      group
                      px-8 py-4
                      border border-white/30
                      hover:border-white/50
                      text-white
                      rounded-xl
                      font-medium
                      flex items-center gap-3
                      hover:bg-white/10
                      transition-all duration-300
                      hover:-translate-y-1
                      min-w-[200px]
                    "
                  >
                    Contact Us
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Trust Indicators */}
              <ScrollReveal delay={1.1}>
                <div className="mt-16 text-white/60 flex flex-col items-center">
                  <div className="flex items-center gap-3 text-sm font-light">
                    <span>Trusted by</span>
                    <div className="w-12 h-px bg-white/20" />
                    <span>200+ Happy Homeowners</span>
                    <div className="w-12 h-px bg-white/20" />
                    <span>Since 2013</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Scroll Down Indicator */}
              <ScrollReveal delay={1.3}>
                <motion.button
                  onClick={() => scrollTo('about')}
                  className="
                    absolute bottom-12 left-1/2 -translate-x-1/2
                    text-white/80 hover:text-white
                    transition-colors duration-300
                    flex flex-col items-center gap-2
                    cursor-pointer
                  "
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-light">Scroll to explore</span>
                  <FaChevronDown className="w-4 h-4 animate-bounce" />
                </motion.button>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;