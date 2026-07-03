export const products = [
  {
    id: 1,
    name: "FC Barcelona Home Jersey 2024",
    team: "FC Barcelona",
    sport: "Football",
    price: 129.99,
    image: "https://res.cloudinary.com/dizjoy6v5/image/upload/v1759423076/pEHLLXZBKsZwcBq_es38rc.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    models: ["Home", "Away", "Third"],
    description: "Official FC Barcelona home jersey for the 2024 season. Made with premium materials for ultimate comfort and performance.",
    featured: true
  },
  {
    id: 2,
    name: "Real Madrid Away Jersey 2024",
    team: "Real Madrid",
    sport: "Football",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    models: ["Home", "Away", "Third"],
    description: "Authentic Real Madrid away jersey featuring advanced moisture-wicking technology.",
    featured: true
  },
  {
    id: 3,
    name: "Chicago Bulls Home Jersey 2024",
    team: "Chicago Bulls",
    sport: "Basketball",
    price: 134.99,
    image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=400&h=500&fit=crop",
    sizes: ["M", "L", "XL", "XXL"],
    models: ["Home", "Away", "Classic"],
    description: "Classic Chicago Bulls home jersey with retro design and modern fit.",
    featured: true
  },
  {
    id: 4,
    name: "FC Barcelona Third Jersey 2024",
    team: "FC Barcelona",
    sport: "Football",
    price: 124.99,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    models: ["Home", "Away", "Third"],
    description: "Limited edition FC Barcelona third jersey with unique pattern design.",
    featured: true
  },
  {
    id: 5,
    name: "Golden State Warriors Alternate Jersey 2024",
    team: "Golden State Warriors",
    sport: "Basketball",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    models: ["Home", "Away", "Alternate"],
    description: "Golden State Warriors alternate jersey with special edition colors.",
    featured: false
  },
  {
    id: 6,
    name: "New York Yankees Home Jersey 2024",
    team: "New York Yankees",
    sport: "Baseball",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    models: ["Home", "Away"],
    description: "Classic New York Yankees pinstripe home jersey, a timeless piece for any fan.",
    featured: false
  },
  {
    id: 7,
    name: "Boston Celtics Away Jersey 2024",
    team: "Boston Celtics",
    sport: "Basketball",
    price: 127.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200348873a5?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    models: ["Home", "Away", "Classic"],
    description: "Boston Celtics away jersey with traditional green and white colors.",
    featured: false
  },
  {
    id: 8,
    name: "Manchester United Home Jersey 2024",
    team: "Manchester United",
    sport: "Football",
    price: 132.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    models: ["Home", "Away", "Third"],
    description: "Official Manchester United home jersey with modern design elements.",
    featured: false
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getAllProducts = () => products;
export const getProductById = (id) => products.find(product => product.id === parseInt(id));
export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.sport.toLowerCase() === category.toLowerCase());
};
