import Link from 'next/link'
import Header from '@/components/Header/Header'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}