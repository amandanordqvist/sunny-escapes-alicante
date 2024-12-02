import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              About Us
            </h2>
            <h3 className="text-xl font-light text-gray-600">
              Experience and Dedication You Can Trust
            </h3>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                At Frankenberg Alicante, we believe in making your real estate journey stress-free and rewarding. 
                Founded by Henrik Frankenberg, a Swedish expert with over 10 years in Alicante's property market, 
                we specialize in helping international buyers—particularly Scandinavians—find their ideal home in Spain.
              </p>
              <p className="text-lg leading-relaxed">
                Our deep understanding of both Scandinavian and Spanish cultures allows us to bridge any gaps 
                and ensure a smooth transition to your new life in the sun. With extensive local knowledge 
                and a vast network of contacts, we're uniquely positioned to find your perfect property in Alicante.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about-image.jpg"
                alt="Frankenberg Alicante Office"
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Decorative Line */}
          <div className="mt-16 flex justify-center">
            <div className="w-24 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
