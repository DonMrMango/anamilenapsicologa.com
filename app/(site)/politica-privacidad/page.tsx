'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { FaShieldAlt, FaCookie, FaDatabase, FaEnvelope } from 'react-icons/fa'

export default function PrivacyPolicyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sections = [
    {
      id: 'informacion-recopilada',
      title: 'Información que recopilamos',
      icon: FaDatabase,
      content: `
Recopilamos la siguiente información cuando utilizas nuestro sitio web:

**Información proporcionada voluntariamente:**
- Nombre y datos de contacto cuando llenas formularios
- Mensajes enviados a través del formulario de contacto
- Preferencias de comunicación

**Información recopilada automáticamente:**
- Dirección IP y ubicación aproximada
- Tipo de navegador y dispositivo
- Páginas visitadas y tiempo de permanencia
- Información de cookies y tecnologías similares

Esta información nos ayuda a mejorar nuestros servicios y proporcionar una mejor experiencia de usuario.
`
    },
    {
      id: 'uso-informacion',
      title: 'Cómo utilizamos tu información',
      icon: FaShieldAlt,
      content: `
Utilizamos la información recopilada para:

**Servicios principales:**
- Responder a tus consultas y solicitudes de información
- Proporcionar servicios de terapia psicológica
- Programar y gestionar citas
- Comunicarnos contigo sobre nuestros servicios

**Mejoras del sitio web:**
- Analizar el uso del sitio para mejorarlo
- Personalizar tu experiencia de navegación
- Detectar y prevenir problemas técnicos

**Comunicaciones:**
- Enviar información relevante sobre salud mental (solo con tu consentimiento)
- Notificaciones importantes sobre nuestros servicios

Nunca vendemos, alquilamos o compartimos tu información personal con terceros sin tu consentimiento explícito.
`
    },
    {
      id: 'cookies',
      title: 'Uso de cookies',
      icon: FaCookie,
      content: `
Nuestro sitio web utiliza cookies para mejorar tu experiencia de navegación.

**Tipos de cookies que utilizamos:**

**Cookies esenciales:** Necesarias para el funcionamiento básico del sitio web. No pueden ser desactivadas.

**Cookies de análisis:** Nos ayudan a entender cómo los visitantes interactúan con el sitio web (Google Analytics).

**Cookies de funcionalidad:** Recuerdan tus preferencias y configuraciones.

**Gestión de cookies:**
Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar las cookies puede afectar la funcionalidad del sitio.

**Google Analytics:**
Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Esta herramienta utiliza cookies para recopilar información de forma anónima sobre cómo los visitantes utilizan el sitio.
`
    },
    {
      id: 'derechos',
      title: 'Tus derechos',
      icon: FaEnvelope,
      content: `
Tienes los siguientes derechos respecto a tu información personal:

**Derecho de acceso:** Puedes solicitar una copia de la información personal que tenemos sobre ti.

**Derecho de rectificación:** Puedes solicitar que corrijamos información inexacta o incompleta.

**Derecho de eliminación:** Puedes solicitar que eliminemos tu información personal bajo ciertas circunstancias.

**Derecho de portabilidad:** Puedes solicitar que transfiramos tu información a otro servicio.

**Derecho de oposición:** Puedes oponerte al procesamiento de tu información personal.

**Cómo ejercer tus derechos:**
Para ejercer cualquiera de estos derechos, contáctanos a través de:
- Email: contacto@anamilenapsicologa.com
- WhatsApp: +57 321 640 4797

Responderemos a tu solicitud dentro de los 30 días hábiles establecidos por la ley.
`
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-blue-600 text-3xl" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Política de Privacidad
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Tu privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, 
              utilizamos y protegemos tu información personal cuando utilizas nuestros servicios.
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">
                <strong>Última actualización:</strong> Enero 2024
                <br />
                <strong>Responsable:</strong> Ana Milena Mejía Ochoa - Psicóloga
                <br />
                <strong>Contacto:</strong> contacto@anamilenapsicologa.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  id={section.id}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="text-blue-600 text-xl" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-gray-800">
                          {section.title}
                        </h2>
                      </div>
                      
                      <div className="prose prose-lg max-w-none">
                        {section.content.split('\n\n').map((paragraph, pIndex) => {
                          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return (
                              <h3 key={pIndex} className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                                {paragraph.replace(/\*\*/g, '')}
                              </h3>
                            )
                          }
                          if (paragraph.includes('**')) {
                            const parts = paragraph.split('**')
                            return (
                              <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                                {parts.map((part, partIndex) => 
                                  partIndex % 2 === 1 ? (
                                    <strong key={partIndex}>{part}</strong>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            )
                          }
                          if (paragraph.startsWith('- ')) {
                            const listItems = paragraph.split('\n').filter(item => item.startsWith('- '))
                            return (
                              <ul key={pIndex} className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                {listItems.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item.replace('- ', '')}</li>
                                ))}
                              </ul>
                            )
                          }
                          if (paragraph.trim()) {
                            return (
                              <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                                {paragraph}
                              </p>
                            )
                          }
                          return null
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    Información adicional importante
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Seguridad de la información
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
                        tu información personal contra el acceso no autorizado, alteración, divulgación o 
                        destrucción. Utilizamos cifrado SSL para todas las comunicaciones y almacenamos 
                        los datos en servidores seguros.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Retención de datos
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Conservamos tu información personal solo durante el tiempo necesario para cumplir 
                        con los propósitos descritos en esta política o según lo requiera la ley. Los datos 
                        de contacto se conservan mientras mantengas una relación activa con nuestros servicios.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Menores de edad
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
                        conscientemente información personal de menores de edad sin el consentimiento de 
                        los padres o tutores legales.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Cambios en esta política
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos 
                        sobre cambios importantes a través de nuestro sitio web o por email. Te recomendamos 
                        revisar esta página regularmente para estar informado sobre cómo protegemos tu información.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Tienes preguntas sobre tu privacidad?
            </h2>
            
            <p className="text-xl opacity-90 mb-8">
              Si tienes alguna pregunta sobre esta Política de Privacidad o sobre cómo manejamos 
              tu información personal, no dudes en contactarnos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <FaEnvelope className="text-3xl mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="opacity-90">contacto@anamilenapsicologa.com</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl mx-auto mb-4">📱</div>
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="opacity-90">+57 321 640 4797</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, tengo una pregunta sobre la política de privacidad.')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contactar ahora
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}