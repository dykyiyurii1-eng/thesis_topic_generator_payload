import { Block } from 'payload'

export const Contacts: Block = {
    slug: 'contacts',
    labels: { singular: 'Contacts', plural: 'Contacts' },
    fields: [
        { name: 'anchor', type: 'text', label: 'ID секції' },
        { name: 'title', type: 'text', label: 'Заголовок', required: true },
        { name: 'phone', type: 'text', label: 'Телефон' },
        { name: 'email', type: 'text', label: 'Email', required: true },
        { name: 'github', type: 'text', label: 'Посилання на GitHub' },
        { name: 'address', type: 'text', label: 'Адреса / навчальний заклад' },
    ],
}