'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  FaCalendar, 
  FaClock, 
  FaTag,
  FaArrowLeft,
  FaWhatsapp,
  FaShare,
  FaBookOpen,
  FaHeart
} from 'react-icons/fa'

// Mock data - en producción vendría de Sanity
const blogPost = {
  id: 1,
  title: 'Cómo saber cuándo es hora de ir a terapia de pareja',
  excerpt: 'Muchas parejas se preguntan cuál es el momento adecuado para buscar ayuda profesional. En este artículo exploramos las señales que indican que es momento de tomar esa decisión.',
  content: `
Las relaciones de pareja atraviesan diferentes etapas y desafíos a lo largo del tiempo. Es completamente normal que surjan conflictos, diferencias de opinión y momentos de tensión. Sin embargo, hay ocasiones en las que estos desafíos pueden volverse abrumadores y la pareja puede beneficiarse enormemente de la ayuda profesional.

## ¿Cuándo considerar la terapia de pareja?

### 1. Comunicación deteriorada
Cuando las conversaciones se vuelven repetitivas, circulares o terminan constantemente en discusiones, es una señal clara de que los patrones de comunicación necesitan ser revisados. Si sienten que no logran entenderse o que hablan idiomas diferentes, la terapia puede ayudarles a desarrollar nuevas formas de comunicarse.

### 2. Pérdida de intimidad emocional y física
La intimidad es un componente fundamental en las relaciones de pareja. Si notan que se han distanciado emocionalmente, que ya no comparten sus pensamientos y sentimientos más profundos, o si la intimidad física ha disminuido significativamente, es momento de buscar ayuda.

### 3. Conflictos recurrentes sin resolución
¿Discuten siempre sobre los mismos temas sin llegar a ninguna solución? Los conflictos no resueltos tienden a acumularse y crear resentimiento. Un terapeuta puede ayudarles a identificar las causas profundas de estos conflictos y encontrar formas constructivas de resolverlos.

### 4. Crisis de confianza
La confianza es la base de cualquier relación sólida. Ya sea por infidelidad, mentiras o traiciones de diferentes tipos, cuando la confianza se ve afectada, es esencial trabajar en su reconstrucción con ayuda profesional.

## El enfoque sistémico en terapia de pareja

Desde mi perspectiva como terapeuta sistémica, veo a la pareja como un sistema dinámico donde cada miembro influye y es influido por el otro. No se trata de encontrar culpables, sino de entender cómo funcionan juntos y qué patrones pueden estar manteniendo los problemas.

### Beneficios de la terapia sistémica:

- **Perspectiva circular**: En lugar de buscar causas lineales ("tú haces esto porque yo hago aquello"), exploramos los patrones circulares de interacción.
- **Fortalezas de la relación**: Nos enfocamos en identificar y potenciar los recursos que ya tiene la pareja.
- **Narrativas alternativas**: Ayudamos a construir nuevas historias sobre la relación que permitan un futuro más esperanzador.

## ¿Cómo saber si es el momento adecuado?

El momento ideal para comenzar terapia de pareja no es cuando la relación está en crisis profunda, sino cuando reconocen que quieren mejorar su relación y están dispuestos a trabajar juntos para lograrlo.

### Señales de que están listos:

1. **Ambos están comprometidos** con el proceso de cambio
2. **Reconocen que tienen un problema** y quieren solucionarlo
3. **Están abiertos a escuchar** perspectivas diferentes
4. **Mantienen el respeto mutuo** a pesar de las dificultades

## El proceso terapéutico

En nuestras sesiones, crearemos un espacio seguro donde ambos puedan expresarse libremente. Trabajaremos en:

- Mejorar la comunicación
- Identificar y cambiar patrones destructivos
- Fortalecer la conexión emocional
- Desarrollar habilidades de resolución de conflictos
- Reconstruir la confianza cuando sea necesario

## Reflexión final

Buscar ayuda profesional no es una señal de fracaso, sino de madurez y compromiso con la relación. Es una inversión en su futuro juntos y una oportunidad para crecer tanto individualmente como en pareja.

Recuerden: no es sobre quién tiene la razón, sino sobre cómo pueden construir juntos la relación que ambos desean.

---

*Si sienten que su relación podría beneficiarse de la terapia de pareja, los invito a contactarme. Estaré encantada de acompañarlos en este proceso de crecimiento y fortalecimiento de su vínculo.*
`,
  category: 'articles',
  readTime: '8 min',
  publishedAt: '2024-01-15',
  author: {
    name: 'Ana Milena Mejía Ochoa',
    bio: 'Psicóloga sistémica con más de 10 años de experiencia',
    avatar: '/images/ana-avatar.jpg'
  },
  tags: ['terapia de pareja', 'relaciones', 'comunicación', 'conflictos'],
  relatedPosts: [
    {
      id: 2,
      title: 'El poder transformador de las preguntas en terapia sistémica',
      readTime: '12 min'
    },
    {
      id: 4,
      title: 'Construyendo límites saludables en la familia',
      readTime: '10 min'
    }
  ]
}

export default function BlogPostPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const params = useParams()

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back button */}
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors mb-8"
            >
              <FaArrowLeft />
              <span>Volver al blog</span>
            </Link>

            {/* Article meta */}
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center space-x-1">
                <FaCalendar />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaClock />
                <span>{blogPost.readTime} de lectura</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaBookOpen />
                <span>Artículo</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 text-sm bg-white text-gray-700 px-3 py-1 rounded-full border"
                >
                  <FaTag size={12} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Share buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={shareArticle}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <FaShare />
                <span>Compartir</span>
              </button>
              
              <button
                onClick={() => window.open(`https://wa.me/573216404797?text=Te comparto este artículo sobre terapia de pareja: ${window.location.href}`)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp />
                <span>Compartir por WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Featured image placeholder */}
                  <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-8">
                    <div className="text-center">
                      <FaHeart className="text-primary text-4xl mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Imagen del artículo</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose-custom">
                    {blogPost.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-serif font-bold text-gray-800 mt-8 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        )
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-serif font-semibold text-gray-800 mt-6 mb-3">
                            {paragraph.replace('### ', '')}
                          </h3>
                        )
                      }
                      if (paragraph.startsWith('---')) {
                        return <hr key={index} className="my-8 border-gray-200" />
                      }
                      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                        return (
                          <div key={index} className="bg-orange-50 border-l-4 border-primary p-6 my-6 rounded-r-lg">
                            <p className="text-gray-700 italic">
                              {paragraph.replace(/^\*|\*$/g, '')}
                            </p>
                          </div>
                        )
                      }
                      if (paragraph.trim()) {
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>

                {/* Author bio */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-12 p-6 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-serif font-bold text-xl">AM</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {blogPost.author.name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {blogPost.author.bio}
                      </p>
                      <button
                        onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, leí tu artículo sobre terapia de pareja y me gustaría conocer más sobre tus servicios.')}
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <FaWhatsapp />
                        <span>Contactar a Ana</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Related posts */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                      Artículos relacionados
                    </h3>
                    <div className="space-y-4">
                      {blogPost.relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-3">
                                {post.title}
                              </h4>
                              <p className="text-xs text-gray-500 flex items-center space-x-1">
                                <FaClock />
                                <span>{post.readTime}</span>
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Card className="bg-gradient-to-br from-primary to-primary-dark text-white">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-serif font-bold text-lg mb-3">
                          ¿Te resonó este artículo?
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                          Si sientes que tu relación podría beneficiarse de terapia de pareja, estaré encantada de acompañarlos.
                        </p>
                        <button
                          onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, leí tu artículo sobre terapia de pareja y nos gustaría agendar una sesión.')}
                          className="w-full bg-white text-primary py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          Agendar sesión
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}