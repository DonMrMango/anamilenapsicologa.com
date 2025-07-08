'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaUserAlt,
  FaPhone,
  FaComment,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa'

export default function ContactPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    therapyType: 'individual',
    message: '',
    consent: false
  })
  
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
    loading: boolean;
  }>({
    success: false,
    message: '',
    loading: false
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormState({
      ...formState,
      [name]: checked
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formState.name || !formState.email || !formState.message || !formState.consent) {
      setFormStatus({
        success: false,
        message: 'Por favor completa todos los campos requeridos y acepta la política de privacidad.',
        loading: false
      })
      return
    }
    
    // Set loading state
    setFormStatus({
      success: false,
      message: '',
      loading: true
    })
    
    // Simulate API call
    setTimeout(() => {
      // Success simulation
      setFormStatus({
        success: true,
        message: 'Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo muy pronto.',
        loading: false
      })
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        therapyType: 'individual',
        message: '',
        consent: false
      })
    }, 1500)
  }
  
  const whatsappNumber = '573216404797'
  const whatsappMessages = {
    individual: 'Hola Ana, me interesa agendar una sesión de terapia individual.',
    pareja: 'Hola Ana, nos interesa agendar una sesión de terapia de pareja.',
    familiar: 'Hola Ana, nos gustaría agendar una sesión de terapia familiar.'
  }
  
  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+57 321 640 4797',
      action: () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages.individual)}`),
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
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-light/20 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
              Contacto
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Estoy aquí para acompañarte en tu proceso de bienestar emocional.
              Contáctame para agendar una sesión o resolver cualquier duda que tengas.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Info + Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-neutral-800 mb-8">
                Información de contacto
              </h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg border border-neutral-100 transition-colors ${
                        info.action ? 'hover:bg-neutral-50 cursor-pointer' : 'bg-white'
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
              
              <Card className="overflow-hidden mb-8">
                <CardContent className="p-0">
                  {/* Google Maps Embed Placeholder */}
                  <div className="w-full h-64 bg-neutral-100 flex items-center justify-center">
                    <p className="text-neutral-500">Mapa de ubicación</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-serif font-medium text-xl mb-4">Terapia por WhatsApp</h3>
                <p className="text-neutral-700 mb-6">
                  Para tu comodidad, puedes contactarme directamente por WhatsApp según el tipo de terapia que buscas:
                </p>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages.individual)}`)}
                    className="w-full flex items-center justify-between"
                    variant="outline"
                  >
                    <span>Terapia Individual</span>
                    <FaWhatsapp className="text-green-600" />
                  </Button>
                  
                  <Button
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages.pareja)}`)}
                    className="w-full flex items-center justify-between"
                    variant="outline"
                  >
                    <span>Terapia de Pareja</span>
                    <FaWhatsapp className="text-green-600" />
                  </Button>
                  
                  <Button
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages.familiar)}`)}
                    className="w-full flex items-center justify-between"
                    variant="outline"
                  >
                    <span>Terapia Familiar</span>
                    <FaWhatsapp className="text-green-600" />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-semibold text-neutral-800 mb-6">
                    Formulario de contacto
                  </h2>
                  
                  {formStatus.success ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-100 text-green-700 p-6 rounded-lg text-center"
                    >
                      <FaCheckCircle className="text-3xl mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">¡Mensaje enviado!</h3>
                      <p>{formStatus.message}</p>
                      <Button
                        onClick={() => setFormStatus({ success: false, message: '', loading: false })}
                        className="mt-4"
                      >
                        Enviar otro mensaje
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {formStatus.message && (
                        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-lg text-sm">
                          {formStatus.message}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                          Nombre completo *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserAlt className="text-neutral-400" />
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formState.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-neutral-400" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="tu@email.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                          Teléfono (opcional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-neutral-400" />
                          </div>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="+57 300 123 4567"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="therapyType" className="block text-sm font-medium text-neutral-700 mb-1">
                          Tipo de terapia
                        </label>
                        <select
                          id="therapyType"
                          name="therapyType"
                          value={formState.therapyType}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-8 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="individual">Individual</option>
                          <option value="pareja">Pareja</option>
                          <option value="familiar">Familiar</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                          Mensaje *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                            <FaComment className="text-neutral-400" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="¿Cómo puedo ayudarte?"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            checked={formState.consent}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="consent" className="text-neutral-700">
                            He leído y acepto la <a href="/politica-privacidad" className="text-primary hover:text-primary-dark underline" target="_blank">política de privacidad</a> *
                          </label>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={formStatus.loading}
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        {formStatus.loading ? (
                          <>
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            <span>Enviar mensaje</span>
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-neutral-500 text-center mt-4">
                        Los campos marcados con * son obligatorios. Tu información está segura y será usada solo para responder a tu consulta.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Aquí encontrarás respuestas a algunas de las dudas más comunes sobre mi práctica y servicios.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "¿Cómo es la primera sesión?",
                  answer: "La primera sesión es un espacio para conocernos, donde podrás compartir tu situación actual y expectativas. Evaluaremos juntos tus necesidades y estableceremos objetivos iniciales para el proceso terapéutico. Tiene una duración aproximada de 50 minutos."
                },
                {
                  question: "¿Cuál es la duración del proceso terapéutico?",
                  answer: "Cada proceso es único y se adapta a tus necesidades particulares. Algunos procesos pueden requerir solo unas pocas sesiones, mientras que otros pueden extenderse por varios meses. Lo evaluaremos juntos periódicamente para asegurar que estamos avanzando hacia tus objetivos."
                },
                {
                  question: "¿Ofreces terapia online?",
                  answer: "Sí, ofrezco sesiones virtuales a través de plataformas seguras que garantizan la confidencialidad. La terapia online es igualmente efectiva y proporciona mayor flexibilidad para personas con agendas ocupadas o que viven en otras ciudades."
                },
                {
                  question: "¿Cuál es tu enfoque terapéutico?",
                  answer: "Trabajo principalmente desde el enfoque sistémico, que considera los sistemas de relaciones en los que participamos como factores importantes en nuestro bienestar. También integro elementos de terapias cognitivo-conductuales y otros enfoques según las necesidades específicas de cada persona."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-lg text-neutral-800 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}