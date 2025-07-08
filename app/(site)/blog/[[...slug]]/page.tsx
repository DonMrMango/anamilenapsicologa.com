'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirigir automáticamente al nuevo blog social
    router.replace('/blog-social')
  }, [router])
  
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif font-bold text-neutral-800 mb-4">
          Redirigiendo...
        </h1>
        <p className="text-neutral-600">
          Te estamos llevando al nuevo espacio de expresión de Ana Milena
        </p>
      </div>
    </div>
  )
}