import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTo } from '@/hooks/useScrollTo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollTo = useScrollTo();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        backdrop-blur-sm
        ${isScrolled 
          ? 'bg-white/95 shadow-lg' 
          : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className={`
              text-2xl font-bold
              transition-all duration-300
              hover:scale-105
              ${isScrolled ? 'text-[var(--text-primary)]' : 'text-white'}
            `}
          >
            Frankenberg
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                whileHover={{ y: -2 }}
                className={`
                  text-lg font-medium
                  transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 
                  after:w-0 after:h-0.5 after:transition-all after:duration-300
                  hover:after:w-full
                  ${isScrolled 
                    ? 'text-[var(--text-primary)] after:bg-[var(--color-primary)] hover:text-[var(--color-primary)]' 
                    : 'text-white after:bg-white hover:text-white/90'}
                `}
              >
                {link.name}
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
                ${isScrolled
                  ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                  : 'bg-white text-[var(--color-primary)] hover:bg-white/90'}
              `}
            >
              Get in Touch
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
          >
            <div className="flex flex-col space-y-1.5 w-6">
              <span className={`
                block h-0.5 w-full rounded-full
                transition-all duration-300
                transform origin-center
                ${isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
              `}></span>
              <span className={`
                block h-0.5 w-full rounded-full
                transition-all duration-300
                ${isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? 'opacity-0' : ''}
              `}></span>
              <span className={`
                block h-0.5 w-full rounded-full
                transition-all duration-300
                transform origin-center
                ${isScrolled ? 'bg-[var(--text-primary)]' : 'bg-white'}
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl shadow-lg overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="
                        block w-full text-left px-4 py-3
                        text-[var(--text-primary)]
                        hover:bg-[var(--color-primary)]/5
                        transition-all duration-300
                        font-medium
                      "
                    >
                      {link.name}
                    </button>
                  </motion.div>
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
    </motion.nav>
  );
};

export default Navbar;