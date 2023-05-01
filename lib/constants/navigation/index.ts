import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import type { Page } from '@core/types/navigation';
import type { NavDrawerItems } from '@core/types/navigation';
import { getLandingPathByConfig } from '@core/utils/products';

import inventoryConfig from '@lib/constants/products';

export const pages: {
  home: Page,
  productList: Page,
  productDetail: Page,
  everfresh: Page,
  bags: Page,
  everfreshPack: Page,
  bagsPack: Page,
  about: Page,
  faq: Page,
  cart: Page,
  checkout: Page,

  privacy: Page,
  cookies: Page,
  legal: Page,
  conditions: Page,

  login: Page,
  register: Page,
  forgot: Page,
  
  contact: Page,
  resolutions: Page,
  orders: Page,
  settings: Page,

  activation: Page,
  reset: Page,
  newemail: Page,
  
  admin: Page,
} = {
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
    path: getLandingPathByConfig(inventoryConfig.vacuumMachine),
    filepath: '/productos/[landing]',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  bags: {
    path: getLandingPathByConfig(inventoryConfig.vacuumBags),
    filepath: '/productos/[landing]',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  everfreshPack: {
    path: getLandingPathByConfig(inventoryConfig.vacuumPack),
    filepath: '/productos/[landing]',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  bagsPack: {
    path: getLandingPathByConfig(inventoryConfig.vacuumBagsPack),
    filepath: '/productos/[landing]',
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
    path: '/preguntas-frequentes',
    filepath: '/preguntas-frequentes',
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
      path: '/checkout',
    },
    redirectPathOnLogout: '/',
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
  
  contact: {
    path: '/contacto',
    filepath: '/contacto',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  resolutions: {
    path: '/resolutions',
    filepath: '/resolutions',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  orders: {
    path: '/orders',
    filepath: '/orders',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
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

export const mainNavDrawerItems: NavDrawerItems[] = [
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
      id: 'bags',
    },
    path: pages.bags.path,
    items: [],
    open: false,
  },
  {
    text: {
      id: 'everfresh',
    },
    path: pages.everfresh.path,
    items: [],
    open: false,
  },
  {
    text: {
      id: 'packs',
    },
    path: undefined,
    items: [
      {
        text: {
          id: 'bagsPack',
        },
        path: pages.bagsPack.path,
      },
      {
        text: {
          id: 'everfreshPack',
        },
        path: pages.everfreshPack.path,
      },
    ],
    open: false,
  },
  {
    text: {
      id: 'orders',
    },
    path: pages.orders.path,
    items: [],
    open: false,
  },
  {
    text: {
      id: 'faq',
    },
    path: pages.faq.path,
    items: [],
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
          id: 'resolutions',
        },
        path: pages.resolutions.path,
      },
      {
        text: {
          id: 'about',
        },
        path: pages.about.path,
      },
    ],
    open: false,
  },
];

export const loggedNavDrawerItems: NavDrawerItems[] = [
  {
    text: {
      id: 'loggedProfile',
    },
    path: undefined,
    items: [
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

export const unloggedNavDrawerItems: NavDrawerItems[] = [
  {
    text: {
      id: 'unloggedProfile',
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

export const tiktokHref = 'https://www.tiktok.com/@laenvasadora';
export const instagramHref = 'https://www.instagram.com/laenvasadora/';
export const facebookHref = 'https://www.facebook.com/profile.php?id=100092231104587';
