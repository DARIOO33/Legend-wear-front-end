import Link from 'next/link'

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "CLUB COLLECTION",
      description: "Official club jerseys without player names – perfect for true fans",
      image: "/collections/clubs.jpg",
      count: "30 Products",
      gradient: "from-blue-900/80 to-blue-700/80",
      hoverGradient: "from-blue-800 to-blue-600",
      sport: "FOOTBALL"
    },
    {
      id: 2,
      name: "NATIONAL TEAMS",
      description: "Iconic country jerseys for international tournaments and fans",
      image: "/collections/national.jpg",
      count: "22 Products",
      gradient: "from-green-900/80 to-green-700/80",
      hoverGradient: "from-green-800 to-green-600",
      sport: "FOOTBALL"
    },
    {
      id: 3,
      name: "RETRO CLASSICS",
      description: "Vintage football shirts inspired by past eras – no player names",
      image: "/collections/retro.jpg",
      count: "18 Products",
      gradient: "from-yellow-900/80 to-yellow-700/80",
      hoverGradient: "from-yellow-800 to-yellow-600",
      sport: "FOOTBALL"
    },
    {
      id: 4,
      name: "CHAMPIONS EDITION",
      description: "Special edition kits from top tournaments and cup finals",
      image: "/collections/champions.jpg",
      count: "15 Products",
      gradient: "from-red-900/80 to-red-700/80",
      hoverGradient: "from-red-800 to-red-600",
      sport: "FOOTBALL"
    },
    {
      id: 5,
      name: "TRAINING & LIFESTYLE",
      description: "Training jerseys and casual football wear for everyday style",
      image: "/collections/training.jpg",
      count: "20 Products",
      gradient: "from-purple-900/80 to-purple-700/80",
      hoverGradient: "from-purple-800 to-purple-600",
      sport: "FOOTBALL"
    },
    {
      id: 6,
      name: "FAN FAVORITES",
      description: "Most popular football kits loved by fans worldwide",
      image: "/collections/fans.jpg",
      count: "25 Products",
      gradient: "from-indigo-900/80 to-indigo-700/80",
      hoverGradient: "from-indigo-800 to-indigo-600",
      sport: "FOOTBALL"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            LEGENDARY <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">COLLECTIONS</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore Our Curated <span className="font-semibold text-gray-200">Legend Series</span> - Where Greatness Meets Style
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {collections.map((collection) => (
            <Link 
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} group-hover:${collection.hoverGradient} transition-all duration-500`}></div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-noise opacity-20"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 h-80 flex flex-col justify-between">
                {/* Sport Badge */}
                <div className="flex justify-between items-start">
                  <span className="bg-black/30 text-white px-4 py-2 rounded-xl text-sm font-bold tracking-wide border border-white/20 backdrop-blur-sm">
                    {collection.sport}
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
                    {collection.count}
                  </span>
                </div>

                {/* Collection Info */}
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                    {collection.name}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {collection.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/30 hover:border-white/50">
                    Explore Legends →
                  </button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Featured Collection Banner */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-yellow-900/50 to-gray-900"></div>
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                LIMITED EDITION <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">LEGEND SERIES</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Exclusive jerseys from historic moments. Limited quantities available.
              </p>
              <button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform border border-yellow-500">
                🏆 VIEW EXCLUSIVES
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 pt-12 border-t border-gray-600/30">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Official Licensed Collections</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Limited Edition Releases</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">✓</span>
              <span>Certificate of Authenticity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}