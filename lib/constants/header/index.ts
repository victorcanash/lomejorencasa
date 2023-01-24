import { pages } from '@lib/constants/navigation';
import { DrawerItems } from '@core/types/header';

export const mainDrawerItems: DrawerItems[] = [
  {
    textId: 'home',
    path: pages.home.path,
    items: [],
    open: false,
  },
  {
    textId: 'shop',
    path: undefined,
    items: [
      {
        textId: 'everfresh',
        path: pages.everfresh.path,
      },
      {
        textId: 'bags',
        path: pages.bags.path,
      },
    ],
    open: false,
  },
  {
    textId: 'help',
    path: undefined,
    items: [
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
    ],
    open: false,
  },
];

export const loggedDrawerItems: DrawerItems[] = [
  {
    textId: 'profile',
    path: undefined,
    items: [
      {
        textId: 'orders',
        path: pages.orderList.path,
      },
      {
        textId: 'settings',
        path: pages.settings.path,
      },
      {
        textId: 'signOut',
        path: undefined,
      },
    ],
    open: false,
  },
];

export const unloggedDrawerItems: DrawerItems[] = [
  {
    textId: 'profile',
    path: undefined,
    items: [
      {
        textId: 'signIn',
        path: pages.login.path,
      },
      {
        textId: 'register',
        path: pages.register.path,
      },
    ],
    open: false,
  },
];
