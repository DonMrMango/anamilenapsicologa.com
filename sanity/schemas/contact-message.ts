export default {
  name: 'contactMessage',
  title: 'Mensaje de Contacto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string'
    },
    {
      name: 'therapyType',
      title: 'Tipo de Terapia',
      type: 'string',
      options: {
        list: [
          { title: 'Individual', value: 'individual' },
          { title: 'Pareja', value: 'pareja' },
          { title: 'Familiar', value: 'familiar' }
        ]
      }
    },
    {
      name: 'message',
      title: 'Mensaje',
      type: 'text'
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Nuevo', value: 'new' },
          { title: 'Leído', value: 'read' },
          { title: 'Respondido', value: 'answered' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'createdAt',
      title: 'Fecha de recepción',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      date: 'createdAt'
    },
    prepare(selection: any) {
      const {title, subtitle, status, date} = selection
      const statusEmoji = {
        new: '🆕',
        read: '👁️',
        answered: '✅'
      }
      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || ''} ${title}`,
        subtitle: `${subtitle} - ${date ? new Date(date).toLocaleDateString('es-CO') : 'Sin fecha'}`
      }
    }
  }
}