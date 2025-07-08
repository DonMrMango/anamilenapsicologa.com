import Link from 'next/link'
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaHeart } from 'react-icons/fa'
import { HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'

export default function Footer() {
  const whatsappNumber = '573216404797'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-primary">Ana Milena</h3>
            <p className="text-neutral-300 leading-relaxed">
              Psicóloga con enfoque sistémico. Acompañando procesos de transformación y crecimiento personal hace más de 10 años.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
              <a 
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-mi" className="text-neutral-300 hover:text-primary transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-neutral-300 hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/testimonios" className="text-neutral-300 hover:text-primary transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-neutral-300 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios#individual" className="text-neutral-300 hover:text-primary transition-colors">
                  Terapia Individual
                </Link>
              </li>
              <li>
                <Link href="/servicios#pareja" className="text-neutral-300 hover:text-primary transition-colors">
                  Terapia de Pareja
                </Link>
              </li>
              <li>
                <Link href="/servicios#familiar" className="text-neutral-300 hover:text-primary transition-colors">
                  Terapia Familiar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <HiLocationMarker className="text-primary flex-shrink-0" size={20} />
                <span className="text-neutral-300">Medellín, Antioquia, Colombia</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiMail className="text-primary flex-shrink-0" size={20} />
                <a 
                  href="mailto:contacto@anamilenapsicologa.com"
                  className="text-neutral-300 hover:text-primary transition-colors"
                >
                  contacto@anamilenapsicologa.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiClock className="text-primary flex-shrink-0" size={20} />
                <span className="text-neutral-300">Lun - Vie: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-primary flex-shrink-0" size={20} />
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-primary transition-colors"
                >
                  +57 321 640 4797
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm text-center md:text-left">
            © {currentYear} Ana Milena Mejía Ochoa. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link 
              href="/politica-privacidad" 
              className="text-neutral-400 hover:text-primary transition-colors text-sm"
            >
              Política de Privacidad
            </Link>
            <span className="text-neutral-600">|</span>
            <p className="text-neutral-400 text-sm flex items-center space-x-1">
              <span>Hecho con</span>
              <FaHeart className="text-primary" size={12} />
              <span>en Medellín</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}