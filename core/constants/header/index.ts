import { DrawerItem } from '@core/types/header';

export enum Drawers {
  userDrawer = 'user-drawer',
  categoriesDrawer = 'categories-drawer',
}

export const loggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Profile',
    path: '/profile',
  },
  {
    text: 'Orders',
    path: '/orders',
  },
  {
    text: 'Sign out',
    path: '/logout',
  },
];

export const unloggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Sign in',
    path: '/login',
  },
  {
    text: 'Register',
    path: '/register',
  },
];
