export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold mb-6">
          IMPACT & SCALE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Real Problems.{" "}
          <span className="text-brand-green">Real Solutions.</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          This isn't busy work. The software and systems you build here strictly
          impact thousands of homeowners across Texas. Here is the scale we
          operate at.
        </p>

        {/* Portfolio/Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "50,000+",
              subtitle: "Happy Customers",
              color: "bg-blue-50 text-brand-blue",
            },
            {
              title: "Zero",
              subtitle: "Micromanagement",
              color: "bg-green-50 text-brand-green",
            },
            {
              title: "100%",
              subtitle: "Autonomy",
              color: "bg-yellow-50 text-brand-yellow",
            },
          ].map((item, index) => (
            <div key={index} className="group cursor-default">
              <div
                className={`aspect-video ${item.color} rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all flex flex-col items-center justify-center p-8`}
              >
                <div className="text-4xl font-black mb-2">{item.title}</div>
                <div className="font-medium opacity-80">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
