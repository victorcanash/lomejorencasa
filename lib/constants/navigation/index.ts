import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import type { DrawerItems } from '@core/types/navigation';
import type { Pages } from '@lib/types/navigation';

export const pages: Pages = {
  home: {
    path: '/',
    filepath: '/',
    protection: Protections.none,
    type: PageTypes.main,
  },
  productList: {
    path: '/collections',
    filepath: '/collections/[category]',
    protection: Protections.none,
    type: PageTypes.main,
  },
  productDetail: {
    path: '/products',
    filepath: '/products/[product]',
    protection: Protections.none,
    type: PageTypes.main,
  },
  everfresh: {
    path: '/everfresh',
    filepath: '/everfresh',
    protection: Protections.none,
    type: PageTypes.main,
  },
  bags: {
    path: '/bags',
    filepath: '/bags',
    protection: Protections.none,
    type: PageTypes.main,
  },
  about: {
    path: '/about',
    filepath: '/about',
    protection: Protections.none,
    type: PageTypes.main,
  },
  faq: {
    path: '/faq',
    filepath: '/faq',
    protection: Protections.none,
    type: PageTypes.main,
  },
  contact: {
    path: '/contact',
    filepath: '/contact',
    protection: Protections.none,
    type: PageTypes.main,
  },

  privacy: {
    path: '/privacy',
    filepath: '/privacy',
    protection: Protections.none,
    type: PageTypes.main,
  },
  cookies: {
    path: '/cookies',
    filepath: '/cookies',
    protection: Protections.none,
    type: PageTypes.main,
  },
  legal: {
    path: '/legal',
    filepath: '/legal',
    protection: Protections.none,
    type: PageTypes.main,
  },
  conditions: {
    path: '/conditions',
    filepath: '/conditions',
    protection: Protections.none,
    type: PageTypes.main,
  },

  login: {
    path: '/login',
    filepath: '/login',
    protection: Protections.none,
    type: PageTypes.main,
  },
  register: {
    path: '/register',
    filepath: '/register',
    protection: Protections.none,
    type: PageTypes.main,
  },
  forgot: {
    path: '/forgot',
    filepath: '/forgot',
    protection: Protections.none,
    type: PageTypes.main,
  },
  
  cart: {
    path: '/cart',
    filepath: '/cart',
    protection: Protections.user,
    type: PageTypes.main,
  },
  checkout: {
    path: '/checkout',
    filepath: '/checkout',
    protection: Protections.user,
    type: PageTypes.main,
  },
  orderList: {
    path: '/orders',
    filepath: '/orders',
    protection: Protections.user,
    type: PageTypes.main,
  },
  orderDetail: {
    path: '/orders',
    filepath: '/orders/[id]',
    protection: Protections.user,
    type: PageTypes.main,
  },
  settings: {
    path: '/settings',
    filepath: '/settings',
    protection: Protections.user,
    type: PageTypes.main,
  },

  activation: {
    path: '/activation',
    filepath: '/activation',
    protection: Protections.none,
    type: PageTypes.link,
  },
  reset: {
    path: '/reset',
    filepath: '/reset',
    protection: Protections.none,
    type: PageTypes.link,
  },
  newemail: {
    path: '/newemail',
    filepath: '/newemail',
    protection: Protections.none,
    type: PageTypes.link,
  },
  
  admin: {
    path: '/admin',
    filepath: '/admin',
    protection: Protections.admin,
    type: PageTypes.admin,
  },
};

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
        path: pages.contact.path,
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
