import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">LEGEND WEAR</h3>
            <p className="text-gray-300 leading-relaxed">
              Premium sports jerseys for true fans. Wear the legend with authentic, high-quality merchandise.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=football" className="text-gray-300 hover:text-white transition-colors">Football</Link></li>
              <li><Link href="/products?category=basketball" className="text-gray-300 hover:text-white transition-colors">Basketball</Link></li>
              <li><Link href="/products?category=baseball" className="text-gray-300 hover:text-white transition-colors">Baseball</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>support@legendwear.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon-Fri: 9AM-6PM EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Legend Wear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}