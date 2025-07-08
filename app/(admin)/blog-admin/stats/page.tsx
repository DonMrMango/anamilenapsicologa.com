'use client'

import { useState, useEffect } from 'react'
import { getPosts, PostData } from '@/lib/firebase/blog'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaChartBar, 
  FaSpinner, 
  FaEye, 
  FaHeart, 
  FaComments,
  FaCalendarAlt,
  FaFilter,
  FaClock,
  FaChartLine,
  FaTags
} from 'react-icons/fa'

// For future enhancement: add actual charts using Chart.js or similar

export default function StatsPage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all')
  const [postType, setPostType] = useState<'all' | 'article' | 'video'>('all')
  
  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const allPosts = await getPosts()
        setPosts(allPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Error al cargar las estadísticas')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-primary" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    )
  }
  
  // Filter posts based on time range
  const filteredPosts = posts.filter(post => {
    if (!post.createdAt) return false
    
    // Type filter
    if (postType !== 'all' && post.type !== postType) {
      return false
    }
    
    // Time range filter
    if (timeRange === 'all') return true
    
    const postDate = new Date(post.createdAt.toMillis())
    const now = new Date()
    
    if (timeRange === 'month') {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(now.getMonth() - 1)
      return postDate >= oneMonthAgo
    }
    
    if (timeRange === 'week') {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(now.getDate() - 7)
      return postDate >= oneWeekAgo
    }
    
    return true
  })
  
  // Calculate statistics
  const totalViews = filteredPosts.reduce((sum, post) => sum + post.viewCount, 0)
  const totalLikes = filteredPosts.reduce((sum, post) => sum + post.likeCount, 0)
  const totalComments = filteredPosts.reduce((sum, post) => sum + post.commentCount, 0)
  const articlesCount = filteredPosts.filter(post => post.type === 'article').length
  const videosCount = filteredPosts.filter(post => post.type === 'video').length
  
  // Calculate engagement rate (likes + comments / views)
  const engagementRate = totalViews > 0 
    ? ((totalLikes + totalComments) / totalViews * 100).toFixed(2)
    : '0.00'
  
  // Sort posts by views for top content
  const topPostsByViews = [...filteredPosts]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5)
    
  // Sort posts by engagement for most engaging content
  const topPostsByEngagement = [...filteredPosts]
    .sort((a, b) => {
      const engagementA = a.viewCount > 0 ? (a.likeCount + a.commentCount) / a.viewCount : 0
      const engagementB = b.viewCount > 0 ? (b.likeCount + b.commentCount) / b.viewCount : 0
      return engagementB - engagementA
    })
    .slice(0, 5)
  
  // Collect all tags and count occurrences
  const tagStats = filteredPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      if (!acc[tag]) acc[tag] = 0
      acc[tag]++
    })
    return acc
  }, {} as Record<string, number>)
  
  // Sort tags by popularity
  const sortedTags = Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Top 10 tags
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
            Estadísticas
          </h1>
          <p className="text-neutral-600">
            Analiza el rendimiento de tu blog
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Range Filter */}
            <div>
              <label htmlFor="timeRange" className="block text-sm font-medium text-neutral-700 mb-1">
                Período de tiempo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-neutral-400" />
                </div>
                <select
                  id="timeRange"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as 'all' | 'month' | 'week')}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todo el tiempo</option>
                  <option value="month">Último mes</option>
                  <option value="week">Última semana</option>
                </select>
              </div>
            </div>
            
            {/* Post Type Filter */}
            <div>
              <label htmlFor="postType" className="block text-sm font-medium text-neutral-700 mb-1">
                Tipo de contenido
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-neutral-400" />
                </div>
                <select
                  id="postType"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value as 'all' | 'article' | 'video')}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todos los tipos</option>
                  <option value="article">Artículos</option>
                  <option value="video">Videos</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Statistics Summary */}
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
                  <p className="text-neutral-600 mb-1">Visualizaciones</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{totalViews}</h3>
                  <p className="text-sm text-neutral-500 mt-2">
                    {articlesCount > 0 && 
                      `Promedio: ${Math.round(totalViews / (articlesCount + videosCount))}/publicación`}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaEye className="text-blue-500 text-xl" />
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
                  <p className="text-neutral-600 mb-1">Me gusta</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{totalLikes}</h3>
                  <p className="text-sm text-neutral-500 mt-2">
                    {totalViews > 0 && 
                      `Tasa: ${(totalLikes / totalViews * 100).toFixed(2)}% de vistas`}
                  </p>
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
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-neutral-600 mb-1">Comentarios</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{totalComments}</h3>
                  <p className="text-sm text-neutral-500 mt-2">
                    {totalViews > 0 && 
                      `Tasa: ${(totalComments / totalViews * 100).toFixed(2)}% de vistas`}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaComments className="text-green-500 text-xl" />
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
                  <p className="text-neutral-600 mb-1">Engagement</p>
                  <h3 className="text-3xl font-semibold text-neutral-800">{engagementRate}%</h3>
                  <p className="text-sm text-neutral-500 mt-2">
                    (Me gusta + Comentarios) / Vistas
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaChartLine className="text-purple-500 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Content Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Distribución de contenido</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Artículos</span>
                    <span>{articlesCount}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${articlesCount / (articlesCount + videosCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Videos</span>
                    <span>{videosCount}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className="bg-secondary h-2.5 rounded-full" 
                      style={{ width: `${videosCount / (articlesCount + videosCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Etiquetas populares</h3>
              
              {sortedTags.length === 0 ? (
                <p className="text-neutral-500 text-center py-4">
                  No hay datos de etiquetas disponibles
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sortedTags.map(([tag, count]) => (
                    <div 
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100"
                    >
                      <FaTags className="mr-1 text-neutral-500" />
                      <span>{tag}</span>
                      <span className="ml-1 text-neutral-500">({count})</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Viewed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-800">Más vistas</h3>
                <FaEye className="text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {topPostsByViews.length === 0 ? (
                  <p className="text-neutral-500 text-center py-4">
                    No hay datos disponibles
                  </p>
                ) : (
                  topPostsByViews.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{post.title}</h4>
                          <div className="flex items-center text-xs text-neutral-500 mt-1">
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {post.createdAt ? new Date(post.createdAt.toMillis()).toLocaleDateString('es-ES') : 'Fecha desconocida'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-neutral-800">{post.viewCount}</p>
                        <p className="text-xs text-neutral-500">vistas</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Most Engaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-800">Mayor engagement</h3>
                <FaChartLine className="text-purple-500" />
              </div>
              
              <div className="space-y-4">
                {topPostsByEngagement.length === 0 ? (
                  <p className="text-neutral-500 text-center py-4">
                    No hay datos disponibles
                  </p>
                ) : (
                  topPostsByEngagement.map((post, index) => {
                    const engagementRate = post.viewCount > 0 
                      ? ((post.likeCount + post.commentCount) / post.viewCount * 100).toFixed(2)
                      : '0.00'
                    
                    return (
                      <div key={post.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-800">{post.title}</h4>
                            <div className="flex items-center text-xs text-neutral-500 mt-1">
                              <span className="flex items-center mr-2">
                                <FaHeart className="mr-1" />
                                {post.likeCount}
                              </span>
                              <span className="flex items-center">
                                <FaComments className="mr-1" />
                                {post.commentCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-neutral-800">{engagementRate}%</p>
                          <p className="text-xs text-neutral-500">engagement</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}