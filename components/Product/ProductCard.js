'use client'

import { useState } from 'react'
import Link from 'next/link'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  // Safely get default model
  const defaultModel = product?.models?.[0]

  // Calculate price range
  const prices = product?.models?.map(m => m?.price).filter(price => price != null) || [0]
  const minPrice = prices.length > 0 ? Math.min(...prices) : product?.price || 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : product?.price || 0
  const hasPriceRange = minPrice !== maxPrice && prices.length > 1

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
  }

  const handleBuyNow = (e) => {
  e.preventDefault()
  e.stopPropagation()

  if (!defaultModel || defaultModel.stock <= 0) {
    alert("This item is out of stock!")
    return
  }

  const buyItem = {
    ...product,
    selectedSize: defaultModel.size,
    selectedModel: defaultModel.name,
    variantPrice: defaultModel.price,
    variantId: `${product._id}-${defaultModel.name}-${defaultModel.size}`
  }

  // Save to localStorage
  localStorage.setItem('buy-now-item', JSON.stringify(buyItem))

  // Redirect to buy page
  window.location.href = `/products/${product._id || product.id}/buy`
}

  if (!product) {
    return (
      <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-600/30 h-[500px] animate-pulse">
        <div className="h-64 bg-gray-700 flex-shrink-0"></div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-3"></div>
          <div className="mt-auto flex justify-between items-center">
            <div className="h-6 bg-gray-700 rounded w-20"></div>
            <div className="h-8 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Link href={`/products/${product._id || product.id}`}>
        <div
          className="group flex flex-col h-full rounded-2xl border border-gray-600/30 overflow-hidden cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden flex-shrink-0">
            <img
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />

            {/* Background overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Quick View Button */}
            {isHovered && (
              <button
                onClick={handleQuickView}
                className="absolute top-3 left-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-gray-500/50 backdrop-blur-sm z-10"
              >
                👀 Quick View
              </button>
            )}

            {/* Price Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-gray-900 to-black text-white px-3 py-2 rounded-xl font-bold text-sm shadow-lg border border-gray-600/50 z-10">
              {hasPriceRange ? `${minPrice} - ${maxPrice} TND` : `${minPrice} TND`}
            </div>

            {/* Out of Stock Badge */}
            {defaultModel?.stock <= 0 && (
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                Out of Stock
              </div>
            )}

            {/* Legend Badge */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10">
              Legend
            </div>

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase z-10">
                Featured
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col flex-grow p-5">
            <h3 className="text-lg font-black text-white mb-2 tracking-tight line-clamp-2 min-h-[3.5rem] flex items-start">
              {product.name}
            </h3>
            
            <p className="text-gray-300 mb-3 font-medium capitalize line-clamp-1 text-sm">
              {product.team || product.brand || 'Legend Collection'}
            </p>

            {product.description && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                {product.description}
              </p>
            )}

            <div className="mt-auto flex justify-between items-center">
              <span className="text-sm text-gray-400 font-semibold bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/30 capitalize">
                {product.category || 'Jersey'}
              </span>

              {/* Buy Now Button (static place, always visible) */}
              {defaultModel?.stock > 0 ? (
                
                  <button onClick={handleBuyNow}
  className="bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-900 px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-gray-200 text-sm whitespace-nowrap hover:bg-gray-50"
>
  Buy Now
</button>
                
              ) : (
                <button
                  disabled
                  className="bg-gray-600 text-gray-400 px-4 py-2 rounded-xl font-semibold text-sm cursor-not-allowed border border-gray-500/50 whitespace-nowrap"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  )
}
