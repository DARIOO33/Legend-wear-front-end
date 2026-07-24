import Link from 'next/link'

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "CLUB COLLECTION",
      description: "Maillots de clubs sans noms de joueurs – parfait pour les vrais fans",
      count: "30 Produits",
      sport: "FOOTBALL"
    },
    {
      id: 2,
      name: "NATIONAL TEAMS",
      description: "Maillots de sélections nationales pour les tournois internationaux",
      count: "22 Produits",
      sport: "FOOTBALL"
    },
    {
      id: 3,
      name: "RETRO CLASSICS",
      description: "Maillots vintage inspirés des époques passées",
      count: "18 Produits",
      sport: "FOOTBALL"
    },
    {
      id: 4,
      name: "CHAMPIONS EDITION",
      description: "Éditions spéciales des plus grands tournois et finales",
      count: "15 Produits",
      sport: "FOOTBALL"
    },
    {
      id: 5,
      name: "TRAINING & LIFESTYLE",
      description: "Maillots d'entraînement et tenues casual pour tous les jours",
      count: "20 Produits",
      sport: "FOOTBALL"
    },
    {
      id: 6,
      name: "FAN FAVORITES",
      description: "Les maillots les plus populaires auprès des fans",
      count: "25 Produits",
      sport: "FOOTBALL"
    }
  ]

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-neutral-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Nos <span className="text-amber-500">Collections</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
            Explore notre sélection Legend Series — là où la grandeur rencontre le style
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 bg-neutral-50"
            >
              <div className="p-8 h-72 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-neutral-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide">
                    {collection.sport}
                  </span>
                  <span className="bg-white text-neutral-600 px-3 py-1 rounded-lg text-xs font-semibold border border-neutral-200">
                    {collection.count}
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-extrabold mb-3 tracking-tight text-neutral-900 group-hover:text-amber-600 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <div className="flex justify-center">
                  <span className="text-sm font-bold text-neutral-900 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorer <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Collection Banner */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-950 text-white text-center p-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Édition Limitée <span className="text-amber-500">Legend Series</span>
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Maillots exclusifs de moments historiques. Quantités limitées.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-10 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/10">
              Voir les Exclusivités
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 pt-12 border-t border-neutral-100">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">✓</span>
              <span>Qualité Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">✓</span>
              <span>Séries en Édition Limitée</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">✓</span>
              <span>Paiement à la Livraison</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
