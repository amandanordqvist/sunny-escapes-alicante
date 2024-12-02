import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-zinc-800 mb-3">
              About Us
            </h2>
            <h3 className="text-2xl font-medium text-zinc-700">
              Experience and Dedication You Can Trust
            </h3>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <p className="text-zinc-600 text-lg leading-relaxed">
                At Frankenberg Alicante, we believe in making your real estate journey stress-free and rewarding. 
                Founded by Henrik Frankenberg, a Swedish expert with over 10 years in Alicante's property market, 
                we specialize in helping international buyers—particularly Scandinavians—find their ideal home in Spain.
              </p>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Our deep understanding of both Scandinavian and Spanish cultures allows us to bridge any gaps 
                and ensure a smooth transition to your new life in the sun. With extensive local knowledge 
                and a vast network of contacts, we're uniquely positioned to find your perfect property in Alicante.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/about-image.jpg"
                alt="Frankenberg Alicante Office"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Decorative Line */}
          <div className="mt-16 flex justify-center">
            <div className="w-24 h-px bg-zinc-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
