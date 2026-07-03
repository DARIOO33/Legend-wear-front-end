'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart } from "../../app/utils/cartUtils";

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = () => {
    const cart = getCart();
    const totalCount = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    updateCount(); // load initial cart

    // Listen for various events that might indicate cart changes
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);
    
    // Custom event for when items are added
    window.addEventListener("itemAddedToCart", updateCount);
    
    // Poll for changes (fallback)
    const interval = setInterval(updateCount, 1000);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("itemAddedToCart", updateCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <button className="relative p-2 rounded-2xl hover:bg-gray-100 transition-all duration-200 group">
      <Link href="/cart">
        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </Link>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-g  ray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {cartCount}
        </span>
      )}
    </button>
  );
}