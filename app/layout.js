import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/Cart/CartProvider'
import { ToastContainer, Bounce } from "react-toastify";
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Legend Wear - Premium Sports Jerseys',
  description: 'Premium football, basketball and sports jerseys for true fans',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          
          <div className="flex flex-col min-h-screen">
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            transition={Bounce}
          />
            <Header />
            <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}