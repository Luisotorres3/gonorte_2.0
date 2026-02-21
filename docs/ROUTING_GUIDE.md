# Internationalized Routing Guide

This document explains how to use the internationalized routing system in this application.

## Overview

The application now supports language-dependent routes. For example:

- Spanish: `/es/plan`
- English: `/en/plan`
- French: `/fr/plan`

## How It Works

### 1. Route Translations

All route translations are stored in the locale files (`public/locales/*.json`) under the `routes` object:

```json
{
  "routes": {
    "home": "",
    "about": "about",
    "services": "plan",
    ...
  }
}
```

### 2. Router Configuration

The router (`src/router/index.tsx`) automatically generates routes for all supported languages (`es`, `en`, `fr`). Each language gets its own route tree with localized paths.

### 3. Navigation

#### Using NavLink or Link Components

Always use the `getLocalizedRoute` helper function with the current language:

```tsx
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getLocalizedRoute } from "../../router/routes.config";

function MyComponent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "es";

  return (
    <NavLink to={getLocalizedRoute("services", currentLang)}>Plan</NavLink>
  );
}
```

#### Using Programmatic Navigation

Use the `useLocalizedNavigate` custom hook:

```tsx
import { useLocalizedNavigate } from "../../hooks/useLocalizedNavigation";

function MyComponent() {
  const { navigateTo } = useLocalizedNavigate();

  const handleClick = () => {
    navigateTo("services");
  };

  return <button onClick={handleClick}>Go to Services</button>;
}
```

For routes with parameters:

```tsx
navigateTo("profile", { userId: "123" });
```

### 4. Language Switching

The `LanguageSelector` component automatically handles navigation when changing languages. It translates the current route to the equivalent in the new language.

## Updating Existing Pages

To update pages that still use hardcoded routes:

1. Import the necessary utilities:

```tsx
import { useTranslation } from "react-i18next";
import { getLocalizedRoute } from "../../router/routes.config";
// or
import { useLocalizedNavigate } from "../../hooks/useLocalizedNavigation";
```

2. Get the current language:

```tsx
const { i18n } = useTranslation();
const currentLang = i18n.language || "es";
```

3. Replace hardcoded paths:

```tsx
// Before
<Link to="/services">Services</Link>;
navigate("/services");

// After
<Link to={getLocalizedRoute("services", currentLang)}>Services</Link>;
const { navigateTo } = useLocalizedNavigate();
navigateTo("services");
```

## Available Route Keys

All available route keys can be found in `src/router/routes.config.ts`:

- `home`, `about`, `projects`, `catalog`, `services`, `resources`, `legal`, `testimonials`
- `contact`, `booking`, `videoCall`, `login`, `register`, `forgotPassword`, `privacy`
- `profile`, `dashboard`, `trainingPlan`, `trainingHistory`, `notifications`
- `settings`, `analytics`, `schedule`, `admin`, `users`, `plans`

## Adding New Routes

1. Add the route key to the type in `src/router/routes.config.ts`
2. Add translations in all locale files (`es.json`, `en.json`, `fr.json`)
3. Add the route to `generateLocalizedRoutes` in `src/router/index.tsx`
4. Use `getLocalizedRoute` or `useLocalizedNavigate` to navigate to it

## Examples

### Simple Page Link

```tsx
<NavLink to={getLocalizedRoute("about", currentLang)}>{t("navAbout")}</NavLink>
```

### Dashboard with Dynamic Path

```tsx
const videoCallPath = getLocalizedRoute("videoCall", currentLang);
<NavLink to={videoCallPath}>{t("bookCallTitle")}</NavLink>;
```

### Profile with User ID

```tsx
const profilePath = getLocalizedRoute("profile", currentLang).replace(
  ":userId",
  userId
);
<NavLink to={profilePath}>Profile</NavLink>;
```
