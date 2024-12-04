import { motion } from 'framer-motion';

export const LoadingState = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex items-center justify-center bg-luxury-900 z-20"
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
);