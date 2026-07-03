import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-2xl font-bold text-white mb-2">No Legends Found</h3>
        <p className="text-gray-400">Check back soon for new legendary jerseys!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product._id || product.id} 
          product={product} 
        />
      ))}
    </div>
  )
}