import { pages } from '@core/config/navigation.config';
import { DrawerItem } from '@core/types/header';

export enum Drawers {
  userDrawer = 'user-drawer',
  appDrawer = 'app-drawer',
}

export const appDrawerItems: DrawerItem[] = [
  {
    textId: 'home',
    path: pages.home.path,
  },
  {
    textId: 'everfresh',
    path: pages.home.path,
  },
  {
    textId: 'contact',
    path: pages.home.path,
  },
  {
    textId: 'about',
    path: pages.about.path,
  },
  {
    textId: 'faq',
    path: pages.faq.path,
  },
];

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
