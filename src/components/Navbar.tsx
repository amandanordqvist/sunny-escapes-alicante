import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTo } from '@/hooks/useScrollTo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const isPropertiesPage = location.pathname === '/properties';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Handle scroll background
      setIsScrolled(currentScrollPos > 20);
      
      // Handle navbar visibility
      if (location.pathname === '/properties') {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      } else {
        setIsVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, location.pathname]);

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the # symbol
    if (hash) {
      setTimeout(() => {
        scrollTo(hash);
      }, 100);
    }
  }, [location.hash, scrollTo]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/#about' },
    { name: 'Featured', path: '/#featured' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavigation = (path: string) => {
    const isHashLink = path.includes('#');
    if (isHashLink) {
      const [basePath, hash] = path.split('#');
      if (location.pathname === basePath || (basePath === '/' && location.pathname === '/')) {
        scrollTo(hash);
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        backdrop-blur-md
        mx-6 mt-6
        font-['Montserrat']
        ${location.pathname === '/properties'
          ? 'bg-white shadow-xl border border-black/5' 
          : isScrolled
            ? 'bg-white/25 shadow-lg border border-white/20'
            : 'bg-transparent'
        }
        rounded-2xl
      `}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className={`
              flex flex-col items-start leading-none
              transition-all duration-300
              hover:scale-105 select-none
              ${isPropertiesPage || isScrolled ? 'text-[var(--text-primary)]' : 'text-white'}
            `}
          >
            <span className="text-lg tracking-[0.2em] font-semibold">FRANKENBERG</span>
            <span className="text-sm tracking-[0.15em] font-medium opacity-90">ALICANTE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                whileHover={{ y: -2 }}
                className={`
                  text-sm font-medium tracking-wide
                  transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 
                  after:w-0 after:h-0.5 after:transition-all after:duration-300
                  hover:after:w-full
                  ${isPropertiesPage || isScrolled 
                    ? 'text-[var(--text-primary)] after:bg-[var(--color-primary)] hover:text-[var(--color-primary)]' 
                    : 'text-white/90 after:bg-white hover:text-white'}
                `}
              >
                {link.name.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/#contact')}
              className={`
                px-6 py-2.5
                rounded-full
                font-medium
                transition-all duration-300
                transform hover:shadow-lg
                ${isPropertiesPage || isScrolled
                  ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                  : 'bg-white text-[var(--color-primary)] hover:bg-white/90'}
              `}
            >
              Get in Touch
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden p-2 rounded-lg
              transition-colors duration-300
              ${isPropertiesPage || isScrolled 
                ? 'text-[var(--text-primary)] hover:bg-black/5' 
                : 'text-white hover:bg-white/10'}
            `}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <div className={`
                w-full h-0.5 rounded-full transition-all duration-300
                ${isPropertiesPage || isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
              `} />
              <div className={`
                w-full h-0.5 rounded-full transition-all duration-300
                ${isPropertiesPage || isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? 'opacity-0' : ''}
              `} />
              <div className={`
                w-full h-0.5 rounded-full transition-all duration-300
                ${isPropertiesPage || isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              `} />
            </div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute top-24 left-4 right-4
                  bg-white/90 backdrop-blur-lg
                  rounded-2xl shadow-lg
                  border border-white/20
                  py-4 px-2
                  md:hidden
                `}
              >
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.path}
                      onClick={() => handleNavigation(link.path)}
                      whileTap={{ scale: 0.98 }}
                      className="
                        text-sm tracking-wide font-medium
                        text-gray-800 hover:text-gray-600
                        py-3 px-4 rounded-lg
                        transition-colors duration-300
                        hover:bg-black/5
                        text-left
                      "
                    >
                      {link.name.toUpperCase()}
                    </motion.button>
                  ))}
                  <motion.div 
                    className="px-4 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation('/#contact')}
                      className="
                        w-full px-6 py-3
                        bg-[var(--color-primary)]
                        text-white
                        rounded-full
                        font-medium
                        hover:bg-[var(--color-primary-hover)]
                        transition-all duration-300
                        shadow-md hover:shadow-lg
                      "
                    >
                      Get in Touch
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;