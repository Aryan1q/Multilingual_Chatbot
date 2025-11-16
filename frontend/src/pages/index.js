import useSWR from "swr";

import ChatWindow from "../Components/ChatWindow";
import FAQPanel from "../Components/FAQPanel";
import ProductsPanel from "../components/ProductsPanel";
import { getFaq, getProducts } from "../lib/api";

// SWR Fetchers
const faqFetcher = () => getFaq();
const productsFetcher = () => getProducts();

export default function Home() {
  const { data: faq } = useSWR("faq", faqFetcher, {
    revalidateOnFocus: false,
  });

  const { data: products } = useSWR("products", productsFetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div
      className="
        min-h-screen 
        px-6 py-12 
        bg-gradient-to-b 
        from-[#FFF6D9] via-[#FFEFB8] to-[#F9E7A6]
        text-black 
        relative
      "
    >
      {/* ✨ DARK NAVBAR */}
<nav
  className="
    w-full fixed top-0 left-0 z-50 
    bg-black/90 backdrop-blur-xl 
    border-b border-yellow-600/30 
    shadow-[0_0_25px_rgba(255,200,0,0.25)]
  "
>
  <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center">
    
    <h1
      className="
        text-4xl font-extrabold 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-yellow-400 to-yellow-600
        tracking-[0.35em] 
        drop-shadow-[0_0_18px_rgba(255,200,0,0.35)]
      "
    >
      Z A R I Y A H
    </h1>

    <p
      className="
        mt-2 text-sm md:text-base 
        text-yellow-200/90 
        tracking-wide
        font-medium
      "
    >
      Premium Support • Smart Recommendations • Luxury Shopping
    </p>

    {/* Gold underline */}
    <div className="mt-3 w-32 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-yellow-500/40"></div>

  </div>
</nav>


      {/* Adds top padding so content doesn’t go under navbar */}
      <div className="pt-24"></div>

      {/* GOLD BACKGLOW */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-yellow-400 rounded-full blur-[180px]"></div>
      </div>

      {/* HEADER */}
      <header className="mb-14 text-center relative z-10">
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto relative z-10">
        <div className="lg:col-span-2">
          <ChatWindow products={products || []} />
        </div>

        <aside className="flex flex-col gap-10">
          <FAQPanel faq={faq || []} />
          <ProductsPanel products={products || []} />
        </aside>
      </div>

      {/* FOOTER */}
<footer
  className="
    w-full mt-20 py-6 
    bg-black/90 backdrop-blur-xl 
    border-t border-yellow-600/30 
    shadow-[0_-0_25px_rgba(255,200,0,0.15)]
    text-center relative z-10
  "
>
  <h2
    className="
      text-transparent bg-clip-text
      bg-gradient-to-r from-yellow-400 to-yellow-600
      text-lg font-semibold tracking-wide
      drop-shadow-[0_0_12px_rgba(255,200,0,0.3)]
    "
  >
    © 2025 Z A R I Y A H
  </h2>

  <p className="text-yellow-200/90 text-sm mt-1 tracking-wide">
    Luxury Beyond Expectations ✨
  </p>

  <div className="mx-auto mt-2 w-20 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-yellow-500/40"></div>
</footer>

    </div>
  );
}