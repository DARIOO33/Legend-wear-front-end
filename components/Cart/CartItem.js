'use client'

import { useCart } from './CartProvider'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  console.log(item.variantPrice);
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border-b border-gray-600/30 hover:bg-gray-700/20 transition-all duration-300">
      {/* Image with Legend Styling */}
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-600/50 shadow-lg flex-shrink-0"
        />
        {/* Legend Badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-black tracking-wide uppercase">
          Legend
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className="text-lg sm:text-xl font-bold text-white truncate mb-1">{item.name}</h3>
        <p className="text-gray-300 text-sm sm:text-base mb-2">{item.team}</p>
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/30">
            Size: {item.size}
          </span>
          {/* <span className="text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/30">
            Model: {item.model}
          </span> */}
        </div>
        
        {/* Mobile-only price and actions */}
        <div className="sm:hidden mt-4">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <div className="font-bold text-white text-lg">{(item.variantPrice * item.quantity).toFixed(2)} TND</div>
              <div className="text-xs text-gray-400">{item.price} TND each</div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id, item.size, item.model)}
              className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-red-600/50 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Quantity, Price, Remove */}
      <div className="hidden sm:flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity - 1)}
            className="w-10 h-10 rounded-xl border-2 border-gray-600 flex items-center justify-center hover:bg-gray-700/50 hover:border-gray-500 text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={item.quantity <= 1}
          >
            <span className="text-lg font-bold cursor-pointer">-</span>
          </button>
          <span className="w-8 text-center text-white font-bold text-lg">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity + 1)}
            className="w-10 h-10 rounded-xl border-2 border-gray-600 flex items-center justify-center hover:bg-gray-700/50 hover:border-gray-500 text-white transition-all duration-300 active:scale-95"
          >
            <span className="cursor-pointer text-lg font-bold">+</span>
          </button>
        </div>

        {/* Price */}
        <div className="text-right min-w-24">
          <div className="font-bold text-xl text-white">{(item.variantPrice * item.quantity).toFixed(2)} TND</div>
          <div className="text-sm text-gray-400">{item.price} TND each</div>
        </div>

        {/* Remove Button */}
        <button 
          onClick={() => removeFromCart(item.id, item.size, item.model)}
          className="cursor-pointer bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-red-600/50 ml-4"
        >
          Remove
        </button>
      </div>

      {/* Mobile Layout - Quantity Controls Only */}
      <div className="sm:hidden w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity - 1)}
              className="w-12 h-12 rounded-xl border-2 border-gray-600 flex items-center justify-center hover:bg-gray-700/50 hover:border-gray-500 text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
            >
              <span className="text-lg font-bold">-</span>
            </button>
            <span className="w-8 text-center text-white font-bold text-xl">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity + 1)}
              className="w-12 h-12 rounded-xl border-2 border-gray-600 flex items-center justify-center hover:bg-gray-700/50 hover:border-gray-500 text-white transition-all duration-300 active:scale-95"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Quantity</div>
          </div>
        </div>
      </div>
    </div>
  )
}