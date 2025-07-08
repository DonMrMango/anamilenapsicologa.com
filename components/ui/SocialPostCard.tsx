'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaShare, 
  FaBookmark, 
  FaRegBookmark,
  FaEllipsisH,
  FaVideo,
  FaClock,
  FaTag
} from 'react-icons/fa'
import TiktokEmbed from './TiktokEmbed'

interface SocialPostCardProps {
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

export default function SocialPostCard({
  id,
  type,
  title,
  excerpt,
  mainImage,
  tiktokUrl,
  publishedAt,
  slug,
  viewCount,
  likeCount,
  commentCount,
  tags,
  readTime,
  isPinned,
  isFeatured
}: SocialPostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  
  const formattedDate = format(new Date(publishedAt), "d 'de' MMMM, yyyy", { locale: es })
  
  const handleLike = () => {
    setIsLiked(!isLiked)
  }
  
  const handleSave = () => {
    setIsSaved(!isSaved)
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: `${window.location.origin}/blog/${slug}`
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`)
      alert('Enlace copiado al portapapeles')
    }
  }
  
  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with user info */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image 
              src="/images/ana-avatar.jpg" 
              alt="Ana Milena"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-neutral-800">Ana Milena</h4>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            className="p-2 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FaEllipsisH size={16} />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 top-10 w-48 bg-white shadow-md rounded-lg py-2 z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm">
                Guardar publicación
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm">
                Copiar enlace
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm">
                Reportar contenido
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Badges for pinned/featured */}
      {(isPinned || isFeatured) && (
        <div className="px-4 py-2 flex gap-2">
          {isPinned && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              📌 Fijado
            </span>
          )}
          {isFeatured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              ⭐ Destacado
            </span>
          )}
        </div>
      )}
      
      {/* Title */}
      <Link href={`/blog/${slug}`}>
        <h3 className="px-4 py-2 text-lg font-semibold text-neutral-800 hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      
      {/* Content */}
      <div className="px-4">
        {type === 'post' && mainImage && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <Image 
              src={mainImage}
              alt={title}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
          </div>
        )}
        
        {type === 'video' && tiktokUrl && (
          <div className="mb-3">
            <TiktokEmbed url={tiktokUrl} />
          </div>
        )}
        
        {excerpt && (
          <p className="mb-3 text-neutral-700 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center space-x-1 text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full"
              >
                <FaTag size={10} />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
        
        {/* Post metadata */}
        <div className="flex items-center text-xs text-neutral-500 mb-3">
          {type === 'post' && readTime && (
            <span className="flex items-center mr-3">
              <FaClock className="mr-1" />
              {readTime}
            </span>
          )}
          
          {type === 'video' && (
            <span className="flex items-center mr-3">
              <FaVideo className="mr-1" />
              Video
            </span>
          )}
          
          {viewCount !== undefined && (
            <span className="mr-3">{viewCount} visualizaciones</span>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="px-4 py-3 border-t flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
            onClick={handleLike}
          >
            {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            <span>{likeCount || 0}</span>
          </button>
          
          <Link 
            href={`/blog/${slug}#comments`}
            className="flex items-center space-x-1 text-neutral-500 hover:text-primary"
          >
            <FaComment size={18} />
            <span>{commentCount || 0}</span>
          </Link>
          
          <button 
            className="flex items-center space-x-1 text-neutral-500 hover:text-primary"
            onClick={handleShare}
          >
            <FaShare size={18} />
          </button>
        </div>
        
        <button 
          className={isSaved ? 'text-primary' : 'text-neutral-500 hover:text-primary'}
          onClick={handleSave}
        >
          {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
        </button>
      </div>
    </motion.div>
  )
}