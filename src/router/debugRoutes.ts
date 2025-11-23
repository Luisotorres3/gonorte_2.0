/**
 * @file router/debugRoutes.ts
 * @description Utility to debug and verify route generation
 */

import { SUPPORTED_LANGUAGES, getLocalizedPath } from './routes.config';

/**
 * Log all generated routes for debugging
 */
export const debugRoutes = () => {
  console.group('🔍 Route Debug Information');
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    console.group(`Language: ${lang}`);
    
    const routes = [
      'home', 'about', 'projects', 'catalog', 'services', 'legal', 
      'testimonials', 'contact', 'booking', 'login', 'register', 
      'forgotPassword', 'privacy', 'profile', 'dashboard', 'trainingPlan',
      'trainingHistory', 'notifications', 'settings', 'analytics', 
      'schedule', 'admin', 'users', 'plans'
    ];
    
    routes.forEach(routeKey => {
      const path = getLocalizedPath(routeKey as any, lang);
      const fullPath = path ? `/${lang}/${path}` : `/${lang}`;
      console.log(`${routeKey}: ${fullPath}`);
    });
    
    console.groupEnd();
  });
  
  console.groupEnd();
};
