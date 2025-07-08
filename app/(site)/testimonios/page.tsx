'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { FaQuoteLeft, FaFilter, FaStar, FaUserAlt, FaUsers, FaHeart } from 'react-icons/fa'

// Datos de ejemplo - en producción vendrían de Sanity
const testimonials = [
  {
    id: 1,
    content: "Ana me ayudó a encontrar mi voz interior. Su enfoque sistémico me permitió entender cómo mis relaciones familiares afectaban mi autoestima. Hoy me siento más segura y en paz conmigo misma.",
    author: {
      initials: "M.R.",
      age: 28,
      gender: "female"
    },
    serviceType: "individual",
    featured: true
  },
  {
    id: 2,
    content: "Llegamos a terapia en una crisis profunda. Ana nos enseñó nuevas formas de comunicarnos y a ver nuestros conflictos como oportunidades de crecimiento. Hoy nuestra relación es más sólida que nunca.",
    author: {
      initials: "C.G. & J.M.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple",
    featured: true
  },
  {
    id: 3,
    content: "Como familia estábamos desconectados. Ana nos ayudó a entender las dinámicas que nos alejaban y a construir nuevas formas de relacionarnos. Ahora disfrutamos más tiempo juntos.",
    author: {
      initials: "Familia L.",
      age: null,
      gender: "family"
    },
    serviceType: "family",
    featured: true
  },
  {
    id: 4,
    content: "Después de años sintiendo que algo no estaba bien, Ana me acompañó a descubrir patrones que venían de generaciones atrás. El proceso de sanación ha sido transformador.",
    author: {
      initials: "A.S.",
      age: 35,
      gender: "male"
    },
    serviceType: "individual",
    featured: false
  },
  {
    id: 5,
    content: "Su calidez y profesionalismo crearon un espacio seguro donde pudimos hablar de temas difíciles. Ana tiene una habilidad especial para hacer las preguntas correctas en el momento indicado.",
    author: {
      initials: "L.P. & D.R.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple",
    featured: false
  },
  {
    id: 6,
    content: "Mi adolescente no quería ir a terapia familiar, pero Ana logró crear una atmósfera donde todos nos sentimos escuchados. Ahora tenemos herramientas para comunicarnos mejor.",
    author: {
      initials: "Familia M.",
      age: null,
      gender: "family"
    },
    serviceType: "family",
    featured: false
  },
  {
    id: 7,
    content: "Estaba pasando por un duelo complicado y Ana me ayudó a procesar mi dolor sin presionarme. Su enfoque respetuoso y comprensivo fue exactamente lo que necesitaba.",
    author: {
      initials: "J.L.",
      age: 42,
      gender: "female"
    },
    serviceType: "individual",
    featured: false
  },
  {
    id: 8,
    content: "Como pareja intercultural, teníamos muchos malentendidos. Ana nos ayudó a ver cómo nuestros diferentes bagajes culturales influían en nuestras expectativas. Aprendimos a celebrar nuestras diferencias.",
    author: {
      initials: "S.K. & M.V.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple",
    featured: false
  },
  {
    id: 9,
    content: "La terapia con Ana ha sido un viaje de autodescubrimiento. Me ha dado herramientas para manejar mi ansiedad y establecer límites saludables en mis relaciones.",
    author: {
      initials: "D.T.",
      age: 31,
      gender: "male"
    },
    serviceType: "individual",
    featured: false
  },
  {
    id: 10,
    content: "Como padres de un adolescente, sentíamos que habíamos probado todo. Ana nos ayudó a entender las necesidades detrás de los comportamientos de nuestro hijo y a reconstruir nuestra conexión familiar.",
    author: {
      initials: "Familia P.",
      age: null,
      gender: "family"
    },
    serviceType: "family",
    featured: false
  },
  {
    id: 11,
    content: "Después de años de terapias diferentes, por fin encontré en Ana alguien que entendió la complejidad de mi situación. Su enfoque holístico hizo toda la diferencia.",
    author: {
      initials: "M.A.",
      age: 39,
      gender: "female"
    },
    serviceType: "individual",
    featured: false
  },
  {
    id: 12,
    content: "Mi esposo era escéptico sobre la terapia, pero después de la primera sesión con Ana, sintió que podía abrirse. Su acercamiento respetuoso y sin juicios creó un espacio seguro para ambos.",
    author: {
      initials: "R.S. & F.S.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple",
    featured: false
  }
]

export default function TestimoniosPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Estado para filtrado
  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'couple' | 'family'>('all')
  
  // Testimonios filtrados
  const filteredTestimonials = testimonials.filter(testimonial => 
    activeFilter === 'all' || testimonial.serviceType === activeFilter
  )
  
  // Testimonios destacados
  const featuredTestimonials = testimonials.filter(testimonial => testimonial.featured)
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-light/20 to-secondary-light/20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
              Testimonios
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Las experiencias compartidas por quienes han vivido un proceso de transformación
              son el mejor reflejo del impacto que la terapia puede tener en tu vida.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-8 space-x-3">
                <FaStar className="text-accent-gold text-xl" />
                <h2 className="text-2xl font-serif font-semibold text-neutral-800">
                  Testimonios destacados
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FeaturedTestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* All Testimonials */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-serif font-semibold text-neutral-800">
                Todos los testimonios
              </h2>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FaFilter size={14} />
                  <span>Todos</span>
                </button>
                
                <button
                  onClick={() => setActiveFilter('individual')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    activeFilter === 'individual'
                      ? 'bg-primary text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FaUserAlt size={14} />
                  <span>Individual</span>
                </button>
                
                <button
                  onClick={() => setActiveFilter('couple')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    activeFilter === 'couple'
                      ? 'bg-primary text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FaHeart size={14} />
                  <span>Pareja</span>
                </button>
                
                <button
                  onClick={() => setActiveFilter('family')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    activeFilter === 'family'
                      ? 'bg-primary text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FaUsers size={14} />
                  <span>Familiar</span>
                </button>
              </div>
            </div>
            
            {filteredTestimonials.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-neutral-600">No se encontraron testimonios con el filtro seleccionado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Listo para iniciar tu proceso?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Cada historia es única. Me encantaría acompañarte en el camino hacia tu bienestar emocional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, me interesa agendar una primera sesión de terapia.')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-neutral-100 transition-colors"
              >
                <span>Agenda tu primera sesión</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/contacto'}
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                <span>Contactar</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Componente para testimonios destacados
function FeaturedTestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full border-2 border-accent-gold/20 hover:border-accent-gold/50 transition-colors">
      <CardContent className="p-8 flex flex-col h-full relative">
        {/* Estrella destacada */}
        <div className="absolute top-4 right-4">
          <FaStar className="text-accent-gold" />
        </div>
        
        <FaQuoteLeft className="text-primary text-3xl mb-6" />
        
        <blockquote className="text-neutral-700 leading-relaxed mb-6 flex-grow text-lg">
          "{testimonial.content}"
        </blockquote>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            <p className="font-semibold text-neutral-800">
              {testimonial.author.initials}
            </p>
            {testimonial.author.age && (
              <p className="text-sm text-neutral-500">
                {testimonial.author.age} años
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-primary font-medium">
              {testimonial.serviceType === 'individual' && 'Terapia Individual'}
              {testimonial.serviceType === 'couple' && 'Terapia de Pareja'}
              {testimonial.serviceType === 'family' && 'Terapia Familiar'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para testimonios normales
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        <FaQuoteLeft className="text-primary text-xl mb-4" />
        
        <blockquote className="text-neutral-700 leading-relaxed mb-4 flex-grow">
          "{testimonial.content}"
        </blockquote>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <div>
            <p className="font-medium text-neutral-800">
              {testimonial.author.initials}
            </p>
            {testimonial.author.age && (
              <p className="text-xs text-neutral-500">
                {testimonial.author.age} años
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-xs text-primary">
              {testimonial.serviceType === 'individual' && 'Terapia Individual'}
              {testimonial.serviceType === 'couple' && 'Terapia de Pareja'}
              {testimonial.serviceType === 'family' && 'Terapia Familiar'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}