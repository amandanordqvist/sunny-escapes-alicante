import { Search, Home, MessageCircle, Sun, Euro, Key, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Search,
    title: "Expert Property Search",
    description: "Access our curated collection of premium properties in Alicante's most desirable locations",
  },
  {
    icon: MessageCircle,
    title: "Local Expertise",
    description: "Connect with our experienced agents who know every corner of Alicante's real estate market",
  },
  {
    icon: Home,
    title: "Your Dream Home",
    description: "From modern apartments to luxury villas, find the perfect property that matches your lifestyle",
  },
];

const services = [
  {
    number: "01",
    title: "Property Buying & Selling",
    description: "Expert assistance in finding, negotiating, and purchasing your property",
  },
  {
    number: "02",
    title: "Relocation Services",
    description: "Guidance on local regulations, residency applications, and more",
  },
  {
    number: "03",
    title: "Investment Advisory",
    description: "Strategic advice on property investment opportunities in Alicante",
  }
];

export const FeaturesSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <>
      <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Animated background elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-60" />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium tracking-wider mb-4 block uppercase text-sm">
              Our Services
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Comprehensive Support For Your New Chapter
            </h2>
            <p className="text-gray-600 text-lg">
              We're more than just a real estate agency - we're your trusted partner in finding the perfect Spanish home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative min-h-[320px]"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] transition-all duration-500 group-hover:scale-[0.98]" />
                <div className="absolute inset-[1px] bg-white rounded-[2rem] transition-all duration-500" />
                
                {/* Card Content */}
                <div className="relative h-full p-8 rounded-[2rem]">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-50 to-slate-50 opacity-70 rounded-bl-[4rem] transition-all duration-500 group-hover:scale-110" />
                  </div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 p-[1px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                      <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-blue-600 transition-transform duration-500 group-hover:-rotate-[10deg]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        className="px-0 text-blue-600 hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-2"
                        onClick={() => navigate("/properties")}
                      >
                        Learn More →
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 relative overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute inset-0 pointer-events-none opacity-30"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-lg"
            >
              <motion.img 
                src="/images/alicante-beach-property.jpg" 
                alt="Beachfront Property in Alicante" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="mb-8">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-primary/80 font-medium tracking-wider mb-4 block uppercase text-sm"
                >
                  Why Choose Us
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4 text-[#101726]"
                >
                  Your Journey Starts Here
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-lg"
                >
                  Let us guide you through every step of finding your perfect property in Alicante
                </motion.p>
              </div>
              
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="text-2xl font-bold text-primary">{service.number}</span>
                  <div>
                    <h3 className="font-semibold text-[#101726] mb-2 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};