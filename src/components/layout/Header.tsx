import { useState, useEffect } from "react";
import ServiceStrip from "./ServiceStrip";
import Navbar from "./Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold: 40px (approx height of ServiceStrip)
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full flex flex-col transition-all duration-300">
      {/* 
        Dynamic Service Strip Area:
        Collapses when scrolled to save screen space on mobile/desktop.
        overflow-hidden ensures content doesn't bleed during transition.
      */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <ServiceStrip />
      </div>

      <Navbar />
    </header>
  );
}
