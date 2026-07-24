'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Maillots' },
    { href: '/about', label: 'À Propos' },
  ]

  return (
    <header
      className={`bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 border-b ${
        isScrolled ? 'border-neutral-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-lg overflow-hidden border border-neutral-200 bg-white flex items-center justify-center">
              <img src="/logo.jpeg" alt="Legend Wear" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-neutral-900">
                LEGEND WEAR
              </span>
              <span className="text-[11px] font-semibold text-amber-600 tracking-wider uppercase">
                Meilleur prix en Tunisie
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-5 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0.5 left-5 right-5 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <CartIcon />

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-neutral-900 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-neutral-900 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-neutral-900 transition-transform duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out border-t border-neutral-100 ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <SearchBar mobile />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function SearchBar({ mobile = false }) {
  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`}>
      <input
        type="text"
        placeholder="Rechercher un maillot..."
        className={`bg-neutral-100 border border-transparent rounded-full pl-4 pr-10 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-300 focus:ring-2 focus:ring-amber-500/20 transition-all ${
          mobile ? 'w-full' : 'w-56 xl:w-64'
        }`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  )
}
