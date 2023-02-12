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
    savePathOnLogin: {
      enabled: true,
    },
  },
  productList: {
    path: '/collections',
    filepath: '/collections/[category]',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  productDetail: {
    path: '/products',
    filepath: '/products/[product]',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  everfresh: {
    path: '/everfresh',
    filepath: '/everfresh',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  bags: {
    path: '/bags',
    filepath: '/bags',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  about: {
    path: '/about',
    filepath: '/about',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  faq: {
    path: '/faq',
    filepath: '/faq',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  contact: {
    path: '/contact',
    filepath: '/contact',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },

  privacy: {
    path: '/privacy',
    filepath: '/privacy',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  cookies: {
    path: '/cookies',
    filepath: '/cookies',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  legal: {
    path: '/legal',
    filepath: '/legal',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  conditions: {
    path: '/conditions',
    filepath: '/conditions',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },

  cart: {
    path: '/cart',
    filepath: '/cart',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  checkout: {
    path: '/checkout',
    filepath: '/checkout',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
      path: '/cart',
    },
  },

  login: {
    path: '/login',
    filepath: '/login',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: false,
    },
  },
  register: {
    path: '/register',
    filepath: '/register',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: false,
    },
  },
  forgot: {
    path: '/forgot',
    filepath: '/forgot',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: false,
    },
  },
  
  orderList: {
    path: '/orders',
    filepath: '/orders',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  orderDetail: {
    path: '/orders',
    filepath: '/orders/[id]',
    protection: Protections.user,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
      path: '/orders',
    },
  },
  settings: {
    path: '/settings',
    filepath: '/settings',
    protection: Protections.user,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },

  activation: {
    path: '/activation',
    filepath: '/activation',
    protection: Protections.none,
    type: PageTypes.link,
    savePathOnLogin: {
      enabled: false,
    },
  },
  reset: {
    path: '/reset',
    filepath: '/reset',
    protection: Protections.none,
    type: PageTypes.link,
    savePathOnLogin: {
      enabled: false,
    },
  },
  newemail: {
    path: '/newemail',
    filepath: '/newemail',
    protection: Protections.none,
    type: PageTypes.link,
    savePathOnLogin: {
      enabled: false,
    },
  },
  
  admin: {
    path: '/admin',
    filepath: '/admin',
    protection: Protections.admin,
    type: PageTypes.admin,
    savePathOnLogin: {
      enabled: false,
    },
  },
};

export const mainDrawerItems: DrawerItems[] = [
  {
    text: {
      id: 'home',
    },
    path: pages.home.path,
    items: [],
    open: false,
  },
  {
    text: {
      id: 'shop',
    },
    path: undefined,
    items: [
      {
        text: {
          id: 'everfresh',
        },
        path: pages.everfresh.path,
      },
      {
        text: {
          id: 'bags',
        },
        path: pages.bags.path,
      },
    ],
    open: false,
  },
  {
    text: {
      id: 'help',
    },
    path: undefined,
    items: [
      {
        text: {
          id: 'contact',
        },
        path: pages.contact.path,
      },
      {
        text: {
          id: 'about',
        },
        path: pages.about.path,
      },
      {
        text: {
          id: 'faq',
        },
        path: pages.faq.path,
      },
    ],
    open: false,
  },
];

export const loggedDrawerItems: DrawerItems[] = [
  {
    text: {
      id: 'profile',
    },
    path: undefined,
    items: [
      {
        text: {
          id: 'orders',
        },
        path: pages.orderList.path,
      },
      {
        text: {
          id: 'settings',
        },
        path: pages.settings.path,
      },
      {
        text: {
          id: 'signOut',
        },
        path: undefined,
      },
    ],
    open: false,
  },
];

export const unloggedDrawerItems: DrawerItems[] = [
  {
    text: {
      id: 'profile',
    },
    path: undefined,
    items: [
      {
        text: {
          id: 'signIn',
        },
        path: pages.login.path,
      },
      {
        text: {
          id: 'register',
        },
        path: pages.register.path,
      },
    ],
    open: false,
  },
];
