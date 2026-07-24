'use client'

import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-neutral-900 mb-4">Une erreur est survenue</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
