'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/components/Cart/CartProvider'
import CartItem from '@/components/Cart/CartItem'

export default function CartPage() {
 const { cart, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [checkoutData, setCheckoutData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [finalPrice, setFinalPrice] = useState(0)
  const [itemsTotal, setItemsTotal] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(9)
  const [totalPrice, setTotalPrice] = useState(0)

  // Recalculate totals whenever cart or shipping changes
  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      const price = Number(item.variantPrice ?? 0)
      const quantity = Number(item.quantity ?? 0)
      return acc + price * quantity
    }, 0)

    setItemsTotal(sum)
    setTotalPrice(sum + shippingPrice)
  }, [cart, shippingPrice])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProceedToCheckout = () => setCurrentStep(1)

  const handleSubmitStep1 = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(2)
    }, 1500)
  }

  const handleSubmitOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const orderTotal = getTotalPrice() + shippingPrice
    setFinalPrice(orderTotal)
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(3)
      clearCart() // Clear cart on successful order
    }, 1500)
  }



  const steps = [
    { name: 'Cart', status: currentStep > 0 ? 'completed' : 'current' },
    { name: 'Information', status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'upcoming' },
    { name: 'Verification', status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'upcoming' },
    { name: 'Complete', status: currentStep === 3 ? 'current' : 'upcoming' }
  ]
  
  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">YOUR LEGEND CART</h1>
        <p className="text-xl text-gray-300 mb-8">Your cart awaits legendary additions</p>
        <div className="flex justify-center">
          <span className="text-6xl opacity-50">🛒</span>
        </div>
      </div>
    )
  }

  // Step 3: Order Success
  if (currentStep === 3) {
    return (
  <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-label="Order confirmed"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">ORDER CONFIRMED!</h1>
        <p className="text-xl text-gray-300 mb-2">Your legendary order is on its way</p>
        <p className="text-gray-400">You will receive a confirmation email shortly</p>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-600/30 mb-8">
        <h3 className="text-2xl font-bold mb-4">Order Details</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">Payment Method:</span>
            <span className="font-semibold">Cash on Delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Amount:</span>
            <span className="font-bold text-white">{(finalPrice + shippingPrice).toFixed(2)} TND</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.location.href = '/'}
        className="cursor-pointer bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-gray-600"
      >
        Continue Shopping
      </button>
    </div>
  </div>
)

  }

  // Step 2: OTP Verification
  if (currentStep === 2) {
    return (
  <section className="relative py-16 text-white min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>
    
    <div className="container mx-auto px-4 relative z-10 max-w-2xl">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.status === 'completed' 
                  ? 'bg-green-500 border-green-500' 
                  : step.status === 'current'
                  ? 'bg-white border-white text-black'
                  : 'border-gray-600 text-gray-400'
              } font-bold`}>
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <span className="text-xs mt-2 text-gray-300">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden backdrop-blur-sm p-8">
        <h2 className="text-3xl font-black mb-2 text-center">VERIFY YOUR IDENTITY</h2>
        <p className="text-gray-400 text-center mb-8">Enter the OTP sent to your phone</p>
        
        <form onSubmit={handleSubmitOTP}>
          <div className="mb-6">
            <label className="block text-gray-300 mb-3 font-semibold">One-Time Password</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))} // only numeric
              placeholder="Enter 6-digit OTP"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
              required
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="cursor-pointer w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-gray-600 disabled:transform-none disabled:hover:shadow-2xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              'VERIFY & PLACE ORDER'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors duration-300 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  </section>
)

  }

  // Step 1: Checkout Form
  if (currentStep === 1) {
    return (
  <section className="relative py-16 text-white min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>
    
    <div className="container mx-auto px-4 relative z-10 max-w-4xl">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.status === 'completed' 
                  ? 'bg-green-500 border-green-500' 
                  : step.status === 'current'
                  ? 'bg-white border-white text-black'
                  : 'border-gray-600 text-gray-400'
              } font-bold`}>
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <span className="text-xs mt-2 text-gray-300">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden backdrop-blur-sm p-8">
          <h2 className="text-3xl font-black mb-6">SHIPPING INFORMATION</h2>
          
          <form onSubmit={handleSubmitStep1}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={checkoutData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={checkoutData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={checkoutData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={checkoutData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={checkoutData.address}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={checkoutData.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={checkoutData.zipCode}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">💵</span>
                </div>
                <div>
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p className="text-sm text-gray-400">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-gray-600 disabled:transform-none disabled:hover:shadow-2xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'CONTINUE TO VERIFICATION'
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden backdrop-blur-sm h-fit">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-2xl font-black">ORDER SUMMARY</h3>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}-${item.model}`} className="flex items-center gap-4 py-4 border-b border-gray-600/30 last:border-b-0">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">
                    {item.size} • {item.model} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{itemsTotal.toFixed(2)} TND</p>
                </div>
              </div>
            ))}
            <div className='font-semibold text-white float-right pt-4'>Shipping {(shippingPrice || 0).toFixed(2)} TND</div>
          </div>

          <div className="p-6 border-t border-gray-600/30 bg-gray-700/20">
            <div className="flex justify-between items-center text-xl font-black mb-4">
              <span className="text-white">TOTAL:</span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {((itemsTotal || 0) + (shippingPrice || 0)).toFixed(2)} TND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

  }

  
  return (
  <section className="relative py-16 text-white min-h-screen overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            YOUR <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">LEGEND CART</span>
          </h1>
          <button
            onClick={clearCart}
            className="cursor-pointer bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-red-600/50"
          >
            Clear All Legends
          </button>
        </div>

        {/* Cart Summary */}
        <div className="flex items-center gap-4 text-gray-300">
          <span className="text-lg">
            {cart.length} legendary item{cart.length !== 1 ? 's' : ''}
          </span>
          <span className="text-white">•</span>
          <span className="text-lg font-semibold text-white">{(itemsTotal || 0).toFixed(2)} TND</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden backdrop-blur-sm">
        {cart.map((item) => (
          <CartItem key={`${item.id}-${item.size}-${item.model}`} item={item} />
        ))}

        {/* Checkout Section */}
        <div className="p-8 border-t border-gray-600/30 bg-gray-700/20 space-y-4">
          {/* Detailed Price Breakdown */}
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span className="text-gray-300">Items Price:</span>
              <span className="text-white">{(itemsTotal || 0).toFixed(2)} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Shipping:</span>
              <span className="text-white">{(shippingPrice || 0).toFixed(2)} TND</span>
            </div>
            <div className="border-t border-gray-600/40 my-3"></div>
            <div className="flex justify-between items-center text-2xl font-black">
              <span className="text-white">TOTAL LEGEND VALUE:</span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {((itemsTotal || 0) + (shippingPrice || 0)).toFixed(2)} TND
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleProceedToCheckout}
            className="cursor-pointer w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-gray-600"
          >
            PROCEED TO CHECKOUT
          </button>

          {/* Trust Badges */}
          <div className="flex justify-center gap-6 text-sm text-gray-400 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-white">✓</span>
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✓</span>
              <span>Legend Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="text-center mt-8">
        <p className="text-gray-400 mb-4">Not done building your legend collection?</p>
        <button className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-700/50 backdrop-blur-sm">
          Continue Legend Shopping
        </button>
      </div>
    </div>
  </section>
)


}