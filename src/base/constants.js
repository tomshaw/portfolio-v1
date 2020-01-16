// ==========================================================================
// Constants
// ==========================================================================

export const PRODUCTION_ENV = false;
export const USER_NAME = 'tomshaw';
export const BASE_PATH = 'https://tomshaw.us';
export const API_BASE_PATH = PRODUCTION_ENV ? BASE_PATH : 'http://tomshaw.dev';

export const API_GITHUB_EVENTS = 'https://api.github.com/users/tomshaw/events?per_page=10';
export const API_GITHUB_EVENTS_PUBLIC = 'https://api.github.com/users/tomshaw/events/public?per_page=10';

// Pre polyfilled in create-react-app
export const POLYFILL_PROMISES = true;
export const POLYFILL_FETCH = true;

export const APP_TOKEN_KEY = 'APP_TOKEN_KEY';