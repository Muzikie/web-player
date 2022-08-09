import Home from '../screens/Home';
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
    path: '/album/:id',
    component: Album,
  },
  artist: {
    path: '/artist/:id',
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
  search: {
    path: '/search',
    component: Search,
  },
  home: {
    path: '/home',
    component: Home,
  },
  default: {
    path: '/',
    component: Home,
  },
};

export const modals: Route = {
  menu: {
    path: 'menu',
    component: MainMenu,
  },
};
