'use client'

import { useCart } from './CartProvider'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 border-b border-neutral-100 hover:bg-neutral-50/60 transition-colors">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-neutral-200 flex-shrink-0 bg-neutral-50"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate mb-1">{item.name}</h3>
        <p className="text-neutral-500 text-sm mb-2">{item.team}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs text-neutral-600 bg-neutral-100 px-3 py-1 rounded-lg">
            Taille : {item.size}
          </span>
        </div>

        {/* Mobile-only price and actions */}
        <div className="sm:hidden mt-4">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <div className="font-bold text-neutral-900 text-lg">{(item.variantPrice * item.quantity).toFixed(2)} TND</div>
              <div className="text-xs text-neutral-500">{item.price} TND / unité</div>
            </div>
            <button
              onClick={() => removeFromCart(item.id, item.size, item.model)}
              className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-semibold text-sm transition-colors ml-4"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity - 1)}
            className="w-9 h-9 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={item.quantity <= 1}
          >
            <span className="font-bold">-</span>
          </button>
          <span className="w-8 text-center text-neutral-900 font-bold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity + 1)}
            className="w-9 h-9 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-900 transition-colors"
          >
            <span className="font-bold">+</span>
          </button>
        </div>

        {/* Price */}
        <div className="text-right min-w-24">
          <div className="font-bold text-lg text-neutral-900">{(item.variantPrice * item.quantity).toFixed(2)} TND</div>
          <div className="text-sm text-neutral-500">{item.price} TND / unité</div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id, item.size, item.model)}
          className="text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
        >
          Supprimer
        </button>
      </div>

      {/* Mobile Layout - Quantity Controls Only */}
      <div className="sm:hidden w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity - 1)}
              className="w-11 h-11 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
            >
              <span className="font-bold">-</span>
            </button>
            <span className="w-8 text-center text-neutral-900 font-bold text-lg">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.model, item.quantity + 1)}
              className="w-11 h-11 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-900 transition-colors"
            >
              <span className="font-bold">+</span>
            </button>
          </div>
          <div className="text-xs text-neutral-500">Quantité</div>
        </div>
      </div>
    </div>
  )
}
