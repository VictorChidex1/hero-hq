export default function Navbar() {
  const scrollToSection = (id: string) => {
    // If it's the "apply" action, we might want to focus the form
    if (id === "apply") {
      // Logic to focus specific input could go here
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300 relative z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/thecanman-logo.png"
            alt="The CanMan Logo"
            className="h-10 w-auto hover:brightness-110 transition-all cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
          >
            Contact
          </button>

          {/* Pulsing CTA */}
          <button
            onClick={() => scrollToSection("application-form")}
            className="relative group bg-brand-green text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-brand-green/30 hover:shadow-brand-green/60 hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Pulsing Ring Effect */}
            <span className="absolute -inset-1 rounded-full bg-brand-green/20 animate-pulse group-hover:bg-brand-green/30 transition-all"></span>
            <span className="relative">Apply Now</span>
          </button>
        </nav>

        {/* Mobile Menu Button Placeholder */}
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="sr-only">Open menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
