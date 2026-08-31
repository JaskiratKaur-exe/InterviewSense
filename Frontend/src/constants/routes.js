/**
 * Application Route Paths
 * Centralized constants dictionary to prevent hardcoded magic strings.
 */
export const ROUTES = Object.freeze({
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Protected Application Routes
  DASHBOARD: '/dashboard',
  MOCK_INTERVIEW: '/mock-interview',
  LIVE_SESSION: '/interview/session',
  REPORTS: '/reports',
  REPORT_DETAIL: (id = ':reportId') => `/reports/${id}`,
  PROGRESS: '/progress',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Fallback
  NOT_FOUND: '*',
});
