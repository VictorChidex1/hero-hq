// import { useRef } from "react";

export default function Home() {
  // const scrollRef = useRef<HTMLDivElement>(null);

  // const scrollToApply = () => {
  //   // Logic to be implemented
  //   console.log("Scroll to apply");
  // };

  return (
    <div className="min-h-screen">
      {/* Placeholder for Hero Section */}
      <section className="bg-brand-blue text-white h-[45vh] flex items-center justify-center">
        <h1 className="text-4xl font-bold">HERO HQ</h1>
      </section>

      {/* Placeholder for Content */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">
          The recruitment portal implementation starts here.
        </p>
      </div>
    </div>
  );
}
