import { motion } from "framer-motion";
import { FaHome, FaGlobe, FaUsers, FaArrowRight, FaSearchLocation, FaHeart, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-white">
      {/* Top Decorative Wave */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-sky-50/50" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Dream Home <br/>
              <span className="text-sky-500">in Alicante</span>
            </motion.h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We specialize in helping international buyers find their perfect property in Spain's beautiful Costa Blanca
            </motion.p>
          </ScrollReveal>
        </div>

        {/* Main Image Section */}
        <div className="relative mb-32">
          <ScrollReveal>
            <div className="
              relative rounded-3xl overflow-hidden aspect-[21/9]
              shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)]
              border border-white/10
              group
            ">
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img 
                  src="/images/about/alicante-panorama.jpg"
                  alt="Alicante Coastline"
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />
              </motion.div>
              <div className="
                absolute inset-0 
                bg-gradient-to-t from-black/50 via-transparent to-transparent
                transition-opacity duration-700
                group-hover:opacity-30
              " />
              
              {/* Quality Badge */}
              <ScrollReveal delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="
                    absolute top-6 right-6
                    bg-white/95 backdrop-blur
                    rounded-xl
                    px-4 py-2
                    shadow-lg
                    flex items-center gap-2
                    transform -rotate-3
                    hover:rotate-0
                    transition-all duration-300
                  "
                >
                  <div className="w-8 h-8">
                    <img 
                      src="/images/about/quality-badge.svg" 
                      alt="Quality Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Premium Properties
                  </span>
                </motion.div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Stats Overlay */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  number: "10+", 
                  label: "Years Experience", 
                  icon: FaUsers,
                  description: "Trusted expertise in Spanish real estate",
                  bgColor: "from-blue-500/20 to-sky-500/20"
                },
                { 
                  number: "200+", 
                  label: "Properties Sold", 
                  icon: FaHome,
                  description: "Successfully matched homes",
                  bgColor: "from-amber-500/20 to-orange-500/20"
                },
                { 
                  number: "95%", 
                  label: "Client Satisfaction", 
                  icon: FaGlobe,
                  description: "Happy homeowners worldwide",
                  bgColor: "from-emerald-500/20 to-green-500/20"
                }
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={0.4 + index * 0.1} direction="up">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`
                      relative
                      bg-white rounded-xl p-6
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                      overflow-hidden
                      group
                    `}
                  >
                    {/* Background Gradient */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-gradient-to-br ${stat.bgColor}
                      transition-opacity duration-300
                    `} />

                    {/* Icon Container */}
                    <div className="relative">
                      <div className="
                        w-12 h-12
                        bg-white
                        rounded-lg
                        mb-4
                        flex items-center justify-center
                        shadow-md
                        group-hover:scale-110
                        transition-transform duration-300
                        relative z-10
                      ">
                        <stat.icon className={`
                          w-6 h-6 
                          text-sky-500
                          group-hover:scale-110
                          transition-transform duration-300
                        `} />
                      </div>

                      {/* Number and Label */}
                      <div className="relative z-10">
                        <div className="flex items-baseline gap-1 mb-1">
                          <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            className="text-2xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300"
                          >
                            {stat.number}
                          </motion.span>
                          <div className="h-px w-8 bg-sky-500/30 group-hover:w-12 transition-all duration-300" />
                        </div>
                        <div className="text-sm text-gray-600 font-medium mb-2">
                          {stat.label}
                        </div>
                        <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                          {stat.description}
                        </p>
                      </div>

                      {/* Decorative Elements */}
                      <div className="
                        absolute -right-2 -bottom-2
                        w-12 h-12
                        opacity-10
                        group-hover:opacity-20
                        group-hover:scale-150
                        transition-all duration-500
                      ">
                        <stat.icon className="w-full h-full" />
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {/* Left Column */}
          <ScrollReveal delay={0.2} direction="left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="
                space-y-8 
                relative 
                p-8 rounded-2xl
                bg-gradient-to-br from-white via-sky-50/30 to-amber-50/30
                border border-sky-100/50
                overflow-hidden
              "
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 30L30 60L15 30L30 0Z' fill='%230EA5E9' fill-opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }} 
              />

              <div className="relative">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Commitment</h3>
                <div className="w-20 h-1 bg-sky-500/30 rounded-full">
                  <div className="w-10 h-full bg-sky-500 rounded-full"></div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed relative">
                At Sunny Escapes Alicante, we understand that buying a property abroad is more than just a transaction – it's a journey towards your dream lifestyle. Our dedicated team combines local expertise with international experience to make your property search seamless and enjoyable.
              </p>

              <div className="relative">
                <Link
                  to="/about"
                  className="
                    group
                    inline-flex items-center gap-2
                    px-6 py-3
                    text-sky-500 font-medium
                    hover:text-sky-600
                    transition-colors
                  "
                >
                  Learn more about our approach
                  <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal delay={0.2} direction="right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Features List */}
              {[
                { 
                  title: "Local Expertise", 
                  desc: "Deep understanding of Alicante's property market",
                  icon: FaSearchLocation,
                  color: "from-sky-400/20 to-blue-400/20"
                },
                { 
                  title: "Personalized Service", 
                  desc: "Tailored property search based on your needs",
                  icon: FaHeart,
                  color: "from-rose-400/20 to-pink-400/20"
                },
                { 
                  title: "Full Support", 
                  desc: "Guidance through the entire buying process",
                  icon: FaHandshake,
                  color: "from-amber-400/20 to-orange-400/20"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="flex gap-6 p-6 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className={`
                      relative flex-shrink-0
                      w-12 h-12
                      rounded-lg
                      bg-gradient-to-br ${feature.color}
                      flex items-center justify-center
                      group-hover:scale-110
                      transition-transform duration-300
                    `}>
                      <feature.icon className="w-6 h-6 text-gray-700" />
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-br ${feature.color}
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 
                        rounded-lg
                      " />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Enhanced CTA Section */}
        <ScrollReveal delay={0.3} direction="up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              relative
              text-center py-20 px-6
              bg-gradient-to-br from-sky-50 via-white to-amber-50/30
              rounded-3xl
              overflow-hidden
            "
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 30L30 60L15 30L30 0Z' fill='%230EA5E9' fill-opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }} 
            />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="relative max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  Ready to Find Your <span className="text-sky-600">Dream Home</span>?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                  Let's start your journey to owning a property in beautiful Alicante together. Our team is ready to help you every step of the way.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Primary CTA */}
                <Link
                  to="/contact"
                  className="
                    group
                    inline-flex items-center gap-3
                    px-10 py-5
                    bg-gradient-to-r from-sky-500 to-sky-600
                    hover:from-sky-600 hover:to-sky-700
                    text-white text-lg font-medium
                    rounded-xl
                    shadow-lg shadow-sky-500/25
                    hover:shadow-xl hover:shadow-sky-500/30
                    transform hover:-translate-y-1
                    transition-all duration-300
                    relative
                    overflow-hidden
                  "
                >
                  <span className="relative z-10">Start Your Property Search</span>
                  <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>

                {/* Secondary Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                  <Link
                    to="/properties"
                    className="
                      group
                      inline-flex items-center gap-2
                      text-gray-600 hover:text-sky-600
                      font-medium
                      transition-colors duration-300
                    "
                  >
                    <FaHome className="w-4 h-4" />
                    Browse Available Properties
                  </Link>
                  <div className="hidden sm:block w-px h-4 bg-gray-300" />
                  <Link
                    to="/about"
                    className="
                      group
                      inline-flex items-center gap-2
                      text-gray-600 hover:text-sky-600
                      font-medium
                      transition-colors duration-300
                    "
                  >
                    <FaUsers className="w-4 h-4" />
                    Learn About Our Services
                  </Link>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-gray-200/50"
              >
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <FaUsers className="w-4 h-4 text-sky-500" />
                    200+ Happy Clients
                  </span>
                  <span className="hidden sm:block">•</span>
                  <span className="flex items-center gap-2">
                    <FaHome className="w-4 h-4 text-sky-500" />
                    Premium Properties
                  </span>
                  <span className="hidden sm:block">•</span>
                  <span className="flex items-center gap-2">
                    <FaGlobe className="w-4 h-4 text-sky-500" />
                    International Service
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
