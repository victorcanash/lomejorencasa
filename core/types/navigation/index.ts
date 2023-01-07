import { Protections } from '@core/constants/auth';
import { PageTypes } from '@core/constants/navigation';

export type NavigationConfig = {
  pages: {
    home: Page,
    landing: Page,
    about: Page,
    faq: Page,
    productList: Page,
    productDetail: Page,

    login: Page,
    register: Page,
    forgot: Page,

    activation: Page,
    reset: Page,
    newemail: Page,
    
    myaccount: Page,
    cart: Page,
    checkout: Page,
    orderList: Page,
    orderDetail: Page,
    
    admin: Page,
  },
};

export type Page = {
  path: string,
  filepath: string,
  protection: Protections,
  type: PageTypes,
};
