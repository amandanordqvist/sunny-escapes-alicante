import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
}

const AnimateOnScroll = ({ children, className = '' }: AnimateOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;