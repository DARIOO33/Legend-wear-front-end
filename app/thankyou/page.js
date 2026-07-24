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
      setTimeout(() => {
        localStorage.removeItem("last-order");
      }, 5000);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neutral-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">Chargement des détails de votre commande...</p>
        </div>
      </div>
    );
  }

  function generateOrderId(order) {
    const initials = order.customerName
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");

    const productCode = order.items[0].product.slice(0, 4).toUpperCase();

    const date = new Date(order.createdAt);
    const dateCode = `${date.getFullYear().toString().slice(2)}${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
      .getHours()
      .toString()
      .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();

    return `${initials}-${productCode}-${dateCode}-${randomStr}`;
  }

  const orderId = generateOrderId(order);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
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

        <h1 className="text-3xl font-extrabold mb-3 text-neutral-900">
          Commande Confirmée !
        </h1>
        <p className="text-lg mb-1 text-neutral-700">Merci pour votre achat !</p>
        <p className="text-neutral-500 mb-6">
          Votre commande a été enregistrée avec succès.
        </p>

        <div className="bg-neutral-50 rounded-xl p-6 mb-6 text-left border border-neutral-200">
          <h3 className="font-bold text-lg mb-3 text-neutral-900">Détails de la Commande</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Numéro de Commande :</span>
              <span className="font-mono text-neutral-900">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Produit :</span>
              <span className="text-neutral-900">{order.items[0].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Quantité :</span>
              <span className="text-neutral-900">{order.items[0].qty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Montant Total :</span>
              <span className="font-bold text-emerald-600">
                {order.totalPrice.toFixed(2)} TND
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Paiement :</span>
              <span className="font-semibold text-neutral-900">À la livraison</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full py-3 rounded-xl font-bold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
        >
          Continuer mes Achats
        </button>

        <p className="text-neutral-400 text-xs mt-6">
          Notre équipe vous contactera par téléphone pour confirmer la livraison. Préparez le montant exact en espèces à la réception.
        </p>
      </div>
    </div>
  );
}
