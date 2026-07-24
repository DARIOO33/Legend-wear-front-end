import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-extrabold text-neutral-900 mb-2 tracking-tight">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-neutral-700 mb-4">Page Introuvable</h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-neutral-950 px-8 py-3 rounded-xl font-bold transition-colors shadow-sm"
        >
          Retour à l'Accueil
        </Link>
      </div>
    </div>
  )
}
