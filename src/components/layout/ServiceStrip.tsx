import { Phone } from "lucide-react";

export default function ServiceStrip() {
  return (
    <div className="w-full bg-brand-blue text-white py-2 px-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-medium tracking-wide">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          HIRING HEROES IN TEXAS
        </p>
        <div className="hidden md:flex items-center gap-6 opacity-90">
          <a
            href="tel:5551234567"
            className="hover:text-brand-yellow transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> +1 (555) 123-4567
          </a>
          <span>•</span>
          <a href="#" className="hover:text-brand-yellow transition-colors">
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
}
