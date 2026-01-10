import Hero from "../components/sections/Hero";
import FloatingForm from "../components/ui/FloatingForm";
import About from "../components/sections/About";
import Portfolio from "../components/sections/Portfolio";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FloatingForm />
      <About />
      <Portfolio />
    </div>
  );
}
