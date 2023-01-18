import { pages } from '@core/config/navigation.config';
import { DrawerItem } from '@core/types/header';

export const mainDrawerItems: DrawerItem[] = [
  {
    textId: 'home',
    path: pages.home.path,
  },
  {
    textId: 'everfresh',
    path: pages.everfresh.path,
  },
  {
    textId: 'bags',
    path: pages.bags.path,
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

export const infoDrawerItems: DrawerItem[] = [
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

export const signOutDrawerItem: DrawerItem = {
  textId: 'signOut',
  path: undefined,
}
