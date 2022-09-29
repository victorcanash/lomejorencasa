import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import { NavigationConfig } from '@core/types/navigation';

const navigationConfig: NavigationConfig = {
  pages: {
    home: {
      path: '/',
      protection: Protections.none,
      type: PageTypes.main,
    },
    about: {
      path: '/about',
      protection: Protections.none,
      type: PageTypes.main,
    },
    productList: {
      path: '/collections',
      protection: Protections.none,
      type: PageTypes.main,
    },
    productDetail: {
      path: '/products',
      protection: Protections.none,
      type: PageTypes.main,
    },

    login: {
      path: '/login',
      protection: Protections.none,
      type: PageTypes.main,
    },
    register: {
      path: '/register',
      protection: Protections.none,
      type: PageTypes.main,
    },
    forgot: {
      path: '/forgot',
      protection: Protections.none,
      type: PageTypes.main,
    },

    activation: {
      path: '/activation',
      protection: Protections.none,
      type: PageTypes.link,
    },
    reset: {
      path: '/reset',
      protection: Protections.none,
      type: PageTypes.link,
    },
    newemail: {
      path: '/newemail',
      protection: Protections.none,
      type: PageTypes.link,
    },
    
    myaccount: {
      path: '/myaccount',
      protection: Protections.user,
      type: PageTypes.main,
    },
    cart: {
      path: '/cart',
      protection: Protections.user,
      type: PageTypes.main,
    },
    orders: {
      path: '/orders',
      protection: Protections.user,
      type: PageTypes.main,
    },
    
    admin: {
      path: '/admin',
      protection: Protections.admin,
      type: PageTypes.admin,
    },
  }
};

export default navigationConfig;

export const pages = navigationConfig.pages;
