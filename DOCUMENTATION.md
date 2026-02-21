# Project Documentation

## Architecture Overview

### Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 6.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.6
- **Animation**: Framer Motion 12.18
- **Internationalization**: i18next 25.2

### Design Patterns

#### Context Pattern

The application uses React Context for global state management:

- `ThemeContext`: Manages light/dark theme switching
- `AuthContext`: Handles authentication state and user profile

#### Component Composition

Components are organized by feature and responsibility:

- `components/layout`: Layout components (Navbar, Footer, MainLayout)
- `components/ui`: Reusable UI components (Logo, ThemeToggle, etc.)
- `components/landing`: Landing page specific sections
- `components/motion`: Animation wrappers and utilities

#### Routing

- Router is implemented with `createBrowserRouter` in `src/router/index.tsx`
- Language-aware routes are generated from `src/router/routes.config.ts`
- Legacy slug redirects are preserved for backwards compatibility

### State Management

#### Local State

- Component-specific state using `useState`
- Form state and UI interactions

#### Context State

- Theme preferences (persisted in localStorage)
- Authentication state (synced with Firebase)
- User profile data

#### Server State

- Current public flow is mostly static content + local UI state.
- Auth context is present but authentication actions are currently disabled.

### Code Organization

#### File Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE for exports
- Types: PascalCase (e.g., `UserProfile`)

#### Import Order

1. React and React-related imports
2. Third-party libraries
3. Internal utilities and constants
4. Components
5. Types
6. Styles
7. Assets

### Authentication State

- `AuthContext` currently exposes disabled login methods and safe no-op logout behavior.
- Related protected routes are redirected to language home while public pages remain active.

### Performance Optimization

#### Code Splitting

- Lazy loading of route components
- Dynamic imports for heavy components

#### Asset Optimization

- WebP images with fallbacks
- SVG icons for scalability
- Optimized bundle size

#### Caching Strategy

- LocalStorage is used for preferences (theme and selected language behavior).
- Static assets are cached by the browser/CDN depending on hosting headers.

### Accessibility

#### ARIA Standards

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support

#### Theme Support

- High contrast mode compatible
- Respects user's color scheme preference
- Accessible color combinations

### Internationalization

#### Supported Languages

- English (en)
- Spanish (es) - Default
- French (fr)

#### Translation Management

- Centralized translation files in `public/locales`
- Lazy loading of translations
- Fallback to default language

### Testing Strategy

Current repository has no dedicated automated test suite configured.

### Deployment

#### GitHub Pages

- Deployment target is GitHub Pages using `gh-pages` package and `npm run deploy`.
- Base path is derived from `homepage` in `package.json`.

#### Build Process

1. TypeScript compilation
2. Asset optimization
3. Bundle generation
4. Deployment to hosting

### Environment Variables

- No required runtime secrets are currently documented for core public pages.
- Keep `.env` out of version control if new integrations are added.

### Development Workflow

#### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

#### Commit Messages

Follow conventional commits:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/config changes

### Troubleshooting

#### Common Issues

1. **Translation not loading**: Check network tab for locale file requests
2. **Firebase errors**: Verify environment variables are set correctly
3. **Build failures**: Clear `node_modules` and reinstall dependencies
4. **Type errors**: Run `npm run build` to check all type errors

### Future Improvements

- [ ] Add automated tests for routing and i18n regressions
- [ ] Add CI checks for missing translation keys
- [ ] Consolidate remaining legacy docs to a single source of truth
