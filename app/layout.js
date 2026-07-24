import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/Cart/CartProvider'
import { ToastContainer, Bounce } from "react-toastify";
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Legend Wear - Maillots de Football au Meilleur Prix en Tunisie',
  description: 'Maillots de football qualité premium (réplique) au meilleur prix en Tunisie. Paiement à la livraison, partout en Tunisie.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-white text-neutral-900`}>
        <CartProvider>

          <div className="flex flex-col min-h-screen">
            <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
            transition={Bounce}
          />
            <Header />
            <main className="flex-1 bg-white">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}