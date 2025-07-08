export default {
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
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
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      description: 'Para mostrar en cards'
    },
    {
      name: 'description',
      title: 'Descripción completa',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ]
        }
      ]
    },
    {
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono de React Icons (ej: FaHeart)'
    },
    {
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'duration',
      title: 'Duración de sesión',
      type: 'string',
      description: 'Ej: 50 minutos'
    },
    {
      name: 'modality',
      title: 'Modalidad',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        list: [
          { title: 'Presencial', value: 'presencial' },
          { title: 'Virtual', value: 'virtual' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0
    }
  ],
  orderings: [
    {
      title: 'Orden de aparición',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}