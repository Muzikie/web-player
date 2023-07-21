export interface Route {
  location: string;
  type: string;
}

export const ROUTE_TYPES = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

export const ROUTES: Record<string, Route> = {
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

export const getRouteByPath = (pathname: string): Route => {
  const matchingRoute = Object.values(ROUTES).find(route => {
    const routeParts = route.location.split('/');
    const pathParts = pathname.split('/');

    if (routeParts.length !== pathParts.length) {
      return false;
    }

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(':')) {
        continue;
      }

      if (routePart !== pathPart) {
        return false;
      }
    }

    return true;
  });

  return matchingRoute || ROUTES.NOT_FOUND;
};

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.AGREEMENT,
];
