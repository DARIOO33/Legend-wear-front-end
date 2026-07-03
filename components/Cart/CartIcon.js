'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'

export default function CartIcon() {
  const { getTotalItems } = useCart()

  return (
    <Link href="/cart" className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
      </svg>
      {getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {getTotalItems()}
        </span>
      )}
    </Link>
  )
}