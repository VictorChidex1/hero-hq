import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Use Global State

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300 relative z-40 px-4">
      {/* 
         ARCHITECTURAL NOTE: 
         I placed 'px-4' on the WRAPPER above, not the container below.
         This matches ServiceStrip.tsx.
         Now both containers have the exact same max-width and centering behavior.
      */}
      <div className="container mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/canman-icon.png"
            alt="The CanMan Logo"
            className="h-10 w-auto hover:brightness-110 transition-all cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
          >
            Our Mission
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
          >
            Contact
          </button>

          {user ? (
            <Link
              to="/admin"
              className="text-sm font-bold text-brand-blue hover:text-brand-green transition-colors flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Mission Control
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-400 hover:text-brand-blue transition-colors"
            >
              Admin
            </Link>
          )}

          {/* Pulsing CTA - Manually aligned with negative margin for optical balance */}
          <button
            onClick={() => scrollToSection("application-form")}
            className="group relative btn-primary px-8 py-3 text-sm -mr-4"
          >
            {/* Pulsing Ring Effect (Optional - keeps a bit of 'alive' feel) */}
            <span className="absolute -inset-1 rounded-full bg-brand-green/20 animate-pulse group-hover:bg-brand-green/30 transition-all"></span>
            <span className="relative">Apply Now</span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors -mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open menu</span>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <button
            onClick={() => scrollToSection("about")}
            className="text-left px-4 py-2 text-gray-600 font-medium hover:bg-blue-50 hover:text-brand-blue rounded-lg transition-colors"
          >
            Who We Are
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-left px-4 py-2 text-gray-600 font-medium hover:bg-blue-50 hover:text-brand-blue rounded-lg transition-colors"
          >
            Our Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-left px-4 py-2 text-gray-600 font-medium hover:bg-blue-50 hover:text-brand-blue rounded-lg transition-colors"
          >
            Contact
          </button>
          {user ? (
            <Link
              to="/admin"
              className="text-left px-4 py-2 text-brand-blue font-bold hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Mission Control
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-left px-4 py-2 text-gray-400 font-medium hover:bg-blue-50 hover:text-brand-blue rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          <button
            onClick={() => scrollToSection("application-form")}
            className="w-full text-center bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
}
