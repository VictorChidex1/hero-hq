export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* The Brand Overlay - Ensures text readability */}
        <div className="absolute inset-0 bg-brand-blue/90 z-10"></div>
        {/* The Hero Image */}
        <div className="absolute inset-0 bg-[url('/images/hero-image.webp')] bg-cover bg-center"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Join Our Creative Team!
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
          We are looking for the next superhero to join our league of
          extraordinary creators.
        </p>

        <button
          onClick={scrollToForm}
          className="bg-brand-green hover:brightness-110 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Start Your Audition
        </button>
      </div>
    </section>
  );
}
