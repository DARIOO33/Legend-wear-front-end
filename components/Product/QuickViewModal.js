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
    if (!m || m.stock <= 0) return alert('Selected model/size out of stock!')
    addToCart(product, selectedSize, selectedModel)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="QUICK VIEW - LEGEND EDITION">
      <div className="space-y-6">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.images?.[0]} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl shadow-lg border border-gray-600/30"
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            Legend Edition
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{product.name}</h3>
          <p className="text-gray-300 mb-3 font-medium text-lg">{product.team}</p>
          <p className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {getPrice()} TND
          </p>
        </div>

        {/* Model Selection */}
        <div>
          <h4 className="font-bold text-gray-200 mb-3 text-lg">SELECT MODEL</h4>
          <div className="flex flex-wrap gap-3">
            {[...new Set(product.models.map(m => m.name))].map(model => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-5 py-3 border-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedModel === model
                    ? 'border-white bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105'
                    : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50 backdrop-blur-sm'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <h4 className="font-bold text-gray-200 mb-3 text-lg">SELECT SIZE</h4>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-3 border-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedSize === size
                    ? 'border-white bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105'
                    : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50 backdrop-blur-sm'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button 
            variant="primary" 
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-gray-600"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-700/50 backdrop-blur-sm hover:scale-105 transform"
            onClick={onClose}
          >
            🔍 View Details
          </Button>
        </div>
      </div>
    </Modal>
  )
}
