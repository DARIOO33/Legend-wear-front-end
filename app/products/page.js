import ProductGrid from "@/components/Product/ProductGrid";
import { getAllProducts } from "@/app/api/products";

// Backend is only reachable locally right now, so this page must NOT be
// pre-rendered at build time (Vercel's build servers cannot reach
// http://localhost:5000). Forcing dynamic rendering makes the fetch happen
// per-request instead, so the build no longer crashes with ECONNREFUSED.
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts(); // 🟢 Fetch from backend API
  // Guard against getAllProducts() returning [] (e.g. backend unreachable)
  const data = Array.isArray(products) ? products : (products?.products ?? []);

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-neutral-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Tous les <span className="text-amber-500">Maillots</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
            Notre collection de maillots qualité premium au meilleur prix en Tunisie
          </p>

          <div className="flex flex-wrap justify-center gap-10 mt-10">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-white">{data.length}</div>
              <div className="text-sm text-neutral-400">Maillots Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-white">100%</div>
              <div className="text-sm text-neutral-400">Paiement à la Livraison</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-white">🇹🇳</div>
              <div className="text-sm text-neutral-400">Livraison en Tunisie</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-14">
        <ProductGrid products={data} />

        <div className="text-center mt-16 pt-10 border-t border-neutral-100">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <CheckIcon /> Qualité Premium
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon /> Paiement à la Livraison
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon /> Livraison Rapide et Fiable
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-6 max-w-xl mx-auto">
            Maillots de réplique de qualité premium — non-officiels et non affiliés aux clubs ou fédérations.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
