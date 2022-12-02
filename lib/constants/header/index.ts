import { pages } from '@core/config/navigation.config';
import { DrawerItem } from '@core/types/header';

export enum Drawers {
  userDrawer = 'user-drawer',
  categoriesDrawer = 'categories-drawer',
}

export const loggedUserDrawerItems: DrawerItem[] = [
  {
    textId: 'profile',
    path: pages.myaccount.path,
  },
  {
    textId: 'orders',
    path: pages.orderList.path,
  },
  {
    textId: 'signOut',
    path: undefined,
  },
];

export const unloggedUserDrawerItems: DrawerItem[] = [
  {
    textId: 'signIn',
    path: pages.login.path,
  },
  {
    textId: 'register',
    path: pages.register.path,
  },
];
