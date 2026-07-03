import ProductGrid from "@/components/Product/ProductGrid";
import { getAllProducts } from "@/app/api/products";

export default async function ProductsPage() {
  const products = await getAllProducts(); // 🟢 Fetch from backend API
  const data = products.products
  console.log(data);
  
  
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            ALL{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              LEGENDS
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover Our Premium Collection of{" "}
            <span className="font-semibold text-gray-200">
              Authentic Legend Jerseys
            </span>{" "}
            for True Fans and Collectors
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-black text-white">{products.length}</div>
              <div className="text-sm">Legendary Jerseys</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">3+</div>
              <div className="text-sm">Sports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-sm">Authentic</div>
            </div>
          </div>
        </div>

        <ProductGrid products={data} />

        <div className="text-center mt-20 pt-12 border-t border-gray-600/30">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Official Licensed Products</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Premium Legend Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Fast & Secure Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
