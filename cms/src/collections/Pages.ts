import type { CollectionConfig } from 'payload'
import { Contacts } from '../blocks/contacts'
import { Hero } from '../blocks/hero'
import { Features } from '../blocks/features'
import { Feedback } from '../blocks/feedback'

export const Pages: CollectionConfig = {
    slug: 'pages',
    labels: { singular: 'Сторінка', plural: 'Сторінки' },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'path',
            type: 'text',
            label: 'УРЛ сторінки',
            required: true,
            unique: true,
            defaultValue: '/',
        },
        {
            name: 'title',
            type: 'text',
            label: 'Заголовок сторінки',
            required: true,
        },
        {
            name: 'blocks',
            type: 'blocks',
            label: 'Блоки',
         blocks: [Hero, Features, Contacts, Feedback],
        },
    ],
}   