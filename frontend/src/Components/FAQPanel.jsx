import { useState } from "react";

export default function FAQPanel({ faq = [] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => setVisibleCount((prev) => prev + 5);
  const showLess = () => setVisibleCount(5);

  const visibleFaq = faq.slice(0, visibleCount);

  return (
    <div className="container p-5 bg-black/60 backdrop-blur-xl rounded-2xl 
      shadow-[0_0_25px_rgba(255,215,0,0.25)] border border-yellow-500/30">

      <h3 className="title text-xl font-semibold text-yellow-300 mb-4 relative">
        Frequently Asked Questions
        <span className="absolute -bottom-1 left-0 w-1/3 h-[3px] 
          bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
      </h3>

      <div className="faqScroll space-y-3 max-h-[260px] overflow-y-auto pr-2">
        {visibleFaq.length === 0 ? (
          <div className="text-sm text-gray-400">No FAQ available.</div>
        ) : (
          visibleFaq.map((q, i) => (
            <details
              key={i}
              className="faqItem bg-black/50 border border-yellow-500/20 rounded-xl p-3 
              shadow hover:shadow-yellow-400/10 transition-all"
            >
              <summary className="summary cursor-pointer font-medium text-yellow-200 text-[15px]">
                {q.question}
              </summary>
              <div className="answer mt-2 text-gray-300 text-sm leading-relaxed">
                {q.response}
              </div>
            </details>
          ))
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex gap-3 mt-4">
        {visibleCount < faq.length && (
          <button
            onClick={loadMore}
            className="px-4 py-1.5 text-sm rounded-lg text-black font-semibold
              bg-gradient-to-r from-yellow-400 to-yellow-600 
              hover:from-yellow-500 hover:to-yellow-700
              shadow-lg shadow-yellow-500/40 transition-all"
          >
            Load More
          </button>
        )}

        {visibleCount > 5 && (
          <button
            onClick={showLess}
            className="px-4 py-1.5 text-sm rounded-lg text-black font-semibold
              bg-gradient-to-r from-gray-300 to-gray-400
              hover:from-gray-400 hover:to-gray-500
              shadow transition-all"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
