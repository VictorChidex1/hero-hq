import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Heart, Users } from "lucide-react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-gray-50 overflow-hidden relative"
    >
      {/* Background Pattern - Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-left"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold tracking-wide mb-6 uppercase shadow-sm border border-brand-green/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
                </span>
                The Culture Check
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Founded at 19. <br />
                <span className="text-brand-blue">Built by a Brotherhood.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                <strong>Cade Schultz</strong> didn't start The CanMan in a
                boardroom. He started it at <strong>12 years old</strong> in
                Rockwall, Texas, scrubbing neighbors' trash cans because he
                learned early that even the smallest jobs deserve pride.
              </p>
              <p>
                By 19, he turned that hustle into a mission: To end the era of
                the "grumpy service guy."
              </p>
              <p>
                Today, The CanMan is the fastest-growing home service team in
                DFW for one reason:{" "}
                <span className="relative inline-block font-bold text-gray-900 group">
                  <span className="relative z-10">Ridiculous Hospitality</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.6, ease: "circOut" }}
                    className="absolute bottom-0 left-0 w-full h-3 bg-brand-yellow/40 -z-0 origin-left -rotate-2"
                  />
                </span>
                . We don't just kill bugs and clean cans; we serve families. We
                treat every home like our grandmother lives there, and we treat
                every team member like blood.
              </p>
            </motion.div>
          </motion.div>

          {/* Interactive Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <motion.div
              ref={ref}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="aspect-square relative bg-white rounded-2xl p-3 shadow-2xl transform transition-transform cursor-pointer"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src="/images/the-canman-team.png"
                  alt="Cade Schultz and The Can Man Team"
                  className="w-full h-full object-cover"
                />

                {/* Glossy Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>

            {/* Decorative blob behind */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-yellow rounded-full z-[-1] opacity-60 blur-2xl animate-pulse" />
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-brand-blue rounded-full z-[-1] opacity-40 blur-2xl" />
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Dominate The Details
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We do the things others are too lazy to do. Excellence isn't an
              act, it's a habit.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Coach Hard, Love Harder
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We will push you to be your absolute best, but we will always have
              your back.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Faith & Family
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We are family-owned and faith-led. You aren't a number here;
              you're a brother.
            </p>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="p-8 md:p-12 bg-brand-dark rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The Mission
            </h3>
            <p className="text-xl text-gray-300 italic font-medium leading-relaxed">
              "To become the most hospitable, premium service provider in Texas.
              We are rewriting the rulebook on what a 'blue-collar' job feels
              like."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
