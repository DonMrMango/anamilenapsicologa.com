export default {
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Contenido',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        {
          name: 'initials',
          title: 'Iniciales',
          type: 'string',
          description: 'Ej: J.D.',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'age',
          title: 'Edad',
          type: 'number'
        },
        {
          name: 'gender',
          title: 'Género',
          type: 'string',
          options: {
            list: [
              { title: 'Masculino', value: 'male' },
              { title: 'Femenino', value: 'female' },
              { title: 'Otro', value: 'other' },
              { title: 'Prefiero no decir', value: 'unspecified' }
            ]
          }
        }
      ]
    },
    {
      name: 'serviceType',
      title: 'Tipo de servicio',
      type: 'string',
      options: {
        list: [
          { title: 'Terapia Individual', value: 'individual' },
          { title: 'Terapia de Pareja', value: 'couple' },
          { title: 'Terapia Familiar', value: 'family' }
        ]
      }
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Mostrar en la página principal',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'content',
      initials: 'author.initials',
      featured: 'featured'
    },
    prepare(selection: any) {
      const {title, initials, featured} = selection
      return {
        title: title ? title.substring(0, 50) + '...' : 'Sin contenido',
        subtitle: `${initials || 'Anónimo'}${featured ? ' ⭐ Destacado' : ''}`
      }
    }
  }
}