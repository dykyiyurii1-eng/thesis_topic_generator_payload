# THESIS_GEN: сайт-візитка на Payload CMS

Сайт-візитка застосунку «Генератор тем кваліфікаційних робіт». Контент зберігається в Payload CMS (PostgreSQL на Neon), а клієнт на Vite + TypeScript збирає сторінки з блоків, які приходять з API.

- Сайт: <посилання на frontend після деплою>
- Адмінка: <посилання на cms>/admin

Основа структури (монорепозиторій, ендпоінти, шаблони блоків) взята з практичного заняття. Самостійно виконано: тематичний дизайн, блоки `contacts` і `feedback`, колекція повідомлень, TypeScript-типізація клієнта, стани UI, екранування даних, інтерактивність.

## Стек

| Частина | Технології |
|---|---|
| CMS | Payload 3, Next.js, TypeScript |
| База даних | PostgreSQL (Neon) |
| Клієнт | Vite, TypeScript, ES-модулі |
| Хостинг | Vercel (два проєкти з одного репозиторію) |

## Структура

```
cms/         Payload CMS: колекції, блоки, глобали, ендпоінти
frontend/    клієнт: типи, шаблони блоків, стани UI
package.json кореневий скрипт для спільного запуску
```

## Як це працює

1. Браузер відкриває сайт, клієнт читає поточний шлях.
2. Клієнт запитує `/api/common` (назва, меню, футер) і `/api/page?path=...` (блоки сторінки).
3. CMS бере дані з Neon і повертає плоский JSON.
4. Для кожного блока за полем `type` обирається шаблон, і HTML вставляється на сторінку.
5. Під час запиту показується стан завантаження, при збої повідомлення про помилку з кнопкою повтору.

Блоки: `hero`, `features`, `contacts`, `feedback`. Форма зворотного зв'язку надсилає `POST /api/messages`, повідомлення зберігаються в колекції `Messages`, читати їх може лише користувач адмінки.

## Типізація

Типи лежать у `frontend/src/types.ts`:
- Union Types: `Block`, `BlockType`, `ButtonVariant`;
- Intersection Types: `BaseBlock & {...}` у кожному блоці;
- Type Aliases: `PageResponse`, `SiteSettings`, `MessagePayload`;
- типізований запит `getJson<T>()` і типізовані функції шаблонів.

У CMS типи генерує Payload (`cms/src/payload-types.ts`).

## Безпека

Тексти з CMS екрануються (`esc`), посилання перевіряються (`safeUrl`), у формі є приховане поле-пастка для ботів, а на сервері діють обмеження доступу колекції `Messages`.

## Локальний запуск

```bash
npm install
npm install --prefix cms
npm install --prefix frontend
npm run dev
```

Змінні оточення (приклади в `.env.example`):

- `cms/.env`: `DATABASE_URL`, `PAYLOAD_SECRET`
- `frontend/.env`: `VITE_API_URL`, `VITE_APP_URL`

CMS: http://localhost:3000/admin, сайт: http://localhost:5173

Перевірка типів: `npm run typecheck --prefix frontend`

## Деплой

Два проєкти Vercel з одного репозиторію: Root Directory `cms` і `frontend`. Покроково в `DEPLOY.md` (буде додано).