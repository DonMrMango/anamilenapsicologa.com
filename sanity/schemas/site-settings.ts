export default {
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    {
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato: 573001234567',
      initialValue: '573216404797'
    },
    {
      name: 'email',
      title: 'Email de contacto',
      type: 'string'
    },
    {
      name: 'socialMedia',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' }
      ]
    },
    {
      name: 'businessHours',
      title: 'Horario de atención',
      type: 'object',
      fields: [
        {
          name: 'weekdays',
          title: 'Lunes a Viernes',
          type: 'string',
          description: 'Ej: 8:00 AM - 6:00 PM'
        },
        {
          name: 'saturday',
          title: 'Sábado',
          type: 'string',
          description: 'Ej: 9:00 AM - 1:00 PM o "Cerrado"'
        },
        {
          name: 'sunday',
          title: 'Domingo',
          type: 'string',
          description: 'Ej: Cerrado'
        }
      ]
    },
    {
      name: 'location',
      title: 'Ubicación',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'Ciudad',
          type: 'string',
          initialValue: 'Medellín'
        },
        {
          name: 'state',
          title: 'Departamento',
          type: 'string',
          initialValue: 'Antioquia'
        },
        {
          name: 'country',
          title: 'País',
          type: 'string',
          initialValue: 'Colombia'
        },
        {
          name: 'address',
          title: 'Dirección',
          type: 'string',
          description: 'Dirección completa del consultorio'
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Global',
      type: 'object',
      fields: [
        {
          name: 'defaultMetaTitle',
          title: 'Título meta por defecto',
          type: 'string'
        },
        {
          name: 'defaultMetaDescription',
          title: 'Descripción meta por defecto',
          type: 'text',
          rows: 3
        },
        {
          name: 'defaultOgImage',
          title: 'Imagen Open Graph por defecto',
          type: 'image'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración del Sitio'
      }
    }
  }
}