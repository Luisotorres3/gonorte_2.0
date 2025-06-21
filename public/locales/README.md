# Managing Translations

This directory contains the JSON files used for internationalization (i18n) in the application, powered by `i18next`.

## File Structure

Each supported language has its own JSON file named after its language code (e.g., `en.json` for English, `es.json` for Spanish). The application is currently configured to load these files from `public/locales/{lng}.json`, where `{lng}` is the language code.

Current files:
- `en.json` (English translations)
- `es.json` (Spanish translations)

## Adding a New Language

1.  **Create the JSON File**:
    *   Add a new JSON file in this directory, named with the new language code (e.g., `fr.json` for French).
    *   Copy the structure and keys from an existing file (like `en.json`) and translate the values into the new language.

2.  **Update i18n Configuration**:
    *   Open `src/i18n/config.ts`.
    *   Add the new language code to the `supportedLngs` array within the `i18n.init({...})` options. For example:
        ```typescript
        supportedLngs: ['en', 'es', 'fr'], // Added 'fr'
        ```

3.  **Update Language Selector (Optional but Recommended)**:
    *   If you want users to be able to select this new language from the UI, update the `LanguageSelector` component located at `src/components/ui/LanguageSelector.tsx`.
    *   Add a new button for the language, similar to the existing ones for "EN" and "ES".

## Adding New Translation Keys

1.  **Define the Key**:
    *   Choose a descriptive key for your new text string (e.g., `myNewFeature.title`). It's good practice to use a consistent naming convention, possibly grouping related keys (e.g., `settings.darkMode`, `settings.language`).

2.  **Add to All Language Files**:
    *   Open each language JSON file in this directory (e.g., `en.json`, `es.json`).
    *   Add the new key and its corresponding translated value to each file.
        *   Example for `en.json`:
            ```json
            {
              "myNewFeature.title": "My New Feature Title"
            }
            ```
        *   Example for `es.json`:
            ```json
            {
              "myNewFeature.title": "Título de Mi Nueva Funcionalidad"
            }
            ```
    *   Ensure the key is identical in all files.

## Using Translations in Components

To use a translation key in your React components:

1.  **Import `useTranslation`**:
    ```typescript
    import { useTranslation } from 'react-i18next';
    ```

2.  **Get the `t` function**:
    ```typescript
    const MyComponent: React.FC = () => {
      const { t } = useTranslation();
      // ...
    };
    ```

3.  **Use the `t` function with your key**:
    ```typescript
    return (
      <h1>{t('myNewFeature.title')}</h1>
    );
    ```

The `t` function will automatically return the string corresponding to the current active language. If a key is missing for the active language (but present in the fallback language), `i18next` will typically use the fallback language's string. It's best practice to ensure all keys are present in all supported language files.
