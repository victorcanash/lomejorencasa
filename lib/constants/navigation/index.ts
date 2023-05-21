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

  vacuumBlog: Page,
  cbdBlog: Page,

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

  vacuumBlog: {
    path: '/el-envasado-al-vacio',
    filepath: '/el-envasado-al-vacio',
    protection: Protections.none,
    type: PageTypes.main,
    savePathOnLogin: {
      enabled: true,
    },
  },
  cbdBlog: {
    path: '/CBD-y-el-insomnio',
    filepath: '/CBD-y-el-insomnio',
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

export const originRedirects: {
  from: string[],
  to: string,
} = {
  from: [
    'www.laenvasadora.es',
    'laenvasadora.com',
    'www.laenvasadora.com',
    'laenvasadora.online',
    'www.laenvasadora.online',
    'laenvasadora.site',
    'www.laenvasadora.site',
    'laenvasadora.store',
    'www.laenvasadora.store',
  ],
  to: 'https://laenvasadora.es',
};

export const mainNavDrawerItems: NavDrawerItems[] = [
  {
    text: {
      id: 'home',
    },
    path: pages.home.path,
    items: [],
  },
  {
    text: {
      id: 'shop',
    },
    items: [
      {
        text: {
          id: 'bags',
        },
        path: pages.bags.path,
      },
      {
        text: {
          id: 'everfresh',
        },
        path: pages.everfresh.path,
      },
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
  },
  {
    text: {
      id: 'orders',
    },
    path: pages.orders.path,
    items: [],
  },
  {
    text: {
      id: 'info',
    },
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
      {
        text: {
          id: 'faq',
        },
        path: pages.faq.path,
        divider: true,
      },
      {
        text: {
          id: 'vacuumBlog',
        },
        path: pages.vacuumBlog.path,
      },
      {
        text: {
          id: 'cbdBlog',
        },
        path: pages.cbdBlog.path,
      },
    ],
  },
];

export const loggedNavDrawerItems: NavDrawerItems[] = [
  {
    text: {
      id: 'loggedProfile',
    },
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
      },
    ],
  },
];

export const unloggedNavDrawerItems: NavDrawerItems[] = [
  {
    text: {
      id: 'unloggedProfile',
    },
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
  },
];

export const tiktokHref = 'https://www.tiktok.com/@laenvasadora';
export const instagramHref = 'https://www.instagram.com/laenvasadora/';
export const facebookHref = 'https://www.facebook.com/profile.php?id=100092231104587';
