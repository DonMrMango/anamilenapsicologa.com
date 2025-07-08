'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FaWhatsapp, FaChevronDown } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'

const words = [
  'Tu bienestar es mi propósito',
  'Acompaño tu proceso de crecimiento',
  'Construyamos juntos tu mejor versión'
]

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const whatsappNumber = '573216404797'
  const whatsappMessage = 'Hola Ana, encontré tu sitio web y me gustaría agendar una primera sesión de terapia.'

  const handleScrollToNext = () => {
    const nextSection = document.querySelector('#philosophy')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-100/20 to-orange-100/10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ana Milena
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Psicóloga Sistémica | Medellín
          </motion.p>

          {/* Animated tagline */}
          <motion.div 
            className="h-20 flex items-center justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl text-orange-600 font-medium text-center px-4"
            >
              {words[currentWordIndex]}
            </motion.p>
          </motion.div>

          {/* Call to action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`)}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              <FaWhatsapp size={20} />
              <span>Agenda tu primera sesión</span>
            </button>
            
            <button
              onClick={handleScrollToNext}
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-colors"
            >
              <HiHeart size={20} />
              <span>Conoce mi enfoque</span>
            </button>
          </motion.div>

          {/* Professional highlights */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">+10</p>
              <p className="text-gray-600">Años de experiencia</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">+500</p>
              <p className="text-gray-600">Personas acompañadas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">3</p>
              <p className="text-gray-600">Tipos de terapia</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-orange-600 transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaChevronDown size={24} />
      </motion.button>
    </section>
  )
}