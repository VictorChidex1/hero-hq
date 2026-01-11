import { motion } from "framer-motion";

export default function Portfolio() {
  const missions = [
    {
      role: "The Operator",
      theme: "High-Tech Firepower",
      headline: "Pilot The Beast.",
      description:
        "You aren't a janitor; you're an operator. You'll command our custom-engineered $150k wash units. 190°F water. 3,500 PSI. It’s loud, it’s powerful, and it destroys bacteria instantly.",
      image: "/images/The-CanMan-Homepage-Can-Cleaning-Learn-More-1.jpg",
      accent: "bg-brand-blue",
      textAccent: "text-brand-blue",
      borderAccent: "group-hover:border-brand-blue",
    },
    {
      role: "The Guardian",
      theme: "Trust & Detail",
      headline: "The Face of Trust.",
      description:
        "We don't hide in the shadows. We build relationships. Whether it's tracking a pest to a kitchen drawer or reassuring a homeowner, you are the expert they rely on to feel safe.",
      image: "/images/The-CanMan-Homepage-Pest-Control-Learn-More-1.jpg",
      accent: "bg-brand-green",
      textAccent: "text-brand-green",
      borderAccent: "group-hover:border-brand-green",
    },
    {
      role: "The Specialist",
      theme: "Grit & Expertise",
      headline: "Total Home Defense.",
      description:
        "From attic insulation to perimeter security, you go where others won't. You’ll suit up, lock in, and secure the home from the top down. Hard work? Yes. Rewarding? Absolutely.",
      image: "/images/home-service-pest-control.jpg",
      accent: "bg-brand-yellow",
      textAccent: "text-yellow-600", // Darker yellow for readability
      borderAccent: "group-hover:border-brand-yellow",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative inline-block px-6 py-2 rounded-full overflow-hidden border border-brand-blue/30 bg-gradient-to-r from-brand-blue/20 to-transparent mb-4 shadow-[0_0_15px_rgba(15,111,183,0.2)]">
              <span className="relative z-10 text-brand-blue font-bold text-xs uppercase tracking-[0.2em]">
                MISSION PROFILES
              </span>
              {/* Shimmer Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Choose Your <span className="text-brand-blue">Mission</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We don't have "jobs". We have missions. Find the role that matches
              your superpowers.
            </p>
          </motion.div>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={mission.image}
                    alt={mission.role}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`${mission.accent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md`}
                    >
                      {mission.theme}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-grow flex flex-col relative z-20 bg-white">
                  <h3
                    className={`text-sm font-bold uppercase tracking-widest mb-2 ${mission.textAccent}`}
                  >
                    {mission.role}
                  </h3>
                  <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                    {mission.headline}
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {mission.description}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div
                  className={`h-1.5 w-full ${mission.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
