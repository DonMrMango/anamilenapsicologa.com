'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaThList, FaTh, FaFilter, FaSortAmountDown, FaSortAmountUp, FaVideo, FaHeart, FaComment } from 'react-icons/fa'
import SocialPostCard from './SocialPostCard'
import { Card } from './Card'

type PostType = {
  id: string
  type: 'post' | 'video'
  title: string
  excerpt?: string
  mainImage?: string
  tiktokUrl?: string
  publishedAt: string
  slug: string
  viewCount?: number
  likeCount?: number
  commentCount?: number
  tags?: string[]
  readTime?: string
  isPinned?: boolean
  isFeatured?: boolean
}

interface SocialFeedProps {
  posts: PostType[]
  initialView?: 'feed' | 'grid'
  initialSort?: 'recent' | 'popular' | 'featured'
}

export default function SocialFeed({ 
  posts, 
  initialView = 'feed', 
  initialSort = 'recent' 
}: SocialFeedProps) {
  const [view, setView] = useState<'feed' | 'grid'>(initialView)
  const [sort, setSort] = useState<'recent' | 'popular' | 'featured'>(initialSort)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts)
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'videos'>('all')
  
  // Handle sorting and filtering
  useEffect(() => {
    let filtered = [...posts]
    
    // Apply type filter
    if (activeFilter === 'posts') {
      filtered = filtered.filter(post => post.type === 'post')
    } else if (activeFilter === 'videos') {
      filtered = filtered.filter(post => post.type === 'video')
    }
    
    // Apply sorting
    if (sort === 'recent') {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    } else if (sort === 'featured') {
      filtered.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
    }
    
    setFilteredPosts(filtered)
  }, [posts, sort, activeFilter])

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-lg ${view === 'feed' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
            onClick={() => setView('feed')}
            aria-label="Ver como feed"
          >
            <FaThList size={18} />
          </button>
          <button
            className={`p-2 rounded-lg ${view === 'grid' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
            onClick={() => setView('grid')}
            aria-label="Ver como grid"
          >
            <FaTh size={18} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Filter Button */}
          <div className="relative">
            <button
              className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center space-x-1"
              onClick={() => {
                setFilterMenuOpen(!filterMenuOpen)
                setSortMenuOpen(false)
              }}
              aria-label="Filtrar contenido"
            >
              <FaFilter size={16} />
              <span className="hidden sm:inline text-sm">{
                activeFilter === 'all' ? 'Todo' : 
                activeFilter === 'posts' ? 'Artículos' :
                'Videos'
              }</span>
            </button>
            
            <AnimatePresence>
              {filterMenuOpen && (
                <motion.div
                  className="absolute right-0 top-10 w-40 bg-white shadow-md rounded-lg py-2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${activeFilter === 'all' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setActiveFilter('all')
                      setFilterMenuOpen(false)
                    }}
                  >
                    Todo
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${activeFilter === 'posts' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setActiveFilter('posts')
                      setFilterMenuOpen(false)
                    }}
                  >
                    Artículos
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${activeFilter === 'videos' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setActiveFilter('videos')
                      setFilterMenuOpen(false)
                    }}
                  >
                    Videos
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Sort Button */}
          <div className="relative">
            <button
              className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center space-x-1"
              onClick={() => {
                setSortMenuOpen(!sortMenuOpen)
                setFilterMenuOpen(false)
              }}
              aria-label="Ordenar contenido"
            >
              {sort === 'recent' ? <FaSortAmountDown size={16} /> : <FaSortAmountUp size={16} />}
              <span className="hidden sm:inline text-sm">{
                sort === 'recent' ? 'Recientes' : 
                sort === 'popular' ? 'Populares' : 
                'Destacados'
              }</span>
            </button>
            
            <AnimatePresence>
              {sortMenuOpen && (
                <motion.div
                  className="absolute right-0 top-10 w-40 bg-white shadow-md rounded-lg py-2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${sort === 'recent' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setSort('recent')
                      setSortMenuOpen(false)
                    }}
                  >
                    Más recientes
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${sort === 'popular' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setSort('popular')
                      setSortMenuOpen(false)
                    }}
                  >
                    Más populares
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm ${sort === 'featured' ? 'text-primary font-medium' : ''}`}
                    onClick={() => {
                      setSort('featured')
                      setSortMenuOpen(false)
                    }}
                  >
                    Destacados
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* No posts message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">No hay publicaciones disponibles</h3>
          <p className="text-neutral-500">
            No se encontraron publicaciones con los filtros seleccionados.
          </p>
        </div>
      )}
      
      {/* Feed View */}
      {view === 'feed' && filteredPosts.length > 0 && (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <SocialPostCard
              key={post.id}
              id={post.id}
              type={post.type}
              title={post.title}
              excerpt={post.excerpt}
              mainImage={post.mainImage}
              tiktokUrl={post.tiktokUrl}
              publishedAt={post.publishedAt}
              slug={post.slug}
              viewCount={post.viewCount}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              tags={post.tags}
              readTime={post.readTime}
              isPinned={post.isPinned}
              isFeatured={post.isFeatured}
            />
          ))}
        </div>
      )}
      
      {/* Grid View */}
      {view === 'grid' && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] bg-neutral-100">
                {post.type === 'post' && post.mainImage ? (
                  <img 
                    src={post.mainImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaVideo size={40} className="text-neutral-300" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {post.isPinned && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white text-neutral-700 shadow-sm">
                      📌
                    </span>
                  )}
                  {post.isFeatured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white text-yellow-800 shadow-sm">
                      ⭐
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800 line-clamp-2 mb-2">
                  {post.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{new Date(post.publishedAt).toLocaleDateString('es-ES')}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <FaHeart className="mr-1" />
                      {post.likeCount || 0}
                    </span>
                    <span className="flex items-center">
                      <FaComment className="mr-1" />
                      {post.commentCount || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}