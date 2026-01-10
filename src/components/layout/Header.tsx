export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Placeholder for SVG/PNG Logo */}
          <span className="text-xl font-bold text-brand-blue tracking-tight">
            HERO HQ
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
          >
            Our Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button Placeholder */}
        <button className="md:hidden p-2 text-gray-600">
          <span className="sr-only">Open menu</span>
          {/* Icon would go here */}
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
    </header>
  );
}
