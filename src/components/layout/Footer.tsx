import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-white py-12">
      <div className="container mx-auto px-4">
        {/* ... (lines 5-30 unchanged) ... */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HERO HQ</h3>
            <p className="text-gray-400 text-sm">
              Ridiculous Hospitality for the Digital Age.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Dallas, Texas</p>
              <p>hello@hero-hq.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Socials</h4>
            <div className="flex gap-4">
              {/* Placeholders for social icons */}
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} The CanMan. All rights reserved.
          <span className="mx-2">|</span>
          <Link to="/login" className="hover:text-gray-300 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
