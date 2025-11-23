/**
 * @file hooks/useLocalizedNavigation.ts
 * @description Custom hooks for handling localized navigation and routing
 */

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute, type RouteKey } from '../router/routes.config';

/**
 * Hook to navigate to localized routes
 * @returns Object with localized navigation functions
 */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  /**
   * Navigate to a localized route
   * @param routeKey - The route key to navigate to
   * @param params - Optional URL parameters (e.g., { userId: '123' })
   */
  const navigateTo = (routeKey: RouteKey, params?: Record<string, string>) => {
    let path = getLocalizedRoute(routeKey, i18n.language);
    
    // Replace params in path if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value);
      });
    }
    
    navigate(path);
  };

  /**
   * Get the localized path without navigating
   * @param routeKey - The route key
   * @param params - Optional URL parameters
   * @returns The full localized path
   */
  const getPath = (routeKey: RouteKey, params?: Record<string, string>): string => {
    let path = getLocalizedRoute(routeKey, i18n.language);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value);
      });
    }
    
    return path;
  };

  return { navigateTo, getPath };
};

/**
 * Hook to get the current localized path
 * @returns The current localized path
 */
export const useCurrentLocalizedPath = (routeKey: RouteKey): string => {
  const { i18n } = useTranslation();
  return getLocalizedRoute(routeKey, i18n.language);
};
