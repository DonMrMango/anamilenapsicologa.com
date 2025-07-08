export default {
  name: 'category',
  title: 'Categoría',
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
      rows: 3
    },
    {
      name: 'type',
      title: 'Tipo de contenido',
      type: 'string',
      options: {
        list: [
          { title: 'Artículos', value: 'articles' },
          { title: 'Videos', value: 'videos' },
          { title: 'Podcasts', value: 'podcasts' },
          { title: 'Reseñas', value: 'reviews' }
        ]
      }
    }
  ]
}