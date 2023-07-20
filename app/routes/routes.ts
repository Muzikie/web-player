export const ROUTES = {
  HOME: '/',
  AGREEMENT: '/agreement',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  SEARCH: '/search',
  SETTINGS: '/settings',
  COLLECTION: '/collection:/id',
  PLAYLIST: '/playlist/:id',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile/:id',
  SUBSCRIPTION_ACTIVE: '/subscription/active',
  SUBSCRIPTION_PURCHASE: '/subscription/purchase',
  UPLOAD_COLLECTION: '/upload/collection',
  UPLOAD_AUDIO: '/upload/audio',
};

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.AGREEMENT,
];
