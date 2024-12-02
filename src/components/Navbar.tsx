import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = isLandingPage
    ? "fixed w-full z-50 transition-all duration-300"
    : "relative w-full bg-white border-b";

  const textClasses = isLandingPage ? "text-white" : "text-gray-900";
  const buttonClasses = isLandingPage
    ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
    : "bg-gray-100 hover:bg-gray-200 text-gray-900";

  const mobileMenuClasses = isLandingPage
    ? "bg-black/20 backdrop-blur-sm"
    : "bg-white border-t";

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className={`text-xl font-bold ${textClasses}`}>
            Sunny Escapes
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/properties" className={`${textClasses} hover:opacity-80`}>
              Properties
            </Link>
            <Link to="/about" className={`${textClasses} hover:opacity-80`}>
              About
            </Link>
            <Link to="/contact" className={`${textClasses} hover:opacity-80`}>
              Contact
            </Link>
            <Button className={buttonClasses}>
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className={textClasses} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 ${mobileMenuClasses}`}>
            <div className="flex flex-col gap-4">
              <Link
                to="/properties"
                className={`px-4 py-2 ${textClasses} hover:opacity-80`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 ${textClasses} hover:opacity-80`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-2 ${textClasses} hover:opacity-80`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-2">
                <Button className={`w-full ${buttonClasses}`}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;