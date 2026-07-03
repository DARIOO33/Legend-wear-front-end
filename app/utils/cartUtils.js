// utils/cartUtils.js

const CART_KEY = "legend-wear-cart";

// 🔹 Helper: save + dispatch event
export function updateCart(newCart) {
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  window.dispatchEvent(new Event("cartUpdated", { bubbles: true }));
}

// 🔹 Add item to cart
export function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

  // use variantId (unique per model + size) or fallback to id
  const idToUse = item.variantId || item.id;

  const existing = cart.find(i => (i.variantId || i.id) === idToUse);

  if (existing) {
    // if already exists, increase by item.quantity or 1
    existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
  } else {
    // push as new product
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // ensure event triggers reactivity
  const event = new Event("cartUpdated", { bubbles: true });
  window.dispatchEvent(event);
}

// 🔹 Remove item from cart
export function removeFromCart(itemId) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const updatedCart = cart.filter(i => (i.variantId || i.id) !== itemId);
  updateCart(updatedCart);
}

// 🔹 Update quantity manually (optional helper)
export function updateQuantity(itemId, newQuantity) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const item = cart.find(i => (i.variantId || i.id) === itemId);
  if (item) {
    item.quantity = newQuantity;
    updateCart(cart);
  }
}

// 🔹 Clear cart completely
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated", { bubbles: true }));
}

// 🔹 Get current cart
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
