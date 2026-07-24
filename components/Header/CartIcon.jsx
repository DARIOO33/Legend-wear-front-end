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

    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("itemAddedToCart", updateCount);

    const interval = setInterval(updateCount, 1000);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("itemAddedToCart", updateCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <Link href="/cart" className="relative p-2.5 rounded-lg hover:bg-neutral-100 transition-colors block">
      <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
