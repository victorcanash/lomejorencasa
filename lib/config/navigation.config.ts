import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import type { Page } from '@core/types/navigation';

const navigationConfig: {
  pages: {
    home: Page,
    collections: Page,
    products: Page,
    offers: Page,
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
    resendActivation: Page,
    
    contact: Page,
    resolutions: Page,
    orders: Page,
    settings: Page,
  
    activation: Page,
    reset: Page,
    newemail: Page,
    
    admin: Page,
  },
  originRedirects: {
    from: string[],
    to: string,
  },
  socialPaths: {
    tiktok: string,
    instagram: string,
    facebook: string,
  },
} = {
  pages: {
    home: {
      path: '/',
      filepath: '/',
      protection: Protections.none,
      type: PageTypes.main,
      savePathOnLogin: {
        enabled: true,
      },
    },
    collections: {
      path: '/colecciones',
      filepath: '/colecciones/index',
      protection: Protections.none,
      type: PageTypes.main,
      savePathOnLogin: {
        enabled: true,
      },
    },
    products: {
      path: '/colecciones/todo',
      filepath: '/colecciones/todo',
      protection: Protections.none,
      type: PageTypes.main,
      savePathOnLogin: {
        enabled: true,
      },
    },
    offers: {
      path: '/colecciones/ofertas',
      filepath: '/colecciones/ofertas',
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
    resendActivation: {
      path: '/resend-activation',
      filepath: '/resend-activation',
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
  },
  originRedirects: {
    from: [
      'laenvasadora.es',
      'www.laenvasadora.es',
      'laenvasadora.com',
      'www.laenvasadora.com',
      'laenvasadora.online',
      'www.laenvasadora.online',
      'laenvasadora.site',
      'www.laenvasadora.site',
      'laenvasadora.store',
      'www.laenvasadora.store',
      'www.lomejorencasa.es',
      'lomejorencasa.com',
      'www.lomejorencasa.com',
      'lomejorencasa.fun',
      'www.lomejorencasa.fun',
      'lomejorencasa.online',
      'www.lomejorencasa.online',
      'lomejorencasa.space',
      'www.lomejorencasa.space',
      'lomejorencasa.store',
      'www.lomejorencasa.store',
      'lomejorencasa.website',
      'www.lomejorencasa.website',
    ],
    to: 'https://lomejorencasa.es',
  },
  socialPaths: {
    tiktok: 'https://www.tiktok.com/@lomejorencasa',
    instagram: 'https://www.instagram.com/lomejorencasa/',
    facebook: 'https://www.facebook.com/profile.php?id=100092231104587',
  },
};

export default navigationConfig;

export const pages = navigationConfig.pages;

export const originRedirects = navigationConfig.originRedirects;

export const socialPaths = navigationConfig.socialPaths;
