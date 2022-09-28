import { Protections } from '@core/constants/auth';
import { PageTypes } from '@core/constants/navigation';

export type NavigationConfig = {
  pages: {
    home: Page,
    about: Page,
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
    orders: Page,
    
    admin: Page,
  },
};

export type Page = {
  path: string,
  protection: Protections,
  type: PageTypes,
};
