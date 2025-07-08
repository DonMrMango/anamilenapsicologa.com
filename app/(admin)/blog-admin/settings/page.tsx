'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  FaSave, 
  FaSpinner, 
  FaExclamationCircle,
  FaCheckCircle,
  FaCog,
  FaImage,
  FaLink,
  FaEye,
  FaLock
} from 'react-icons/fa'

interface BlogSettings {
  title: string
  description: string
  postsPerPage: number
  allowComments: boolean
  requireApproval: boolean
  socialLinks: {
    tiktok: string
    instagram: string
    facebook: string
    twitter: string
  }
  featuredCategories: string[]
  currentCategory: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<BlogSettings>({
    title: 'Blog de Ana Milena',
    description: 'Reflexiones sobre psicología, bienestar y crecimiento personal',
    postsPerPage: 6,
    allowComments: true,
    requireApproval: true,
    socialLinks: {
      tiktok: '',
      instagram: '',
      facebook: '',
      twitter: ''
    },
    featuredCategories: [],
    currentCategory: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, 'settings', 'blog')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setSettings(docSnap.data() as BlogSettings)
        }
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError('Error al cargar la configuración')
      } finally {
        setLoading(false)
      }
    }
    
    fetchSettings()
  }, [])
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setSettings(prev => ({ ...prev, [name]: checked }))
    } else if (name.includes('.')) {
      // Handle nested properties (e.g. socialLinks.tiktok)
      const [parent, child] = name.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BlogSettings],
          [child]: value
        }
      }))
    } else {
      // Handle regular properties
      setSettings(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear any previous success message
    setSuccessMessage(null)
  }
  
  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numberValue = parseInt(value, 10)
    
    if (!isNaN(numberValue)) {
      setSettings(prev => ({ ...prev, [name]: numberValue }))
    }
    
    // Clear any previous success message
    setSuccessMessage(null)
  }
  
  // Handle featured category changes
  const handleAddCategory = () => {
    if (settings.currentCategory.trim() && !settings.featuredCategories.includes(settings.currentCategory.trim())) {
      setSettings(prev => ({
        ...prev,
        featuredCategories: [...prev.featuredCategories, prev.currentCategory.trim()],
        currentCategory: ''
      }))
    }
  }
  
  const handleRemoveCategory = (category: string) => {
    setSettings(prev => ({
      ...prev,
      featuredCategories: prev.featuredCategories.filter(c => c !== category)
    }))
  }
  
  // Save settings
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setSaving(true)
    
    try {
      const docRef = doc(db, 'settings', 'blog')
      await setDoc(docRef, settings)
      setSuccessMessage('Configuración guardada correctamente')
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-primary" />
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
            Configuración
          </h1>
          <p className="text-neutral-600">
            Personaliza la configuración de tu blog
          </p>
        </div>
      </div>
      
      {/* Error message */}
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
      
      {/* Success message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-start"
        >
          <FaCheckCircle className="mr-3 mt-1 flex-shrink-0" />
          <p>{successMessage}</p>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaCog className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-800">General</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Título del blog
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={settings.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={settings.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="postsPerPage" className="block text-sm font-medium text-neutral-700 mb-1">
                  Publicaciones por página
                </label>
                <input
                  id="postsPerPage"
                  name="postsPerPage"
                  type="number"
                  min="1"
                  max="24"
                  value={settings.postsPerPage}
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Comment Settings */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaEye className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-800">Comentarios</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="allowComments"
                  checked={settings.allowComments}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                />
                <div>
                  <p className="font-medium text-neutral-800">Permitir comentarios</p>
                  <p className="text-xs text-neutral-500">Habilitar comentarios en las publicaciones del blog</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="requireApproval"
                  checked={settings.requireApproval}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                />
                <div>
                  <p className="font-medium text-neutral-800">Requiere aprobación</p>
                  <p className="text-xs text-neutral-500">Los comentarios deben ser aprobados antes de ser publicados</p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        {/* Social Links */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaLink className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-800">Redes sociales</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="socialLinks.tiktok" className="block text-sm font-medium text-neutral-700 mb-1">
                  TikTok
                </label>
                <input
                  id="socialLinks.tiktok"
                  name="socialLinks.tiktok"
                  type="url"
                  value={settings.socialLinks.tiktok}
                  onChange={handleChange}
                  placeholder="https://www.tiktok.com/@usuario"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.instagram" className="block text-sm font-medium text-neutral-700 mb-1">
                  Instagram
                </label>
                <input
                  id="socialLinks.instagram"
                  name="socialLinks.instagram"
                  type="url"
                  value={settings.socialLinks.instagram}
                  onChange={handleChange}
                  placeholder="https://www.instagram.com/usuario"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.facebook" className="block text-sm font-medium text-neutral-700 mb-1">
                  Facebook
                </label>
                <input
                  id="socialLinks.facebook"
                  name="socialLinks.facebook"
                  type="url"
                  value={settings.socialLinks.facebook}
                  onChange={handleChange}
                  placeholder="https://www.facebook.com/usuario"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.twitter" className="block text-sm font-medium text-neutral-700 mb-1">
                  Twitter
                </label>
                <input
                  id="socialLinks.twitter"
                  name="socialLinks.twitter"
                  type="url"
                  value={settings.socialLinks.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/usuario"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Featured Categories */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaImage className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-800">Categorías destacadas</h2>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-neutral-600 mb-2">
                Estas categorías aparecerán en la página principal del blog como secciones destacadas
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {settings.featuredCategories.map(category => (
                  <div 
                    key={category}
                    className="inline-flex items-center bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-2 text-neutral-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                
                {settings.featuredCategories.length === 0 && (
                  <span className="text-neutral-500 text-sm">
                    No hay categorías destacadas
                  </span>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  name="currentCategory"
                  value={settings.currentCategory}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-neutral-200 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nueva categoría"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddCategory()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                >
                  Añadir
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="flex items-center space-x-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Guardar configuración</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}