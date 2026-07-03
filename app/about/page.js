'use client'

import { useState } from 'react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const features = [
    {
      icon: '⚽',
      title: 'Sports Passion',
      description: 'Authentic football & basketball designs that celebrate your favorite sports'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Premium quality t-shirts at affordable prices for every fan'
    },
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: '24-48 hour delivery across Tunisia. Your legends arrive quickly'
    },
    {
      icon: '💵',
      title: 'Cash on Delivery',
      description: 'Pay when you receive your order. No upfront payments required'
    }
  ]

  const team = [
    {
      name: 'Mohamed Ali',
      role: 'Founder & Sports Enthusiast',
      bio: 'Passionate about bringing legendary sports apparel to Tunisian fans'
    },
    {
      name: 'Sarah Ben',
      role: 'Head of Design',
      bio: 'Creating iconic designs that capture the spirit of the game'
    },
    {
      name: 'Karim Trabelsi',
      role: 'Operations Manager',
      bio: 'Ensuring your legends reach you within 48 hours, guaranteed'
    }
  ]

  return (
    <section className="relative py-16 text-white min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            ABOUT <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">LEGEND WEAR</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tunisia's Premier Destination for Authentic Football & Basketball Apparel
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 mb-16">
          {/* <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/30">
            <div className="text-3xl font-black text-white mb-2">1000+</div>
            <div className="text-gray-400">Legends Served</div>
          </div> */}
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/30">
            <div className="text-3xl font-black text-white mb-2">24-48h</div>
            <div className="text-gray-400">Delivery Time</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/30">
            <div className="text-3xl font-black text-white mb-2">100%</div>
            <div className="text-gray-400">COD Available</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/30">
            <div className="text-3xl font-black text-white mb-2">⭐️⭐️⭐️⭐️⭐️</div>
            <div className="text-gray-400">Customer Rating</div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[ 'mission', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-black shadow-2xl scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
                }`}
              >
                {tab === 'mission' && 'Our Mission'}
                {tab === 'team' && 'Our Team'}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-600/30 shadow-2xl">
          

            {activeTab === 'mission' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Our Mission & Values
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  At Legend Wear, our mission is simple: to provide every Tunisian sports fan with access to 
                  high-quality, affordable football and basketball apparel that lets them represent their passion 
                  with pride and style.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-gray-700/30 rounded-xl border border-gray-600/50">
                    <h3 className="font-bold text-white mb-3 text-xl">🎯 Quality First</h3>
                    <p className="text-gray-300">
                      We never compromise on quality. Every t-shirt is crafted with premium materials to ensure 
                      comfort, durability, and that legendary feel.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-700/30 rounded-xl border border-gray-600/50">
                    <h3 className="font-bold text-white mb-3 text-xl">⚡ Speed & Reliability</h3>
                    <p className="text-gray-300">
                      Your time is valuable. Our 24-48 hour shipping promise means you get your legends when you need them.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-700/30 rounded-xl border border-gray-600/50">
                    <h3 className="font-bold text-white mb-3 text-xl">🤝 Trust & Transparency</h3>
                    <p className="text-gray-300">
                      Cash on delivery means you only pay when you're satisfied. No risks, no complications.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-700/30 rounded-xl border border-gray-600/50">
                    <h3 className="font-bold text-white mb-3 text-xl">❤️ Community Driven</h3>
                    <p className="text-gray-300">
                      We're more than a store - we're part of Tunisia's sports community, celebrating the passion that unites us all.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Meet The Legends
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our team is comprised of passionate sports enthusiasts and professionals dedicated to bringing 
                  you the best shopping experience in Tunisia.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {team.map((member, index) => (
                    <div key={index} className="text-center p-6 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-bold text-white text-xl mb-2">{member.name}</h3>
                      <p className="text-gray-400 mb-3">{member.role}</p>
                      <p className="text-gray-300 text-sm">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Why Choose Legend Wear?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/30 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-white text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-600/30">
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Wear Your Legend?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers across Tunisia who trust Legend Wear for their sports apparel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/products'}
              className="cursor-pointer bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-gray-600"
            >
              Explore Our Products
            </button>
           
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-800/50 px-6 py-4 rounded-xl border border-gray-600/30">
            <span className="text-2xl">🚚</span>
            <div className="text-left">
              <div className="font-semibold text-white">24-48 Hour Shipping</div>
              <div className="text-gray-400 text-sm">Available across Tunisia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}