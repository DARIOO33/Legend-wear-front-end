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
  const baseClasses = 'cursor-pointer font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400',
    outline: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
  }

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

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