import { RouterPaths } from '@core/constants/navigation';
import { DrawerItem } from '@core/types/header';

export enum Drawers {
  userDrawer = 'user-drawer',
  categoriesDrawer = 'categories-drawer',
}

export const loggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Your profile',
    path: RouterPaths.myaccount,
  },
  {
    text: 'Orders',
    path: RouterPaths.orders,
  },
  {
    text: 'Sign out',
    path: undefined,
  },
];

export const unloggedUserDrawerItems: DrawerItem[] = [
  {
    text: 'Sign in',
    path: RouterPaths.login,
  },
  {
    text: 'Register',
    path: RouterPaths.register,
  },
];
