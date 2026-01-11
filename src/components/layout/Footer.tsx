import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-white py-12">
      <div className="container mx-auto px-4">
        {/* ... (lines 5-30 unchanged) ... */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">THE CANMAN</h3>
            <p className="text-gray-400 text-sm">
              Ridiculous Hospitality for the Digital Age.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Dallas, Texas</p>

              <a
                href="mailto:hello@canmancan.com"
                className="hover:text-brand-green transition-colors"
              >
                hello@canmancan.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Socials</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/TheCanman1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/the_canmancan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@thecanmancan1/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110"
                aria-label="TikTok"
              >
                {/* Lucide doesn't have a TikTok icon by default in older versions, checking if available or using SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
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
