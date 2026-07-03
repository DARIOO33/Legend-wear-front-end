// src/api/products.js
const API_URL = "http://localhost:5000/api/products"; // change if deployed

// 🟢 Get all products
export const getAllProducts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// 🟢 Get product by ID
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// 🟢 Search products by keyword
export const getProductsByKeyword = async (keyword) => {
  try {
    const res = await fetch(`${API_URL}/search/${keyword}`);
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (error) {
    console.error(`Error searching products:`, error);
    return [];
  }
};
// 🟢 Get featured products (from DB field)
// 🟢 Get featured products - ROBUST VERSION
export const getFeaturedProducts = async () => {
  try {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    
    const response = await res.json();
    
    // Handle different possible response structures
    let products = [];
    
    if (Array.isArray(response.products)) {
      // Your actual structure: { count: number, products: array }
      products = response.products;
    } else if (Array.isArray(response)) {
      // Direct array response
      products = response;
    } else if (response.data && Array.isArray(response.data)) {
      // { data: array } structure
      products = response.data;
    }
    
    console.log('Products found:', products.length);
    
    // Filter featured products
    const featured = products.filter(product => 
      product.featured === true || product.featured === 'true'
    );
    
    console.log('Featured products:', featured.length);
    return featured;
    
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};