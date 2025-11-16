export default function ProductPicker({ visible, products = [], onSelect, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="
        relative z-10 w-full max-w-3xl 
        bg-black/70 backdrop-blur-2xl 
        rounded-3xl shadow-[0_0_35px_rgba(255,215,0,0.25)] 
        p-6 animate-fade-in 
        border border-yellow-500/30
      ">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b border-yellow-500/20 pb-3">
          <h3 className="font-bold text-xl text-yellow-300 tracking-wide">
            Select Product
          </h3>

          <button
            className="text-yellow-300 hover:text-yellow-400 transition-colors text-3xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">

          {products.length > 0 ? (
            products.map((p) => (
              <div
                key={p.id}
                className="
                  flex justify-between items-center 
                  p-4 rounded-2xl
                  bg-black/40 backdrop-blur 
                  border border-yellow-500/20
                  shadow-md hover:shadow-yellow-400/20 
                  transition-all duration-300
                  hover:bg-black/60
                "
              >
                <div>
                  <div className="font-semibold text-yellow-200 text-lg">
                    {p.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {p.occasion || p.category || ""}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="font-bold text-yellow-300 text-lg">
                    ₹{p.price ?? "N/A"}
                  </div>

                  {/* Gold Select Button */}
                  <button
                    className="
                      bg-gradient-to-r from-yellow-400 to-yellow-600 
                      hover:from-yellow-500 hover:to-yellow-700
                      text-black font-semibold
                      px-4 py-2 rounded-2xl 
                      transition-all shadow-lg
                      shadow-yellow-500/40 
                      active:scale-95
                    "
                    onClick={() => onSelect(p)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-10">
              No products available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
