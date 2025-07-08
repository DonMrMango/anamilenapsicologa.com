export default {
  name: 'highlightCollection',
  title: 'Colección Destacada',
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      description: 'Breve descripción de esta colección'
    },
    {
      name: 'icon',
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          {title: '🧠 Psicología', value: 'psychology'},
          {title: '💑 Pareja', value: 'couple'},
          {title: '👨‍👩‍👧‍👦 Familia', value: 'family'},
          {title: '🧘 Bienestar', value: 'wellness'},
          {title: '📚 Educación', value: 'education'},
          {title: '🤝 Relaciones', value: 'relationships'},
          {title: '❤️ Amor', value: 'love'},
          {title: '✨ Inspiración', value: 'inspiration'},
          {title: '🎯 Metas', value: 'goals'},
          {title: '🌱 Crecimiento', value: 'growth'}
        ]
      }
    },
    {
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'items',
      title: 'Elementos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'blogPost'},
            {type: 'tiktokVideo'}
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Posición en que aparecerá esta colección (menor número = primero)',
      initialValue: 0
    },
    {
      name: 'createdAt',
      title: 'Fecha de creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      icon: 'icon'
    },
    prepare(selection: any) {
      const {title, media, icon} = selection
      const iconEmoji = {
        psychology: '🧠',
        couple: '💑',
        family: '👨‍👩‍👧‍👦',
        wellness: '🧘',
        education: '📚',
        relationships: '🤝',
        love: '❤️',
        inspiration: '✨',
        goals: '🎯',
        growth: '🌱'
      }[icon] || '📁'
      
      return {
        title: `${iconEmoji} ${title}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}