import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

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
                boardroom. He started it at 19 years old in Rockwall, Texas,
                with a simple obsession: <em>leave everyone smiling.</em>
              </p>
              <p>
                We aren't a boring corporate machine. We are a tribe of problem
                solvers who believe in{" "}
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
                . We work hard, we treat people right, and we have each other's
                backs.
              </p>
              <p className="font-medium text-gray-800">
                If you want a badge number, go elsewhere. If you want a
                brotherhood, welcome home.
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
      </div>
    </section>
  );
}
