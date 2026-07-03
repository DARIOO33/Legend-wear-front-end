'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage once
  useEffect(() => {
    const savedCart = localStorage.getItem('legend-wear-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing saved cart:', error)
        setCart([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('legend-wear-cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product, size, model) => {
    // Validation
    if (!product || !product.id || !size || !model) {
      console.error('Invalid product data')
      return
    }

    setCart(prevCart => {
      let itemFound = false
      const newCart = prevCart.map(item => {
        if (item.id === product.id && item.size === size && item.model === model) {
          itemFound = true
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })

      if (!itemFound) {
        const itemKey = `${product.id}-${size}-${model}`
        newCart.push({ 
          ...product, 
          size, 
          model, 
          quantity: 1,
          cartId: itemKey
        })
      }

      return newCart
    })
  }

  const removeFromCart = (productId, size, model) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && item.size === size && item.model === model)
      )
    )
  }

  const updateQuantity = (productId, size, model, quantity) => {
    if (quantity <= 0) {
      // Use the functional version of removeFromCart logic
      setCart(prevCart => 
        prevCart.filter(item => 
          !(item.id === productId && item.size === size && item.model === model)
        )
      )
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.size === size && item.model === model
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.variantPrice ?? item.price ?? 0)
      const quantity = Number(item.quantity ?? 0)
      return total + price * quantity
    }, 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoaded
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}