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
    address: '',
    governorate: ''
  })
  const [formErrors, setFormErrors] = useState({})

  const TUNISIA_GOVERNORATES = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
    'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba',
    'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
    'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ]

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
      errors.name = 'Le nom complet est requis'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Le numéro de téléphone est requis'
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)]/g, '').replace(/^(\+216|00216)/, '')
      if (!/^[2459]\d{7}$/.test(cleaned)) {
        errors.phone = 'Veuillez entrer un numéro de téléphone tunisien valide (8 chiffres)'
      }
    }

    if (!formData.governorate) {
      errors.governorate = 'Veuillez sélectionner votre gouvernorat'
    }

    if (!formData.address.trim()) {
      errors.address = "L'adresse de livraison est requise"
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Veuillez fournir une adresse complète'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Veuillez entrer une adresse e-mail valide'
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

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email || "no-email@guest.tn",
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
          city: formData.governorate,
          postalCode: "",
          country: "Tunisie",
          phone: formData.phone,
        },
        paymentMethod: "Cash on Delivery",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      console.log("🛒 Sending order:", orderData);

      const res = await fetch(`${api}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Backend error:", data);
        throw new Error(data.message || "Failed to create order");
      }

      console.log("✅ Order created:", data);

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
      alert("Échec de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neutral-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">Chargement de votre commande...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <h1 className="text-2xl font-extrabold mb-3 text-red-600">Oups !</h1>
          <p className="text-neutral-600 mb-6">{error || 'Produit introuvable'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
          >
            Continuer mes Achats
          </button>
        </div>
      </div>
    )
  }

  const maxQuantity = product.stock || 10
  const totalPrice = (product.variantPrice || product.price || 0) * quantity

  return (
    <div className="min-h-screen py-8 md:py-12 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-neutral-900 tracking-tight">
            Finalisez Votre Commande
          </h1>
          <p className="text-neutral-500">Dernière étape avant de recevoir votre maillot</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Summary */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 h-fit">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-neutral-200 text-neutral-900">Récapitulatif de la Commande</h2>

            <div className="flex items-start gap-4 mb-6">
              <img
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl border border-neutral-200 flex-shrink-0 bg-white"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-neutral-900">{product.name}</h3>
                <p className="text-neutral-500 text-sm mb-1">Modèle : {product.selectedModel}</p>
                <p className="text-neutral-500 text-sm mb-2">Taille : {product.selectedSize}</p>
                <p className="text-neutral-900 font-semibold">
                  {(product.variantPrice || product.price).toFixed(2)} TND
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-neutral-200">
              <label className="block text-sm font-medium text-neutral-600 mb-3">Quantité</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center text-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-8 text-center text-neutral-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                    className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center text-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-neutral-500">Max : {maxQuantity}</span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <div className="flex justify-between items-center mb-2 text-neutral-600">
                <span>Sous-total</span>
                <span>{(product.variantPrice || product.price).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-neutral-600">
                <span>Quantité</span>
                <span>× {quantity}</span>
              </div>
              <div className="border-t border-neutral-200 pt-2 mt-2">
                <div className="flex justify-between items-center text-lg font-bold text-neutral-900">
                  <span>Total</span>
                  <span className="text-xl">{totalPrice.toFixed(2)} TND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-neutral-100 text-neutral-900">Informations de Livraison</h2>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all ${formErrors.name
                    ? 'border-red-400 focus:ring-red-500/20'
                    : 'border-neutral-200 focus:ring-amber-500/20 focus:border-amber-400'
                    }`}
                  placeholder="Entrez votre nom complet"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Adresse E-mail (optionnel)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all ${formErrors.email
                    ? 'border-red-400 focus:ring-red-500/20'
                    : 'border-neutral-200 focus:ring-amber-500/20 focus:border-amber-400'
                    }`}
                  placeholder="votre.email@exemple.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Numéro de Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all ${formErrors.phone
                    ? 'border-red-400 focus:ring-red-500/20'
                    : 'border-neutral-200 focus:ring-amber-500/20 focus:border-amber-400'
                    }`}
                  placeholder="+216 XX XXX XXX"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Gouvernorat *
                </label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all ${formErrors.governorate
                    ? 'border-red-400 focus:ring-red-500/20'
                    : 'border-neutral-200 focus:ring-amber-500/20 focus:border-amber-400'
                    }`}
                >
                  <option value="">Sélectionnez votre gouvernorat</option>
                  {TUNISIA_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                {formErrors.governorate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.governorate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Adresse de Livraison *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all resize-none ${formErrors.address
                    ? 'border-red-400 focus:ring-red-500/20'
                    : 'border-neutral-200 focus:ring-amber-500/20 focus:border-amber-400'
                    }`}
                  placeholder="Rue, numéro, ville, code postal..."
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
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
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-lg font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                    Traitement de la Commande...
                  </>
                ) : (
                  `Confirmer la Commande - ${totalPrice.toFixed(2)} TND`
                )}
              </button>

              <p className="text-center text-neutral-400 text-xs mt-4">
                En confirmant votre commande, vous acceptez nos conditions d'utilisation. Livraison disponible uniquement en Tunisie.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
