import Album from '../screens/Album';
import Artist from '../screens/Artist';
import Playlist from '../screens/Playlist';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Search from '../components/Search';
import MainMenu from '../components/MainMenu';

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
  playlist: {
    path: '/playlist/:id',
    component: Playlist,
  },
  settings: {
    path: '/settings',
    component: Settings,
  },
  profile: {
    path: '/profile',
    component: Profile,
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
  },
  menu: {
    path: 'menu',
    component: MainMenu,
  },
};
