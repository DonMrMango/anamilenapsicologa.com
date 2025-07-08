'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Profile from '@/components/ui/Profile'
import HighlightStories from '@/components/ui/HighlightStories'
import SocialFeed from '@/components/ui/SocialFeed'
import TiktokEmbed from '@/components/ui/TiktokEmbed'

// Datos mock para desarrollo
const mockProfile = {
  name: "Ana Milena Mejía Ochoa",
  bio: "Psicóloga sistémica. Especialista en terapia individual, de pareja y familiar. Acompañándote en tu proceso de crecimiento y bienestar emocional.",
  profileImage: "/images/ana-avatar.jpg",
  coverImage: "/blog/cover-image.jpg",
  postCount: 12,
  videoCount: 8,
  social: {
    instagram: "https://instagram.com/anamilenapsicologa",
    facebook: "https://facebook.com/anamilenapsicologa",
    tiktok: "https://tiktok.com/@anamilenapsicologa",
    whatsapp: "573216404797"
  }
}

const mockHighlights = [
  {
    id: "1",
    title: "Terapia de Pareja",
    icon: "couple",
    coverImage: "/blog/terapia-pareja.jpg",
    itemCount: 5
  },
  {
    id: "2",
    title: "Bienestar Emocional",
    icon: "wellness",
    coverImage: "/blog/bienestar-emocional.jpg",
    itemCount: 7
  },
  {
    id: "3",
    title: "Terapia Familiar",
    icon: "family",
    coverImage: "/blog/terapia-familiar.jpg",
    itemCount: 3
  },
  {
    id: "4",
    title: "Crecimiento Personal",
    icon: "growth",
    coverImage: "/blog/crecimiento-personal.jpg",
    itemCount: 4
  },
  {
    id: "5",
    title: "Consejos TikTok",
    icon: "inspiration",
    coverImage: "/blog/consejos-tiktok.jpg",
    itemCount: 6
  }
]

const mockPosts = [
  {
    id: "1",
    type: "post",
    title: "Cómo saber cuándo es hora de ir a terapia de pareja",
    excerpt: "Muchas parejas se preguntan cuál es el momento adecuado para buscar ayuda profesional. En este artículo exploramos las señales que indican que es momento de tomar esa decisión.",
    mainImage: "/blog/terapia-pareja.jpg",
    publishedAt: "2024-01-15",
    slug: "cuando-ir-terapia-pareja",
    viewCount: 345,
    likeCount: 78,
    commentCount: 12,
    tags: ["terapia de pareja", "relaciones", "comunicación"],
    readTime: "8 min",
    isPinned: true,
    isFeatured: true
  },
  {
    id: "2",
    type: "video",
    title: "3 ejercicios para mejorar la comunicación con tu pareja",
    tiktokUrl: "https://www.tiktok.com/@drjuliesmith/video/7263500948482206978",
    publishedAt: "2024-01-10",
    slug: "ejercicios-comunicacion-pareja",
    viewCount: 1245,
    likeCount: 324,
    commentCount: 42,
    tags: ["comunicación", "ejercicios", "parejas"],
    isFeatured: true
  },
  {
    id: "3",
    type: "post",
    title: "El poder transformador de las preguntas en terapia sistémica",
    excerpt: "Las preguntas circulares y reflexivas son herramientas fundamentales en la terapia sistémica. Descubre cómo una pregunta bien formulada puede abrir nuevas perspectivas.",
    mainImage: "/blog/preguntas-sistemicas.jpg",
    publishedAt: "2024-01-08",
    slug: "preguntas-terapia-sistemica",
    viewCount: 189,
    likeCount: 45,
    commentCount: 5,
    tags: ["terapia sistémica", "técnicas", "preguntas"],
    readTime: "12 min"
  },
  {
    id: "4",
    type: "video",
    title: "Técnicas de respiración para la ansiedad | Tutorial rápido",
    tiktokUrl: "https://www.tiktok.com/@drjuliesmith/video/7234663175433754922",
    publishedAt: "2024-01-05",
    slug: "tecnicas-respiracion-ansiedad",
    viewCount: 2850,
    likeCount: 712,
    commentCount: 87,
    tags: ["ansiedad", "respiración", "técnicas"]
  },
  {
    id: "5",
    type: "post",
    title: "Construyendo límites saludables en la familia",
    excerpt: "Los límites no son muros, son puentes que nos permiten relacionarnos de manera más sana. Aprende cómo establecer límites claros y amorosos.",
    mainImage: "/blog/limites-familia.jpg",
    publishedAt: "2024-01-03",
    slug: "limites-saludables-familia",
    viewCount: 275,
    likeCount: 63,
    commentCount: 9,
    tags: ["familia", "límites", "crianza"],
    readTime: "10 min"
  },
  {
    id: "6",
    type: "video",
    title: "¿Cómo lidiar con personas difíciles? 5 estrategias efectivas",
    tiktokUrl: "https://www.tiktok.com/@drjuliesmith/video/7183303552947512582",
    publishedAt: "2024-01-01",
    slug: "lidiar-personas-dificiles",
    viewCount: 1875,
    likeCount: 495,
    commentCount: 61,
    tags: ["relaciones", "comunicación", "estrategias"]
  }
]

export default function BlogSocialPage() {
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null)
  const [showHighlightModal, setShowHighlightModal] = useState(false)
  
  // Handle highlight story selection
  const handleSelectHighlight = (storyId: string) => {
    setSelectedHighlightId(storyId)
    setShowHighlightModal(true)
    // Aquí se cargarían los elementos de la colección seleccionada
  }

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light/20 to-secondary-light/20 py-8">
        <div className="container mx-auto px-4">
          <Profile
            name={mockProfile.name}
            bio={mockProfile.bio}
            profileImage={mockProfile.profileImage}
            coverImage={mockProfile.coverImage}
            postCount={mockProfile.postCount}
            videoCount={mockProfile.videoCount}
            social={mockProfile.social}
          />
        </div>
      </section>

      {/* Highlights Stories Section */}
      <section className="bg-white py-4 shadow-sm mb-6">
        <div className="container mx-auto">
          <HighlightStories
            stories={mockHighlights}
            onSelectStory={handleSelectHighlight}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SocialFeed
            posts={mockPosts}
            initialView="feed"
            initialSort="featured"
          />
        </div>
      </section>

      {/* Highlight Modal */}
      {showHighlightModal && selectedHighlightId && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowHighlightModal(false)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {mockHighlights.find(h => h.id === selectedHighlightId)?.title}
              </h3>
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100"
                onClick={() => setShowHighlightModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <p className="text-center text-neutral-500 py-8">
                Aquí se mostrarían los elementos de la colección seleccionada.
                En la implementación real, estos datos vendrían de Sanity.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}