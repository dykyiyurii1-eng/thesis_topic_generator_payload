import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
    slug: 'messages',
    labels: { singular: 'Повідомлення', plural: 'Повідомлення' },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'createdAt'],
    },
    access: {
        create: () => true,
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    fields: [
        { name: 'name', type: 'text', label: 'Ім’я', required: true, maxLength: 100 },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'message', type: 'textarea', label: 'Повідомлення', required: true, minLength: 10, maxLength: 2000 },
    ],
}