'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FaUser, FaHeart, FaUsers, FaWhatsapp, FaTimes } from 'react-icons/fa'

const services = [
  {
    id: 'individual',
    title: 'Terapia Individual',
    icon: FaUser,
    shortDescription: 'Espacio personal para tu crecimiento y bienestar emocional.',
    description: 'Un espacio seguro y confidencial donde puedes explorar tus emociones, pensamientos y comportamientos. Te acompaño en el proceso de autoconocimiento y desarrollo de herramientas para enfrentar los desafíos de la vida.',
    benefits: [
      'Autoconocimiento profundo',
      'Manejo de ansiedad y estrés',
      'Desarrollo de autoestima',
      'Procesamiento de duelos y pérdidas',
      'Toma de decisiones importantes'
    ],
    duration: '50 minutos',
    modality: ['Presencial', 'Virtual']
  },
  {
    id: 'couple',
    title: 'Terapia de Pareja',
    icon: FaHeart,
    shortDescription: 'Fortalecimiento de vínculos y comunicación en la pareja.',
    description: 'Trabajamos juntos para mejorar la comunicación, resolver conflictos y fortalecer la conexión emocional. Un espacio donde ambos pueden expresarse y construir una relación más sólida y satisfactoria.',
    benefits: [
      'Mejora en la comunicación',
      'Resolución de conflictos',
      'Fortalecimiento de la intimidad',
      'Reconstrucción de la confianza',
      'Planificación de metas comunes'
    ],
    duration: '60 minutos',
    modality: ['Presencial', 'Virtual']
  },
  {
    id: 'family',
    title: 'Terapia Familiar',
    icon: FaUsers,
    shortDescription: 'Armonía y comprensión en el sistema familiar.',
    description: 'Abordamos las dinámicas familiares desde una perspectiva sistémica, promoviendo la comprensión mutua y el desarrollo de patrones de interacción más saludables para todos los miembros de la familia.',
    benefits: [
      'Mejora de dinámicas familiares',
      'Resolución de conflictos generacionales',
      'Fortalecimiento de vínculos',
      'Desarrollo de límites saludables',
      'Comunicación efectiva entre miembros'
    ],
    duration: '75 minutos',
    modality: ['Presencial', 'Virtual']
  }
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const whatsappNumber = '573216404797'
  
  const getWhatsappMessage = (serviceType: string) => {
    const messages = {
      individual: 'Hola Ana, me interesa agendar una sesión de terapia individual.',
      couple: 'Hola Ana, queremos agendar una sesión de terapia de pareja.',
      family: 'Hola Ana, nos gustaría agendar una sesión de terapia familiar.'
    }
    return messages[serviceType as keyof typeof messages] || messages.individual
  }

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
            Servicios
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Cada persona y cada familia es única. Por eso ofrezco diferentes modalidades 
            de terapia adaptadas a tus necesidades específicas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedService === service.id
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="text-primary text-2xl" />
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setExpandedService(service.id)}
                      className="w-full mb-4"
                    >
                      Conocer más
                    </Button>

                    <Button
                      onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsappMessage(service.id))}`)}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <FaWhatsapp />
                      <span>Agendar sesión</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Expanded service modal */}
        {expandedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const service = services.find(s => s.id === expandedService)
                if (!service) return null
                const Icon = service.icon

                return (
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="text-primary text-xl" />
                        </div>
                        <h3 className="text-3xl font-serif font-semibold text-neutral-800">
                          {service.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setExpandedService(null)}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        <FaTimes size={24} />
                      </button>
                    </div>

                    <p className="text-neutral-700 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-semibold text-neutral-800 mb-4">
                          Beneficios
                        </h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-neutral-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-neutral-800 mb-4">
                          Detalles
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-neutral-700">Duración: </span>
                            <span className="text-neutral-600">{service.duration}</span>
                          </div>
                          <div>
                            <span className="font-medium text-neutral-700">Modalidad: </span>
                            <span className="text-neutral-600">{service.modality.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsappMessage(service.id))}`)
                        setExpandedService(null)
                      }}
                      className="w-full flex items-center justify-center space-x-2"
                      size="lg"
                    >
                      <FaWhatsapp />
                      <span>Agendar {service.title}</span>
                    </Button>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}