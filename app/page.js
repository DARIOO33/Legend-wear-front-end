import ProductGrid from "@/components/Product/ProductGrid";
import { getFeaturedProducts } from "@/app/api/products";
import Link from "next/link";

// Backend is only reachable locally right now, so this page must NOT be
// pre-rendered at build time (Vercel's build servers cannot reach
// http://localhost:5000). Forcing dynamic rendering makes the fetch happen
// per-request instead, so the build no longer crashes with ECONNREFUSED.
export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10 text-center">
          <span className="inline-block bg-amber-500 text-neutral-950 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            🇹🇳 Livraison partout en Tunisie
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-balance">
            PORTE LA <span className="text-amber-500">LÉGENDE</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
            Maillots de football qualité premium, au meilleur prix en Tunisie
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
            {[
              'Paiement à la livraison',
              'Livraison partout en Tunisie',
              'Meilleur prix garanti',
            ].map((label) => (
              <span key={label} className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-neutral-200">
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/10">
                Voir les Maillots
              </button>
            </Link>

            <Link href="/products?featured=true">
              <button className="border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Nouveautés
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Sélection</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Maillots en Vedette
              </h2>
            </div>
            <p className="text-neutral-500 max-w-md">
              Une sélection pour les vrais passionnés de football
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="border-2 border-neutral-900 text-neutral-900 px-8 py-3 rounded-xl font-semibold hover:bg-neutral-900 hover:text-white transition-colors">
                Voir Tous les Maillots
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Explorer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Catégories
            </h2>
            <p className="text-neutral-500 mt-2">Trouve ton équipe préférée</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { key: "football", label: "Football" },
              { key: "basketball", label: "Basketball" },
            ].map((sport) => (
              <Link key={sport.key} href={`/products?category=${sport.key}`}>
                <div className="group bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-2xl font-extrabold text-neutral-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {sport.label}
                  </h3>
                  <p className="text-neutral-500">Voir les maillots {sport.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Prêt à Commander ?</h2>
          <p className="text-neutral-400 mb-1">Trouve ton maillot dès aujourd'hui</p>
          <p className="text-neutral-500 mb-10 text-sm">
            Paiement à la livraison • Livraison dans toute la Tunisie uniquement
          </p>

          <Link href="/products">
            <button className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-amber-500/10">
              Commencer mes Achats
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
