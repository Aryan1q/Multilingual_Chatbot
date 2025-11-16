export default function ProductsPanel({ products = [] }) {
  return (
    <div
      className="
        bg-black/70 backdrop-blur-xl 
        p-5 rounded-2xl 
        shadow-[0_0_25px_rgba(255,215,0,0.22)]
        border border-yellow-500/30
      "
    >
      <h3 className="font-semibold text-yellow-300 text-lg mb-4 relative">
        Products
        <span className="absolute -bottom-1 left-0 w-1/4 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
      </h3>

      {products.length === 0 ? (
        <div className="text-sm text-gray-400">
          No products loaded. Ensure backend has product_database.json.
        </div>
      ) : (
        <ul
          className="
            space-y-3 
            max-h-60 
            overflow-y-auto 
            pr-2 
            custom-scrollbar-gold
          "
        >
          {products.slice(0, 10).map((p) => (
            <li
              key={p.id}
              className="
                flex justify-between items-start 
                bg-black/50 backdrop-blur 
                p-3 rounded-xl
                border border-yellow-500/20 
                shadow-sm hover:shadow-yellow-300/30 
                transition-all duration-300 
                hover:bg-black/60 hover:-translate-y-[1px]
              "
            >
              {/* Left side */}
              <div>
                <div className="font-semibold text-yellow-200 text-[15px]">
                  {p.name}
                </div>
                <div className="text-sm text-gray-400">
                  {p.occasion ?? p.category ?? ""}
                </div>
              </div>

              {/* Right side */}
              <div className="text-right">
                <div className="font-bold text-yellow-300 text-[16px]">
                  ₹{p.price}
                </div>
                <div
                  className={`text-sm ${
                    String(p.instock).toLowerCase() === "true"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {String(p.instock).toLowerCase() === "true"
                    ? "In stock"
                    : "Out of stock"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
