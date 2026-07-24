'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProductById } from '@/app/api/products'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedModel, setSelectedModel] = useState('')
  const [availableSizes, setAvailableSizes] = useState([])
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)

  // Fetch product
  useEffect(() => {
    if (!params?.id) {
      setError('Product ID is missing')
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const productData = await getProductById(params.id)
        if (!productData) throw new Error('Product not found')
        setProduct(productData)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Failed to load product details')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  // Initialize first model + size
  useEffect(() => {
    if (product?.models?.length > 0) {
      const uniqueModels = [...new Set(product.models.map(m => m.name))]
      const firstModel = uniqueModels[0]
      setSelectedModel(firstModel)

      const sizesForFirstModel = product.models
        .filter(m => m.name === firstModel && m.stock > 0)
        .map(m => m.size)

      setAvailableSizes(sizesForFirstModel)
      setSelectedSize(sizesForFirstModel[0] || '')
    }
  }, [product])

  // Update sizes when model changes
  useEffect(() => {
    if (selectedModel && product?.models?.length > 0) {
      const sizesForModel = product.models
        .filter(m => m.name === selectedModel && m.stock > 0)
        .map(m => m.size)

      setAvailableSizes(sizesForModel)
      if (!sizesForModel.includes(selectedSize)) {
        setSelectedSize(sizesForModel[0] || '')
      }
    }
  }, [selectedModel, product, selectedSize])

  const getCurrentVariant = () => {
    if (!product?.models || !selectedModel || !selectedSize) return null
    return product.models.find(
      item => item.name === selectedModel && item.size === selectedSize
    )
  }

  const getPrice = () => {
    const variant = getCurrentVariant()
    return variant?.price || product?.price || 0
  }

  const getStock = () => {
    const variant = getCurrentVariant()
    return variant?.stock || 0
  }

  const handleBuyNow = async () => {
    if (!selectedModel || !selectedSize) {
      alert('Veuillez choisir un modèle et une taille')
      return
    }

    const variant = getCurrentVariant()
    if (!variant || variant.stock <= 0) {
      alert('Ce modèle est en rupture de stock !')
      return
    }

    if (quantity > variant.stock) {
      alert(`Seulement ${variant.stock} article(s) disponible(s) en stock`)
      return
    }

    try {
      setAddingToCart(true)

      await new Promise(resolve => setTimeout(resolve, 300))

      const orderItem = {
        productId: product._id || product.id,
        name: product.name,
        images: product.images || [],
        price: variant.price,
        selectedModel,
        selectedSize,
        quantity,
        maxStock: variant.stock
      }

      localStorage.setItem('buy-now-item', JSON.stringify(orderItem))

      router.push(`/products/${product._id || product.id}/buy`)
    } catch (err) {
      console.error('Error processing Buy Now:', err)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setAddingToCart(false)
    }
  }

  const formatPrice = price =>
    new Intl.NumberFormat('fr-TN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)

  const uniqueModels = product?.models ? [...new Set(product.models.map(m => m.name))] : []
  const currentStock = getStock()
  const isOutOfStock = currentStock <= 0
  const totalPrice = getPrice() * quantity

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neutral-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <h1 className="text-2xl font-extrabold mb-3 text-red-600">Produit Introuvable</h1>
          <p className="text-neutral-600 mb-6">{error || "Ce produit n'existe pas ou n'est plus disponible."}</p>
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

  return (
    <section className="py-8 md:py-12 min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <button onClick={() => router.push('/')} className="hover:text-neutral-900 transition-colors">Accueil</button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Produit</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase z-10">
                  Rupture de Stock
                </div>
              )}
              <img
                src={product.images?.[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'border-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 mb-2 tracking-tight">{product.name}</h1>
              <p className="text-2xl font-extrabold text-neutral-900">
                {formatPrice(getPrice())} <span className="text-lg font-semibold text-neutral-500">TND</span>
              </p>
            </div>

            <p className="text-neutral-600 text-lg leading-relaxed max-w-lg">
              {product.description || 'Aucune description disponible.'}
            </p>

            {/* Model Selection */}
            {uniqueModels.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 text-neutral-700 uppercase tracking-wide">Choisir le Modèle</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueModels.map(model => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-5 py-2.5 rounded-xl font-semibold border transition-all ${
                        selectedModel === model
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 text-neutral-700 uppercase tracking-wide">Choisir la Taille</h3>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl font-semibold border transition-all ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">Quantité</h3>
                <span className="text-sm text-neutral-500">Max : {currentStock}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-11 h-11 rounded-xl border border-neutral-300 flex items-center justify-center text-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  -
                </button>
                <span className="text-xl font-bold w-10 text-center text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= currentStock}
                  className="w-11 h-11 rounded-xl border border-neutral-300 flex items-center justify-center text-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <div className="flex justify-between items-center text-lg">
                <span className="text-neutral-600">Total :</span>
                <span className="text-2xl font-extrabold text-neutral-900">
                  {formatPrice(totalPrice)} TND
                </span>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || !selectedModel || !selectedSize || addingToCart}
              className="w-full py-4 rounded-xl text-lg font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                  Traitement...
                </>
              ) : isOutOfStock ? (
                'RUPTURE DE STOCK'
              ) : (
                `Acheter — ${formatPrice(totalPrice)} TND`
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
