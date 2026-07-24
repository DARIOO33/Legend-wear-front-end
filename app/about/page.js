export default function AboutPage() {
  const features = [
    {
      title: 'Passion du Sport',
      description: 'Des designs de football qui célèbrent ton club et tes légendes préférées'
    },
    {
      title: 'Meilleur Prix',
      description: 'Des maillots qualité premium au meilleur prix en Tunisie'
    },
    {
      title: 'Livraison Rapide',
      description: 'Livraison en 24-48h partout en Tunisie'
    },
    {
      title: 'Paiement à la Livraison',
      description: 'Tu payes en espèces à la réception. Aucun paiement en ligne requis'
    }
  ]

  const missionCards = [
    {
      title: 'Qualité Premium',
      description: 'Chaque maillot est sélectionné pour son confort, sa durabilité et sa fidélité au design original.'
    },
    {
      title: 'Meilleur Prix',
      description: 'Nous proposons les prix les plus compétitifs de Tunisie, sans compromis sur la qualité.'
    },
    {
      title: 'Confiance & Transparence',
      description: 'Le paiement à la livraison veut dire que tu ne payes qu\'une fois satisfait. Aucun risque, aucune complication.'
    },
    {
      title: '100% Tunisie',
      description: 'Nous livrons uniquement en Tunisie, et notre équipe te contacte par téléphone pour confirmer chaque commande.'
    }
  ]

  return (
    <section className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-neutral-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            À Propos de <span className="text-amber-500">Legend Wear</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
            Le meilleur prix en Tunisie pour des maillots de football qualité premium
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
            <div className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-1">24-48h</div>
            <div className="text-neutral-500 text-sm">Délai de Livraison</div>
          </div>
          <div className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
            <div className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-1">100%</div>
            <div className="text-neutral-500 text-sm">Paiement à la Livraison</div>
          </div>
          <div className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200 col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-1">🇹🇳</div>
            <div className="text-neutral-500 text-sm">Livraison en Tunisie Uniquement</div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Notre Mission</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Pourquoi Legend Wear
            </h2>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8 md:p-12 border border-neutral-200">
            <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
              Chez Legend Wear, notre mission est simple : offrir à chaque fan tunisien de football des
              maillots de qualité premium au meilleur prix, avec un paiement simple et sans risque à la livraison.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {missionCards.map((card) => (
                <div key={card.title} className="p-6 bg-white rounded-xl border border-neutral-200">
                  <h3 className="font-bold text-neutral-900 mb-2 text-lg">{card.title}</h3>
                  <p className="text-neutral-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-neutral-900 tracking-tight mb-12">
            Pourquoi Choisir Legend Wear ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6 bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-neutral-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-neutral-950 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Prêt à Porter ta Légende ?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Rejoins les clients partout en Tunisie qui font confiance à Legend Wear pour leurs maillots de football.
          </p>
          <a
            href="/products"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-amber-500/10"
          >
            Découvrir nos Maillots
          </a>
        </div>

        {/* Shipping Info */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-4 bg-neutral-50 px-6 py-4 rounded-xl border border-neutral-200">
            <div className="text-left">
              <div className="font-semibold text-neutral-900">Livraison en 24-48h</div>
              <div className="text-neutral-500 text-sm">Disponible partout en Tunisie uniquement</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-400 max-w-2xl mx-auto">
            Legend Wear propose des maillots de réplique de qualité premium. Nos produits ne sont pas des articles officiels sous licence et ne sont affiliés à aucun club, ligue ou fédération.
          </p>
        </div>
      </div>
    </section>
  )
}
