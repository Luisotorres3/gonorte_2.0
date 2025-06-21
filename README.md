# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})

## Folder Structure

Here's an overview of the key directories and their purposes:

-   `public/`: Contains static assets that are served directly.
-   `src/`: Main application source code.
    -   `src/components/`: Contains reusable React components.
        -   `src/components/layout/`: Components responsible for the overall page structure (e.g., `Navbar.tsx`, `Footer.tsx`, `MainLayout.tsx`).
        -   `src/components/ui/`: Smaller, general-purpose UI elements (e.g., `ThemeToggle.tsx`, buttons, modals).
    -   `src/contexts/`: Holds React Context API implementations for global state management (e.g., `ThemeContext.tsx`).
    -   `src/i18n/`: Contains the configuration for the `i18next` internationalization library (`config.ts`).
    -   `src/locales/`: Stores translation files (e.g., `en.json`, `es.json`, `fr.json`) for internationalization (i18n) using direct imports.
    -   `src/pages/`: Top-level components that represent different pages or views of the application (e.g., `HomePage.tsx`, `AboutPage.tsx`).
    -   `src/router/`: Defines the application's routing structure using `react-router-dom` (`index.tsx`).
    -   `src/styles/`: Global stylesheets and Tailwind CSS setup (`index.css`).
    -   `src/App.tsx`: The root React component that sets up the router.
    -   `src/main.tsx`: The main entry point of the application, rendering the root component.

**Suggested Additions (if needed):**

-   `src/assets/`: For static assets like images, SVGs, and custom fonts that are imported into components.
-   `src/hooks/`: For custom React hooks that can be reused across multiple components.
-   `src/utils/`: For general utility functions that are not specific to any single component.
```
