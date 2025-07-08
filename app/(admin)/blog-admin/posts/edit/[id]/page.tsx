'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PostForm } from '@/components/admin/PostForm'
import { getPostById, PostData } from '@/lib/firebase/blog'
import { Card, CardContent } from '@/components/ui/Card'
import { FaArrowLeft, FaSpinner } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const postData = await getPostById(id)
        
        if (!postData) {
          setError('No se encontró la publicación solicitada')
          return
        }
        
        setPost(postData)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Error al cargar la publicación')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-primary mb-4" />
        <p className="text-neutral-600">Cargando publicación...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <Link 
          href="/blog-admin/posts"
          className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Volver a publicaciones
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="bg-amber-50 text-amber-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Publicación no encontrada</h2>
        <p>No se encontró la publicación solicitada.</p>
        <Link 
          href="/blog-admin/posts"
          className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Volver a publicaciones
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/blog-admin/posts"
          className="inline-flex items-center text-neutral-600 hover:text-primary transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Volver a publicaciones</span>
        </Link>
        
        <motion.h1 
          className="text-3xl font-serif font-bold text-neutral-800 mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Editar publicación
        </motion.h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PostForm mode="edit" initialData={post} />
      </motion.div>
    </div>
  )
}