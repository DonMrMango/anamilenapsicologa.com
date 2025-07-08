'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs, orderBy, where, DocumentData, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { CommentData, updateCommentStatus, deleteComment } from '@/lib/firebase/blog'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  FaCheck, 
  FaTrash, 
  FaTimes, 
  FaSpinner,
  FaFilter,
  FaSearch,
  FaExclamationCircle,
  FaCalendarAlt,
  FaComment,
  FaEnvelope,
  FaUser
} from 'react-icons/fa'

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all')
  
  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const commentsQuery = query(
          collection(db, 'comments'),
          orderBy('createdAt', 'desc')
        )
        
        const snapshot = await getDocs(commentsQuery)
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CommentData))
        
        setComments(commentsData)
      } catch (err) {
        console.error('Error fetching comments:', err)
        setError('Error al cargar los comentarios')
      } finally {
        setLoading(false)
      }
    }
    
    fetchComments()
  }, [])
  
  // Handle comment approval
  const handleApproveComment = async (id: string) => {
    try {
      setLoading(true)
      const result = await updateCommentStatus(id, true)
      
      if (result.success) {
        // Update local state
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, approved: true } : comment
        ))
      } else {
        setError(result.error || 'Error al aprobar el comentario')
      }
    } catch (err) {
      console.error('Error approving comment:', err)
      setError('Error al aprobar el comentario')
    } finally {
      setLoading(false)
    }
  }
  
  // Handle comment rejection
  const handleRejectComment = async (id: string) => {
    try {
      setLoading(true)
      const result = await updateCommentStatus(id, false)
      
      if (result.success) {
        // Update local state
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, approved: false } : comment
        ))
      } else {
        setError(result.error || 'Error al rechazar el comentario')
      }
    } catch (err) {
      console.error('Error rejecting comment:', err)
      setError('Error al rechazar el comentario')
    } finally {
      setLoading(false)
    }
  }
  
  // Handle comment deletion
  const handleDeleteComment = async (id: string, postId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.')) {
      try {
        setLoading(true)
        const result = await deleteComment(id, postId)
        
        if (result.success) {
          // Update local state
          setComments(comments.filter(comment => comment.id !== id))
        } else {
          setError(result.error || 'Error al eliminar el comentario')
        }
      } catch (err) {
        console.error('Error deleting comment:', err)
        setError('Error al eliminar el comentario')
      } finally {
        setLoading(false)
      }
    }
  }
  
  // Filter comments
  const filteredComments = comments.filter(comment => {
    // Status filter
    if (statusFilter === 'approved' && !comment.approved) {
      return false
    }
    if (statusFilter === 'pending' && comment.approved) {
      return false
    }
    
    // Search term - check in content and name
    if (searchTerm && 
        !comment.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !comment.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
            Comentarios
          </h1>
          <p className="text-neutral-600">
            Gestiona los comentarios de tu blog
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  placeholder="Buscar por nombre o contenido..."
                />
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
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'approved' | 'pending')}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todos los comentarios</option>
                  <option value="approved">Aprobados</option>
                  <option value="pending">Pendientes</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start">
          <FaExclamationCircle className="mr-3 mt-1 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-3xl text-primary" />
        </div>
      )}
      
      {/* Comments list */}
      {!loading && (
        <>
          {filteredComments.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-neutral-600 mb-4">No hay comentarios que coincidan con los filtros seleccionados</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                {filteredComments.map((comment) => (
                  <Card key={comment.id} className={`
                    border-l-4 
                    ${comment.approved ? 'border-l-green-500' : 'border-l-amber-500'}
                  `}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center mb-2">
                            <FaUser className="text-neutral-400 mr-2" />
                            <h3 className="font-medium text-neutral-800">{comment.name}</h3>
                          </div>
                          
                          <div className="flex items-center text-sm text-neutral-500 mb-3">
                            <div className="flex items-center mr-4">
                              <FaEnvelope className="mr-1" />
                              <span>{comment.email}</span>
                            </div>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              <span>
                                {comment.createdAt instanceof Timestamp
                                  ? new Date(comment.createdAt.toMillis()).toLocaleDateString('es-ES', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })
                                  : 'Fecha desconocida'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-4 rounded-lg mb-3">
                            <p className="whitespace-pre-line">{comment.content}</p>
                          </div>
                          
                          <div className="text-sm text-neutral-500">
                            <span className="flex items-center">
                              <FaComment className="mr-1" />
                              En publicación: {comment.postId}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:ml-4">
                          {!comment.approved && (
                            <Button
                              onClick={() => handleApproveComment(comment.id as string)}
                              className="w-full flex items-center justify-center text-green-700 bg-green-100 hover:bg-green-200"
                              disabled={loading}
                            >
                              <FaCheck className="mr-2" />
                              <span>Aprobar</span>
                            </Button>
                          )}
                          
                          {comment.approved && (
                            <Button
                              onClick={() => handleRejectComment(comment.id as string)}
                              className="w-full flex items-center justify-center text-amber-700 bg-amber-100 hover:bg-amber-200"
                              disabled={loading}
                            >
                              <FaTimes className="mr-2" />
                              <span>Rechazar</span>
                            </Button>
                          )}
                          
                          <Button
                            onClick={() => handleDeleteComment(comment.id as string, comment.postId)}
                            className="w-full flex items-center justify-center text-red-700 bg-red-100 hover:bg-red-200"
                            disabled={loading}
                          >
                            <FaTrash className="mr-2" />
                            <span>Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}