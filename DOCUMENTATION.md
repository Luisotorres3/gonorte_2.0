# Project Documentation

## Architecture Overview

### Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 6.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.6
- **Animation**: Framer Motion 12.18
- **Backend**: Firebase (Auth, Firestore, Storage, Analytics)
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

#### Route Protection

Private routes are protected using the `PrivateRoute` component which:

- Checks authentication status
- Validates user roles
- Redirects unauthorized users

### State Management

#### Local State

- Component-specific state using `useState`
- Form state and UI interactions

#### Context State

- Theme preferences (persisted in localStorage)
- Authentication state (synced with Firebase)
- User profile data

#### Server State

- Firebase Firestore for real-time data
- Optimistic updates where appropriate
- Error handling and loading states

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

### Firebase Structure

#### Collections

- `users`: User profiles with roles and metadata
- `trainingPlans`: Training plan templates
- `sessions`: Training session records
- `notifications`: User notifications

#### Security Rules

- Role-based access control
- User can only read/write their own data
- Coaches can access their assigned clients
- Admins have full access

### Performance Optimization

#### Code Splitting

- Lazy loading of route components
- Dynamic imports for heavy components

#### Asset Optimization

- WebP images with fallbacks
- SVG icons for scalability
- Optimized bundle size

#### Caching Strategy

- Service worker for offline support
- LocalStorage for preferences
- Firebase caching for offline data

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

#### Unit Tests

- Utility functions
- Custom hooks
- Pure components

#### Integration Tests

- User flows
- Authentication
- Form submissions

#### E2E Tests

- Critical user journeys
- Cross-browser compatibility

### Deployment

#### GitHub Pages

- Automated deployment via GitHub Actions
- Base path configuration for subdirectory hosting
- Environment variable management

#### Build Process

1. TypeScript compilation
2. Asset optimization
3. Bundle generation
4. Deployment to hosting

### Environment Variables

All Firebase configuration is stored in environment variables:

- Never commit `.env` file
- Use `.env.example` as template
- Update environment variables in hosting platform

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

- [ ] Implement comprehensive error boundaries
- [ ] Add unit tests for critical components
- [ ] Implement progressive web app features
- [ ] Add analytics dashboard
- [ ] Improve SEO with meta tags
- [ ] Add sitemap generation
- [ ] Implement rate limiting for API calls
- [ ] Add data export functionality
