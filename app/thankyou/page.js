"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("last-order");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
      // Clear the order from localStorage after displaying
      setTimeout(() => {
        localStorage.removeItem("last-order");
      }, 5000);
    } else {
      // If no order data, redirect to home
      router.push("/");
    }
  }, [router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your order details...</p>
        </div>
      </div>
    );
  }

  function generateOrderId(order) {
    // 1️⃣ Customer initials
    const initials = order.customerName
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join(""); // e.g., "Anouar Dario Aissaoui" => "ADA"

    // 2️⃣ Product short code (take first 4 chars of first item ID)
    const productCode = order.items[0].product.slice(0, 4).toUpperCase(); // "68e8"

    // 3️⃣ Date code (YYMMDDHHMM)
    const date = new Date(order.createdAt);
    const dateCode = `${date.getFullYear().toString().slice(2)}${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
      .getHours()
      .toString()
      .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

    // 4️⃣ Random string for extra uniqueness
    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();

    // Combine all parts
    return `${initials}-${productCode}-${dateCode}-${randomStr}`;
  }

  // Example usage
  // Possible output: "ADA-68E8-2510132009-X9F2"
  
  console.log(order);
  const orderId = generateOrderId(order);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-gray-900 to-black text-white px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-black mb-4 text-green-400">
          Order Confirmed!
        </h1>
        <p className="text-xl mb-2">Thank you for your purchase!</p>
        <p className="text-gray-400 mb-6">
          Your order has been successfully placed.
        </p>

        <div className="bg-gray-700/30 rounded-xl p-6 mb-6 text-left">
          <h3 className="font-bold text-lg mb-3">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID:</span>
                <span className="font-mono">{order.orderId}</span>

            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Product:</span>
              <span>{order.items[0].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantity:</span>
              <span>{order.items[0].qty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount:</span>
              <span className="font-bold text-green-400">
                {order.totalPrice.toFixed(2)} TND
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white transition transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          A confirmation email has been sent to{" "}
          {order.customer?.email || order.customerEmail || "your email address"}
          .
        </p>
      </div>
    </div>
  );
}
