'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const whatsappNumber = '573216404797'
  const whatsappMessage = 'Hola Ana, encontré tu sitio web y me gustaría agendar una primera sesión de terapia. Mi nombre es:'

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+57 321 640 4797',
      action: () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`),
      color: 'text-green-600'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'contacto@anamilenapsicologa.com',
      action: () => window.open('mailto:contacto@anamilenapsicologa.com'),
      color: 'text-primary'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Medellín, Antioquia',
      action: null,
      color: 'text-secondary'
    },
    {
      icon: FaClock,
      title: 'Horarios',
      content: 'Lun - Vie: 8:00 AM - 6:00 PM',
      action: null,
      color: 'text-accent-gold'
    }
  ]

  const features = [
    {
      icon: FaCalendarAlt,
      title: 'Agenda flexible',
      description: 'Horarios que se adaptan a tu rutina'
    },
    {
      icon: FaShieldAlt,
      title: 'Confidencialidad',
      description: 'Tu privacidad es nuestra prioridad'
    },
    {
      icon: FaWhatsapp,
      title: 'Respuesta rápida',
      description: 'Contestamos en menos de 24 horas'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
            Comienza tu proceso hoy
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            El primer paso hacia el bienestar es decidir comenzar. 
            Estoy aquí para acompañarte en este importante proceso de crecimiento personal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-8">
              Información de contacto
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      info.action ? 'hover:bg-white cursor-pointer' : 'bg-transparent'
                    }`}
                    onClick={info.action || undefined}
                  >
                    <div className={`text-2xl ${info.color}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">{info.title}</p>
                      <p className="text-neutral-600">{info.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-primary mt-1">
                      <Icon />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">{feature.title}</p>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Call to Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaWhatsapp className="text-primary text-3xl" />
                </div>
                
                <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-4">
                  ¿Lista para comenzar?
                </h3>
                
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  La primera consulta es un espacio para conocernos, entender tus necesidades 
                  y diseñar juntas el mejor camino hacia tu bienestar.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium text-neutral-700">Primera sesión</span>
                    <span className="text-primary font-semibold">50 min</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium text-neutral-700">Modalidad</span>
                    <span className="text-primary font-semibold">Presencial / Virtual</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium text-neutral-700">Respuesta</span>
                    <span className="text-primary font-semibold">&lt; 24 horas</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`)}
                  className="w-full flex items-center justify-center space-x-2 mb-4"
                >
                  <FaWhatsapp size={20} />
                  <span>Agenda tu primera sesión</span>
                </Button>

                <p className="text-sm text-neutral-500">
                  También puedes escribirme por email para cualquier consulta
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-white rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-4">
            Tu bienestar no puede esperar
          </h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Cada día es una oportunidad para crecer, sanar y construir la vida que deseas. 
            Permíteme acompañarte en este hermoso proceso de transformación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`)}
              className="flex items-center space-x-2"
            >
              <FaWhatsapp />
              <span>Contactar por WhatsApp</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('mailto:contacto@anamilenapsicologa.com')}
              className="flex items-center space-x-2"
            >
              <FaEnvelope />
              <span>Enviar email</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}