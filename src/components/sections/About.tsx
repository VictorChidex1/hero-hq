export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold mb-6">
              THE CULTURE CHECK
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Founded at 19. <br />
              <span className="text-brand-blue">Built by a Brotherhood.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>Cade Schultz</strong> didn't start The CanMan in a
              boardroom. He started it at 19 years old in Rockwall, Texas, with
              a simple obsession: <em>leave everyone smiling.</em>
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We aren't a boring corporate machine. We are a tribe of problem
              solvers who believe in <strong>Ridiculous Hospitality</strong>. We
              work hard, we treat people right, and we have each other's backs.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              If you want a badge number, go elsewhere. If you want a
              brotherhood, welcome home.
            </p>
          </div>
          <div className="relative">
            {/* Image Placeholder */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="w-full h-full bg-brand-blue flex items-center justify-center text-white font-bold text-2xl p-8 text-center">
                {/* Visual fallback if image fails or for overlay effect */}
                <div className="bg-brand-blue/80 w-full h-full flex items-center justify-center backdrop-blur-sm">
                  Cade & The Team
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-yellow rounded-full z-[-1] opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
