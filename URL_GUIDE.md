# How to Access Routes

## Important: HashRouter URLs

This application uses **HashRouter** which requires the `#` symbol in URLs. This is necessary for deployment on GitHub Pages.

## URL Structure

All URLs follow this pattern:

```
http://your-domain.com/#/{language}/{route}
```

## Examples

### Public Routes

| Page         | Spanish            | English             | French             |
| ------------ | ------------------ | ------------------- | ------------------ |
| Home         | `#/es`             | `#/en`              | `#/fr`             |
| Services     | `#/es/servicios`   | `#/en/services`     | `#/fr/services`    |
| About        | `#/es/acerca-de`   | `#/en/about`        | `#/fr/a-propos`    |
| Contact      | `#/es/contacto`    | `#/en/contact`      | `#/fr/contact`     |
| Testimonials | `#/es/testimonios` | `#/en/testimonials` | `#/fr/temoignages` |

### Auth Routes

| Page     | Spanish               | English         | French             |
| -------- | --------------------- | --------------- | ------------------ |
| Login    | `#/es/iniciar-sesion` | `#/en/login`    | `#/fr/connexion`   |
| Register | `#/es/registrarse`    | `#/en/register` | `#/fr/inscription` |

### Admin Routes (Protected)

| Page     | Spanish                    | English               | French                    |
| -------- | -------------------------- | --------------------- | ------------------------- |
| Users    | `#/es/admin/usuarios`      | `#/en/admin/users`    | `#/fr/admin/utilisateurs` |
| Plans    | `#/es/admin/planes`        | `#/en/admin/plans`    | `#/fr/admin/plans`        |
| Settings | `#/es/admin/configuracion` | `#/en/admin/settings` | `#/fr/admin/parametres`   |

### Client Dashboard Routes (Protected)

| Page          | Spanish                   | English                 | French                        |
| ------------- | ------------------------- | ----------------------- | ----------------------------- |
| Dashboard     | `#/es/panel/client`       | `#/en/dashboard/client` | `#/fr/tableau-de-bord/client` |
| Training Plan | `#/es/plan-entrenamiento` | `#/en/training-plan`    | `#/fr/plan-entrainement`      |

## Common Issues

### ❌ 404 Error when accessing `/planes`

**Problem**: Trying to access without the `#` symbol
**Solution**: Use `#/es/admin/planes` instead

### ❌ Page refreshes but URL doesn't change

**Problem**: Browser might be caching or trying to navigate without hash
**Solution**: Always include `#` in your URLs

### ❌ Route not found

**Problem**: The route might be nested or have a different translation
**Solution**: Check the full route path in the examples above

## Development

When testing locally with `npm run dev`, use:

- `http://localhost:5173/#/es` for Spanish
- `http://localhost:5173/#/en` for English
- `http://localhost:5173/#/fr` for French

## Production

On GitHub Pages, use:

- `https://yourusername.github.io/gonorte_2.0/#/es`
- `https://yourusername.github.io/gonorte_2.0/#/en`
- `https://yourusername.github.io/gonorte_2.0/#/fr`

## Switching to BrowserRouter (Optional)

If you want clean URLs without `#`, you can switch to `BrowserRouter`, but you'll need:

1. Server-side configuration to handle SPA routing
2. A different hosting setup (not GitHub Pages)
3. Update `src/router/index.tsx` to use `createBrowserRouter`
