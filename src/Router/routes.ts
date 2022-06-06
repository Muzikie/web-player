import Album from '../screens/Album';
import Artist from '../screens/Artist';
import Search from '../components/Search';

interface Route {
  [key: string]: {
    path: string;
    component: () => JSX.Element;
  }
}

export const screens: Route = {
  album: {
    path: '/albums/:id',
    component: Album,
  },
  artist: {
    path: '/artists/:id',
    component: Artist,
  },
  settings: {
    path: '/settings',
    component: Artist,
  },
  profile: {
    path: '/profile',
    component: Artist,
  },
  home: {
    path: '/home',
    component: Artist,
  },
  default: {
    path: '/',
    component: Artist,
  },
};

export const modals: Route = {
  search: {
    path: 'search',
    component: Search,
  }
};
