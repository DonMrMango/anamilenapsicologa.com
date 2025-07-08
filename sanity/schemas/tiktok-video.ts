export default {
  name: 'tiktokVideo',
  title: 'Video de TikTok',
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
      rows: 3,
      description: 'Breve descripción del video'
    },
    {
      name: 'tiktokUrl',
      title: 'URL de TikTok',
      type: 'url',
      description: 'URL del video de TikTok',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'tiktokEmbedCode',
      title: 'Código de Embebido',
      type: 'text',
      description: 'Código de embebido generado automáticamente',
    },
    {
      name: 'thumbnailImage',
      title: 'Imagen de Miniatura',
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
      ]
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}]
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar este video como destacado',
      initialValue: false
    },
    {
      name: 'viewCount',
      title: 'Número de vistas',
      type: 'number',
      readOnly: true,
      description: 'Actualizado automáticamente desde TikTok'
    },
    {
      name: 'likeCount',
      title: 'Número de me gusta',
      type: 'number',
      readOnly: true,
      description: 'Actualizado automáticamente desde TikTok'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnailImage',
      publishedAt: 'publishedAt'
    },
    prepare(selection: any) {
      const {title, media, publishedAt} = selection
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('es-CO') : 'Sin publicar',
        media
      }
    }
  }
}