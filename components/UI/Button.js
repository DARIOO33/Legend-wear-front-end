'use client'

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) {
  const baseClasses = 'cursor-pointer font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-neutral-900 hover:bg-neutral-800 text-white focus:ring-neutral-900 shadow-sm hover:shadow-md',
    accent: 'bg-amber-500 hover:bg-amber-600 text-neutral-950 focus:ring-amber-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white focus:ring-neutral-900',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300'
  }

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
