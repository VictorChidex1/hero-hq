import { motion } from "framer-motion";

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* 
         1. Background Image with Parallax-like feel
         object-cover ensures it fills the 80vh height perfectly 
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-image.webp')] bg-cover bg-center"></div>

        {/* 
           2. The "Vignette Gradient" Blend
           - Top: Dark Brand Blue (90%) -> Hides dynamic header text issues
           - Middle: Transparent (The faces shine through)
           - Bottom: Dark Brand Blue (90%) -> Smooth transition to the form
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/90 via-brand-blue/40 to-brand-blue/90 z-10"></div>
        {/* Extra "Radial" gradient to focus center */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 via-transparent to-brand-blue/80 z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center pt-48 md:pt-64 pb-15 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white leading-tight drop-shadow-lg">
            Join Our Creative Team!
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-blue-50 mb-10 max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md"
        >
          We are looking for the next superhero to join our league of
          extraordinary creators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
        >
          <button
            onClick={scrollToForm}
            className="group relative bg-brand-green hover:bg-[#5a8013] text-white font-bold py-5 px-12 rounded-full shadow-[0_20px_50px_rgba(108,152,23,0.3)] transition-all transform hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 text-lg">Start Your Audition</span>
            {/* Glossy sheen animation within button */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
