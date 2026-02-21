# How to Access Routes

## Important: BrowserRouter URLs

This application uses **BrowserRouter** (`createBrowserRouter`) with a language prefix.

## URL Structure

All URLs follow this pattern:

```
https://your-domain.com/{language}/{route}
```

## Examples

### Public Routes

| Page         | Spanish           | English            | French                  |
| ------------ | ----------------- | ------------------ | ----------------------- |
| Home         | `/es`             | `/en`              | `/fr`                   |
| Plan         | `/es/plan`        | `/en/plan`         | `/fr/plan`              |
| Analysis     | `/es/analisis`    | `/en/analysis`     | `/fr/analyse-posturale` |
| About        | `/es/acerca-de`   | `/en/about`        | `/fr/a-propos`          |
| Contact      | `/es/contacto`    | `/en/contact`      | `/fr/contact`           |
| Testimonials | `/es/testimonios` | `/en/testimonials` | `/fr/temoignages`       |

### Auth Routes

| Page     | Spanish              | English        | French            |
| -------- | -------------------- | -------------- | ----------------- |
| Login    | `/es/iniciar-sesion` | `/en/login`    | `/fr/connexion`   |
| Register | `/es/registrarse`    | `/en/register` | `/fr/inscription` |

### Admin Routes (Protected)

| Page     | Spanish                   | English              | French                   |
| -------- | ------------------------- | -------------------- | ------------------------ |
| Users    | `/es/admin/usuarios`      | `/en/admin/users`    | `/fr/admin/utilisateurs` |
| Plans    | `/es/admin/planes`        | `/en/admin/plans`    | `/fr/admin/plans`        |
| Settings | `/es/admin/configuracion` | `/en/admin/settings` | `/fr/admin/parametres`   |

### Client Dashboard Routes (Protected)

| Page          | Spanish                  | English                | French                       |
| ------------- | ------------------------ | ---------------------- | ---------------------------- |
| Dashboard     | `/es/panel/client`       | `/en/dashboard/client` | `/fr/tableau-de-bord/client` |
| Training Plan | `/es/plan-entrenamiento` | `/en/training-plan`    | `/fr/plan-entrainement`      |

## Common Issues

### ❌ 404 Error on direct deep link

**Problem**: Wrong base path in production deployment.
**Solution**: Verify `homepage` in `package.json` and `BASE_URL` behavior in Vite deployment.

### ❌ Route not found

**Problem**: Wrong localized slug for the current language.
**Solution**: Use `getLocalizedRoute()` from `src/router/routes.config.ts`.

### ❌ Route not found

**Problem**: The route might be nested or have a different translation
**Solution**: Check the full route path in the examples above

## Development

When testing locally with `npm run dev`, use:

- `http://localhost:5173/es` for Spanish
- `http://localhost:5173/en` for English
- `http://localhost:5173/fr` for French

## Production

On GitHub Pages, use:

- `https://yourusername.github.io/gonorte_2.0/es`
- `https://yourusername.github.io/gonorte_2.0/en`
- `https://yourusername.github.io/gonorte_2.0/fr`

## Routing source of truth

- Route localization keys and slugs: `src/router/routes.config.ts`
- Router setup and legacy redirects: `src/router/index.tsx`
