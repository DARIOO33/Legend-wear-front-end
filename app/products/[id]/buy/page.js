'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
const api = process.env.NEXT_PUBLIC_API_URL;
export default function BuyPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Shipping info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [formErrors, setFormErrors] = useState({})

  // Load product from localStorage
  useEffect(() => {
    const buyItem = localStorage.getItem('buy-now-item')
    if (buyItem) {
      setProduct(JSON.parse(buyItem))
      setLoading(false)
    } else {
      setError('No product found for purchase.')
      setLoading(false)
    }
  }, [params.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = 'Full name is required'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      errors.address = 'Shipping address is required'
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Please provide a complete address'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const generateOrderId = (order) => {
    const initials = order.customerName
      .split(' ')
      .map(n => n[0].toUpperCase())
      .join('');

    const productCode = order.items[0].product.slice(0, 4).toUpperCase();

    const date = new Date(order.orderDate);
    const dateCode = `${date.getFullYear().toString().slice(2)}${(date.getMonth() + 1)
      .toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;

    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();

    return `${initials}-${productCode}-${dateCode}-${randomStr}`;
  };
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const itemsPrice = (product.variantPrice || product.price) * quantity;
      const shippingPrice = 0; // or customize
      const taxPrice = 0;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Match backend expectations
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email || "no-email@guest.tn", // fallback if email empty
        items: [
          {
            product: product.productId,
            name: product.name,
            qty: quantity,
            price: product.variantPrice || product.price,
          },
        ],
        shippingAddress: {
          address: formData.address,
          city: "Tunis",
          postalCode: "1001",
          country: "Tunisia",
          phone: formData.phone,
        },
        paymentMethod: "Cash on Delivery",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      console.log("🛒 Sending order:", orderData);

      // Send to backend (use full URL if backend runs separately)
      const res = await fetch(`${api}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // Parse safely
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Backend error:", data);
        throw new Error(data.message || "Failed to create order");
      }

      console.log("✅ Order created:", data);

      // Store and redirect
      localStorage.setItem(
        "last-order",
        JSON.stringify({
          ...data,
          orderId: generateOrderId({
            customerName: formData.name,
            items: [{ product: product.productId }],
            orderDate: new Date(),
          }),
        })
      );

      localStorage.removeItem("buy-now-item");
      router.push("/thankyou");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your legendary product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 text-center">
        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <h1 className="text-3xl font-black mb-4 text-red-400">Oops!</h1>
          <p className="text-xl mb-6 text-gray-300">{error || 'Product not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const maxQuantity = product.stock || 10
  const totalPrice = (product.variantPrice || product.price || 0) * quantity

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Complete Your Purchase
          </h1>
          <p className="text-gray-400 text-lg">Final step to own this legendary piece</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Summary */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-600/30">Order Summary</h2>

            <div className="flex items-start gap-4 mb-6">
              <img
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl border border-gray-600/30 flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-1">Model: {product.selectedModel}</p>
                <p className="text-gray-400 text-sm mb-2">Size: {product.selectedSize}</p>
                <p className="text-white font-semibold">
                  {(product.variantPrice || product.price).toFixed(2)} TND
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">Quantity</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border-2 border-gray-600 flex items-center justify-center text-xl hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                    className="w-10 h-10 rounded-lg border-2 border-gray-600 flex items-center justify-center text-xl hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-400">Max: {maxQuantity}</span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-700/30 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span>{(product.variantPrice || product.price).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Quantity</span>
                <span>× {quantity}</span>
              </div>
              <div className="border-t border-gray-600/50 pt-2 mt-2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-xl">{totalPrice.toFixed(2)} TND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-600/30">Shipping Information</h2>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  data-error={!!formErrors.name}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:outline-none focus:ring-2 transition-all ${formErrors.name
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-gray-600/50 focus:ring-white/30 focus:border-white/50'
                    }`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  data-error={!!formErrors.email}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:outline-none focus:ring-2 transition-all ${formErrors.email
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-gray-600/50 focus:ring-white/30 focus:border-white/50'
                    }`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  data-error={!!formErrors.phone}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:outline-none focus:ring-2 transition-all ${formErrors.phone
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-gray-600/50 focus:ring-white/30 focus:border-white/50'
                    }`}
                  placeholder="+216 XX XXX XXX"
                />
                {formErrors.phone && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {formErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Shipping Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  data-error={!!formErrors.address}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:outline-none focus:ring-2 transition-all resize-none ${formErrors.address
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-gray-600/50 focus:ring-white/30 focus:border-white/50'
                    }`}
                  placeholder="Enter your complete shipping address including city and postal code"
                />
                {formErrors.address && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {formErrors.address}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </>
                ) : (
                  `Confirm Order - ${totalPrice.toFixed(2)} TND`
                )}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                By confirming your order, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}