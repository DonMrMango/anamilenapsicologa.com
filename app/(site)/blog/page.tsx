'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaSearch, 
  FaCalendar, 
  FaClock, 
  FaTag,
  FaPlay,
  FaMicrophone,
  FaBookOpen,
  FaStar
} from 'react-icons/fa'

// Mock data - en producción vendría de Sanity
const categories = [
  { id: 'all', name: 'Todos', icon: FaBookOpen, count: 12 },
  { id: 'articles', name: 'Artículos', icon: FaBookOpen, count: 6 },
  { id: 'videos', name: 'Videos', icon: FaPlay, count: 3 },
  { id: 'podcasts', name: 'Podcasts', icon: FaMicrophone, count: 2 },
  { id: 'reviews', name: 'Reseñas', icon: FaStar, count: 1 },
]

const blogPosts = [
  {
    id: 1,
    title: 'Cómo saber cuándo es hora de ir a terapia de pareja',
    excerpt: 'Muchas parejas se preguntan cuál es el momento adecuado para buscar ayuda profesional. En este artículo exploramos las señales que indican que es momento de tomar esa decisión.',
    category: 'articles',
    readTime: '8 min',
    publishedAt: '2024-01-15',
    image: '/blog/terapia-pareja.jpg',
    tags: ['terapia de pareja', 'relaciones', 'comunicación'],
    featured: true
  },
  {
    id: 2,
    title: 'El poder transformador de las preguntas en terapia sistémica',
    excerpt: 'Las preguntas circulares y reflexivas son herramientas fundamentales en la terapia sistémica. Descubre cómo una pregunta bien formulada puede abrir nuevas perspectivas.',
    category: 'articles',
    readTime: '12 min',
    publishedAt: '2024-01-10',
    image: '/blog/preguntas-sistemicas.jpg',
    tags: ['terapia sistémica', 'técnicas terapéuticas', 'reflexión'],
    featured: false
  },
  {
    id: 3,
    title: 'Video: Técnicas de respiración para la ansiedad',
    excerpt: 'En este video te enseño tres técnicas de respiración simples pero efectivas que puedes usar cuando sientes ansiedad o estrés.',
    category: 'videos',
    readTime: '15 min',
    publishedAt: '2024-01-08',
    image: '/blog/respiracion-ansiedad.jpg',
    tags: ['ansiedad', 'técnicas', 'autocuidado'],
    featured: false
  },
  {
    id: 4,
    title: 'Construyendo límites saludables en la familia',
    excerpt: 'Los límites no son muros, son puentes que nos permiten relacionarnos de manera más sana. Aprende cómo establecer límites claros y amorosos.',
    category: 'articles',
    readTime: '10 min',
    publishedAt: '2024-01-05',
    image: '/blog/limites-familia.jpg',
    tags: ['familia', 'límites', 'crianza'],
    featured: false
  },
  {
    id: 5,
    title: 'Podcast: Conversando sobre salud mental con jóvenes',
    excerpt: 'Una conversación franca sobre los desafíos de salud mental que enfrentan los jóvenes hoy, con tips prácticos para padres y educadores.',
    category: 'podcasts',
    readTime: '45 min',
    publishedAt: '2024-01-03',
    image: '/blog/salud-mental-jovenes.jpg',
    tags: ['juventud', 'salud mental', 'prevención'],
    featured: false
  },
  {
    id: 6,
    title: 'El duelo: un proceso natural de sanación',
    excerpt: 'El duelo no es algo que tengamos que "superar" rápidamente. Es un proceso natural que merece ser respetado y acompañado con paciencia.',
    category: 'articles',
    readTime: '14 min',
    publishedAt: '2024-01-01',
    image: '/blog/proceso-duelo.jpg',
    tags: ['duelo', 'pérdida', 'sanación'],
    featured: true
  }
]

export default function BlogPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || FaBookOpen
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Blog de Psicología y Bienestar
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Artículos, videos y recursos para acompañarte en tu proceso de crecimiento personal. 
              Aquí encontrarás reflexiones, técnicas y herramientas para fortalecer tu bienestar emocional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos, videos o temas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{category.name}</span>
                    <span className="text-xs opacity-75">({category.count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Artículos destacados</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => {
                  const Icon = getCategoryIcon(post.category)
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <Link href={`/blog/${post.id}`}>
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                          <div className="relative h-64">
                            {/* Placeholder image */}
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <Icon className="text-primary text-4xl" />
                            </div>
                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                              Destacado
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center space-x-1">
                                <FaCalendar />
                                <span>{new Date(post.publishedAt).toLocaleDateString('es-ES')}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <FaClock />
                                <span>{post.readTime}</span>
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center space-x-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                >
                                  <FaTag size={10} />
                                  <span>{tag}</span>
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-800">
                {searchTerm ? `Resultados para "${searchTerm}"` : 
                 selectedCategory === 'all' ? 'Todos los artículos' :
                 categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Ver todos los artículos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => {
                  const Icon = getCategoryIcon(post.category)
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <div className="relative h-48">
                            {/* Placeholder image */}
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Icon className="text-primary text-3xl" />
                            </div>
                            {post.featured && (
                              <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                ⭐ Destacado
                              </div>
                            )}
                          </div>
                          
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                              <span className="flex items-center space-x-1">
                                <FaCalendar />
                                <span>{new Date(post.publishedAt).toLocaleDateString('es-ES')}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <FaClock />
                                <span>{post.readTime}</span>
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center space-x-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                >
                                  <FaTag size={8} />
                                  <span>{tag}</span>
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Te gusta lo que lees?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Mantente al día con nuevos artículos y recursos para tu bienestar emocional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, me interesan tus artículos y me gustaría recibir actualizaciones.')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <span>Seguir por WhatsApp</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/contacto'}
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                <span>Contactar directamente</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}