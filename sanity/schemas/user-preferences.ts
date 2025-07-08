export default {
  name: 'userPreferences',
  title: 'Preferencias de Usuario',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Preferencias de Blog',
      readOnly: true,
      hidden: true
    },
    {
      name: 'defaultView',
      title: 'Vista predeterminada',
      type: 'string',
      options: {
        list: [
          {title: 'Feed (estilo Facebook)', value: 'feed'},
          {title: 'Grid (estilo Instagram)', value: 'grid'}
        ],
        layout: 'radio'
      },
      initialValue: 'feed'
    },
    {
      name: 'defaultSort',
      title: 'Ordenamiento predeterminado',
      type: 'string',
      options: {
        list: [
          {title: 'Más recientes primero', value: 'recent'},
          {title: 'Más populares primero', value: 'popular'},
          {title: 'Destacados primero', value: 'featured'}
        ],
        layout: 'radio'
      },
      initialValue: 'recent'
    },
    {
      name: 'showHighlights',
      title: 'Mostrar colecciones destacadas',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'enableComments',
      title: 'Habilitar comentarios',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'moderateComments',
      title: 'Moderar comentarios antes de publicar',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'postsPerPage',
      title: 'Publicaciones por página',
      type: 'number',
      options: {
        list: [
          {title: '6 publicaciones', value: 6},
          {title: '9 publicaciones', value: 9},
          {title: '12 publicaciones', value: 12},
          {title: '15 publicaciones', value: 15}
        ]
      },
      initialValue: 9
    },
    {
      name: 'pinnedPosts',
      title: 'Publicaciones fijadas',
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
      description: 'Publicaciones que aparecerán fijadas en la parte superior'
    },
    {
      name: 'bioText',
      title: 'Texto de biografía',
      type: 'text',
      rows: 3,
      description: 'Breve descripción para mostrar en el perfil'
    },
    {
      name: 'profileImage',
      title: 'Imagen de perfil',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'analytics',
      title: 'Analíticas',
      type: 'object',
      fields: [
        {
          name: 'showViewCount',
          title: 'Mostrar contador de vistas',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showLikeCount',
          title: 'Mostrar contador de me gusta',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'updatedAt',
      title: 'Última actualización',
      type: 'datetime',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'profileImage'
    }
  }
}