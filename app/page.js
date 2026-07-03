import ProductGrid from "@/components/Product/ProductGrid";
import { getFeaturedProducts } from "@/app/api/products";
import Link from "next/link";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            WEAR THE <span className="text-gray-300">LEGEND</span>
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Premium Sports Jerseys for True Fans
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Shop Products
              </button>
            </Link>

            <Link href="/products?featured=true">
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                New Arrivals
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">FEATURED PRODUCTS</h2>
            <p className="text-gray-400">
              Handpicked legends for true collectors
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-8">
            <Link href="/products">
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">CATEGORIES</h2>
            <p className="text-gray-400">Explore by sport</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {["Football", "Basketball"].map((sport) => (
              <Link
                key={sport}
                href={`/products?category=${sport.toLowerCase()}`}
              >
                <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="text-2xl font-bold mb-2">{sport}</h3>
                  <p className="text-gray-400">Shop {sport} Jerseys</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">READY TO SHOP?</h2>
          <p className="text-gray-400 mb-8">Find your perfect jersey today</p>

          <Link href="/products">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
