# Gonorte 2.0

Landing web app for Gonorte Training built with React, TypeScript and Vite, with multilingual routes and content.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- React Router v7 (`createBrowserRouter`)
- i18next (`es`, `en`, `fr`)
- Framer Motion

## Scripts

- `npm run dev`: start development server
- `npm run build`: type-check and production build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint
- `npm run clean:deploy-cache`: clear stale gh-pages cache
- `npm run deploy`: deploy `dist/` to GitHub Pages

## Project structure

```text
src/
   components/
      landing/home/         # Home sections
      layout/               # Navbar, Footer, MainLayout
      motion/               # Animated wrappers
      ui/                   # Shared UI components
   contexts/               # Theme/Auth providers
   hooks/                  # Custom hooks
   i18n/                   # i18n initialization
   pages/                  # Route pages
   router/                 # Route config + i18n helpers
   styles/                 # Global CSS and tokens
   utils/                  # Shared utilities
public/
   locales/                # es.json, en.json, fr.json
   images/
scripts/                  # Maintenance scripts
```

## Routing and i18n

- Language-prefixed routes: `/{lang}/...`
- Supported languages: `es`, `en`, `fr`
- Route translation source: `src/router/routes.config.ts`
- Localized route content: `public/locales/*.json`

Examples:

- Spanish: `/es/plan`, `/es/analisis`, `/es/testimonios`
- English: `/en/plan`, `/en/analysis`, `/en/testimonials`
- French: `/fr/plan`, `/fr/analyse-posturale`, `/fr/temoignages`

Legacy redirects are kept for previous slugs (`services`, `resources`, etc.).

## Notes

- Authentication and protected dashboards are currently disabled and redirected to home.
- Deployment target is GitHub Pages using the configured `homepage` path.

## Documentation

- See `docs/README.md` for the documentation index.
- Main guides are under `docs/`.

## License

Private and proprietary project.
