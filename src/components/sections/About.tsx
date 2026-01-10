export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-brand-blue text-sm font-bold mb-6">
              WHO WE ARE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              We Believe in{" "}
              <span className="text-brand-blue">Ridiculous Hospitality</span>.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At The CanMan, we don't just solve problems; we save the day. Our
              mission is to provide service so good it feels like a superpower.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We move fast, we care deeply, and we always show up. If that
              sounds like your kind of team, you're in the right place.
            </p>
          </div>
          <div className="relative">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-brand-blue to-blue-400 opacity-20 flex items-center justify-center text-brand-blue font-bold text-2xl">
                Team Photo
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-yellow rounded-full z-[-1] opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
