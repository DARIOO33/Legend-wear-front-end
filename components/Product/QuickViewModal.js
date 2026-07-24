'use client'

import { useState, useEffect } from 'react'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { useCart } from '../Cart/CartProvider'

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart()
  const [selectedModel, setSelectedModel] = useState(null)
  const [availableSizes, setAvailableSizes] = useState([])
  const [selectedSize, setSelectedSize] = useState('')

  // Initialize first model + sizes when modal opens
  useEffect(() => {
    if (product?.models?.length > 0) {
      const firstModel = product.models[0]
      setSelectedModel(firstModel.name)
      const sizesForModel = product.models
        .filter(m => m.name === firstModel.name)
        .map(m => m.size)
      setAvailableSizes(sizesForModel)
      setSelectedSize(sizesForModel[0])
    }
  }, [product])

  // Update sizes when model changes
  useEffect(() => {
    if (selectedModel) {
      const sizesForModel = product.models
        .filter(m => m.name === selectedModel)
        .map(m => m.size)
      setAvailableSizes(sizesForModel)
      setSelectedSize(sizesForModel[0])
    }
  }, [selectedModel, product])

  // Get price for selected model + size
  const getPrice = () => {
    const m = product.models.find(
      item => item.name === selectedModel && item.size === selectedSize
    )
    return m ? m.price : 0
  }

  const handleAddToCart = () => {
    const m = product.models.find(
      item => item.name === selectedModel && item.size === selectedSize
    )
    if (!m || m.stock <= 0) return alert('Ce modèle/taille est en rupture de stock !')
    addToCart(product, selectedSize, selectedModel)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Aperçu Rapide">
      <div className="space-y-6">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl border border-neutral-200 bg-neutral-50"
          />
          {product.featured && (
            <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              En Vedette
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-neutral-900 mb-1 tracking-tight">{product.name}</h3>
          <p className="text-neutral-500 mb-2 font-medium">{product.team}</p>
          <p className="text-2xl font-extrabold text-neutral-900">
            {getPrice()} <span className="text-base font-semibold text-neutral-500">TND</span>
          </p>
        </div>

        {/* Model Selection */}
        <div>
          <h4 className="font-semibold text-neutral-700 mb-2.5 text-sm uppercase tracking-wide">Modèle</h4>
          <div className="flex flex-wrap gap-2.5">
            {[...new Set(product.models.map(m => m.name))].map(model => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-2.5 border rounded-xl font-semibold text-sm transition-all ${
                  selectedModel === model
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <h4 className="font-semibold text-neutral-700 mb-2.5 text-sm uppercase tracking-wide">Taille</h4>
          <div className="flex flex-wrap gap-2.5">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2.5 border rounded-xl font-semibold text-sm transition-all ${
                  selectedSize === size
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="accent"
            className="flex-1"
            onClick={handleAddToCart}
          >
            Ajouter au Panier
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Voir les Détails
          </Button>
        </div>
      </div>
    </Modal>
  )
}
