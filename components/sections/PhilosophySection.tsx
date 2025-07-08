'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="philosophy" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No es por qué, es para qué ir a terapia
          </motion.h2>

          {/* Content */}
          <motion.div 
            className="prose-custom text-lg md:text-xl leading-relaxed space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-neutral-700">
              A menudo nos preguntamos <strong>"¿por qué me pasa esto?"</strong> cuando enfrentamos dificultades, 
              pero en terapia sistémica, la pregunta transformadora es <strong>"¿para qué me está pasando esto?"</strong>
            </p>

            <p className="text-neutral-700">
              Esta perspectiva nos invita a ver nuestras experiencias no como problemas aislados, 
              sino como oportunidades de crecimiento y aprendizaje dentro del contexto de nuestras relaciones 
              y sistemas familiares.
            </p>

            <div className="bg-neutral-50 p-8 rounded-2xl my-12">
              <p className="text-primary text-xl md:text-2xl font-semibold italic leading-relaxed">
                "Cada desafío que enfrentas es una invitación a descubrir recursos internos 
                que tal vez no sabías que tenías."
              </p>
            </div>

            <p className="text-neutral-700">
              Mi enfoque se centra en acompañarte a encontrar tu propia sabiduría interior, 
              fortaleciendo los vínculos que nutren tu bienestar y construyendo narrativas 
              de vida que honren tu historia mientras abrazan tu potencial de transformación.
            </p>

            <p className="text-neutral-700">
              No se trata de "arreglar" lo que está "roto", sino de reconocer y potenciar 
              los recursos que ya tienes, creando nuevas posibilidades para vivir una vida 
              más plena y conectada contigo mismo y con quienes amas.
            </p>
          </motion.div>

          {/* Highlight stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Enfoque Sistémico
              </h3>
              <p className="text-neutral-600">
                Vemos las dificultades en el contexto de tus relaciones y sistemas de apoyo
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Recursos Internos
              </h3>
              <p className="text-neutral-600">
                Descubrimos y fortalecemos las capacidades que ya tienes para sanar
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}