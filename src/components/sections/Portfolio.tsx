export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold mb-6">
          OUR WORK
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Show Us What You Can Do
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We love seeing real-world examples of your superpowers. Whether it's
          design, code, or strategy, let your work do the talking.
        </p>

        {/* Portfolio Grid Placeholder */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-brand-blue group-hover:bg-blue-50 transition-colors">
                  Project {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
