'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-xl sticky top-0 z-50 transition-all duration-500 ${
      isScrolled ? 'shadow-2xl border-b border-gray-700/50' : 'shadow-lg border-b border-gray-600/30'
    }`}>
      <div className="container mx-auto px-6">
        {/* Header height maintained */}
        <div className="flex items-center justify-between h-24">
          {/* Logo - Enhanced with Legend theme */}
          <Link 
            href="/" 
            className="group relative"
          >
            <div className="flex items-center space-x-3">
              {/* Logo with gradient border */}
              <div className="w-14 h-12 rounded-xl flex items-center justify-center transform scale-105 transition-all duration-300 shadow-2xl overflow-hidden border border-gray-600/50 bg-gradient-to-br from-gray-800 to-gray-900">
                <img 
                  src="/logo.jpeg"
                  alt="Legend Wear"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                {/* Updated text with gradient effect */}
                <span className="text-2xl ml-6 font-black tracking-tighter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-5">
                  LEGEND WEAR
                </span>
                <span className="text-xs ml-6 font-medium text-gray-400 tracking-wider">
                  WEAR THE LEGEND
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Centered with dark theme */}
          <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              // { href: '/collections', label: 'Collections' },
              { href: '/about', label: 'About' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-6 py-2 text-gray-300 hover:text-white transition-all duration-200 font-semibold group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 transform -translate-x-1/2 group-hover:translate-x-0"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Updated for dark theme */}
          <div className="flex items-center space-x-4">
            {/* Search and Cart */}
            <div className="hidden lg:flex items-center space-x-4">
              <SearchBar />
              {/* <CartIcon /> */}
            </div>

            {/* Mobile Menu Button - Dark theme */}
            <button 
              className="lg:hidden p-3 rounded-2xl hover:bg-gray-700/50 transition-all duration-200 group border border-gray-600/30"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-gray-300 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}></span>
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-gray-300 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-gray-300 transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dark theme enhanced */}
        <div className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-2 px-2">
            {[
              { href: '/', label: 'Home', icon: '🏠' },
              { href: '/products', label: 'All Products', icon: '🛍️' },
              // { href: '/collections', label: 'Collections', icon: '📦' },
              { href: '/about', label: 'About Us', icon: '👥' },
              // { href: '/cart', label: 'Cart', icon: '🛒' }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700/50 px-6 py-4 rounded-2xl transition-all duration-200 font-medium group border border-gray-600/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                <span className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 text-white">
                  →
                </span>
              </Link>
            ))}
            
            <div className="px-6">
              <div className="text-sm font-medium text-gray-400 mb-3">QUICK ACTIONS</div>
              <div className="space-y-3">
                <SearchBar mobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// Updated SearchBar for dark theme
function SearchBar({ mobile = false }) {
  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`}>
      <input
        type="text"
        placeholder="Search ..."
        className={`bg-gray-800/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm ${
          mobile ? 'w-full' : 'w-64'
        }`}
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200">
        <SearchIcon />
      </button>
    </div>
  )
}

// Updated Icons for dark theme
function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function ShoppingBagIcon() {
  return (
    <Link href="/cart">
      <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </Link>
  )
}

function UserIcon() {
  return (
    <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}