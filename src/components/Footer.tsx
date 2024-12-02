import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  Home,
  Award,
  Users,
  Star,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const achievements = [
    { icon: Home, label: 'Properties Sold', value: '500+' },
    { icon: Users, label: 'Happy Clients', value: '1000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Star, label: 'Client Rating', value: '4.9/5' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Achievement Stats */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-500/10">
                  <item.icon className="w-6 h-6 text-sky-500" />
                </div>
                <div className="font-bold text-2xl text-white mb-1">{item.value}</div>
                <div className="text-gray-400 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Frankenberg Alicante</h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner in finding the perfect property in Alicante, Spain. We specialize in luxury properties and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/properties', label: 'Properties' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/blog', label: 'Blog' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 hover:text-white transition-colors duration-300">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-sky-500" />
                <span>Calle Principal 123,<br />03001 Alicante, Spain</span>
              </li>
              <li>
                <a 
                  href="tel:+34123456789" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mr-3 text-sky-500" />
                  +34 123 456 789
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@frankenberg.com" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-3 text-sky-500" />
                  info@frankenberg.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest properties and news.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    w-full px-4 py-3
                    bg-gray-800 
                    text-white 
                    rounded-lg
                    border border-gray-700
                    focus:outline-none 
                    focus:border-sky-500
                    transition-colors
                    duration-300
                  "
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              <button
                type="submit"
                className="
                  w-full px-4 py-3
                  bg-sky-500 
                  text-white 
                  rounded-lg
                  hover:bg-sky-600
                  transition-colors
                  duration-300
                  font-medium
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p> {new Date().getFullYear()} Frankenberg Alicante. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
