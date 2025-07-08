'use client'

import { PostForm } from '@/components/admin/PostForm'
import { Card, CardContent } from '@/components/ui/Card'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NewPostPage() {
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
          Nueva publicación
        </motion.h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PostForm mode="create" />
      </motion.div>
    </div>
  )
}