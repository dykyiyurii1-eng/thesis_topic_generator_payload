import { Block } from 'payload'

export const Features: Block = {
    slug: 'features',
    labels: { singular: 'Features', plural: 'Features' },
    fields: [
        { name: 'anchor', type: 'text', label: 'ID секції' },
        { name: 'title', type: 'text', label: 'Заголовок', required: true },
        {
            name: 'items',
            type: 'array',
            label: 'Елементи',
            fields: [
                { name: 'icon', type: 'text', label: 'Іконка (emoji)' },
                { name: 'title', type: 'text', label: 'Заголовок', required: true },
                { name: 'text', type: 'textarea', label: 'Опис', required: true },
            ],
        },
    ],
}