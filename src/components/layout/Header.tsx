import ServiceStrip from "./ServiceStrip";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <ServiceStrip />
      <Navbar />
    </header>
  );
}
