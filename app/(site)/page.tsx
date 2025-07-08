import HeroSection from '@/components/sections/HeroSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}
