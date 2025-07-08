'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    content: "Ana me ayudó a encontrar mi voz interior. Su enfoque sistémico me permitió entender cómo mis relaciones familiares afectaban mi autoestima. Hoy me siento más segura y en paz conmigo misma.",
    author: {
      initials: "M.R.",
      age: 28,
      gender: "female"
    },
    serviceType: "individual"
  },
  {
    id: 2,
    content: "Llegamos a terapia en una crisis profunda. Ana nos enseñó nuevas formas de comunicarnos y a ver nuestros conflictos como oportunidades de crecimiento. Hoy nuestra relación es más sólida que nunca.",
    author: {
      initials: "C.G. & J.M.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple"
  },
  {
    id: 3,
    content: "Como familia estábamos desconectados. Ana nos ayudó a entender las dinámicas que nos alejaban y a construir nuevas formas de relacionarnos. Ahora disfrutamos más tiempo juntos.",
    author: {
      initials: "Familia L.",
      age: null,
      gender: "family"
    },
    serviceType: "family"
  },
  {
    id: 4,
    content: "Después de años sintiendo que algo no estaba bien, Ana me acompañó a descubrir patrones que venían de generaciones atrás. El proceso de sanación ha sido transformador.",
    author: {
      initials: "A.S.",
      age: 35,
      gender: "male"
    },
    serviceType: "individual"
  },
  {
    id: 5,
    content: "Su calidez y profesionalismo crearon un espacio seguro donde pudimos hablar de temas difíciles. Ana tiene una habilidad especial para hacer las preguntas correctas en el momento indicado.",
    author: {
      initials: "L.P. & D.R.",
      age: null,
      gender: "couple"
    },
    serviceType: "couple"
  },
  {
    id: 6,
    content: "Mi adolescente no quería ir a terapia familiar, pero Ana logró crear una atmósfera donde todos nos sentimos escuchados. Ahora tenemos herramientas para comunicarnos mejor.",
    author: {
      initials: "Familia M.",
      age: null,
      gender: "family"
    },
    serviceType: "family"
  }
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getDisplayedTestimonials = () => {
    const testimonial1 = testimonials[currentIndex]
    const testimonial2 = testimonials[(currentIndex + 1) % testimonials.length]
    const testimonial3 = testimonials[(currentIndex + 2) % testimonials.length]
    return [testimonial1, testimonial2, testimonial3]
  }

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
            Testimonios
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Las palabras de quienes han vivido un proceso de transformación son 
            el mejor reflejo del impacto que la terapia puede tener en tu vida.
          </p>
        </motion.div>

        {/* Desktop carousel - 3 cards */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mb-8"
          >
            {getDisplayedTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile carousel - 1 card */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center space-x-4"
        >
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
          >
            <FaChevronLeft className="text-primary" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
          >
            <FaChevronRight className="text-primary" />
          </button>
        </motion.div>

        {/* Auto-play indicator */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-neutral-500 hover:text-primary transition-colors"
          >
            {isAutoPlaying ? 'Pausar reproducción automática' : 'Activar reproducción automática'}
          </button>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <FaQuoteLeft className="text-primary text-2xl mb-4" />
        
        <blockquote className="text-neutral-700 leading-relaxed mb-6 flex-grow">
          "{testimonial.content}"
        </blockquote>

        <div className="flex items-center justify-between">
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