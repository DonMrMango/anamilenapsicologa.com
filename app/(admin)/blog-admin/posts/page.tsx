'use client'

import { useState, useEffect } from 'react'
import { getPosts, deletePost, PostData } from '@/lib/firebase/blog'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaSearch,
  FaSpinner,
  FaNewspaper,
  FaVideo,
  FaCalendarAlt,
  FaStar,
  FaThumbtack
} from 'react-icons/fa'

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'article' | 'video'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  
  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const allPosts = await getPosts()
        setPosts(allPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Error al cargar las publicaciones')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  // Handle post deletion
  const handleDelete = async (id: string, coverImage?: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.')) {
      try {
        setLoading(true)
        const result = await deletePost(id, coverImage)
        
        if (result.success) {
          setPosts(posts.filter(post => post.id !== id))
        } else {
          setError(result.error || 'Error al eliminar la publicación')
        }
      } catch (err) {
        console.error('Error deleting post:', err)
        setError('Error al eliminar la publicación')
      } finally {
        setLoading(false)
      }
    }
  }
  
  // Filter posts
  const filteredPosts = posts.filter(post => {
    // Status filter
    if (statusFilter !== 'all' && post.status !== statusFilter) {
      return false
    }
    
    // Type filter
    if (typeFilter !== 'all' && post.type !== typeFilter) {
      return false
    }
    
    // Search term
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
            Publicaciones
          </h1>
          <p className="text-neutral-600">
            Gestiona las publicaciones de tu blog
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link href="/blog-admin/posts/new">
            <Button className="flex items-center space-x-2">
              <FaPlus />
              <span>Nueva publicación</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-neutral-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Buscar por título..."
                />
              </div>
            </div>
            
            {/* Type Filter */}
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-neutral-700 mb-1">
                Tipo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-neutral-400" />
                </div>
                <select
                  id="typeFilter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'article' | 'video')}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todos los tipos</option>
                  <option value="article">Artículos</option>
                  <option value="video">Videos</option>
                </select>
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-neutral-700 mb-1">
                Estado
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-neutral-400" />
                </div>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todos los estados</option>
                  <option value="published">Publicados</option>
                  <option value="draft">Borradores</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-3xl text-primary" />
        </div>
      )}
      
      {/* Posts list */}
      {!loading && (
        <>
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-neutral-600 mb-4">No hay publicaciones que coincidan con los filtros seleccionados</p>
              <Link href="/blog-admin/posts/new">
                <Button>Crear nueva publicación</Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-neutral-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Título</th>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Tipo</th>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Estado</th>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Fecha</th>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Estadísticas</th>
                          <th className="px-6 py-4 text-sm font-medium text-neutral-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredPosts.map((post) => (
                          <tr key={post.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-start space-x-2">
                                <div className="flex-shrink-0 mt-1">
                                  {post.type === 'article' ? (
                                    <FaNewspaper className="text-primary" />
                                  ) : (
                                    <FaVideo className="text-primary" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-neutral-800">{post.title}</p>
                                  <p className="text-xs text-neutral-500 truncate max-w-xs">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    {post.featured && (
                                      <span className="inline-flex items-center text-xs text-yellow-600">
                                        <FaStar className="mr-1" />
                                        Destacado
                                      </span>
                                    )}
                                    {post.pinned && (
                                      <span className="inline-flex items-center text-xs text-blue-600">
                                        <FaThumbtack className="mr-1" />
                                        Fijado
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {post.type === 'article' ? 'Artículo' : 'Video'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                post.status === 'published'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {post.status === 'published' ? 'Publicado' : 'Borrador'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-500">
                              <div className="flex items-center">
                                <FaCalendarAlt className="mr-1 text-neutral-400" />
                                {post.createdAt
                                  ? new Date(post.createdAt.toMillis()).toLocaleDateString('es-ES')
                                  : 'Sin fecha'}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs text-neutral-500 space-y-1">
                                <div>👁️ {post.viewCount} vistas</div>
                                <div>❤️ {post.likeCount} me gusta</div>
                                <div>💬 {post.commentCount} comentarios</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Link 
                                  href={`/blog-admin/posts/edit/${post.id}`}
                                  className="p-2 text-neutral-600 hover:text-primary rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                  <FaEdit />
                                </Link>
                                <a
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="p-2 text-neutral-600 hover:text-primary rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                  <FaEye />
                                </a>
                                <button
                                  onClick={() => handleDelete(post.id as string, post.coverImage)}
                                  className="p-2 text-neutral-600 hover:text-red-500 rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}