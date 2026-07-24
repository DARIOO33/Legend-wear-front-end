export default function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-2 border-neutral-200 border-t-amber-500 ${sizeClasses[size]}`}></div>
    </div>
  )
}
