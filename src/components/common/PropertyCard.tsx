import { motion } from 'framer-motion';

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
}

const PropertyCard = ({ image, title, price, location, beds, baths, sqm }: PropertyCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="
        bg-[var(--bg-white)] 
        rounded-[var(--radius-md)] 
        overflow-hidden 
        shadow-[var(--shadow-md)]
        hover:shadow-[var(--shadow-lg)]
        transition-[var(--transition-shadow)]
      "
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-2">{title}</h3>
        <p className="text-[var(--color-primary)] text-2xl font-bold mb-4">{price}</p>
        
        <div className="text-[var(--text-secondary)] mb-4">
          <p>{location}</p>
        </div>

        {/* Property Details */}
        <div className="flex justify-between text-[var(--text-secondary)] border-t border-[var(--bg-gray-100)] pt-4">
          <div className="flex items-center">
            <span className="material-icons mr-1">bed</span>
            <span>{beds} beds</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons mr-1">bathtub</span>
            <span>{baths} baths</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons mr-1">square_foot</span>
            <span>{sqm} m²</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
