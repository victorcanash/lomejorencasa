import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import { NavigationConfig } from '@core/types/navigation';

const navigationConfig: NavigationConfig = {
  pages: {
    home: {
      path: '/',
      filepath: '/',
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
    
    myaccount: {
      path: '/myaccount',
      filepath: '/myaccount',
      protection: Protections.user,
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
    
    admin: {
      path: '/admin',
      filepath: '/admin',
      protection: Protections.admin,
      type: PageTypes.admin,
    },
  }
};

export default navigationConfig;

export const pages = navigationConfig.pages;
