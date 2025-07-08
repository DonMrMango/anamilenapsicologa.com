'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaGraduationCap, 
  FaHeart, 
  FaBrain, 
  FaUsers,
  FaLeaf,
  FaStar
} from 'react-icons/fa'

const timeline = [
  {
    year: '2013',
    title: 'Graduación en Psicología',
    institution: 'Universidad de Manizales',
    description: 'Obtuve mi título profesional en Psicología, comenzando mi camino en el fascinante mundo de la mente humana.',
    icon: FaGraduationCap,
    color: 'text-blue-600'
  },
  {
    year: '2015',
    title: 'Especialización en Terapia de Familia',
    institution: 'Universidad Luis Amigó',
    description: 'Me especialicé en terapia sistémica familiar, descubriendo mi pasión por trabajar con dinámicas familiares.',
    icon: FaUsers,
    color: 'text-green-600'
  },
  {
    year: '2016-2019',
    title: 'Primeros años de práctica clínica',
    institution: 'Diversos centros de salud mental',
    description: 'Comencé mi práctica profesional trabajando con familias en situaciones de crisis y vulnerabilidad.',
    icon: FaHeart,
    color: 'text-red-600'
  },
  {
    year: '2020-2022',
    title: 'Consolidación del enfoque sistémico',
    institution: 'Consulta privada',
    description: 'Desarrollé mi propio enfoque terapéutico integrando la terapia sistémica con técnicas narrativas.',
    icon: FaBrain,
    color: 'text-purple-600'
  },
  {
    year: '2023-Presente',
    title: 'Práctica integral y crecimiento',
    institution: 'Ana Milena Psicóloga',
    description: 'Actualmente acompaño procesos de transformación individual, de pareja y familiar con más de 500 personas atendidas.',
    icon: FaStar,
    color: 'text-yellow-600'
  }
]

const values = [
  {
    icon: FaHeart,
    title: 'Calidez humana',
    description: 'Creo en la importancia de crear un espacio cálido y acogedor donde cada persona se sienta segura para explorar y crecer.'
  },
  {
    icon: FaLeaf,
    title: 'Crecimiento natural',
    description: 'Confío en la capacidad innata de las personas para sanar y transformarse cuando encuentran el ambiente adecuado.'
  },
  {
    icon: FaUsers,
    title: 'Enfoque sistémico',
    description: 'Veo a cada persona como parte de un sistema de relaciones que influyen en su bienestar y desarrollo.'
  },
  {
    icon: FaBrain,
    title: 'Curiosidad genuina',
    description: 'Me fascina conocer las historias únicas de cada persona y descubrir juntos nuevas posibilidades de vida.'
  }
]

export default function AboutPage() {
  const ref = useRef(null)
  const timelineRef = useRef(null)
  const valuesRef = useRef(null)
  
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' })

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
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Conoce a Ana Milena
              </motion.h1>
              
              <motion.div 
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>
                  Soy psicóloga sistémica con más de 10 años de experiencia acompañando 
                  procesos de transformación personal y familiar. Mi enfoque se centra en 
                  ayudar a las personas a descubrir sus propios recursos internos y 
                  fortalecer los vínculos que nutren su bienestar.
                </p>
                
                <p>
                  Creo firmemente que cada persona tiene dentro de sí la sabiduría 
                  necesaria para sanar y crecer. Mi rol es acompañarte en este proceso, 
                  creando un espacio seguro donde puedas explorar, reflexionar y 
                  construir la vida que deseas.
                </p>
                
                <p className="text-primary font-semibold italic">
                  "No se trata de arreglar lo que está roto, sino de reconocer 
                  y potenciar los recursos que ya tienes."
                </p>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for photo */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FaHeart className="text-primary text-3xl" />
                    </div>
                    <p className="text-gray-600 font-medium">Foto profesional de Ana</p>
                    <p className="text-sm text-gray-500 mt-2">
                      (Aquí irá la imagen real)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">+500</p>
                  <p className="text-sm text-gray-600">Personas acompañadas</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">+10</p>
                  <p className="text-sm text-gray-600">Años de experiencia</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Mi trayectoria profesional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un recorrido de crecimiento constante y dedicación al bienestar de las personas
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}>
                              <Icon size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                              <p className="text-primary font-medium">{item.institution}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center circle */}
                    <div className="hidden lg:flex w-2/12 justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg relative z-10">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.year}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for desktop layout */}
                    <div className="hidden lg:block w-5/12" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Mis valores y enfoque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían mi práctica terapéutica y mi forma de acompañar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-primary text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Te gustaría conocer más sobre mi enfoque?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Estaré encantada de conversar contigo sobre cómo podemos trabajar juntas en tu proceso de crecimiento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, me gustaría conocer más sobre tu enfoque terapéutico.')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <span>Conversemos por WhatsApp</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/servicios'}
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                <span>Ver servicios</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}