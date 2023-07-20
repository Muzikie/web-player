export const ROUTE_TYPES = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

export const ROUTES = {
  HOME: {
    location: '/',
    type: ROUTE_TYPES.PRIVATE,
  },
  AGREEMENT: {
    location: '/agreement',
    type: ROUTE_TYPES.PUBLIC,
  },
  LOGIN: {
    location: '/login',
    type: ROUTE_TYPES.PUBLIC,
  },
  LOGOUT: {
    location: '/logout',
    type: ROUTE_TYPES.PRIVATE,
  },
  REGISTER: {
    location: '/register',
    type: ROUTE_TYPES.PUBLIC,
  },
  SEARCH: {
    location: '/search',
    type: ROUTE_TYPES.PRIVATE,
  },
  SETTINGS: {
    location: '/settings',
    type: ROUTE_TYPES.PRIVATE,
  },
  COLLECTION: {
    location: '/collection:/id',
    type: ROUTE_TYPES.PRIVATE,
  },
  PLAYLIST: {
    location: '/playlist/:id',
    type: ROUTE_TYPES.PRIVATE,
  },
  DASHBOARD: {
    location: '/dashboard',
    type: ROUTE_TYPES.PRIVATE,
  },
  PROFILE: {
    location: '/profile/:id',
    type: ROUTE_TYPES.PRIVATE,
  },
  SUBSCRIPTION_ACTIVE: {
    location: '/subscription/active',
    type: ROUTE_TYPES.PRIVATE,
  },
  SUBSCRIPTION_PURCHASE: {
    location: '/subscription/purchase',
    type: ROUTE_TYPES.PRIVATE,
  },
  UPLOAD_COLLECTION: {
    location: '/upload/collection',
    type: ROUTE_TYPES.PRIVATE,
  },
  UPLOAD_AUDIO: {
    location: '/upload/audio',
    type: ROUTE_TYPES.PRIVATE,
  },
  NOT_FOUND: {
    location: '/404',
    type: ROUTE_TYPES.PUBLIC,
  },
};

export const getRouteByPath = (path: string) => {
  const route = Object.values(ROUTES).find((route) => route.location === path);

  if (!route) {
    return ROUTES.NOT_FOUND;
  }

  return route;
};

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.AGREEMENT,
];
