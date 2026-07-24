import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Aucun Maillot Trouvé</h3>
        <p className="text-neutral-500">Revenez bientôt pour découvrir de nouveaux maillots !</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {products.map(product => (
        <ProductCard
          key={product._id || product.id}
          product={product}
        />
      ))}
    </div>
  )
}
