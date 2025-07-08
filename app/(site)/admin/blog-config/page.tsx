'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaEye, FaTimes, FaChevronDown } from 'react-icons/fa'

export default function BlogConfigPage() {
  // Estados para preferencias
  const [viewPreference, setViewPreference] = useState('feed')
  const [sortPreference, setSortPreference] = useState('recent')
  const [postsPerPage, setPostsPerPage] = useState(9)
  const [showHighlights, setShowHighlights] = useState(true)
  const [enableComments, setEnableComments] = useState(true)
  const [moderateComments, setModerateComments] = useState(true)
  const [bioText, setBioText] = useState('Psicóloga sistémica. Especialista en terapia individual, de pareja y familiar. Acompañándote en tu proceso de crecimiento y bienestar emocional.')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Simulación de guardado
  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos en Sanity
    console.log({
      viewPreference,
      sortPreference,
      postsPerPage,
      showHighlights,
      enableComments,
      moderateComments,
      bioText
    })
    
    // Mostrar mensaje de éxito
    setSuccessMessage('Configuración guardada correctamente')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  // Simulación de vista previa
  const handlePreview = () => {
    window.open('/blog-social', '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-serif font-bold text-neutral-800">Configuración del Blog Social</h1>
          <p className="text-neutral-600 mt-1">
            Personaliza la apariencia y comportamiento de tu espacio de expresión
          </p>
        </div>

        <div className="p-6">
          {/* Mensaje de éxito */}
          {successMessage && (
            <motion.div 
              className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMessage}
            </motion.div>
          )}

          {/* Opciones básicas */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Presentación</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-700 mb-2">
                    Vista predeterminada
                  </label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      className={`flex-1 py-2 px-4 ${viewPreference === 'feed' ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
                      onClick={() => setViewPreference('feed')}
                    >
                      Formato Feed
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 ${viewPreference === 'grid' ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
                      onClick={() => setViewPreference('grid')}
                    >
                      Grid (Instagram)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 mb-2">
                    Ordenamiento predeterminado
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={sortPreference}
                    onChange={(e) => setSortPreference(e.target.value)}
                  >
                    <option value="recent">Más recientes primero</option>
                    <option value="popular">Más populares primero</option>
                    <option value="featured">Destacados primero</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold mb-4">Funcionalidades</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-700">
                    Mostrar colecciones destacadas
                  </label>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="showHighlights" 
                      checked={showHighlights}
                      onChange={() => setShowHighlights(!showHighlights)}
                      className="sr-only"
                    />
                    <div className={`block w-12 h-6 rounded-full ${showHighlights ? 'bg-primary' : 'bg-neutral-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${showHighlights ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-neutral-700">
                    Habilitar comentarios
                  </label>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="enableComments" 
                      checked={enableComments}
                      onChange={() => setEnableComments(!enableComments)}
                      className="sr-only"
                    />
                    <div className={`block w-12 h-6 rounded-full ${enableComments ? 'bg-primary' : 'bg-neutral-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${enableComments ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>

                {enableComments && (
                  <div className="flex items-center justify-between pl-6">
                    <label className="text-neutral-700">
                      Moderar comentarios antes de publicar
                    </label>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="moderateComments" 
                        checked={moderateComments}
                        onChange={() => setModerateComments(!moderateComments)}
                        className="sr-only"
                      />
                      <div className={`block w-12 h-6 rounded-full ${moderateComments ? 'bg-primary' : 'bg-neutral-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${moderateComments ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold mb-4">Contenido</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-700 mb-2">
                    Publicaciones por página
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={postsPerPage}
                    onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
                  >
                    <option value="6">6 publicaciones</option>
                    <option value="9">9 publicaciones</option>
                    <option value="12">12 publicaciones</option>
                    <option value="15">15 publicaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 mb-2">
                    Texto de biografía
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    maxLength={250}
                  />
                  <div className="text-xs text-neutral-500 text-right mt-1">
                    {bioText.length}/250 caracteres
                  </div>
                </div>
              </div>
            </div>

            {/* Opciones avanzadas (colapsables) */}
            <div className="pt-4 border-t">
              <button
                className="flex items-center justify-between w-full text-left text-lg font-semibold mb-4 focus:outline-none"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span>Opciones avanzadas</span>
                <FaChevronDown className={`transition-transform transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>
              
              {showAdvanced && (
                <div className="space-y-4 mt-4 pt-4 border-t border-neutral-100">
                  <p className="text-neutral-500 text-sm">
                    Las opciones avanzadas como la configuración de imágenes de perfil, publicaciones fijadas y 
                    preferencias de análisis están disponibles directamente en el panel de Sanity Studio.
                  </p>
                  
                  <div className="flex justify-center">
                    <button
                      className="px-4 py-2 bg-neutral-800 text-white rounded-lg"
                      onClick={() => window.open('/admin', '_blank')}
                    >
                      Ir a Sanity Studio
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-8 pt-6 border-t flex flex-wrap gap-4 justify-end">
            <button
              className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg flex items-center space-x-2 hover:bg-neutral-50"
              onClick={handlePreview}
            >
              <FaEye />
              <span>Vista previa</span>
            </button>
            
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg flex items-center space-x-2 hover:bg-primary-dark"
              onClick={handleSave}
            >
              <FaSave />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}