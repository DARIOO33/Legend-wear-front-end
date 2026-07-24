import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-extrabold tracking-tight text-white mb-3">
              LEGEND WEAR
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm max-w-xs">
              Maillots de football qualité premium, au meilleur prix en Tunisie.
              Paiement à la livraison, sur toute la Tunisie.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Boutique</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="text-neutral-400 hover:text-amber-400 transition-colors">Tous les Maillots</Link></li>
              <li><Link href="/products?category=football" className="text-neutral-400 hover:text-amber-400 transition-colors">Football</Link></li>
              <li><Link href="/products?category=basketball" className="text-neutral-400 hover:text-amber-400 transition-colors">Basketball</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Aide</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-neutral-400 hover:text-amber-400 transition-colors">À Propos</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-amber-400 transition-colors">Livraison & Paiement</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>contact@legendwear.tn</li>
              <li>+216 XX XXX XXX</li>
              <li>Livraison partout en Tunisie</li>
              <li>Paiement à la livraison uniquement</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-8 text-center space-y-2">
          <p className="text-xs text-neutral-500 max-w-2xl mx-auto">
            Legend Wear propose des maillots de réplique de qualité premium. Ce ne sont pas des produits officiels sous licence.
          </p>
          <p className="text-xs text-neutral-500">&copy; 2026 Legend Wear. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
