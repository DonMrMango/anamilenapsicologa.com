'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getPosts, PostData } from '@/lib/firebase/blog'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaPlus, 
  FaEdit, 
  FaEye, 
  FaCalendarAlt, 
  FaComments, 
  FaChartLine, 
  FaHeart,
  FaNewspaper,
  FaVideo,
  FaSpinner
} from 'react-icons/fa'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostData[]>([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    articles: 0,
    videos: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await getPosts()
        setPosts(allPosts)
        
        // Calculate stats
        const published = allPosts.filter(post => post.status === 'published')
        const drafts = allPosts.filter(post => post.status === 'draft')
        const articles = allPosts.filter(post => post.type === 'article')
        const videos = allPosts.filter(post => post.type === 'video')
        
        setStats({
          totalPosts: allPosts.length,
          published: published.length,
          drafts: drafts.length,
          articles: articles.length,
          videos: videos.length,
          totalViews: allPosts.reduce((acc, post) => acc + post.viewCount, 0),
          totalLikes: allPosts.reduce((acc, post) => acc + post.likeCount, 0),
          totalComments: allPosts.reduce((acc, post) => acc + post.commentCount, 0)
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-primary" />
      </div>
    )
  }
  
  // Get 5 most recent posts
  const recentPosts = [...posts].sort((a, b) => {
    const dateA = a.createdAt ? a.createdAt.toMillis() : 0
    const dateB = b.createdAt ? b.createdAt.toMillis() : 0
    return dateB - dateA
  }).slice(0, 5)
  
  // Get 5 most viewed posts
  const popularPosts = [...posts].sort((a, b) => {
    return b.viewCount - a.viewCount
  }).slice(0, 5)
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
            Bienvenida, Ana
          </h1>
          <p className="text-neutral-600">
            Aquí puedes gestionar tu blog y ver el rendimiento de tus publicaciones
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link
            href="/blog-admin/posts/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FaPlus />
            <span>Nueva publicación</span>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 mb-1">Publicaciones</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{stats.totalPosts}</h3>
                  <div className="flex items-center mt-2 text-sm text-neutral-500">
                    <span className="flex items-center">
                      <FaNewspaper className="mr-1" />
                      {stats.articles} artículos
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <FaVideo className="mr-1" />
                      {stats.videos} videos
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaNewspaper className="text-primary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 mb-1">Visualizaciones</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{stats.totalViews}</h3>
                  <p className="text-sm text-neutral-500 mt-2">Total de todas las publicaciones</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FaEye className="text-secondary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 mb-1">Me gusta</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{stats.totalLikes}</h3>
                  <p className="text-sm text-neutral-500 mt-2">Interacciones positivas</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaHeart className="text-red-500 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 mb-1">Comentarios</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{stats.totalComments}</h3>
                  <p className="text-sm text-neutral-500 mt-2">Conversaciones generadas</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaComments className="text-blue-500 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent and Popular Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-800">Publicaciones recientes</h3>
                <Link
                  href="/blog-admin/posts"
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Ver todas
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentPosts.length === 0 ? (
                  <p className="text-neutral-500 text-center py-4">
                    No hay publicaciones recientes
                  </p>
                ) : (
                  recentPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {post.type === 'article' ? (
                            <FaNewspaper className="text-primary" />
                          ) : (
                            <FaVideo className="text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{post.title}</h4>
                          <p className="text-xs text-neutral-500 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {post.createdAt ? new Date(post.createdAt.toMillis()).toLocaleDateString('es-ES') : 'Fecha desconocida'}
                            <span className="mx-1">•</span>
                            {post.status === 'published' ? (
                              <span className="text-green-600">Publicado</span>
                            ) : (
                              <span className="text-amber-600">Borrador</span>
                            )}
                          </p>
                        </div>
                      </div>
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
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Popular Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-800">Publicaciones populares</h3>
                <Link
                  href="/blog-admin/stats"
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Ver estadísticas
                </Link>
              </div>
              
              <div className="space-y-4">
                {popularPosts.length === 0 ? (
                  <p className="text-neutral-500 text-center py-4">
                    No hay datos de popularidad disponibles
                  </p>
                ) : (
                  popularPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {post.type === 'article' ? (
                            <FaNewspaper className="text-primary" />
                          ) : (
                            <FaVideo className="text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{post.title}</h4>
                          <div className="flex items-center text-xs text-neutral-500 mt-1">
                            <span className="flex items-center mr-2">
                              <FaEye className="mr-1" />
                              {post.viewCount} vistas
                            </span>
                            <span className="flex items-center mr-2">
                              <FaHeart className="mr-1" />
                              {post.likeCount} me gusta
                            </span>
                            <span className="flex items-center">
                              <FaComments className="mr-1" />
                              {post.commentCount} comentarios
                            </span>
                          </div>
                        </div>
                      </div>
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
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}