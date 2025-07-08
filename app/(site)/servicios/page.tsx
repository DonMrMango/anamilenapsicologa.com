'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaUser, 
  FaHeart, 
  FaUsers,
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
  FaUserMd,
  FaLightbulb,
  FaHandsHelping
} from 'react-icons/fa'

const services = [
  {
    id: 'individual',
    title: 'Terapia Individual',
    icon: FaUser,
    price: 'Consultar',
    duration: '50 minutos',
    description: 'Un espacio personal y confidencial donde puedes explorar tus emociones, pensamientos y comportamientos. Te acompaño en el proceso de autoconocimiento y desarrollo de herramientas para enfrentar los desafíos de la vida.',
    benefits: [
      'Autoconocimiento profundo',
      'Manejo de ansiedad y estrés',
      'Desarrollo de autoestima',
      'Procesamiento de duelos y pérdidas',
      'Toma de decisiones importantes',
      'Técnicas de regulación emocional'
    ],
    process: 'Comenzamos con una evaluación inicial donde exploramos tu historia personal, tus objetivos y expectativas. Luego desarrollamos un plan terapéutico personalizado utilizando técnicas sistémicas y narrativas.',
    idealFor: [
      'Personas que buscan crecimiento personal',
      'Quienes atraviesan momentos de transición',
      'Personas con ansiedad o depresión',
      'Quienes quieren mejorar su autoestima',
      'Personas en proceso de duelo'
    ]
  },
  {
    id: 'pareja',
    title: 'Terapia de Pareja',
    icon: FaHeart,
    price: 'Consultar',
    duration: '60 minutos',
    description: 'Trabajamos juntos para mejorar la comunicación, resolver conflictos y fortalecer la conexión emocional. Un espacio donde ambos pueden expresarse y construir una relación más sólida y satisfactoria.',
    benefits: [
      'Mejora en la comunicación',
      'Resolución de conflictos',
      'Fortalecimiento de la intimidad',
      'Reconstrucción de la confianza',
      'Planificación de metas comunes',
      'Redefinición de roles y expectativas'
    ],
    process: 'Iniciamos conociendo la historia de la relación y los patrones de interacción. Identificamos fortalezas y áreas de mejora, desarrollando nuevas formas de comunicarse y relacionarse.',
    idealFor: [
      'Parejas con problemas de comunicación',
      'Relaciones en crisis',
      'Parejas que quieren fortalecer su vínculo',
      'Relaciones con conflictos recurrentes',
      'Parejas en transiciones importantes'
    ]
  },
  {
    id: 'familiar',
    title: 'Terapia Familiar',
    icon: FaUsers,
    price: 'Consultar',
    duration: '75 minutos',
    description: 'Abordamos las dinámicas familiares desde una perspectiva sistémica, promoviendo la comprensión mutua y el desarrollo de patrones de interacción más saludables para todos los miembros de la familia.',
    benefits: [
      'Mejora de dinámicas familiares',
      'Resolución de conflictos generacionales',
      'Fortalecimiento de vínculos',
      'Desarrollo de límites saludables',
      'Comunicación efectiva entre miembros',
      'Adaptación a cambios familiares'
    ],
    process: 'Exploramos la estructura familiar, los roles de cada miembro y los patrones de comunicación. Trabajamos en crear nuevas narrativas familiares más funcionales y saludables.',
    idealFor: [
      'Familias con adolescentes',
      'Conflictos entre generaciones',
      'Familias en transición (divorcios, nuevas uniones)',
      'Problemas de comportamiento en niños',
      'Familias que quieren mejorar su comunicación'
    ]
  }
]

const methodology = [
  {
    icon: FaLightbulb,
    title: 'Enfoque Sistémico',
    description: 'Vemos los problemas dentro del contexto de las relaciones y sistemas familiares.'
  },
  {
    icon: FaHandsHelping,
    title: 'Terapia Narrativa',
    description: 'Ayudamos a re-escribir las historias de vida de manera más empoderada.'
  },
  {
    icon: FaUserMd,
    title: 'Centrada en Soluciones',
    description: 'Nos enfocamos en los recursos y fortalezas que ya tienes.'
  }
]

export default function ServicesPage() {
  const ref = useRef(null)
  const servicesRef = useRef(null)
  const methodologyRef = useRef(null)
  
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' })
  const methodologyInView = useInView(methodologyRef, { once: true, margin: '-100px' })

  const whatsappNumber = '573216404797'
  
  const getWhatsappMessage = (serviceType: string) => {
    const messages = {
      individual: 'Hola Ana, me interesa agendar una sesión de terapia individual.',
      pareja: 'Hola Ana, queremos agendar una sesión de terapia de pareja.',
      familiar: 'Hola Ana, nos gustaría agendar una sesión de terapia familiar.'
    }
    return messages[serviceType as keyof typeof messages] || messages.individual
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Servicios de Terapia Psicológica
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ofrezco diferentes modalidades de terapia adaptadas a tus necesidades específicas. 
              Cada proceso es único y se diseña cuidadosamente para acompañarte en tu crecimiento personal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FaMapMarkerAlt className="text-primary text-2xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Modalidad</h3>
                <p className="text-gray-600">Presencial y Virtual</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FaClock className="text-primary text-2xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Horarios</h3>
                <p className="text-gray-600">Lun - Vie: 8:00 AM - 6:00 PM</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FaVideo className="text-primary text-2xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Primera consulta</h3>
                <p className="text-gray-600">Evaluación y plan personalizado</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="text-primary text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-gray-800">
                          {service.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>⏱️ {service.duration}</span>
                          <span>💰 {service.price}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-6">
                      {/* Benefits */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          ✨ Beneficios principales
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.benefits.map((benefit, bIndex) => (
                            <div key={bIndex} className="flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-gray-600 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          🔄 ¿Cómo trabajamos?
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {service.process}
                        </p>
                      </div>

                      {/* Ideal for */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          🎯 Ideal para
                        </h3>
                        <div className="space-y-1">
                          {service.idealFor.map((item, iIndex) => (
                            <div key={iIndex} className="flex items-start space-x-2">
                              <span className="text-secondary mt-1">→</span>
                              <span className="text-gray-600 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsappMessage(service.id))}`)}
                      className="mt-8 inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <FaWhatsapp />
                      <span>Agendar {service.title}</span>
                    </button>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <Card className="overflow-hidden">
                      <div className="h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Icon className="text-primary text-6xl mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600">
                            Espacio seguro para tu crecimiento
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={methodologyRef}
            initial={{ opacity: 0, y: 50 }}
            animate={methodologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Mi metodología de trabajo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combino diferentes enfoques terapéuticos para crear un tratamiento 
              personalizado que se adapte a tus necesidades específicas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={methodologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="text-primary text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {method.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
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
              ¿Listo para comenzar tu proceso de crecimiento?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              El primer paso es el más importante. Contacta conmigo para agendar tu primera sesión 
              y comenzar este hermoso camino hacia tu bienestar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Hola Ana, me gustaría agendar una primera sesión de terapia.`)}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <FaWhatsapp />
                <span>Agendar primera sesión</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/contacto'}
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                <span>Más información</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}