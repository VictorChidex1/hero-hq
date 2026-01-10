import Hero from "../components/sections/Hero";
import ApplicationForm from "../components/sections/ApplicationForm";
import About from "../components/sections/About";
import Portfolio from "../components/sections/Portfolio";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ApplicationForm />
      <About />
      <Portfolio />
    </div>
  );
}
