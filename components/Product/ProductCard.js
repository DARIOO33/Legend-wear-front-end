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
      alert("Cet article est en rupture de stock !")
      return
    }

    const buyItem = {
      ...product,
      selectedSize: defaultModel.size,
      selectedModel: defaultModel.name,
      variantPrice: defaultModel.price,
      variantId: `${product._id}-${defaultModel.name}-${defaultModel.size}`
    }

    localStorage.setItem('buy-now-item', JSON.stringify(buyItem))
    window.location.href = `/products/${product._id || product.id}/buy`
  }

  if (!product) {
    return (
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 h-[420px] animate-pulse">
        <div className="h-64 bg-neutral-100 flex-shrink-0"></div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="h-5 bg-neutral-100 rounded mb-2"></div>
          <div className="h-4 bg-neutral-100 rounded mb-3 w-2/3"></div>
          <div className="mt-auto flex justify-between items-center">
            <div className="h-6 bg-neutral-100 rounded w-16"></div>
            <div className="h-8 bg-neutral-100 rounded w-20"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Link href={`/products/${product._id || product.id}`}>
        <div
          className="group flex flex-col h-full rounded-2xl border border-neutral-200 overflow-hidden cursor-pointer bg-white hover:border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden flex-shrink-0 bg-neutral-50">
            <img
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            />

            {/* Quick View Button */}
            <button
              onClick={handleQuickView}
              className={`absolute top-3 left-3 bg-white text-neutral-900 px-3 py-2 rounded-lg font-semibold text-xs shadow-md border border-neutral-200 transition-all duration-300 flex items-center gap-1.5 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Aperçu
            </button>

            {/* Price Badge */}
            <div className="absolute top-3 right-3 bg-neutral-950 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
              {hasPriceRange ? `${minPrice} - ${maxPrice} TND` : `${minPrice} TND`}
            </div>

            {/* Out of Stock Badge */}
            {defaultModel?.stock <= 0 && (
              <div className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide z-10">
                Rupture de Stock
              </div>
            )}

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute bottom-3 left-3 bg-amber-500 text-neutral-950 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase z-10">
                En Vedette
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col flex-grow p-5">
            <h3 className="text-base font-bold text-neutral-900 mb-1.5 tracking-tight line-clamp-2 min-h-[2.75rem] leading-snug">
              {product.name}
            </h3>

            <p className="text-neutral-500 mb-3 font-medium capitalize line-clamp-1 text-sm">
              {product.team || product.brand || 'Collection Legend'}
            </p>

            <div className="mt-auto flex justify-between items-center gap-3">
              <span className="text-xs text-neutral-500 font-semibold bg-neutral-100 px-3 py-1.5 rounded-lg capitalize whitespace-nowrap">
                {product.category || 'Maillot'}
              </span>

              {defaultModel?.stock > 0 ? (
                <button
                  onClick={handleBuyNow}
                  className="bg-amber-500 hover:bg-amber-600 text-neutral-950 px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-sm hover:shadow-md text-sm whitespace-nowrap"
                >
                  Acheter
                </button>
              ) : (
                <button
                  disabled
                  className="bg-neutral-100 text-neutral-400 px-4 py-2 rounded-xl font-semibold text-sm cursor-not-allowed whitespace-nowrap"
                >
                  Épuisé
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
