import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export const HeroContent = () => {
  const navigate = useNavigate();
  const scrollTo = useScrollTo();

  return (
    <div className="relative container mx-auto min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20 md:py-24">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal delay={0.5}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Your Dream Home <br />
            <span className="relative inline-block">
              in <span className="text-amber-300 font-extrabold">Alicante</span> Awaits
              <div className="absolute -bottom-4 left-0 w-full">
                <div className="h-1 bg-gradient-to-r from-transparent via-luxury-500 to-transparent rounded-full" />
                <div className="h-px mt-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-full" />
              </div>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Discover luxury properties in Spain's most beautiful coastal paradise
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.9}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/properties')}
              className="group px-8 py-4 bg-luxury-800 hover:bg-luxury-700 text-white rounded-xl font-medium 
                flex items-center gap-3 shadow-lg shadow-luxury-900/20 hover:shadow-xl hover:shadow-luxury-900/30 
                transition-all duration-300 hover:-translate-y-1 min-w-[200px]"
            >
              <FaSearch className="w-4 h-4" />
              Explore Properties
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="group px-8 py-4 border border-white/30 hover:border-white/50 text-white rounded-xl 
                font-medium flex items-center gap-3 hover:bg-white/10 transition-all duration-300 
                hover:-translate-y-1 min-w-[200px]"
            >
              Contact Us
              <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

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

        <ScrollReveal delay={1.3}>
          <motion.button
            onClick={() => scrollTo('about')}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white
              transition-colors duration-300 flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-light">Scroll to explore</span>
            <FaChevronDown className="w-4 h-4 animate-bounce" />
          </motion.button>
        </ScrollReveal>
      </div>
    </div>
  );
};