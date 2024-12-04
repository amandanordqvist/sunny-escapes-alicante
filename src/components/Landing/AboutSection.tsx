import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const benefits = [
    "Expert local knowledge and guidance",
    "Personalized property matching",
    "Full support throughout the buying process",
    "After-sale services and assistance",
    "Network of trusted partners",
    "Transparent communication",
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Gradient Circles */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-[300px] h-[300px] bg-purple-50 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span className="text-blue-600 font-medium tracking-wider mb-4 block uppercase text-sm">
              About Us
            </span>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Your Trusted Partner in Finding Your Dream Home in Spain
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              At Sunny Escapes Alicante, we understand that buying a property abroad is more than just a transaction – it's a journey towards your dream lifestyle. Our dedicated team combines local expertise with personalized service to make your property search in Spain seamless and enjoyable.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="relative mt-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full blur-[1px] group-hover:blur-[2px] transition-all duration-300" />
                    <CheckCircle2 className="h-5 w-5 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Layers */}
            <div className="absolute top-8 right-8 w-full h-full rounded-[2rem] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 blur-md" />
            <div className="absolute top-4 right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-indigo-50/40 to-purple-50/40" />
            
            {/* Main Container */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative w-full aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-6 shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                {/* Floating Corner Elements */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-4 -right-4 w-32 h-32"
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 via-indigo-100 to-transparent rounded-full opacity-80" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-4 -left-4 w-32 h-32"
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 via-indigo-100 to-transparent rounded-full opacity-80" />
                </motion.div>
                
                {/* Main Image */}
                <img
                  src="/images/villa.jpg"
                  alt="Luxury villa in Alicante"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/10 to-transparent z-[5]" />
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-100/40 to-transparent mix-blend-soft-light z-[5]" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent mix-blend-overlay z-[5]" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 z-20"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
