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
    alert('Please select model and size')
    return
  }

  const variant = getCurrentVariant()
  if (!variant || variant.stock <= 0) {
    alert('Selected variant is out of stock!')
    return
  }

  if (quantity > variant.stock) {
    alert(`Only ${variant.stock} items available in stock`)
    return
  }

  try {
    setAddingToCart(true)

    // Simulate API call delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    // Save product + variant + quantity in localStorage
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

    // Redirect to buy page
    router.push(`/products/${product._id || product.id}/buy`)
  } catch (err) {
    console.error('Error processing Buy Now:', err)
    alert('Something went wrong. Please try again.')
  } finally {
    setAddingToCart(false)
  }
}

  const formatPrice = price =>
    new Intl.NumberFormat('en-TN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)

  const uniqueModels = product?.models ? [...new Set(product.models.map(m => m.name))] : []
  const currentStock = getStock()
  const isOutOfStock = currentStock <= 0
  const totalPrice = getPrice() * quantity

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 text-center">
        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <h1 className="text-3xl font-black mb-4 text-red-400">Product Not Found</h1>
          <p className="text-xl mb-6 text-gray-300">{error || 'The product you are looking for does not exist.'}</p>
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

  return (
    <section className="py-8 min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <button onClick={() => router.push('/')} className="hover:text-white transition">Home</button>
          <span>›</span>
          <span className="text-white">Product</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-800/30 rounded-2xl p-4 border border-gray-600/30">
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-black tracking-wide uppercase z-10">
                  Out of Stock
                </div>
              )}
              <img 
                src={product.images?.[selectedImage] || '/placeholder.jpg'} 
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-white ring-2 ring-white/30' 
                        : 'border-gray-600 hover:border-gray-400'
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
              <h1 className="text-4xl lg:text-5xl font-black mb-2">{product.name}</h1>
              <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {formatPrice(getPrice())} TND
              </p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              {product.description || 'No description available.'}
            </p>

            {/* Stock Status */}
            {/* <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              currentStock > 10 ? 'bg-green-500/20 text-green-400' :
              currentStock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentStock > 10 ? 'bg-green-400' :
                currentStock > 0 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}></div>
              {currentStock > 10 ? 'In Stock' :
               currentStock > 0 ? `Only ${currentStock} left` :
               'Out of Stock'}
            </div> */}

            {/* Model Selection */}
            {uniqueModels.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-300">SELECT MODEL</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueModels.map(model => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${
                        selectedModel === model 
                          ? 'border-white bg-white text-black shadow-lg transform scale-105' 
                          : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
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
                <h3 className="text-lg font-bold mb-3 text-gray-300">SELECT SIZE</h3>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${
                        selectedSize === size 
                          ? 'border-white bg-white text-black shadow-lg transform scale-105' 
                          : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-300">QUANTITY</h3>
                <span className="text-sm text-gray-400">Max: {currentStock}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-xl border-2 border-gray-600 flex items-center justify-center text-xl hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  disabled={quantity >= currentStock}
                  className="w-12 h-12 rounded-xl border-2 border-gray-600 flex items-center justify-center text-xl hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-300">Total:</span>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {formatPrice(totalPrice)} TND
                </span>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || !selectedModel || !selectedSize || addingToCart}
              className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {addingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : isOutOfStock ? (
                'OUT OF STOCK'
              ) : (
                `💳 BUY NOW - ${formatPrice(totalPrice)} TND`
              )}
            </button>

            {/* Additional Info */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400 pt-4 border-t border-gray-600/30">
              <div className="text-center">
                <div className="font-bold text-white mb-1">🚚 Free Shipping</div>
                <div>Across Tunisia</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-1">🔒 Secure Payment</div>
                <div>100% Protected</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-1">↩️ Easy Returns</div>
                <div>30 Days Policy</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}