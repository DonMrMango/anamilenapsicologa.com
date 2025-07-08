'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  FaSave, 
  FaImage, 
  FaVideo, 
  FaTimes, 
  FaSpinner,
  FaEye,
  FaExclamationCircle,
  FaTag,
  FaPlus
} from 'react-icons/fa'
import { PostData, PostStatus, PostType, createPost, updatePost, uploadImage, generateSlug } from '@/lib/firebase/blog'

// For future enhancement: integrate a rich text editor like TipTap or QuillJS
// For now, we'll use a simple textarea

interface PostFormProps {
  initialData?: PostData
  mode: 'create' | 'edit'
}

export default function PostForm({ initialData, mode = 'create' }: PostFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Form state
  const [formData, setFormData] = useState<Partial<PostData>>({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    tiktokUrl: '',
    type: 'article',
    status: 'draft',
    tags: [],
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    featured: false,
    pinned: false
  })
  
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string>('')
  const [currentTag, setCurrentTag] = useState('')
  
  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoUpdateSlug, setAutoUpdateSlug] = useState(true)
  
  // Initialize form with existing data in edit mode
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        ...initialData,
      })
      
      if (initialData.coverImage) {
        setCoverImagePreview(initialData.coverImage)
      }
      
      // In edit mode, don't auto-update slug
      setAutoUpdateSlug(false)
    }
  }, [initialData, mode])
  
  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && autoUpdateSlug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title || '')
      }))
    }
  }, [formData.title, autoUpdateSlug])
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Handle tag input
  const handleTagAdd = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }
  
  const handleTagRemove = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }))
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, saveStatus: PostStatus = 'draft') => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content) {
        throw new Error('Por favor completa todos los campos requeridos: título, extracto y contenido.')
      }
      
      if (formData.type === 'video' && !formData.tiktokUrl) {
        throw new Error('Para publicaciones de tipo video, la URL de TikTok es requerida.')
      }
      
      // Set final status for saving
      const finalData = {
        ...formData,
        status: saveStatus
      }
      
      // Handle image upload if there's a new file
      if (coverImageFile) {
        const path = `blog-images/${Date.now()}_${coverImageFile.name}`
        const uploadResult = await uploadImage(coverImageFile, path)
        
        if (uploadResult.error) {
          throw new Error(`Error al subir la imagen: ${uploadResult.error}`)
        }
        
        if (uploadResult.url) {
          finalData.coverImage = uploadResult.url
        }
      }
      
      // Create or update post
      if (mode === 'create') {
        const result = await createPost(finalData as Omit<PostData, 'id' | 'createdAt' | 'updatedAt'>)
        
        if (!result.success) {
          throw new Error(result.error || 'Error al crear la publicación')
        }
        
        router.push('/blog-admin/posts')
      } else if (mode === 'edit' && initialData?.id) {
        const result = await updatePost(initialData.id, finalData)
        
        if (!result.success) {
          throw new Error(result.error || 'Error al actualizar la publicación')
        }
        
        router.push('/blog-admin/posts')
      }
    } catch (err: any) {
      console.error('Error saving post:', err)
      setError(err.message || 'Ocurrió un error al guardar la publicación')
    } finally {
      setLoading(false)
    }
  }
  
  // Preview functionality (for future enhancement)
  const handlePreview = () => {
    // For now, just show an alert
    alert('Funcionalidad de vista previa en desarrollo')
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start"
            >
              <FaExclamationCircle className="mr-3 mt-1 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
          
          <form onSubmit={(e) => handleSubmit(e, 'draft')}>
            {/* Post Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de publicación
              </label>
              <div className="flex space-x-4">
                <label className={`
                  flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
                  ${formData.type === 'article' 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-white border-neutral-200 text-neutral-700'}
                `}>
                  <input
                    type="radio"
                    name="type"
                    value="article"
                    checked={formData.type === 'article'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FaImage className="mr-2" />
                  <span>Artículo</span>
                </label>
                
                <label className={`
                  flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
                  ${formData.type === 'video' 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-white border-neutral-200 text-neutral-700'}
                `}>
                  <input
                    type="radio"
                    name="type"
                    value="video"
                    checked={formData.type === 'video'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FaVideo className="mr-2" />
                  <span>Video TikTok</span>
                </label>
              </div>
            </div>
            
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                Título *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Título de la publicación"
                required
              />
            </div>
            
            {/* Slug */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="slug" className="block text-sm font-medium text-neutral-700">
                  URL amigable *
                </label>
                <label className="flex items-center text-xs text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoUpdateSlug}
                    onChange={() => setAutoUpdateSlug(!autoUpdateSlug)}
                    className="mr-1"
                  />
                  Generar automáticamente
                </label>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg text-neutral-500">
                  /blog/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="url-amigable"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Este será el identificador único en la URL (solo letras, números y guiones)
              </p>
            </div>
            
            {/* Excerpt */}
            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700 mb-2">
                Extracto *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Breve descripción que aparecerá en listados"
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                Máximo 160 caracteres recomendado
              </p>
            </div>
            
            {/* Content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
                Contenido *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contenido principal de la publicación"
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                Puedes usar Markdown para dar formato al texto
              </p>
            </div>
            
            {/* Cover Image (for articles) */}
            {formData.type === 'article' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Imagen de portada
                </label>
                
                {coverImagePreview ? (
                  <div className="relative mb-4">
                    <img 
                      src={coverImagePreview} 
                      alt="Vista previa" 
                      className="w-full h-64 object-cover rounded-lg" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImagePreview('')
                        setCoverImageFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaImage className="text-4xl text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-600 mb-2">Haz clic para subir una imagen</p>
                    <p className="text-xs text-neutral-500">PNG, JPG o WEBP (max. 2MB)</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
            
            {/* TikTok URL (for videos) */}
            {formData.type === 'video' && (
              <div className="mb-6">
                <label htmlFor="tiktokUrl" className="block text-sm font-medium text-neutral-700 mb-2">
                  URL de TikTok *
                </label>
                <input
                  id="tiktokUrl"
                  name="tiktokUrl"
                  type="url"
                  value={formData.tiktokUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://www.tiktok.com/@usuario/video/123456789"
                  required={formData.type === 'video'}
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Pega la URL completa del video de TikTok que quieres integrar
                </p>
              </div>
            )}
            
            {/* Tags */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Etiquetas
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags?.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm"
                  >
                    <FaTag className="mr-1 text-xs" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-neutral-500 hover:text-red-500"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
                
                {formData.tags?.length === 0 && (
                  <span className="text-neutral-500 text-sm">
                    No hay etiquetas agregadas
                  </span>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleTagAdd()
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-neutral-200 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nueva etiqueta"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            
            {/* Options */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-neutral-800 mb-4">Opciones adicionales</h3>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">Destacar publicación</p>
                    <p className="text-xs text-neutral-500">Mostrar en secciones destacadas del blog</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="pinned"
                    checked={formData.pinned}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">Fijar publicación</p>
                    <p className="text-xs text-neutral-500">Mantener en la parte superior del blog</p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="flex items-center space-x-2"
                disabled={loading}
              >
                <FaEye />
                <span>Vista previa</span>
              </Button>
              
              <Button
                type="submit"
                variant="outline"
                className="flex items-center space-x-2"
                disabled={loading}
              >
                <FaSave />
                <span>Guardar borrador</span>
              </Button>
              
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, 'published')}
                className="flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Publicar</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}