import type { GlobalConfig } from 'payload'

export const Common: GlobalConfig = {
    slug: 'common',
    label: 'Загальні налаштування',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'siteName',
            type: 'text',
            label: 'Назва сайту',
            required: true,
            defaultValue: 'THESIS_GEN',
        },
        {
            name: 'menu',
            type: 'array',
            label: 'Меню',
            fields: [
                { name: 'label', type: 'text', label: 'Текст', required: true },
                { name: 'link', type: 'text', label: 'Посилання', required: true },
            ],
        },
        {
            name: 'footer',
            type: 'group',
            label: 'Футер',
            fields: [
                { name: 'text', type: 'textarea', label: 'Текст футера' },
            ],
        },
    ],
}