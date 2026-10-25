import { Block } from 'payload'

export const Feedback: Block = {
    slug: 'feedback',
    labels: { singular: 'Feedback', plural: 'Feedback' },
    fields: [
        { name: 'anchor', type: 'text', label: 'ID секції' },
        { name: 'title', type: 'text', label: 'Заголовок', required: true },
        { name: 'description', type: 'textarea', label: 'Опис' },
        { name: 'submitLabel', type: 'text', label: 'Текст кнопки', defaultValue: 'Надіслати' },
    ],
}