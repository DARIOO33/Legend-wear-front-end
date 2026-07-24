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
    city: ''
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
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(3)
      clearCart()
    }, 1500)
  }

  const handleResendOTP = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const steps = [
    { name: 'Panier', status: currentStep > 0 ? 'completed' : 'current' },
    { name: 'Informations', status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'upcoming' },
    { name: 'Vérification', status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'upcoming' },
    { name: 'Terminé', status: currentStep === 3 ? 'current' : 'upcoming' }
  ]

  function StepIndicator() {
    return (
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center flex-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 font-bold text-sm ${
                step.status === 'completed'
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : step.status === 'current'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'border-neutral-300 text-neutral-400'
              }`}>
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <span className="text-xs mt-2 text-neutral-500">{step.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center bg-white">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-neutral-900">Votre Panier est Vide</h1>
        <p className="text-neutral-500 mb-8">Votre panier attend des ajouts légendaires</p>
        <div>
          <a href="/products" className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Découvrir nos Maillots
          </a>
        </div>
      </div>
    )
  }

  // Step 3: Order Success
  if (currentStep === 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-neutral-900">Commande Confirmée !</h1>
            <p className="text-lg text-neutral-600 mb-2">Votre commande est en route</p>
            <p className="text-neutral-500">Notre équipe vous contactera pour confirmer la livraison</p>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 mb-8 text-left">
            <h3 className="text-xl font-bold mb-4 text-neutral-900">Détails de la Commande</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Mode de Paiement :</span>
                <span className="font-semibold text-neutral-900">Paiement à la Livraison</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Montant Total :</span>
                <span className="font-bold text-neutral-900">{(finalPrice + shippingPrice).toFixed(2)} TND</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Continuer mes Achats
          </button>
        </div>
      </div>
    )
  }

  // Step 2: OTP Verification
  if (currentStep === 2) {
    return (
      <section className="py-16 min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <StepIndicator />

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-center text-neutral-900">Vérifiez Votre Identité</h2>
            <p className="text-neutral-500 text-center mb-8">Entrez le code reçu par téléphone</p>

            <form onSubmit={handleSubmitOTP}>
              <div className="mb-6">
                <label className="block text-neutral-700 mb-3 font-semibold">Code à Usage Unique</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))}
                  placeholder="Entrez le code à 6 chiffres"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  required
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-950 py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Vérification...
                  </div>
                ) : (
                  'Vérifier et Commander'
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-neutral-500 hover:text-neutral-900 transition-colors disabled:cursor-not-allowed"
              >
                Renvoyer le Code
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
      <section className="py-16 min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <StepIndicator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <h2 className="text-2xl font-extrabold mb-6 text-neutral-900">Informations de Livraison</h2>

              <form onSubmit={handleSubmitStep1}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-neutral-700 mb-2 font-semibold text-sm">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={checkoutData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 mb-2 font-semibold text-sm">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={checkoutData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-semibold text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={checkoutData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-semibold text-sm">Numéro de Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2 font-semibold text-sm">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={checkoutData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-neutral-700 mb-2 font-semibold text-sm">Gouvernorat</label>
                  <select
                    name="city"
                    value={checkoutData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    required
                  >
                    <option value="">Sélectionnez votre gouvernorat</option>
                    {[
                      'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
                      'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba',
                      'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
                      'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
                    ].map((gov) => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Paiement à la Livraison</h3>
                      <p className="text-sm text-neutral-600">Vous payez en espèces à la réception, partout en Tunisie</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-950 py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    'Continuer vers la Vérification'
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden h-fit">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-xl font-extrabold text-neutral-900">Récapitulatif</h3>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}-${item.model}`} className="flex items-center gap-4 py-4 border-b border-neutral-200 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 bg-white rounded-lg object-cover border border-neutral-200" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900">{item.name}</h4>
                      <p className="text-sm text-neutral-500">
                        {item.size} • {item.model} • Qté : {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">{itemsTotal.toFixed(2)} TND</p>
                    </div>
                  </div>
                ))}
                <div className='font-semibold text-neutral-900 float-right pt-4'>Livraison {(shippingPrice || 0).toFixed(2)} TND</div>
              </div>

              <div className="p-6 border-t border-neutral-200 bg-white">
                <div className="flex justify-between items-center text-xl font-extrabold">
                  <span className="text-neutral-900">Total :</span>
                  <span className="text-neutral-900">
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
    <section className="py-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              Votre Panier
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:bg-red-50 px-5 py-2.5 rounded-xl font-semibold transition-colors border border-red-200"
            >
              Vider le Panier
            </button>
          </div>

          <div className="flex items-center gap-3 text-neutral-500">
            <span>
              {cart.length} article{cart.length !== 1 ? 's' : ''}
            </span>
            <span>•</span>
            <span className="font-semibold text-neutral-900">{(itemsTotal || 0).toFixed(2)} TND</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          {cart.map((item) => (
            <CartItem key={`${item.id}-${item.size}-${item.model}`} item={item} />
          ))}

          {/* Checkout Section */}
          <div className="p-8 border-t border-neutral-200 bg-neutral-50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-600">Prix des Articles :</span>
                <span className="text-neutral-900">{(itemsTotal || 0).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Livraison :</span>
                <span className="text-neutral-900">{(shippingPrice || 0).toFixed(2)} TND</span>
              </div>
              <div className="border-t border-neutral-200 my-3"></div>
              <div className="flex justify-between items-center text-2xl font-extrabold">
                <span className="text-neutral-900">Total :</span>
                <span className="text-neutral-900">
                  {((itemsTotal || 0) + (shippingPrice || 0)).toFixed(2)} TND
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
            >
              Passer la Commande
            </button>

            <div className="flex justify-center gap-6 text-sm text-neutral-500 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Livraison Rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Paiement à la Livraison</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-10">
          <p className="text-neutral-500 mb-4">Pas encore fini vos achats ?</p>
          <a
            href="/products"
            className="inline-block border-2 border-neutral-900 text-neutral-900 px-8 py-3 rounded-xl font-semibold transition-colors hover:bg-neutral-900 hover:text-white"
          >
            Continuer mes Achats
          </a>
        </div>
      </div>
    </section>
  )
}
