'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FaHome, 
  FaList, 
  FaPlus, 
  FaComments, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaSpinner
} from 'react-icons/fa'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/blog-admin/login')
    }
  }, [loading, user, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/blog-admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-primary mx-auto mb-4" />
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-white shadow-md fixed left-0 top-0 h-full z-10"
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-serif font-bold text-primary">Blog Admin</h1>
          <p className="text-sm text-neutral-500">Panel de administración</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/blog-admin" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaHome className="text-neutral-500" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog-admin/posts" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaList className="text-neutral-500" />
                <span>Publicaciones</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog-admin/posts/new" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaPlus className="text-neutral-500" />
                <span>Nueva publicación</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog-admin/comments" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaComments className="text-neutral-500" />
                <span>Comentarios</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog-admin/stats" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaChartBar className="text-neutral-500" />
                <span>Estadísticas</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog-admin/settings" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FaCog className="text-neutral-500" />
                <span>Configuración</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors w-full"
          >
            <FaSignOutAlt className="text-red-500" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}