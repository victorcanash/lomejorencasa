import { pages } from '@core/config/navigation.config';
import { DrawerItem } from '@core/types/header';

export enum Drawers {
  userDrawer = 'user-drawer',
  categoriesDrawer = 'categories-drawer',
}

export const loggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Your profile',
    path: pages.myaccount.path,
  },
  {
    text: 'Orders',
    path: pages.orders.path,
  },
  {
    text: 'Sign out',
    path: undefined,
  },
];

export const unloggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Sign in',
    path: pages.login.path,
  },
  {
    text: 'Register',
    path: pages.register.path,
  },
];
