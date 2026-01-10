export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-brand-blue text-white pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      {/* Background Texture/Pattern Placeholder */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
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
