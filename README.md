# Siberian Cedar — Landing Site

Многоязычный лендинг «Сибирский кедр» — премиальные кедровые орехи из
сибирской тайги для европейского рынка. Одностраничный сайт с
скролл-анимированным hero, продуктовой модалкой, контактной формой и
шестью локалями.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS 4** (CSS-native tokens через `@theme`)
- **Motion** (`motion/react`) — скролл-прогресс, курсорный параллакс
- **TypeScript**
- i18n без сторонних библиотек — словари в `src/app/[lang]/dictionaries/*.json`

## Фичи

- **Hero-секция** со скролл-синхронизированной 100-кадровой анимацией
  (canvas-based, preload). Сейчас временно заменена на статичную
  фотографию-заглушку — см. `src/components/HeroPlaceholder.tsx`.
- **Скролл-сторителлинг** — панели с glass-morphism, scroll-driven
  opacity / y / scale, курсорный 3D-параллакс.
- **Продуктовая модалка** — клик по карточке открывает полный паспорт
  продукта: описание, состав, КБЖУ, срок годности, условия хранения,
  упаковка, происхождение. Данные — с ecofactory.ru.
- **Контактная форма** с honeypot и «I'm not a robot» — payload в
  `/api/contact` логируется в сервер; email-провайдер подключается за
  один шаг (см. комментарий в `route.ts`).
- **6 локалей**: `en`, `de`, `it`, `fr`, `cs`, `ru` (переключатель в
  хедере, SEO-метаданные локализованы).
- Тёмная cedar-палитра, Playfair Display + Inter.

## Структура

```
src/
  app/
    [lang]/
      dictionaries/     # en/de/it/fr/cs/ru .json
      dictionaries.ts   # typed loader
      layout.tsx        # fonts + html lang + header/footer
      page.tsx          # landing entry
    api/contact/route.ts
    globals.css         # Tailwind theme + glass-panel utilities
  components/
    HeroBackdrop.tsx    # 100-frame scroll animation (canvas)
    HeroPlaceholder.tsx # static placeholder (active now)
    Header.tsx, Footer.tsx, ScrollToTop.tsx
    ProductModal.tsx
    ScrollStory.tsx     # panels composition
    panels/             # Intro / Journey / Packaging / About / Certificates / Contact
  config/
    i18n.ts             # locales list
    site.ts             # sales contacts
public/
  hero-frames/          # frame-001.jpg … frame-100.jpg (7.6 MB)
  hero-placeholder.jpg  # temporary hero background
  images/packs/         # product photos (100 g / 500 g / 1 kg / 5 kg)
```

## Локальная разработка

```bash
npm install
npm run dev
# http://localhost:3000  →  автоматический редирект на /en
```

Маршруты локалей: `/en`, `/de`, `/it`, `/fr`, `/cs`, `/ru`.

## Возврат к видео в hero

Когда видео/новые кадры будут готовы, в
`src/app/[lang]/page.tsx` поменяй две строчки импорта обратно:

```ts
// было
import HeroBackdrop from "@/components/HeroPlaceholder";
// станет
import HeroBackdrop from "@/components/HeroBackdrop";
```

`HeroBackdrop.tsx` и папка `public/hero-frames/` сохранены нетронутыми.

## Контент-источники

- Ботанические и производственные данные: [ecofactory.ru](https://ecofactory.ru/catalog/pine-nuts/)
- Сертификаты: EU Organic (Euroleaf), Роскачество, HACCP, ISO 22000
- Лицензия на экспорт в ЕС: №060RU20002005086

## Деплой

Проект готов к деплою на Vercel без дополнительных настроек. Env-переменные
не требуются (email-провайдер пока не подключён — см. `route.ts`).
